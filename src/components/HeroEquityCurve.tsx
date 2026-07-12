import { curveValue, type SeriesPt, type Payload } from "@/lib/trackRecord";
import { inr } from "@/lib/format";

/**
 * Hero right-plane — ck's REAL live Dhan equity curve (never the seed
 * portfolio.json), rendered as a neon line on dark, with a small honest
 * schematic strip of the machine beneath it. Server component (ISR via
 * getTrackRecord). When the live feed is down or the sample is thin (<2 settled
 * days) it renders an honest "accumulating" state — never a broken panel.
 */

function Curve({ series, provisional }: { series: SeriesPt[]; provisional: boolean }) {
  const W = 800;
  const H = 200;
  const P = 10;
  const ys = series.map(curveValue);
  const min = Math.min(...ys, 0);
  const max = Math.max(...ys, 0);
  const span = max - min || 1;
  const x = (i: number) => P + (i / (series.length - 1)) * (W - 2 * P);
  const y = (v: number) => H - P - ((v - min) / span) * (H - 2 * P);
  const pts = series.map((s, i) => [x(i), y(curveValue(s))] as const);
  const solid = provisional ? pts.slice(0, -1) : pts;
  const line = (p: readonly (readonly [number, number])[]) =>
    p.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const zeroY = y(0);
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-48 w-full" preserveAspectRatio="none" aria-hidden>
      <line x1={P} y1={zeroY} x2={W - P} y2={zeroY} stroke="rgb(var(--faint) / 0.5)" strokeWidth="1" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
      <path d={line(solid)} fill="none" stroke="rgb(var(--accent))" strokeWidth="1.75" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0 0 3px rgb(var(--accent) / 0.5))" }} />
      {provisional && pts.length >= 2 && (
        <path d={line(pts.slice(-2))} fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.6" strokeWidth="1.75" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      )}
      {last && <circle cx={last[0]} cy={last[1]} r="3.5" fill="rgb(var(--accent))" vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}

const NODES = ["features", "claude", "verdict", "executor"];

function Schematic() {
  const W = 400;
  const H = 46;
  const bw = 70;
  const gap = (W - NODES.length * bw) / (NODES.length - 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" aria-hidden>
      {NODES.map((_, i) => {
        const x0 = i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x0} y={8} width={bw} height={26} rx={2} fill="none" stroke="rgb(var(--accent) / 0.55)" strokeWidth="1" />
            {i < NODES.length - 1 && (
              <line x1={x0 + bw} y1={21} x2={x0 + bw + gap} y2={21} stroke="rgb(var(--accent) / 0.4)" strokeWidth="1" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function HeroEquityView({ data }: { data: Payload | null }) {
  const series = data?.series ?? [];
  const m = data?.metrics;
  const grossVal = m?.grossCumulative ?? m?.cumulative ?? null;
  const retPct = m?.annualizedReturnPct ?? null;
  const asOf = data?.asOf ?? null;
  const enough = series.length >= 2;

  return (
    <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))] p-4">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
        <span>portfolio · Dhan · live</span>
        <span className="flex items-center gap-2 text-accent">
          <span aria-hidden className="inline-block h-[7px] w-[7px] rounded-full bg-accent" />
          {asOf ? `as of ${asOf.slice(0, 10)}` : "accumulating"}
        </span>
      </div>

      {enough ? (
        <>
          <div className="mt-3">
            <Curve series={series} provisional={data?.provisional ?? false} />
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[12px] text-[rgb(var(--mute))]">
            {grossVal !== null && (
              <span className="text-ink">
                {grossVal >= 0 ? "+" : ""}
                {inr(grossVal)}
              </span>
            )}
            {retPct !== null && <span>· {retPct >= 0 ? "+" : ""}{retPct.toFixed(1)}% ann.</span>}
            <span className="text-[rgb(var(--faint))]">· real capital, gross of charges</span>
          </div>
        </>
      ) : (
        <div className="mt-3 grid h-40 place-items-center rounded-lg border border-dashed border-[rgb(var(--accent)/0.3)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgb(var(--mute))]">
            live P&amp;L · accumulating from Dhan
          </span>
        </div>
      )}

      <div className="mt-4 border-t border-[rgb(var(--rule))] pt-4">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[rgb(var(--faint))]">
          the machine
        </div>
        <Schematic />
        <div className="grid grid-cols-4 font-mono text-[9px] uppercase tracking-[0.08em] text-[rgb(var(--faint))]">
          {NODES.map((n) => (
            <span key={n} className="text-center">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
