import stocky from "@/data/stocky-curve.json";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";
import { inrCompact } from "@/lib/format";

/**
 * Stocky AI growth curve — the real Zerodha (PQ4709) realized-P&L account
 * curve, FIFO-matched from the F&O + commodity tradebooks, scoped to Stocky's
 * active run (Jun 2025 → Jan 2026, its best window; pre-June is manual trading).
 * Capital (₹) on Y, date on X. Headline uses the blog/verified figures.
 */

const H = stocky.headline;

export function StockyGrowth() {
  const cap = stocky.capitalInr;
  const w = stocky.window;
  return (
    <section className="py-10 rule" id="stocky">
      <p className="kicker mb-3">Stocky AI · fine-tuned Claude on a Zerodha MCP</p>
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
            {H.capital} → <span className="text-accent">{H.profit} profit</span>
          </span>
          <span>· {H.winRate} win</span>
          <span>· Sharpe {H.sharpe}</span>
          <span className="text-[rgb(var(--faint))]">· Indian F&amp;O + commodities · gross</span>
        </div>
      </div>
    </section>
  );
}
