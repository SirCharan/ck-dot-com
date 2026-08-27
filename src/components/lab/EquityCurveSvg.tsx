/**
 * Shared axis-aware equity curve — one SVG serving the Dhan (live) and Stocky
 * curves. The line uses preserveAspectRatio="none" (stretches to fill), so axis
 * tick labels AND point markers are rendered as HTML overlaid on the SVG
 * (absolutely positioned), NOT SVG <text>/<circle> geometry (which would be
 * horizontally distorted by the non-uniform scale). `valueOf` lets each caller
 * plot capital (base + cumulative) or P&L.
 *
 * When the series crosses zero the chart splits at the waterline: the line and
 * a quiet area tint render in `stroke` above 0 and `negativeStroke` below, and
 * the zero line is drawn solid. A non-crossing series (Stocky, hero) renders
 * exactly as the single-tone original.
 *
 * NO hooks here — server pages pass `valueOf` functions, so this must stay a
 * server-renderable component. The draw-in animation is armed by the separate
 * client wrapper <CurveReveal> (`.ecs-armed`); unwrapped, the line is simply
 * always fully drawn.
 */

type Pt = { date: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function EquityCurveSvg<T extends Pt>({
  series,
  valueOf,
  height = 200,
  stroke = "rgb(var(--accent))",
  negativeStroke = "rgb(var(--neg))",
  glow = true,
  showAxes = false,
  formatY,
  provisional = false,
  annotate = false,
  formatAnnot,
  tipLabel,
  showDayCount = false,
  zeroOrigin = false,
}: {
  series: T[];
  valueOf: (p: T) => number;
  height?: number;
  stroke?: string;
  negativeStroke?: string;
  glow?: boolean;
  showAxes?: boolean;
  formatY?: (v: number) => string;
  provisional?: boolean;
  /** Mark the deepest drawdown trough + the best single step. */
  annotate?: boolean;
  /** Formats annotation/tip values; falls back to formatY. */
  formatAnnot?: (v: number) => string;
  /** Live figure annotated at the line tip (e.g. "+1.2%"). */
  tipLabel?: string;
  showDayCount?: boolean;
  /**
   * Plot a 0 point before the first day so the line starts at the baseline. Day one's
   * own P&L is a real step, not the starting level: without this the Dhan curve opened
   * at −4.3% (2026-08-03 lost ₹42,797) as if the window began mid-drawdown.
   * The origin is NOT a trading day — the day count and month ticks ignore it.
   */
  zeroOrigin?: boolean;
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

  // Plotted arrays, optionally led by a 0 origin. Everything below indexes these, so
  // `n` — not series.length — drives the geometry; series.length stays the day count.
  const vals = series.map(valueOf);
  const dates = series.map((s) => s.date);
  if (zeroOrigin) {
    vals.unshift(0);
    dates.unshift(dates[0]);
  }
  const n = vals.length;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => plotH - ((v - min) / span) * plotH;
  const pts = vals.map((v, i) => [x(i), y(v)] as const);
  const solid = provisional ? pts.slice(0, -1) : pts;
  const line = (p: readonly (readonly [number, number])[]) =>
    p.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  const lastVal = vals[vals.length - 1];

  const crossing = min < 0 && max > 0;
  const uid = `ecs${n}-${Math.round(min * 100)}-${Math.round(max * 100)}`;
  const y0 = y(0);
  // Closed ribbon between the line and the waterline; the two clips carve it
  // into the above-zero and below-zero tints.
  const area = crossing
    ? `${line(solid)} L${solid[solid.length - 1][0].toFixed(1)},${y0.toFixed(1)} L${solid[0][0].toFixed(1)},${y0.toFixed(1)} Z`
    : "";
  const tipStroke = crossing && lastVal < 0 ? negativeStroke : stroke;
  const fmtA = formatAnnot ?? formatY ?? ((v: number) => v.toFixed(1));

  // Annotations: deepest drawdown trough (vs running peak) + best single step.
  let ddIdx = -1;
  let bestIdx = -1;
  if (annotate && vals.length >= 2) {
    let peak = vals[0];
    let worstDepth = 0;
    let bestStep = -Infinity;
    for (let i = 1; i < vals.length; i++) {
      peak = Math.max(peak, vals[i - 1]);
      const depth = vals[i] - peak;
      if (depth < worstDepth) {
        worstDepth = depth;
        ddIdx = i;
      }
      const step = vals[i] - vals[i - 1];
      if (step > bestStep) {
        bestStep = step;
        bestIdx = i;
      }
    }
    if (bestIdx === ddIdx) bestIdx = -1; // never stack two labels on one point
  }

  const yTicks = showAxes ? (crossing ? [max, 0, min] : [max, min + span / 2, min]) : [];

  // X ticks at month boundaries (index 0 + each first trading day of a month).
  const monthIdx: number[] = [];
  if (showAxes) {
    for (let i = 0; i < n; i++) {
      if (i === 0 || dates[i].slice(0, 7) !== dates[i - 1].slice(0, 7)) monthIdx.push(i);
    }
    // A years-long series would crowd the axis — thin to ≤8 boundaries.
    while (monthIdx.length > 8) {
      for (let i = monthIdx.length - 2; i > 0; i -= 2) monthIdx.splice(i, 1);
    }
  }
  const multiYear = dates[0].slice(0, 4) !== dates[n - 1].slice(0, 4);
  const monthLabel = (d: string) => {
    const m = MONTHS[Number(d.slice(5, 7)) - 1] ?? d.slice(2, 7);
    return multiYear ? `${m} ’${d.slice(2, 4)}` : m;
  };

  // Overlay geometry: % positions inside the padded plot box.
  const px = (i: number) => (i / (n - 1)) * 100;
  const plotLeft = (pct: number) => `calc(${PL}px + ${pct / 100} * (100% - ${PL + PR}px))`;

  return (
    <div className="relative w-full" style={{ height }}>
      <div className="absolute" style={{ left: PL, right: PR, top: PT, bottom: PB }}>
        <svg viewBox={`0 0 ${W} ${plotH}`} preserveAspectRatio="none" className="h-full w-full" style={{ overflow: "visible" }} aria-hidden>
          {crossing && (
            <>
              <defs>
                <clipPath id={`${uid}-above`}>
                  <rect x={-8} y={-8} width={W + 16} height={y0 + 8} />
                </clipPath>
                <clipPath id={`${uid}-below`}>
                  <rect x={-8} y={y0} width={W + 16} height={plotH - y0 + 8} />
                </clipPath>
              </defs>
              <path d={area} fill={stroke} fillOpacity="0.09" clipPath={`url(#${uid}-above)`} className="ecs-fill-in" />
              <path d={area} fill={negativeStroke} fillOpacity="0.09" clipPath={`url(#${uid}-below)`} className="ecs-fill-in" />
            </>
          )}
          {/* month gridlines */}
          {monthIdx.slice(1).map((idx) => (
            <line
              key={`g${idx}`}
              x1={x(idx)}
              y1={0}
              x2={x(idx)}
              y2={plotH}
              stroke="rgb(var(--faint) / 0.16)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* the waterline */}
          {crossing && (
            <line
              x1={0}
              y1={y0}
              x2={W}
              y2={y0}
              stroke="rgb(var(--faint) / 0.55)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {crossing ? (
            <>
              <path
                d={line(solid)}
                fill="none"
                stroke={stroke}
                strokeWidth="1.75"
                vectorEffect="non-scaling-stroke"
                clipPath={`url(#${uid}-above)`}
                pathLength={1}
                className="ecs-draw"
              />
              <path
                d={line(solid)}
                fill="none"
                stroke={negativeStroke}
                strokeWidth="1.75"
                vectorEffect="non-scaling-stroke"
                clipPath={`url(#${uid}-below)`}
                pathLength={1}
                className="ecs-draw"
              />
            </>
          ) : (
            <path
              d={line(solid)}
              fill="none"
              stroke={stroke}
              strokeWidth="1.75"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              className="ecs-draw"
              style={glow ? { filter: "drop-shadow(0 0 3px rgb(var(--accent) / 0.5))" } : undefined}
            />
          )}
          {provisional && pts.length >= 2 && (
            <path
              d={line(pts.slice(-2))}
              fill="none"
              stroke={tipStroke}
              strokeOpacity="0.6"
              strokeWidth="1.75"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {last && <circle cx={last[0]} cy={last[1]} r="3.5" fill={tipStroke} vectorEffect="non-scaling-stroke" />}
        </svg>
      </div>

      {/* live figure at the line tip */}
      {tipLabel && last && (
        <div
          className="ecs-fill-in pointer-events-none absolute font-mono text-[11px] font-semibold"
          style={{
            left: plotLeft(px(n - 1)),
            top: PT + y(lastVal) - 7,
            transform: px(n - 1) > 82 ? "translateX(calc(-100% - 9px))" : "translateX(9px)",
            color: tipStroke,
          }}
        >
          {tipLabel}
        </div>
      )}

      {/* annotations: drawdown trough + best step, as ledger marginalia */}
      {annotate &&
        [
          // trough label above its point — the trough is the lowest point, so
          // "above" is always clear of the axis row
          { idx: ddIdx, text: ddIdx >= 0 ? `low ${fmtA(vals[ddIdx])}` : "", dy: -18 },
          // best day: under the tip when it IS the tip (the filter must not
          // silently drop the story), else above unless the point is near the top
          {
            idx: bestIdx,
            text: bestIdx >= 0 ? `best day ${fmtA(vals[bestIdx] - vals[bestIdx - 1])}` : "",
            dy: bestIdx === n - 1 ? 10 : y(vals[bestIdx]) / plotH < 0.25 ? 8 : -18,
          },
        ]
          .filter((a) => a.idx >= 0 && (a.idx < n - 1 || a.idx === bestIdx))
          .map((a) => (
            <div
              key={`a${a.idx}`}
              className="ecs-fill-in pointer-events-none absolute font-mono text-[10px]"
              style={{
                left: plotLeft(px(a.idx)),
                top: PT + y(vals[a.idx]) + a.dy,
                transform: px(a.idx) > 78 ? "translateX(-100%)" : px(a.idx) < 8 ? "none" : "translateX(-50%)",
                color: "var(--p-faint, rgb(var(--faint)))",
                whiteSpace: "nowrap",
              }}
            >
              {a.text}
            </div>
          ))}
      {annotate &&
        [ddIdx, bestIdx]
          .filter((i) => i >= 0)
          .map((i) => (
            <div
              key={`m${i}`}
              className="ecs-fill-in pointer-events-none absolute"
              style={{
                left: plotLeft(px(i)),
                top: PT + y(vals[i]) - 2.5,
                width: 5,
                height: 5,
                marginLeft: -2.5,
                borderRadius: "50%",
                border: `1px solid ${vals[i] < 0 ? negativeStroke : stroke}`,
                background: "transparent",
              }}
            />
          ))}

      {/* Y axis */}
      {showAxes &&
        formatY &&
        yTicks.map((t, k) => (
          <div
            key={`y${k}`}
            className="absolute font-mono text-[10px]"
            style={{
              left: 0,
              width: PL - 6,
              textAlign: "right",
              top: PT + y(t) - 6,
              // Prefer the Proof Press token; fall back to the mc palette on
              // legacy surfaces. The bare mc --faint fails AA on press grounds.
              color: "var(--p-faint, rgb(var(--faint)))",
            }}
          >
            {t === 0 ? "0" : formatY(t)}
          </div>
        ))}
      {/* X axis — month boundaries */}
      {showAxes &&
        monthIdx.map((idx, k) => (
          <div
            key={`x${k}`}
            className="absolute font-mono text-[10px]"
            style={{
              bottom: 2,
              left: plotLeft(px(idx)),
              transform: px(idx) < 6 ? "translateX(0)" : px(idx) > 88 ? "translateX(-100%)" : "translateX(-50%)",
              color: "var(--p-faint, rgb(var(--faint)))",
            }}
          >
            {monthLabel(dates[idx])}
          </div>
        ))}
      {showAxes && showDayCount && (
        <div
          className="ecs-days absolute font-mono text-[10px]"
          style={{ bottom: 2, right: 0, color: "var(--p-faint, rgb(var(--faint)))" }}
        >
          {series.length} trading days
        </div>
      )}
    </div>
  );
}
