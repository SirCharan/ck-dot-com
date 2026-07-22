import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Brand OG card, press system: near-black ground, one green accent, no gradients.
 * kicker (small mono-ish), title (big), and a stat/tagline line.
 */
export function ogResponse(opts: { kicker?: string; title: string; stat?: string }) {
  const { kicker = "charandeepkapoor.com", title, stat = "Using AI to build a money printing machine" } = opts;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0b0d",
          color: "#f0eee6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8c877c" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#4ecf7a" }} />
          {kicker}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: title.length > 34 ? 76 : 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
            {title}
          </div>
          <div style={{ width: 84, height: 5, background: "#4ecf7a", borderRadius: 4 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 30, color: "#a8a29a", maxWidth: 780, lineHeight: 1.3 }}>{stat}</div>
          <div style={{ display: "flex", gap: 10, fontSize: 26, fontWeight: 600 }}>
            <span>Charandeep</span>
            <span style={{ color: "#4ecf7a" }}>Kapoor</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
