import stocky from "@/data/stocky-curve.json";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";

const pctY = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v)}%`;

/**
 * Stocky AI growth curve — the real Zerodha (PQ4709) realized-P&L account
 * curve, FIFO-matched from the F&O + commodity tradebooks, scoped to Stocky's
 * active run (Jun 2025 → Jan 2026, its best window; pre-June is manual trading).
 * Capital (₹) on Y, date on X. Headline uses the blog/verified figures.
 */

const H = stocky.headline;

export function StockyGrowth() {
  const w = stocky.window;
  return (
    <section className="py-10 rule" id="stocky">
      <p className="kicker mb-3">Stocky AI · fine-tuned Claude on a Zerodha MCP</p>
      <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))] p-5">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
          <span>Zerodha · return % · {w.start} → {w.end}</span>
          <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]">
            verified ↗
          </a>
        </div>
        <div className="mt-4">
          <EquityCurveSvg
            series={stocky.series}
            valueOf={(p) => p.pct}
            height={240}
            showAxes
            formatY={pctY}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[rgb(var(--rule))] pt-4 font-mono text-[12.5px] text-[rgb(var(--mute))]">
          <span className="text-ink">
            {H.capital} capital → <span className="text-accent">+{H.grossProfit} gross</span>
          </span>
          <span>
            ·{" "}
            <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-ink">
              {H.profit} net verified ↗
            </a>
          </span>
          <span>· {H.winRate} win</span>
          <span>· Sharpe {H.sharpe}</span>
          <span className="text-[rgb(var(--faint))]">· curve = realized P&amp;L, % of ₹15L, holding-period-smoothed (Zerodha tradebook)</span>
        </div>
      </div>
    </section>
  );
}
