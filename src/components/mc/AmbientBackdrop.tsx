/**
 * Mission-Control ambient backdrop — fixed, decorative, behind everything.
 * Two CSS-only layers: .mc-bg (static neon bloom + faint grid, radial-masked)
 * and .mc-scan (subtle scanlines + a slow sweeping band). Both are pointer-
 * events:none and sit at z-0/z-1, so page content (z-10) always wins. Motion is
 * pure CSS and frozen under prefers-reduced-motion. See src/index.css.
 */
export function AmbientBackdrop() {
  return (
    <>
      <div aria-hidden className="mc-bg" />
      <div aria-hidden className="mc-scan" />
    </>
  );
}
