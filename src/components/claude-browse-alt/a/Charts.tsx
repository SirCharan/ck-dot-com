import type { CSSProperties } from "react";
import { MEASURED } from "@/components/claude-browse/data";
import { MSGS, PER_OFF, PER_ON, fmt, sent } from "./util";

const W = 360, H = 232, L = 44, R = 14, T = 16, B = 36, YMAX = 400000;
const x = (n: number) => L + ((n - 1) * (W - L - R)) / 9;
const y = (v: number) => T + (H - T - B) * (1 - v / YMAX);
const line = (per: number) => MSGS.map((n, i) => `${i ? "L" : "M"}${x(n).toFixed(1)} ${y(sent(per, n)).toFixed(1)}`).join(" ");

export function TokenChart() {
  const offEnd = sent(PER_OFF, 10), onEnd = sent(PER_ON, 10);
  return (
    <figure className="ra-chart ra-rv">
      <figcaption className="ra-chart-h">
        <span>Tokens you send over 10 messages</span>
        <span className="ra-pill ra-pill-dim">Illustrative</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Line chart. Without claude-browse, tokens sent reach ${fmt(offEnd)} by message 10. With claude-browse they reach ${fmt(onEnd)}.`}>
        {[0, 100000, 200000, 300000, 400000].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="ra-grid" />
            <text x={L - 6} y={y(v) + 3.5} className="ra-ax" textAnchor="end">{v ? `${v / 1000}k` : "0"}</text>
          </g>
        ))}
        {MSGS.map((n) => <text key={n} x={x(n)} y={H - B + 15} className="ra-ax" textAnchor="middle">{n}</text>)}
        <text x={(L + W - R) / 2} y={H - 4} className="ra-ax" textAnchor="middle">message</text>
        <path d={line(PER_OFF)} className="ra-l-off" />
        <path d={line(PER_ON)} className="ra-l-on" />
        <circle cx={x(10)} cy={y(offEnd)} r="3.5" className="ra-d-off" />
        <circle cx={x(10)} cy={y(onEnd)} r="3.5" className="ra-d-on" />
        <text x={x(10) - 8} y={y(offEnd) - 8} className="ra-lbl" textAnchor="end">{fmt(offEnd)}</text>
        <text x={x(10) - 8} y={y(onEnd) - 8} className="ra-lbl ra-lbl-on" textAnchor="end">{fmt(onEnd)}</text>
        <rect x={L + 1} y={T - 4} width={W - L - R} height={H - T - B + 4} className="ra-cover" />
      </svg>
      <div className="ra-legend">
        <span><i className="ra-k-off" />Without: the whole page stays in the chat</span>
        <span><i className="ra-k-on" />With: only the 12-line reply stays</span>
      </div>
      <p className="ra-cap">Each message reads one page ({fmt(PER_OFF)} vs {fmt(PER_ON)} tokens) and re-sends the chat so far. Derived from the one real measurement.</p>
    </figure>
  );
}

const BARS: [string, number, string][] = [
  ["Whole page", MEASURED.full, "what Claude would read on its own"],
  ["Clickable parts", MEASURED.compact, "what the helper reads, in its own session"],
  ["Reply to your chat", MEASURED.summary, "the 12 lines you get"],
];

export function ProofBars() {
  return (
    <div className="ra-bars ra-rv" role="img" aria-label={BARS.map(([t, v]) => `${t}: ${fmt(v)} tokens`).join(". ")}>
      {BARS.map(([t, v, d], i) => (
        <div key={t} className={`ra-bar ${i === 2 ? "is-on" : ""}`}>
          <div className="ra-bar-t"><span>{t}</span><b>{fmt(v)}</b></div>
          <div className="ra-bar-track"><i style={{ "--w": v / MEASURED.full, "--d": `${i * 0.12}s` } as CSSProperties} /></div>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}
