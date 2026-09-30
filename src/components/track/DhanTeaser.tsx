import Link from "next/link";
import { EquityCurveSvg } from "@/components/lab/EquityCurveSvg";
import { CurveReveal } from "@/components/lab/CurveReveal";
import { curveValue, deriveDhanStats, pctY, type Payload } from "@/lib/trackRecord";

export function DhanTeaser({ data }: { data: Payload | null }) {
  const { e0, inrSub, retPctStr, sharpeStr, ddStr, asOfStr } = deriveDhanStats(data);
  const tickets = [
    { value: retPctStr, label: "Return", sub: inrSub },
    { value: sharpeStr, label: "Sharpe", sub: "" },
    { value: ddStr, label: "Max drawdown", sub: "" },
  ];
  return (
    <section className="press-section">
      <h2>Dhan, the live book</h2>
      <div className="press-ledger-head press-mono" style={{ maxWidth: "34rem" }}>
        <span>Dhan · live</span>
        <span>algorithmic</span>
      </div>
      <p className="press-section-sub press-serif">
        Rule-based algo. No LLM. Rebuilt daily from the Dhan trade book.
      </p>

      <div className="press-tickets">
        {tickets.map((k) => (
          <div key={k.label} className="press-ticket">
            <div className="press-ticket-val press-mono">{k.value}</div>
            <div className="press-ticket-label press-mono">{k.label}</div>
            {k.sub && <div className="press-ticket-sub press-mono">{k.sub}</div>}
          </div>
        ))}
      </div>

      <div className="press-ledger" style={{ marginTop: "2rem" }}>
        {data && data.series.length >= 2 ? (
          <CurveReveal>
            <EquityCurveSvg
              series={data.series}
              valueOf={(s) => (e0 > 0 ? (curveValue(s) / e0) * 100 : 0)}
              height={160}
              showAxes
              formatY={pctY}
              glow={false}
              provisional={data.provisional}
              zeroOrigin
            />
          </CurveReveal>
        ) : (
          <div
            className="press-mono"
            style={{
              height: 120,
              display: "grid",
              placeItems: "center",
              border: "1px dashed var(--p-line)",
              borderRadius: 6,
              color: "var(--p-mute)",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            accumulating from live data
          </div>
        )}
        <div className="press-ledger-foot press-mono">
          <span>As of {asOfStr}</span>
        </div>
      </div>

      <p className="press-serif" style={{ marginTop: "1.5rem" }}>
        <Link className="link-ink" href="/dhan">
          Full Dhan record: daily calendar, monthly table, ratios →
        </Link>
      </p>
    </section>
  );
}
