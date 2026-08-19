import { expect, test } from "@playwright/test";

/**
 * Hero contract (Proof Press landing):
 * - the name h1 renders both lines
 * - the positioning line and its accent phrase render
 * - the live Dhan ledger link renders its own visible text (no aria-label
 *   override — that failed WCAG 2.5.3 Label in Name)
 * - the press machine figure exposes role=img so its aria-label is valid
 * - the hero fills most of the viewport
 */
test("hero renders identity, positioning line and the live ledger link", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  // The name is two block spans, so textContent has no space between them.
  const h1 = page.locator("h1").first();
  await expect(h1).toContainText("Charandeep");
  await expect(h1).toContainText("Kapoor");

  await expect(page.getByText(/Using AI to build a/)).toBeVisible();
  await expect(page.locator(".press-hero-line em")).toHaveText("money printing machine");

  const live = page.locator("a.press-live");
  await expect(live).toBeVisible();
  await expect(live).toContainText(/Live/);
  await expect(live).toHaveAttribute("href", "/track-record");

  await expect(page.getByRole("img", { name: /machine that prints money/i })).toBeVisible();

  const hero = page.getByRole("region", { name: /^hero$/i });
  const box = await hero.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThan(600);
});

/**
 * Visible-by-default law: this repo bans opacity-gated entrances. The hero
 * copy, the proof tickets and the ship plates must all be fully opaque, so a
 * reintroduced `gsap.from({opacity: 0})` fails here instead of silently
 * hiding content and tanking the axe contrast audit.
 */
test("no element is gated behind an opacity entrance", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  for (const sel of [".ph-fade", ".press-ticket", ".press-plate"]) {
    const nodes = page.locator(sel);
    const n = await nodes.count();
    expect(n, `${sel} should exist`).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      const opacity = await nodes.nth(i).evaluate((el) => getComputedStyle(el).opacity);
      expect(Number(opacity), `${sel}[${i}] must be fully opaque`).toBe(1);
    }
  }
});
