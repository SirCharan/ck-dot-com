import { ImageResponse } from "next/og";
import { OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { MEASURED } from "@/components/claude-browse/data";

export const runtime = "nodejs";
export const alt = "Claude Browse: 6,400 tokens read, 90 tokens kept";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* Same palette as src/lib/og.tsx, laid out around the measured numbers. */
const INK = "#f0eee6";
const MUTE = "#8c877c";
const ACCENT = "#4ecf7a";

function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: accent ? ACCENT : INK }}>{n}</div>
      <div style={{ fontSize: 26, color: MUTE }}>{label}</div>
    </div>
  );
}

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", background: "#0a0b0d", color: INK, fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTE }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: ACCENT }} />
          Open source · Claude Code plugin
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em" }}>Claude Browse</div>
          <div style={{ fontSize: 36, color: "#a8a29a" }}>Give Claude a browser. Keep your chat light.</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 72 }}>
            <Stat n={MEASURED.full.toLocaleString("en-US")} label="tokens read" />
            <Stat n={String(MEASURED.summary)} label="tokens kept" accent />
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 26, fontWeight: 600 }}>
            <span>Charandeep</span>
            <span style={{ color: ACCENT }}>Kapoor</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
