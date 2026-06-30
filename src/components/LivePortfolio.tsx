import portfolio from "@/data/portfolio.json";

/**
 * Live Portfolio — hand-rolled SVG equity curve + recent Dhan trades.
 * Reads src/data/portfolio.json (seed until the daily Dhan refresh runs:
 * `npm run pull:portfolio`). Same SVG visual language as the equity thread,
 * no Recharts dependency.
 */

function inr(n: number): string {
  const lakh = n / 100000;
  if (lakh >= 100) {
    const cr = lakh / 100;
    return `₹${cr % 1 ? cr.toFixed(2) : cr.toFixed(0)}Cr`;
  }
  return `₹${lakh % 1 ? lakh.toFixed(1) : lakh.toFixed(0)}L`;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

const W = 600;
const H = 200;
const PAD = 6;

function buildChart() {
  const c = portfolio.equityCurve;
  const vals = c.map((p) => p.value);
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const span = hi - lo || 1;
  const pts = c.map((p, i) => {
    const x = (i / (c.length - 1)) * W;
    const y = PAD + (1 - (p.value - lo) / span) * (H - PAD * 2);
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  return { line, area, last: pts[pts.length - 1] };
}

export function LivePortfolio() {
  const p = portfolio;
  const { line, area, last } = buildChart();
  const up = p.growthPct >= 0;
  const dayUp = p.dayChangePct >= 0;
  const isLive = p.source === "live";

  return (
    <section id="portfolio" className="py-10 md:py-14 rule">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">Live portfolio · Dhan</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-mute">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-[rgb(var(--positive))]" : "bg-[rgb(var(--mute))]"}`}
            aria-hidden
          />
          {isLive ? `Live · as of ${fmtDate(p.asOf)}` : "Preview · illustrative sample"}
        </span>
      </div>

      <div className="rounded-lg border border-rule bg-[rgb(var(--surface-1))] p-5 md:p-6">
        {!isLive && (
          <p className="mb-4 rounded-md border border-rule bg-[rgb(var(--surface-2))] px-3 py-2 text-xs text-mute">
            Illustrative preview — numbers below are sample data. The live Dhan
            feed updates this daily once connected.
          </p>
        )}
        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-mute">Portfolio value</div>
            <div className="num text-3xl font-semibold text-ink md:text-4xl" aria-live="polite">
              {inr(p.currentValue)}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-mute">Total growth</div>
            <div
              className={`num text-2xl font-semibold ${up ? "text-[rgb(var(--positive))]" : "text-[rgb(var(--neg))]"}`}
            >
              {up ? "▲" : "▼"} {up ? "+" : ""}
              {p.growthPct.toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-mute">Today</div>
            <div
              className={`num text-lg font-medium ${dayUp ? "text-[rgb(var(--positive))]" : "text-[rgb(var(--neg))]"}`}
            >
              {dayUp ? "▲" : "▼"} {dayUp ? "+" : ""}
              {p.dayChangePct.toFixed(1)}%
            </div>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="mt-5 h-40 w-full md:h-48"
          role="img"
          aria-label={`Equity curve, ${up ? "up" : "down"} ${p.growthPct.toFixed(1)} percent since inception`}
        >
          <defs>
            <linearGradient id="lp-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--positive))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="rgb(var(--positive))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#lp-fill)" />
          <path d={line} fill="none" stroke="rgb(var(--positive))" strokeWidth="2" strokeLinejoin="round" />
          <circle cx={last[0]} cy={last[1]} r="3.5" fill="rgb(var(--positive))" />
        </svg>

        <div className="mt-5">
          <div className="mb-2 text-xs uppercase tracking-wide text-mute">Recent trades</div>
          {isLive ? (
            <table className="num w-full text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
              <thead>
                <tr className="text-left text-xs text-mute">
                  <th className="py-1.5 font-medium">Date</th>
                  <th className="py-1.5 font-medium">Instrument</th>
                  <th className="py-1.5 font-medium">Side</th>
                  <th className="py-1.5 text-right font-medium">P&amp;L</th>
                </tr>
              </thead>
              <tbody>
                {p.recentTrades.map((t, i) => {
                  const win = t.pnl >= 0;
                  return (
                    <tr key={i} className="border-t border-rule">
                      <td className="py-1.5 text-mute">{fmtDate(t.date)}</td>
                      <td className="py-1.5 text-ink">{t.symbol}</td>
                      <td className="py-1.5 text-mute">{t.side}</td>
                      <td
                        className={`py-1.5 text-right ${win ? "text-[rgb(var(--positive))]" : "text-[rgb(var(--neg))]"}`}
                      >
                        {win ? "▲" : "▼"} {win ? "+" : "−"}₹{Math.abs(t.pnl).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="rounded-md border border-dashed border-rule px-3 py-4 text-sm text-mute">
              Live trades will appear here once the Dhan feed is connected.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
