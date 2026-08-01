/**
 * Download the pre-generated résumé PDF.
 *
 * Deliberately NOT `window.print()`. The browser print dialog stamps its own
 * header and footer onto the page ("01/08/2026, 15:37  Résumé — Charandeep
 * Kapoor"), and no CSS can suppress that: `@page` cannot touch browser chrome.
 * This serves `public/charandeep-kapoor-resume.pdf` instead, which
 * `npm run resume:pdf` builds and asserts is exactly one page.
 *
 * No "use client" needed — a plain anchor, no event handler.
 * The print CSS in press/tokens.css still governs Cmd+P for anyone who uses it.
 */
export function PrintButton() {
  return (
    <a
      className="press-btn press-btn-ghost press-btn-sm print-hide"
      href="/charandeep-kapoor-resume.pdf"
      download
    >
      Download PDF
    </a>
  );
}
