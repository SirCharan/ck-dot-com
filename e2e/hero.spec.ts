import { expect, test } from "@playwright/test";

/**
 * Hero contract (mission-control, full-viewport landing screen):
 * - the name h1 and the founder/quant credentials line render
 * - the live Dhan curve card is present
 * - on desktop the hero fills most of the viewport (full-screen landing)
 */
test("full-height hero renders identity + live curve", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  const h1 = page.locator("h1").first();
  await expect(h1).toHaveText(/Charandeep Kapoor/);

  await expect(page.getByText(/FOUNDER · EX-QUANT · AI ENGINEER/)).toBeVisible();
  await expect(page.getByRole("link", { name: /^Timelock$/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Stocky$/i })).toBeVisible();
  await expect(page.getByText(/portfolio · Dhan · return %/)).toBeVisible();

  // Full-screen landing: the hero section should fill most of the viewport.
  const hero = page.getByRole("region", { name: /mission control/i });
  const box = await hero.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThan(720); // ~80% of 900px
});
