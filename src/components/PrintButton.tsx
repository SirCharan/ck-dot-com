/**
 * Download the pre-generated résumé PDF.
 *
 * Deliberately NOT `window.print()`. The browser print dialog stamps its own
 * header and footer onto the page ("01/08/2026, 15:37  Résumé — Charandeep
 * Kapoor"), and no CSS can suppress that: `@page` cannot touch browser chrome.
 * This serves a PDF from `public/` instead (`pdfHref`), which
 * `npm run resume:pdf` / `resume:<variant>:pdf` builds and asserts is exactly one page.
 *
 * No "use client" needed — a plain anchor, no event handler.
 * The print CSS in press/tokens.css still governs Cmd+P for anyone who uses it.
 */
export function PrintButton({
  pdfHref,
  alt,
}: {
  /** Omit to hide the button, e.g. for a variant with no public PDF. */
  pdfHref?: string;
  /** Optional cross-link to a sibling variant, shown beside the button. */
  alt?: { label: string; href: string };
}) {
  if (!pdfHref && !alt) return null;
  return (
    <span className="print-hide" style={{ display: "inline-flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {pdfHref ? (
        <a className="press-btn press-btn-ghost press-btn-sm" href={pdfHref} download>
          Download PDF
        </a>
      ) : null}
      {alt ? (
        <a className="press-btn press-btn-ghost press-btn-sm" href={alt.href}>
          {alt.label}
        </a>
      ) : null}
    </span>
  );
}
