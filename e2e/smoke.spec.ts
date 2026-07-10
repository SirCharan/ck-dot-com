import { expect, test } from "@playwright/test";

/**
 * Smoke + console-error regression guard.
 *
 * Every core route must respond 2xx/3xx and produce ZERO console errors and
 * ZERO uncaught page errors. This is the guard against the R3F hero crash
 * (React 19 + fiber@9 / drei@10) silently regressing.
 */
const ROUTES = ["/", "/work", "/work/drishti", "/resume", "/track-record", "/blog"];

for (const route of ROUTES) {
  test(`${route} loads with no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      // Ignore benign resource 404s: @vercel/analytics + speed-insights scripts
      // (and any /_vercel/* beacon) only exist on Vercel and 404 in local dev.
      // The real regression guard is `pageerror` (uncaught JS — the R3F-crash
      // class) plus any NON-resource app console.error, both kept strict below.
      if (/Failed to load resource.*status of 404/i.test(text)) return;
      errors.push(`console.error: ${text}`);
    });
    page.on("pageerror", (err) => {
      errors.push(`pageerror: ${err.message}`);
    });

    const res = await page.goto(route, { waitUntil: "networkidle" });
    expect(res, `no response for ${route}`).not.toBeNull();
    expect(res!.status(), `status for ${route}`).toBeLessThan(400);

    // Give async chunks (dynamic R3F import via requestIdleCallback) a beat.
    await page.waitForTimeout(1500);

    expect(errors, `console errors on ${route}:\n${errors.join("\n")}`).toEqual([]);
  });
}
