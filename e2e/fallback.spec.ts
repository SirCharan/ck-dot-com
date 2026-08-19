import { expect, test } from "@playwright/test";

/**
 * Reduced-motion + mobile fallback contract: on a 375px phone viewport with
 * prefers-reduced-motion, the landing renders its real content statically —
 * the GSAP entrances bail out via useReducedMotion — and no <canvas> (WebGL)
 * ever mounts, since the hero art is pure SVG/DOM on every client.
 */
test.use({
  viewport: { width: 375, height: 812 },
  reducedMotion: "reduce",
});

test("mobile + reduced-motion renders static content and no canvas", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const h1 = page.locator("h1").first();
  await expect(h1).toContainText("Charandeep");
  await expect(page.getByText(/Using AI to build a/)).toBeVisible();

  // With motion suppressed the hero copy must still be fully opaque and
  // untransformed — not parked at an animation start state.
  const line = page.locator(".press-hero-line");
  await expect(line).toBeVisible();
  const opacity = await line.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBe(1);

  // Wait past any idle window; the hero art is SVG/DOM only, so a canvas must
  // never appear regardless of client capability.
  await page.waitForTimeout(2000);
  await expect(page.locator("canvas")).toHaveCount(0);
});
