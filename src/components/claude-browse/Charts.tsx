import type { CSSProperties } from "react";
import { MEASURED } from "@/components/claude-browse/data";

const fmt = (n: number) => n.toLocaleString("en-US");

/* SSR prints the final value; the client counts up to it once it is on screen. */
export function Num({ n, suffix = "" }: { n: number; suffix?: string }) {
  return <span className="cb-count">{fmt(n)}{suffix}</span>;
}

export function SizeBars() {
  const rows: [string, string, number][] = [
    ["The whole page", "what Claude would read by itself", MEASURED.full],
    ["The clickable parts", "the page map the helper read", MEASURED.compact],
    ["The note", "what your chat received", MEASURED.summary],
  ];
  return (
    <figure className="cb-bars cb-r">
      {rows.map(([label, sub, n], i) => (
        <div key={label} className={`cb-bar-row${i === 2 ? " is-note" : ""}`}>
          <div className="cb-bar-lab"><b>{label}</b><span>{sub}</span></div>
          <div className="cb-bar-track">
            <div className="cb-bar-fill" style={{ width: `${Math.max((n / MEASURED.full) * 100, 1.4)}%`, animationDelay: `${i * 0.12}s` }} />
          </div>
          <div className="cb-bar-num"><Num n={n} /><small>tokens</small></div>
        </div>
      ))}
      <figcaption>
        Measured on {MEASURED.date} with {MEASURED.version}, one visit to Y Combinator&apos;s news page. The whole run took {MEASURED.seconds} seconds.
      </figcaption>
    </figure>
  );
}

/* Illustrative: derived only from the measured per-page figures. */
export function CostChart() {
  const n = 10;
  const X = (i: number) => 64 + ((i - 1) / (n - 1)) * 456;
  const max = MEASURED.full * n;
  const Y = (v: number) => 236 - (v / max) * 208;
  const line = (per: number) => Array.from({ length: n }, (_, k) => `${k ? "L" : "M"}${X(k + 1)} ${Y(per * (k + 1))}`).join(" ");
  return (
    <figure className="cb-cost cb-r">
      <p className="cb-tag">Illustrative</p>
      <svg viewBox="0 0 560 280" className="cb-svg" role="img" aria-label={`Illustrative chart. With the page in your chat, 10 messages re-send about ${fmt(max)} tokens. With only the note, about ${fmt(MEASURED.summary * n)}.`}>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <path d={`M64 ${Y(max * f)}H520`} className="cb-grid" />
            <text x={56} y={Y(max * f) + 4} textAnchor="end" className="cb-tx">{fmt(max * f)}</text>
          </g>
        ))}
        {Array.from({ length: n }, (_, k) => <text key={k} x={X(k + 1)} y={256} textAnchor="middle" className="cb-tx">{k + 1}</text>)}
        <text x={292} y={276} textAnchor="middle" className="cb-tx">messages after the page</text>
        <path d={line(MEASURED.full)} pathLength={1} className="cb-plot cb-draw" />
        <path d={line(MEASURED.summary)} pathLength={1} className="cb-plot cb-plot-ac cb-draw cb-draw-2" />
        <circle cx={X(n)} cy={Y(max)} r="4" className="cb-ink" />
        <circle cx={X(n)} cy={Y(MEASURED.summary * n)} r="4" className="cb-ac" />
        <text x={X(n) - 8} y={Y(max) - 2} textAnchor="end" className="cb-tx cb-tx-ink">page in chat: {fmt(max)}</text>
        <text x={X(n) - 8} y={Y(MEASURED.summary * n) - 10} textAnchor="end" className="cb-tx cb-tx-ac">note only: {fmt(MEASURED.summary * n)}</text>
      </svg>
      <figcaption>
        Each later message sends the whole chat again. This counts only the page part, {fmt(MEASURED.full)} or {MEASURED.summary} tokens a time, over 10 messages.
      </figcaption>
    </figure>
  );
}

const TL: [number, string][] = [[16, "You ask"], [88, "Browser opens"], [160, "Helper reads"], [232, "Reply written"], [304, "Chat gets it"]];

export function Timeline() {
  return (
    <svg viewBox="0 0 320 120" className="cb-svg cb-tl" role="img" aria-label={`Timeline: you ask at 0 seconds, the reply lands at ${MEASURED.seconds} seconds`}>
      <path d="M16 60H304" className="cb-rule" />
      <path d="M16 60H304" pathLength={1} className="cb-msg cb-draw" />
      {TL.map(([x, t], i) => (
        <g key={t}>
          <circle cx={x} cy="60" r={i === 0 || i === 4 ? 6 : 4.5} className="cb-tl-dot" style={{ "--i": i } as CSSProperties} />
          <text x={x} y={i % 2 ? 92 : 36} className="cb-tx cb-tx-ink" textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}>{t}</text>
        </g>
      ))}
      <text x="16" y="114" className="cb-tx">0 s</text>
      <text x="304" y="114" className="cb-tx" textAnchor="end">{MEASURED.seconds} s</text>
    </svg>
  );
}

