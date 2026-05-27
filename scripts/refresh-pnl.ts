/**
 * Refresh src/data/stocky-pnl.json from Sensibull's verified-PnL page.
 *
 * Why Playwright: the page (https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl)
 * is a pure React SPA; its HTML is an empty shell. The underlying API at
 * oxide.sensibull.com requires an auth token, so we can't bypass the browser.
 *
 * Usage: `npm run pull:pnl`
 *
 * One-time setup (Playwright not bundled with the app):
 *   npm i -D playwright @types/node
 *   npx playwright install chromium
 *
 * Output: writes src/data/stocky-pnl.json in the same shape consumed by
 * src/components/StockyModule.tsx. Numbers come from the rendered DOM at
 * positions Sensibull occasionally changes — adjust the selectors below if
 * the refresh ever returns NaN.
 */

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL =
  "https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl";

const OUT = path.join(process.cwd(), "src", "data", "stocky-pnl.json");

function parsePct(s: string): number {
  const m = s.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  });
  const page = await ctx.newPage();

  await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });

  // Wait for at least one number to appear — Sensibull renders the PnL block
  // a beat after the network goes idle.
  await page.waitForFunction(
    () => /-?\d+(\.\d+)?%/.test(document.body.innerText),
    null,
    { timeout: 30_000 }
  );

  // Pull the full visible text — easier to grep than to hunt selectors that
  // shift between releases.
  const text = await page.evaluate(() => document.body.innerText);

  // Heuristics — looks for the labels Sensibull uses on the verified-PnL page.
  // Fall back to existing file values if a particular field can't be parsed.
  const existing = JSON.parse(fs.readFileSync(OUT, "utf-8"));

  const totalMatch = text.match(/Total\s+Return[^\n]*?(-?\d+(\.\d+)?)\s*%/i);
  const winMatch = text.match(/Win\s+Rate[^\n]*?(\d+(\.\d+)?)\s*%/i);
  const sharpeMatch = text.match(/Sharpe[^\n]*?(-?\d+(\.\d+)?)/i);

  const next = {
    ...existing,
    totalReturnPct: totalMatch ? parsePct(totalMatch[1] + "%") : existing.totalReturnPct,
    winRatePct: winMatch ? parseInt(winMatch[1], 10) : existing.winRatePct,
    sharpe: sharpeMatch ? parseFloat(sharpeMatch[1]) : existing.sharpe,
    asOf: new Date().toISOString().slice(0, 10),
  };

  fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");

  console.log("Updated", OUT);
  console.log(next);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
