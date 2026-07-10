/**
 * GrainOverlay — ~3% film-grain over the whole lab surface.
 *
 * A single SVG feTurbulence pattern is baked to a tiled data-URI in
 * `.grain-overlay` (src/index.css): fixed, pointer-events-none, no blur.
 * Render once per page, above the base + sim well.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden />;
}
