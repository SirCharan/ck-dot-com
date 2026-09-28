/**
 * Build the résumé PDF from the live /resume page and assert it is ONE page.
 *
 *   npm run resume:pdf              # against an already-running dev/prod server
 *   RESUME_URL=... npm run resume:pdf
 *
 * Uses @playwright/test's bundled Chromium, so print CSS is applied exactly as
 * a browser would. Exits non-zero when the PDF is not exactly one page: that
 * failure is the point of this script, not a nuisance.
 *
 * Plain .mjs on purpose. `tsx` is referenced by the other scripts but is not
 * actually installed, so node runs this directly with no transpiler.
 */

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

// RESUME_VARIANT=<v> builds content/resume-<v>.md from /resume/<v> (vc, eng, trackk).
const V = process.env.RESUME_VARIANT ?? "";
const MASTER = path.join(process.cwd(), "content", `resume${V ? "-" + V : ""}.md`);
const OUT_DIR = process.env.RESUME_OUT_DIR ?? path.join(process.cwd(), "public");
const BASENAME = `charandeep-kapoor${V ? "-" + V : ""}-resume`;

// Unfilled placeholders must never reach public/. ALLOW_TODO=1 is for drafts,
// paired with RESUME_OUT_DIR pointing somewhere private.
if (fs.readFileSync(MASTER, "utf8").includes("[[TODO") && !process.env.ALLOW_TODO) {
  console.error(`FAIL: ${path.relative(process.cwd(), MASTER)} still has [[TODO]] slots. Fill them, or ALLOW_TODO=1 RESUME_OUT_DIR=<tmp> for a draft.`);
  process.exit(1);
}
const URL = process.env.RESUME_URL ?? `http://localhost:3000/resume${V ? "/" + V : ""}`;
const OUT = path.join(OUT_DIR, `${BASENAME}.pdf`);

/**
 * Page count, parsed from the PDF itself.
 *
 * Deliberately NOT `mdls`: Spotlight serves a CACHED value for a file that was
 * just rewritten, which reports the previous run's count and produces both
 * false passes and false failures. Parsing the bytes is deterministic.
 */
function pageCount(file) {
  const raw = fs.readFileSync(file, "latin1");
  const count = raw.match(/\/Type\s*\/Pages[\s\S]{0,200}?\/Count\s+(\d+)/);
  if (count) return Number(count[1]);
  return (raw.match(/\/Type\s*\/Page(?![s/])/g) ?? []).length;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const res = await page.goto(URL, { waitUntil: "networkidle" });
  if (!res || !res.ok()) {
    throw new Error(`${URL} returned ${res?.status() ?? "no response"} — is the server running?`);
  }

  // Render under print media so @page and the print block apply, and wait for
  // the webfonts so type metrics (and therefore the page count) are real.
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: false,
    preferCSSPageSize: true,
  });

  await browser.close();

  const pages = pageCount(OUT);
  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`wrote ${path.relative(process.cwd(), OUT)} — ${pages} page(s), ${kb}KB`);

  if (pages !== 1) {
    console.error(
      `\nFAIL: résumé is ${pages} pages, must be 1.\n` +
        `Cut in this order: certification details, then the Delta 2023-24 third bullet,\n` +
        `then the profile down to one sentence. Edit content/resume.md, never the page.`,
    );
    process.exit(1);
  }
  console.log("OK: one page.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