const FLOW: [string, string][] = [
  ["You", "Type /browse and a question"],
  ["Claude", "Passes the job to a helper"],
  ["The helper", "A second, smaller Claude (Sonnet)"],
  ["A browser", "Private and hidden, or your own Chrome"],
  ["The page", "Read and clicked, never copied back"],
];

function FlowNode({ i }: { i: number }) {
  return (
    <li className="cb-node" style={{ "--d": `${i * 1.2}s` } as CSSProperties}>
      <span className="cb-node-n">{String(i + 1).padStart(2, "0")}</span>
      <b>{FLOW[i][0]}</b>
      <span>{FLOW[i][1]}</span>
    </li>
  );
}

export function Flow() {
  return (
    <div className="cb-flow-wrap cb-scene cb-r">
      <ol className="cb-flow">
        <FlowNode i={0} />
        <FlowNode i={1} />
        <li className="cb-out">
          <span className="cb-out-lab">Outside your chat</span>
          <ol className="cb-flow">
            <FlowNode i={2} />
            <FlowNode i={3} />
            <FlowNode i={4} />
          </ol>
        </li>
      </ol>
      <div className="cb-return">
        <svg width="28" height="16" viewBox="0 0 28 16" aria-hidden><path d="M27 8H3M9 2L3 8l6 6" className="cb-ret" /></svg>
        <span>A note of <b>12 lines or less</b> comes back to your chat. Nothing else does.</span>
      </div>
    </div>
  );
}

export function SiteGate() {
  return (
    <svg viewBox="0 0 320 250" className="cb-svg" role="img" aria-label="The helper asks for a site. If the site is on your list, the browser goes. If not, it is refused with exit 3 and the browser never moves.">
      <rect x={60} y={6} width="200" height="38" rx="10" className="cb-fr" />
      <text x={160} y={30} textAnchor="middle" className="cb-tx cb-tx-ink">helper asks for a site</text>
      <path d="M160 44V70" className="cb-msg" />
      <path d="M160 70L224 108L160 146L96 108z" className="cb-fr cb-fr-ac" />
      <text x={160} y={112} textAnchor="middle" className="cb-tx cb-tx-ink">on your list?</text>
      <path d="M96 108H52V178M224 108H268V178" className="cb-msg" />
      <text x={70} y={100} className="cb-tx">yes</text>
      <text x={232} y={100} className="cb-tx cb-tx-ac">no</text>
      <rect x={2} y={180} width="120" height="62" rx="10" className="cb-fr" />
      <text x={62} y={206} textAnchor="middle" className="cb-tx cb-tx-ink">browser goes</text>
      <text x={62} y={226} textAnchor="middle" className="cb-tx">to that site</text>
      <rect x={198} y={180} width="120" height="62" rx="10" className="cb-fr cb-fr-ac" />
      <text x={258} y={206} textAnchor="middle" className="cb-tx cb-tx-ac">refused, exit 3</text>
      <text x={258} y={226} textAnchor="middle" className="cb-tx">browser stays put</text>
    </svg>
  );
}

export function Fingerprint() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2];
  let bx = 214;
  return (
    <svg viewBox="0 0 320 200" className="cb-svg" role="img" aria-label="From each page, the log keeps a short fingerprint. The words themselves are not kept.">
      <rect x={10} y={30} width="80" height="118" rx="8" className="cb-fr" />
      {[48, 62, 76, 90, 104, 118, 132].map((y) => <rect key={y} x={20} y={y} width={40 + (y % 20)} height="5" rx="2.5" className="cb-ln" />)}
      <text x={50} y={172} textAnchor="middle" className="cb-tx">the page</text>
      <path d="M94 66H196" className="cb-msg" />
      <text x={145} y={56} textAnchor="middle" className="cb-tx cb-tx-ac">fingerprint</text>
      <rect x={202} y={36} width="110" height="60" rx="8" className="cb-fr cb-fr-ac" />
      {bars.map((w, i) => { const x = bx; bx += w * 2 + 3; return <rect key={i} x={x} y={48} width={w * 2} height="26" className="cb-ac" />; })}
      <text x={257} y={88} textAnchor="middle" className="cb-tx">kept in the log</text>
      <path d="M94 124H196" className="cb-dash" />
      <text x={145} y={116} textAnchor="middle" className="cb-tx">the words</text>
      <path d="M232 110l24 24M256 110l-24 24" className="cb-x" />
      <text x={244} y={156} textAnchor="middle" className="cb-tx cb-tx-ink">not kept</text>
    </svg>
  );
}

export function ModeIcon({ own }: { own?: boolean }) {
  return (
    <svg viewBox="0 0 72 52" width="72" height="52" className="cb-svg" aria-hidden>
      <rect x={2} y={2} width="68" height="48" rx="7" className={own ? "cb-fr cb-fr-ac" : "cb-fr"} />
      <path d="M2 14h68" className="cb-rule" />
      {own ? (
        <g><circle cx={36} cy={27} r="6" className="cb-ac" /><path d="M24 44c2-7 22-7 24 0" className="cb-ret" /></g>
      ) : (
        <g><path d="M22 32c8-10 20-10 28 0c-8 10-20 10-28 0z" className="cb-ret" /><path d="M24 42L48 20" className="cb-ret" /></g>
      )}
    </svg>
  );
}
