/**
 * Mission-Control console frame — a fixed, inset hairline border with neon
 * corner brackets, drawn under the sticky header (top starts at --hdr). Purely
 * decorative: position:fixed + pointer-events:none means it adds zero layout
 * and never fights the header or the full-bleed hero. The border/inset come
 * from .mc-frame / .mc-frame-box (src/index.css); the brackets are inline SVG.
 */
function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  // 14×14 L-bracket; rotate per corner so the elbow hugs each frame corner.
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place = {
    tl: { top: -1, left: -1 },
    tr: { top: -1, right: -1 },
    br: { bottom: -1, right: -1 },
    bl: { bottom: -1, left: -1 },
  }[pos];
  return (
    <svg
      className="mc-frame-corner"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ ...place, transform: `rotate(${rot}deg)` }}
    >
      <path d="M1 15 L1 1 L15 1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ConsoleFrame() {
  return (
    <div aria-hidden className="mc-frame hidden md:block">
      <div className="mc-frame-box">
        <Bracket pos="tl" />
        <Bracket pos="tr" />
        <Bracket pos="bl" />
        <Bracket pos="br" />
      </div>
    </div>
  );
}
