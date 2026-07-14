import { expect, test } from "@playwright/test";

/**
 * Reduced-motion + mobile fallback contract: on a 375px phone viewport with
 * prefers-reduced-motion, the home hero still renders the identity + live
 * curve (the PHOSPHOR hero is SVG/HTML — its draw-on + last-price dot pulse
 * simply don't animate), and NO <canvas> (WebGL) ever mounts on any client.
 */
test.use({
  viewport: { width: 375, height: 812 },
  reducedMotion: "reduce",
});

test("mobile + reduced-motion renders the hero with no canvas", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // The hero identity renders and is visible on the phone viewport.
  await expect(page.locator("h1").first()).toHaveText(/Charandeep Kapoor/);
  await expect(page.getByRole("region", { name: /mission control/i })).toBeVisible();

  // The hero is SVG/HTML only — a <canvas> must never appear, regardless of
  // client capability or the reduced-motion setting.
  await page.waitForTimeout(2000);
  await expect(page.locator("canvas")).toHaveCount(0);
});
