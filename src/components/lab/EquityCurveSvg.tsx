/**
 * Shared axis-aware equity curve — one SVG serving the Dhan (live) and Stocky
 * curves. The line uses preserveAspectRatio="none" (stretches to fill), so axis
 * tick labels are rendered as HTML overlaid on the SVG (absolutely positioned),
 * NOT SVG <text> (which would be horizontally distorted by the non-uniform
 * scale). `valueOf` lets each caller plot capital (base + cumulative) or P&L.
 */

type Pt = { date: string };

export function EquityCurveSvg<T extends Pt>({
  series,
  valueOf,
  height = 200,
  stroke = "rgb(var(--accent))",
  glow = false,
  showAxes = false,
  formatY,
  provisional = false,
}: {
  series: T[];
  valueOf: (p: T) => number;
  height?: number;
  stroke?: string;
  glow?: boolean;
  showAxes?: boolean;
  formatY?: (v: number) => string;
  provisional?: boolean;
}) {
  if (series.length < 2) {
    return (
      <div
        className="grid place-items-center rounded-lg border border-dashed border-[rgb(var(--accent)/0.3)]"
        style={{ height }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[rgb(var(--mute))]">
          accumulating — need ≥2 points
        </span>
      </div>
    );
  }

  const PL = showAxes ? 54 : 8;
  const PB = showAxes ? 20 : 8;
  const PT = 8;
  const PR = 10;
  const plotH = Math.max(1, height - PT - PB);
  const W = 800;

  const vals = series.map(valueOf);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i: number) => (i / (series.length - 1)) * W;
  const y = (v: number) => plotH - ((v - min) / span) * plotH;
  const pts = series.map((s, i) => [x(i), y(valueOf(s))] as const);
  const solid = provisional ? pts.slice(0, -1) : pts;
  const line = (p: readonly (readonly [number, number])[]) =>
    p.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];

  const yTicks = showAxes ? [max, min + span / 2, min] : [];
  const xIdx = showAxes ? [0, Math.floor((series.length - 1) / 2), series.length - 1] : [];

  return (
    <div className="relative w-full" style={{ height }}>
      <div className="absolute" style={{ left: PL, right: PR, top: PT, bottom: PB }}>
        <svg viewBox={`0 0 ${W} ${plotH}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          {min < 0 && max > 0 && (
            <line
              x1={0}
              y1={y(0)}
              x2={W}
              y2={y(0)}
              stroke="rgb(var(--faint) / 0.4)"
              strokeWidth="1"
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            />
          )}
          <path
            d={line(solid)}
            fill="none"
            stroke={stroke}
            strokeWidth="1.75"
            vectorEffect="non-scaling-stroke"
            style={glow ? { filter: "drop-shadow(0 0 3px rgb(var(--accent) / 0.5))" } : undefined}
          />
          {provisional && pts.length >= 2 && (
            <path
              d={line(pts.slice(-2))}
              fill="none"
              stroke={stroke}
              strokeOpacity="0.6"
              strokeWidth="1.75"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {last && <circle cx={last[0]} cy={last[1]} r="3.5" fill={stroke} vectorEffect="non-scaling-stroke" />}
        </svg>
      </div>

      {/* Y axis — capital (₹) */}
      {showAxes &&
        formatY &&
        yTicks.map((t, k) => (
          <div
            key={`y${k}`}
            className="absolute font-mono text-[10px] text-[rgb(var(--faint))]"
            style={{ left: 0, width: PL - 6, textAlign: "right", top: PT + y(t) - 6 }}
          >
            {formatY(t)}
          </div>
        ))}
      {/* X axis — date */}
      {showAxes &&
        xIdx.map((idx, k) => (
          <div
            key={`x${k}`}
            className="absolute font-mono text-[10px] text-[rgb(var(--faint))]"
            style={{
              bottom: 2,
              left: `calc(${PL}px + ${idx / (series.length - 1)} * (100% - ${PL + PR}px))`,
              transform:
                k === 0 ? "translateX(0)" : k === xIdx.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            {series[idx].date.slice(2, 7)}
          </div>
        ))}
    </div>
  );
}
