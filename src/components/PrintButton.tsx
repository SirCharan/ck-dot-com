"use client";

/** Download-as-PDF via the browser print dialog (print CSS in tokens.css). */
export function PrintButton() {
  return (
    <button
      type="button"
      className="press-btn press-btn-ghost press-btn-sm print-hide"
      onClick={() => window.print()}
    >
      Download PDF
    </button>
  );
}
