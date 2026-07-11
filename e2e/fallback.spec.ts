import { expect, test } from "@playwright/test";

/**
 * Reduced-motion + mobile fallback contract: on a 375px phone viewport with
 * prefers-reduced-motion, the hero shows the inner-solar-system ephemeris
 * figure frozen at today's positions (its rAF loop never starts) and NO
 * <canvas> (WebGL) ever mounts — the ephemeris is pure SVG on every client.
 */
test.use({
  viewport: { width: 375, height: 812 },
  reducedMotion: "reduce",
});

test("mobile + reduced-motion shows the frozen ephemeris and no canvas", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // The ephemeris SVG carries role=img + an aria-label, so query it by name.
  const fig = page.getByRole("img", { name: /ephemeris/i });
  await expect(fig).toBeVisible();

  // Wait past any idle window; the ephemeris is SVG-only, so a canvas must
  // never appear regardless of client capability.
  await page.waitForTimeout(2000);

  await expect(page.locator("canvas")).toHaveCount(0);
});
