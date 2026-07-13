import { curveValue, type Payload } from "@/lib/trackRecord";
import { inr } from "@/lib/format";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";

const pctY = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

/**
 * Hero right-plane — ck's REAL live Dhan equity curve (never the seed
 * portfolio.json), with capital (₹) / date axes and a small honest machine
 * schematic beneath. Server component (ISR via getTrackRecord in the hero).
 * Feed down or thin (<2 pts) → honest "accumulating" state, never broken.
 */

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
  const e0 = data?.meta?.e0 ?? 0;
  const grossVal = m?.grossCumulative ?? m?.cumulative ?? null;
  const asOf = data?.asOf ?? null;
  const enough = series.length >= 2;

  return (
    <div className="relative rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))] p-4">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
        <span>portfolio · Dhan · return %</span>
        <span className="flex items-center gap-2 text-accent">
          <span aria-hidden className="inline-block h-[7px] w-[7px] rounded-full bg-accent" />
          {asOf ? `as of ${asOf.slice(0, 10)}` : "accumulating"}
        </span>
      </div>

      {enough ? (
        <>
          <div className="mt-3">
            <EquityCurveSvg
              series={series}
              valueOf={(s) => (e0 > 0 ? (curveValue(s) / e0) * 100 : 0)}
              height={192}
              showAxes
              formatY={pctY}
              provisional={data?.provisional ?? false}
            />
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[12px] text-[rgb(var(--mute))]">
            {grossVal !== null && e0 > 0 && (
              <span className="text-ink">
                {grossVal >= 0 ? "+" : ""}
                {((grossVal / e0) * 100).toFixed(1)}% return
              </span>
            )}
            {grossVal !== null && (
              <span className="text-[rgb(var(--faint))]">· {grossVal >= 0 ? "+" : ""}{inr(grossVal)} gross</span>
            )}
            <span className="text-[rgb(var(--faint))]">· updates daily ~00:00 IST</span>
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
