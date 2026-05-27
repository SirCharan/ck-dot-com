import pnl from "@/data/stocky-pnl.json";

function formatAsOf(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCapital(inr: number): string {
  if (!inr) return "";
  const lakh = inr / 100000;
  if (lakh >= 100) {
    const cr = lakh / 100;
    return `₹${cr % 1 ? cr.toFixed(1) : cr.toFixed(0)}Cr`;
  }
  return `₹${lakh % 1 ? lakh.toFixed(1) : lakh.toFixed(0)}L`;
}

export function StockyModule() {
  return (
    <section className="py-10 md:py-14 rule">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <p className="kicker">Stocky · verified P&L</p>
        <a
          href={pnl.verifiedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink text-sm"
        >
          Sensibull verified →
        </a>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6 md:gap-10">
        <div>
          <div className="num text-3xl md:text-4xl font-medium" style={{ color: 'rgb(var(--positive))' }}>
            +{pnl.totalReturnPct.toFixed(1)}%
          </div>
          <div className="mt-1 text-sm text-mute">Total return</div>
        </div>
        <div>
          <div className="num text-3xl md:text-4xl font-medium text-ink">
            {pnl.sharpe.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-mute">Sharpe</div>
        </div>
        <div>
          <div className="num text-3xl md:text-4xl font-medium text-ink">
            {pnl.winRatePct}%
          </div>
          <div className="mt-1 text-sm text-mute">Win rate</div>
        </div>
      </div>

      <p className="mt-6 text-sm text-mute">
        Updated {formatAsOf(pnl.asOf)} · {formatCapital(pnl.capitalInr)} capital · {pnl.tenureMonths} months · Claude 3.5 Sonnet on Zerodha via MCP
      </p>
    </section>
  );
}
