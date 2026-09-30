import type { CSSProperties } from "react";
import { MEASURED } from "@/components/claude-browse/data";

const fmt = (n: number) => n.toLocaleString("en-US");

export function SizeBars() {
  const rows: [string, string, number][] = [
    ["The whole page", "what Claude would read by itself", MEASURED.full],
    ["The clickable parts", "the page map the helper read", MEASURED.compact],
    ["The note", "what your chat received", MEASURED.summary],
  ];
  return (
    <figure className="sb-bars sb-r">
      {rows.map(([label, sub, n], i) => (
        <div key={label} className={`sb-bar-row${i === 2 ? " is-note" : ""}`}>
          <div className="sb-bar-lab"><b>{label}</b><span>{sub}</span></div>
          <div className="sb-bar-track">
            <div className="sb-bar-fill" style={{ width: `${Math.max((n / MEASURED.full) * 100, 1.4)}%`, animationDelay: `${i * 0.25}s` }} />
          </div>
          <div className="sb-bar-num">{fmt(n)}<small>tokens</small></div>
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
    <figure className="sb-cost sb-r">
      <p className="sb-tag">Illustrative</p>
      <svg viewBox="0 0 560 280" className="sb-svg" role="img" aria-label={`Illustrative chart. With the page in your chat, 10 messages re-send about ${fmt(max)} tokens. With only the note, about ${fmt(MEASURED.summary * n)}.`}>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <path d={`M64 ${Y(max * f)}H520`} className="sb-grid" />
            <text x={56} y={Y(max * f) + 4} textAnchor="end" className="sb-tx">{fmt(max * f)}</text>
          </g>
        ))}
        {Array.from({ length: n }, (_, k) => <text key={k} x={X(k + 1)} y={256} textAnchor="middle" className="sb-tx">{k + 1}</text>)}
        <text x={292} y={276} textAnchor="middle" className="sb-tx">messages after the page</text>
        <path d={line(MEASURED.full)} className="sb-plot" />
        <path d={line(MEASURED.summary)} className="sb-plot sb-plot-ac" />
        <circle cx={X(n)} cy={Y(max)} r="4" className="sb-ink" />
        <circle cx={X(n)} cy={Y(MEASURED.summary * n)} r="4" className="sb-ac" />
        <text x={X(n) - 8} y={Y(max) - 2} textAnchor="end" className="sb-tx sb-tx-ink">page in chat: {fmt(max)}</text>
        <text x={X(n) - 8} y={Y(MEASURED.summary * n) - 10} textAnchor="end" className="sb-tx sb-tx-ac">note only: {fmt(MEASURED.summary * n)}</text>
        <rect x={60} y={16} width="470" height="226" className="sb-wipe" />
      </svg>
      <figcaption>
        Each later message sends the whole chat again. This counts only the page part, {fmt(MEASURED.full)} or {MEASURED.summary} tokens a time, over 10 messages.
      </figcaption>
    </figure>
  );
}

export function Sequence() {
  const cols: [string, number][] = [["You", 70], ["Claude", 220], ["Helper", 390], ["Browser", 560]];
  const msgs: [number, number, string][] = [
    [0, 1, "/browse and a question"],
    [1, 2, "hands over the job"],
    [2, 3, "opens the page"],
    [3, 2, `page map, about ${fmt(MEASURED.compact)} tokens`],
    [2, 2, "writes a short note"],
    [2, 1, `note, about ${MEASURED.summary} tokens`],
    [1, 0, "your answer"],
  ];
  return (
    <div className="sb-scroll sb-r">
      <svg viewBox="0 0 640 380" className="sb-svg sb-seq" role="img" aria-label="Sequence of one run: you ask Claude, Claude hands the job to the helper, the helper uses the browser, and only a short note returns.">
        <defs>
          <marker id="sb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className="sb-ac" />
          </marker>
        </defs>
        <rect x={318} y={8} width="310" height="364" rx="14" className="sb-zone" />
        <text x={473} y={30} textAnchor="middle" className="sb-tx sb-tx-ac">outside your chat</text>
        {cols.map(([name, x]) => (
          <g key={name}>
            <rect x={x - 46} y={42} width="92" height="30" rx="15" className="sb-fr" />
            <text x={x} y={62} textAnchor="middle" className="sb-tx sb-tx-ink">{name}</text>
            <path d={`M${x} 72V356`} className="sb-life" />
          </g>
        ))}
        {msgs.map(([a, b, label], i) => {
          const y = 104 + i * 36;
          const x1 = cols[a][1];
          const x2 = cols[b][1];
          const self = a === b;
          const d = self ? `M${x1} ${y - 8}h36v16h-32` : `M${x1 + (x2 > x1 ? 4 : -4)} ${y}H${x2 + (x2 > x1 ? -6 : 6)}`;
          return (
            <g key={i}>
              <path d={d} className={self ? "sb-msg sb-msg-self" : "sb-msg"} markerEnd="url(#sb-arrow)" />
              <text x={self ? x1 + 44 : (x1 + x2) / 2} y={self ? y + 4 : y - 7} textAnchor={self ? "start" : "middle"} className="sb-tx sb-tx-ink">{label}</text>
            </g>
          );
        })}
        <path d="M24 92V340" className="sb-brace" />
        <text x={16} y={220} textAnchor="middle" className="sb-tx sb-tx-ac" transform="rotate(-90 16 220)">{MEASURED.seconds} seconds in all</text>
      </svg>
    </div>
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
    <li className="sb-node" style={{ "--d": `${i * 1.2}s` } as CSSProperties}>
      <span className="sb-node-n">{String(i + 1).padStart(2, "0")}</span>
      <b>{FLOW[i][0]}</b>
      <span>{FLOW[i][1]}</span>
    </li>
  );
}

