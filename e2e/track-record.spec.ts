import { expect, test } from "@playwright/test";

/**
 * /track-record interactive-calendar guard.
 *
 * 1. Ratios are un-gated — the "building / ratios unlock" placeholder is gone and
 *    the risk-adjusted ratio labels render.
 * 2. Clicking a trades-day cell opens that day's per-trade table below the
 *    calendar (the track-trades endpoint is mocked for determinism).
 */

const TRADES_FIXTURE = {
  ok: true,
  date: "MOCK",
  net: 1234.5,
  gross: 1256.25,
  charges: 21.75,
  trades: [
    { time: "2026-07-09 09:20:11", sym: "NIFTY 25000 CE", side: "BUY", qty: 75, price: 120.5, realized: 0, charges: 8.2 },
    { time: "2026-07-09 14:05:41", sym: "NIFTY 25000 CE", side: "SELL", qty: 75, price: 137.25, realized: 1256.25, charges: 13.55 },
  ],
};

test("ratios are un-gated (no building placeholder)", async ({ page }) => {
  await page.goto("/track-record", { waitUntil: "networkidle" });
  await expect(page.getByText(/ratios unlock at/i)).toHaveCount(0);
  await expect(page.getByText(/Sharpe \(building\)/i)).toHaveCount(0);
  await expect(page.getByText("Sortino", { exact: true })).toBeVisible();
  await expect(page.getByText("Recovery factor", { exact: true })).toBeVisible();
});

test("clicking a trades-day opens the per-trade table", async ({ page }) => {
  // Mock the per-day trades endpoint (backend not required for this UI test).
  await page.route("**/api/dhan/track-trades?*", async (route) => {
    await route.fulfill({ json: TRADES_FIXTURE });
  });

  await page.goto("/track-record", { waitUntil: "networkidle" });

  // The calendar mounts client-only after hydration.
  const calendar = page.getByRole("img", { name: /Daily P&L calendar/i });
  await expect(calendar).toBeVisible();

  // Trades-days are the clickable (cursor-pointer) cells; click the first.
  const cell = page.locator("rect.cursor-pointer").first();
  await expect(cell).toBeVisible();
  await cell.click();

  // The drill-down table appears with the mocked rows.
  await expect(page.getByText(/Fig\. 3 — trades on/i)).toBeVisible();
  await expect(page.getByText("NIFTY 25000 CE").first()).toBeVisible();
  await expect(page.getByText(/Day total/i)).toBeVisible();
});
