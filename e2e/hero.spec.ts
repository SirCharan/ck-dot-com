import { expect, test } from "@playwright/test";

/**
 * Hero layout contract: the copy (Fig.1 caption + h1) must sit BELOW the sim
 * band — text never overlaps the canvas/plate ("never centred, never over the
 * canvas"). Also asserts the mono Fig.1 caption is present.
 */
test("hero copy sits below the sim band, and Fig.1 caption is present", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const band = page.getByTestId("hero-sim-band");
  await expect(band).toBeVisible();

  const caption = page.getByText(/Fig\.\s*1\s*—\s*Restricted three-body/);
  await expect(caption).toBeVisible();

  const h1 = page.locator("h1").first();
  await expect(h1).toBeVisible();

  const bandBox = await band.boundingBox();
  const captionBox = await caption.boundingBox();
  const h1Box = await h1.boundingBox();
  expect(bandBox).not.toBeNull();
  expect(captionBox).not.toBeNull();
  expect(h1Box).not.toBeNull();

  const bandBottom = bandBox!.y + bandBox!.height;
  // Caption and heading must start at or below the band's bottom edge (no overlap).
  expect(captionBox!.y).toBeGreaterThanOrEqual(bandBottom - 1);
  expect(h1Box!.y).toBeGreaterThanOrEqual(bandBottom - 1);
});
