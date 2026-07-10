import { expect, test } from "@playwright/test";

/**
 * Reduced-motion + mobile fallback contract: on a 375px phone viewport with
 * prefers-reduced-motion, the hero shows the static SVG trajectory plate
 * (role=img, "three-body trajectory") and NO <canvas> (WebGL) ever mounts.
 */
test.use({
  viewport: { width: 375, height: 812 },
  reducedMotion: "reduce",
});

test("mobile + reduced-motion shows the static plate and no canvas", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // The plate is decorative (its Hero3D wrapper is aria-hidden), so query by
  // test id rather than a11y role.
  const plate = page.getByTestId("hero-static-plate");
  await expect(plate).toBeVisible();

  // Wait past the idle-callback window that would mount R3F on capable clients.
  await page.waitForTimeout(2000);

  await expect(page.locator("canvas")).toHaveCount(0);
});
