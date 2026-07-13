import stocky from "@/data/stocky-curve.json";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";

/**
 * Stocky (Zerodha) track record — the verified history, shown FIRST on
 * /track-record above the live Dhan account. A % return equity curve
 * (holding-period-smoothed, from the PQ4709 tradebook) + a chronological
 * timeline from content/blog/stocky-ai.md, with the real blog images inline.
 * Reconciled labelling (net verified vs gross) — never "+150%".
 */

const H = stocky.headline;
const pctY = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v)}%`;

type Shot = { src: string; cap: string };
type Milestone = { date: string; title: string; note: string; stat?: string; imgs?: Shot[] };
// Text + image placement mirror the blog (content/blog/stocky-ai.md). Each image
// carries a caption describing exactly what the screenshot shows, so the images
// match the text.
const MILESTONES: Milestone[] = [
  {
    date: "Jun 2025",
    title: "Stocky goes live",
    note: "Claude shipped its MCP server — a game-changer. I fine-tuned a Claude Haiku model and gave it ₹15L to trade three weekly expiries: Bank Nifty (Wed), Nifty (Thu), Sensex (Fri).",
    stat: "₹15L capital",
  },
  {
    date: "Jun–Sep 2025",
    title: "Four months, zero losses",
    note: "Made ₹3.6L by September — ~₹90k/month on auto-pilot. Four months, 51 trading days, zero losses. Felt invincible.",
    stat: "+₹3.6L · 51 days · 0 losses",
    imgs: [
      { src: "/images/stocky/stocky-pnl-jun-sep.png", cap: "F&O · P&L · Jun–Sep 2025" },
      { src: "/images/stocky/stocky-heatmap-jun-sep.png", cap: "F&O · calendar · Jun–Sep (all green)" },
    ],
  },
  {
    date: "29 Sep 2025",
    title: "First loss",
    note: "Hit my first loss on 29 September. It hurt. The logs showed I'd been over-trading volatile names — Eternal, Asian Paints, Tata Motors, BSE — so I tightened the universe.",
    stat: "1st loss day",
  },
  {
    date: "Oct 2025",
    title: "Adapt & rebound",
    note: "Bad news: Bank Nifty's weekly expiry — my bread and butter — moved to monthly. Changed a lot and explored Deepseek. October was a blast again.",
  },
  {
    date: "Nov 2025",
    title: "Second loss",
    note: "Faced the run's second loss day in November.",
    stat: "2nd loss day",
  },
  {
    date: "Dec 2025",
    title: "Six months in",
    note: "Closed the first six months of Stocky at ₹5.32L PnL — 212 profitable days, only 2 loss days.",
    stat: "₹5.32L · 2 loss days",
    imgs: [
      { src: "/images/stocky/stocky-pnl-jun-dec.png", cap: "F&O · P&L · Jun–Dec 2025" },
      { src: "/images/stocky/stocky-heatmap-jun-dec.png", cap: "F&O · calendar · Jun–Dec (2 red days)" },
    ],
  },
  {
    date: "Year one",
    title: "₹15L → ₹16.57L",
    note: "Commodities ₹14.2L + F&O ₹2.37L = ₹16.57L total. 73% win, Sharpe 2.29, Sortino 5.98 — externally verified.",
    stat: "₹16.57L net · verified",
    imgs: [
      { src: "/images/stocky/stocky-commodity-overall.png", cap: "Commodity · overall" },
      { src: "/images/stocky/stocky-fno-overall.png", cap: "F&O · overall" },
    ],
  },
];

export function StockyTrackRecord() {
  const w = stocky.window;
  return (
    <section className="pt-2" aria-label="Stocky track record">
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className="kicker">Stocky · Zerodha</span>
        <span className="rounded-full border border-[rgb(var(--accent)/0.45)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
          AI
        </span>
        <span className="rounded-full border border-[rgb(var(--faint)/0.4)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[rgb(var(--faint))]">
          retired
        </span>
      </div>
      <p className="mb-6 max-w-[64ch] font-serif text-[1.05rem] leading-[1.6] text-[rgb(var(--bone)/0.84)]">
        An AI system — a <span className="text-ink">{H.method}</span> model that read the market and placed every
        trade itself, across Indian F&amp;O and commodities. It ran {H.run} and is now retired.
      </p>

      {/* % return curve + reconciled headline */}
      <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))] p-5">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
          <span>Zerodha · return % · {w.start} → {w.end}</span>
          <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            verified ↗
          </a>
        </div>
        <div className="mt-4">
          <EquityCurveSvg series={stocky.series} valueOf={(p) => p.pct} height={240} showAxes formatY={pctY} />
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[rgb(var(--rule))] pt-4 font-mono text-[12.5px] text-[rgb(var(--mute))]">
          <span className="text-ink">
            {H.capital} → {H.endNet} <span className="text-accent">({H.roiNetPct} net)</span>
          </span>
          <span>
            ·{" "}
            <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
              {H.profit} net verified ↗
            </a>
          </span>
          <span>· {H.winRate} win</span>
          <span>· Sharpe {H.sharpe}</span>
          <span className="text-[rgb(var(--faint))]">· realized P&amp;L, % of ₹15L, holding-period-smoothed</span>
        </div>
      </div>

      {/* chronological timeline with blog images */}
      <ol className="mt-8 border-l border-[rgb(var(--rule))] pl-6">
        {MILESTONES.map((m) => (
          <li key={m.date} className="relative pb-8 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[27px] top-1.5 h-[9px] w-[9px] rounded-full bg-accent"
              style={{ boxShadow: "0 0 8px rgb(var(--accent) / 0.7)" }}
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">{m.date}</span>
              <h3 className="font-grotesk text-[1.05rem] font-semibold text-ink">{m.title}</h3>
              {m.stat && <span className="font-mono text-[11px] text-[rgb(var(--faint))]">· {m.stat}</span>}
            </div>
            <p className="mt-1 max-w-[62ch] text-[14px] leading-[1.55] text-[rgb(var(--mute))]">{m.note}</p>
            {m.imgs && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {m.imgs.map((shot) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <figure key={shot.src} className="m-0">
                    <img
                      src={shot.src}
                      alt={`Stocky — ${shot.cap}`}
                      loading="lazy"
                      className="w-full rounded-lg border border-[rgb(var(--rule))]"
                    />
                    <figcaption className="mt-1.5 font-mono text-[11px] text-[rgb(var(--faint))]">
                      {shot.cap}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
