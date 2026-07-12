import stocky from "@/data/stocky-curve.json";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";
import { inrCompact } from "@/lib/format";

/**
 * Stocky (Zerodha) track record — the fuller, verified history, shown FIRST on
 * /track-record above the still-accumulating live Dhan account. A chronological
 * timeline built from the exact dates in content/blog/stocky-ai.md + the real
 * growth curve. Numbers live in MILESTONES / stocky-curve.json headline so any
 * correction is a one-line edit. Reconciled labelling (net verified vs gross)
 * matches StockyGrowth — never "+150%".
 */

const H = stocky.headline;

type Milestone = { date: string; title: string; note: string; stat?: string };
const MILESTONES: Milestone[] = [
  {
    date: "Jun 2025",
    title: "Stocky goes live",
    note: "Fine-tuned Claude on the new MCP server and funded it ₹15L. Traded three weekly expiries — Bank Nifty (Wed), Nifty (Thu), Sensex (Fri).",
    stat: "₹15L capital",
  },
  {
    date: "Jun–Sep 2025",
    title: "Four months, zero losses",
    note: "~₹90k/month on auto-pilot across 51 trading days — felt invincible.",
    stat: "+₹3.6L · 0 losses",
  },
  {
    date: "29 Sep 2025",
    title: "First loss",
    note: "Over-trading volatile names (Eternal, Asian Paints, Tata Motors, BSE). Read the logs, tightened the universe.",
    stat: "1st loss day",
  },
  {
    date: "Oct 2025",
    title: "Adapt & rebound",
    note: "Bank Nifty's weekly expiry moved to monthly; explored Deepseek. October was a blast again.",
  },
  {
    date: "Nov 2025",
    title: "Second loss",
    note: "The run's second loss day.",
    stat: "2nd loss day",
  },
  {
    date: "Dec 2025",
    title: "Six months in",
    note: "Closed the first half-year strong.",
    stat: "₹5.32L · 212 win / 2 loss days",
  },
  {
    date: "Year one",
    title: "₹15L → ₹16.57L",
    note: "Commodities ₹14.2L + F&O ₹2.37L. 73% win, Sharpe 2.29, Sortino 5.98 — externally verified.",
    stat: "₹16.57L net · verified",
  },
];

export function StockyTrackRecord() {
  const cap = stocky.capitalInr;
  const w = stocky.window;
  return (
    <section className="pt-2" aria-label="Stocky track record">
      <p className="kicker mb-3">Stocky · Zerodha · 2025 · verified</p>

      {/* growth curve + reconciled headline */}
      <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))] p-5">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
          <span>Zerodha · realized P&amp;L · {w.start} → {w.end}</span>
          <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            verified ↗
          </a>
        </div>
        <div className="mt-4">
          <EquityCurveSvg
            series={stocky.series}
            valueOf={(p) => cap + p.cumulative}
            height={240}
            showAxes
            formatY={inrCompact}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[rgb(var(--rule))] pt-4 font-mono text-[12.5px] text-[rgb(var(--mute))]">
          <span className="text-ink">
            {H.capital} capital → <span className="text-accent">+{H.grossProfit} gross</span>
          </span>
          <span>
            ·{" "}
            <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
              {H.profit} net verified ↗
            </a>
          </span>
          <span>· {H.winRate} win</span>
          <span>· Sharpe {H.sharpe}</span>
          <span className="text-[rgb(var(--faint))]">· curve = realized P&amp;L from the Zerodha tradebook (gross)</span>
        </div>
      </div>

      {/* chronological timeline */}
      <ol className="mt-8 border-l border-[rgb(var(--rule))] pl-6">
        {MILESTONES.map((m) => (
          <li key={m.date} className="relative pb-7 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[27px] top-1.5 h-[9px] w-[9px] rounded-full bg-accent"
              style={{ boxShadow: "0 0 8px rgb(var(--accent) / 0.7)" }}
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">{m.date}</span>
              <h3 className="font-grotesk text-[1.05rem] font-semibold text-ink">{m.title}</h3>
              {m.stat && (
                <span className="font-mono text-[11px] text-[rgb(var(--faint))]">· {m.stat}</span>
              )}
            </div>
            <p className="mt-1 max-w-[62ch] text-[14px] leading-[1.55] text-[rgb(var(--mute))]">{m.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