export function Flow() {
  return (
    <div className="sb-flow-wrap sb-scene sb-r">
      <ol className="sb-flow">
        <FlowNode i={0} />
        <FlowNode i={1} />
        <li className="sb-out">
          <span className="sb-out-lab">Outside your chat</span>
          <ol className="sb-flow">
            <FlowNode i={2} />
            <FlowNode i={3} />
            <FlowNode i={4} />
          </ol>
        </li>
      </ol>
      <div className="sb-return">
        <svg width="28" height="16" viewBox="0 0 28 16" aria-hidden><path d="M27 8H3M9 2L3 8l6 6" className="sb-ret" /></svg>
        <span>A note of <b>12 lines or less</b> comes back to your chat. Nothing else does.</span>
      </div>
    </div>
  );
}

export function SiteGate() {
  return (
    <svg viewBox="0 0 320 250" className="sb-svg" role="img" aria-label="The helper asks for a site. If the site is on your list, the browser goes. If not, it is refused with exit 3 and the browser never moves.">
      <rect x={60} y={6} width="200" height="38" rx="10" className="sb-fr" />
      <text x={160} y={30} textAnchor="middle" className="sb-tx sb-tx-ink">helper asks for a site</text>
      <path d="M160 44V70" className="sb-msg" />
      <path d="M160 70L224 108L160 146L96 108z" className="sb-fr sb-fr-ac" />
      <text x={160} y={112} textAnchor="middle" className="sb-tx sb-tx-ink">on your list?</text>
      <path d="M96 108H52V178M224 108H268V178" className="sb-msg" />
      <text x={70} y={100} className="sb-tx">yes</text>
      <text x={232} y={100} className="sb-tx sb-tx-ac">no</text>
      <rect x={2} y={180} width="120" height="62" rx="10" className="sb-fr" />
      <text x={62} y={206} textAnchor="middle" className="sb-tx sb-tx-ink">browser goes</text>
      <text x={62} y={226} textAnchor="middle" className="sb-tx">to that site</text>
      <rect x={198} y={180} width="120" height="62" rx="10" className="sb-fr sb-fr-ac" />
      <text x={258} y={206} textAnchor="middle" className="sb-tx sb-tx-ac">refused, exit 3</text>
      <text x={258} y={226} textAnchor="middle" className="sb-tx">browser stays put</text>
    </svg>
  );
}

export function Fingerprint() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2];
  let bx = 214;
  return (
    <svg viewBox="0 0 320 200" className="sb-svg" role="img" aria-label="From each page, the log keeps a short fingerprint. The words themselves are not kept.">
      <rect x={10} y={30} width="80" height="118" rx="8" className="sb-fr" />
      {[48, 62, 76, 90, 104, 118, 132].map((y) => <rect key={y} x={20} y={y} width={40 + (y % 20)} height="5" rx="2.5" className="sb-ln" />)}
      <text x={50} y={172} textAnchor="middle" className="sb-tx">the page</text>
      <path d="M94 66H196" className="sb-msg" />
      <text x={145} y={56} textAnchor="middle" className="sb-tx sb-tx-ac">fingerprint</text>
      <rect x={202} y={36} width="110" height="60" rx="8" className="sb-fr sb-fr-ac" />
      {bars.map((w, i) => { const x = bx; bx += w * 2 + 3; return <rect key={i} x={x} y={48} width={w * 2} height="26" className="sb-ac" />; })}
      <text x={257} y={88} textAnchor="middle" className="sb-tx">kept in the log</text>
      <path d="M94 124H196" className="sb-dash" />
      <text x={145} y={116} textAnchor="middle" className="sb-tx">the words</text>
      <path d="M232 110l24 24M256 110l-24 24" className="sb-x" />
      <text x={244} y={156} textAnchor="middle" className="sb-tx sb-tx-ink">not kept</text>
    </svg>
  );
}

export function ModeIcon({ own }: { own?: boolean }) {
  return (
    <svg viewBox="0 0 72 52" width="72" height="52" className="sb-svg" aria-hidden>
      <rect x={2} y={2} width="68" height="48" rx="7" className={own ? "sb-fr sb-fr-ac" : "sb-fr"} />
      <path d="M2 14h68" className="sb-rule" />
      {own ? (
        <g><circle cx={36} cy={27} r="6" className="sb-ac" /><path d="M24 44c2-7 22-7 24 0" className="sb-ret" /></g>
      ) : (
        <g><path d="M22 32c8-10 20-10 28 0c-8 10-20 10-28 0z" className="sb-ret" /><path d="M24 42L48 20" className="sb-ret" /></g>
      )}
    </svg>
  );
}
