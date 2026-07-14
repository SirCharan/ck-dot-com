"use client";

import { useId, useMemo } from "react";
import type { SeriesPt } from "@/lib/trackRecord";
import { curveValue } from "@/lib/trackRecord";

/** Hero equity curve with GSAP-ready path (stroke-dasharray draw-on via .tx-curve-line). */
export function HeroCurve({
  series,
  e0,
  provisional = false,
  height = 200,
}: {
  series: SeriesPt[];
  e0: number;
  provisional?: boolean;
  height?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `tx-fill-${uid}`;
  const glowId = `tx-glow-${uid}`;

  const geom = useMemo(() => {
    if (series.length < 2 || e0 <= 0) return null;
    const W = 800;
    const H = height;
    const PL = 48;
    const PR = 12;
    const PT = 12;
    const PB = 22;
    const plotW = W - PL - PR;
    const plotH = H - PT - PB;
    const vals = series.map((s) => (curveValue(s) / e0) * 100);
    const min = Math.min(...vals, 0);
    const max = Math.max(...vals);
    const span = max - min || 1;
    const x = (i: number) => PL + (i / (series.length - 1)) * plotW;
    const y = (v: number) => PT + plotH - ((v - min) / span) * plotH;
    const pts = series.map((_, i) => [x(i), y(vals[i])] as const);
    const solid = provisional && pts.length >= 2 ? pts.slice(0, -1) : pts;
    const lineD = solid.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
    const areaD =
      solid.length >= 2
        ? `${lineD} L${solid[solid.length - 1][0].toFixed(1)},${(PT + plotH).toFixed(1)} L${solid[0][0].toFixed(1)},${(PT + plotH).toFixed(1)} Z`
        : "";
    const last = pts[pts.length - 1];
    const yTicks = [max, min + span / 2, min];
    const xIdx = [0, Math.floor((series.length - 1) / 2), series.length - 1];
    const zeroY = min < 0 && max > 0 ? y(0) : null;
    return { W, H, PL, PR, PT, PB, plotH, lineD, areaD, last, yTicks, xIdx, zeroY, vals };
  }, [series, e0, height, provisional]);

  if (!geom) {
    return (
      <div className="tx-curve-empty" style={{ height }}>
        <span className="tx-mono">LIVE P&amp;L · ACCUMULATING</span>
      </div>
    );
  }

  const { W, H, PL, lineD, areaD, last, yTicks, xIdx, zeroY } = geom;
  const fmt = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

  return (
    <div className="tx-curve-wrap" style={{ height }}>
      <svg
        className="tx-curve-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height={H}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3dfb86" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3dfb86" stopOpacity="0" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {zeroY != null && (
          <line
            x1={PL}
            y1={zeroY}
            x2={W - 12}
            y2={zeroY}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {areaD && (
          <path className="tx-curve-area" d={areaD} fill={`url(#${gradId})`} />
        )}

        <path
          className="tx-curve-line"
          d={lineD}
          fill="none"
          stroke="#3dfb86"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          vectorEffect="non-scaling-stroke"
        />

        {last && (
          <g className="tx-curve-dot">
            <circle cx={last[0]} cy={last[1]} r="8" fill="rgba(61,251,134,0.2)" />
            <circle cx={last[0]} cy={last[1]} r="3.5" fill="#3dfb86" />
          </g>
        )}
      </svg>

      <div className="tx-curve-y tx-mono">
        {yTicks.map((t, k) => (
          <span key={k} style={{ top: `${(k / (yTicks.length - 1)) * 78 + 6}%` }}>
            {fmt(t)}
          </span>
        ))}
      </div>
      <div className="tx-curve-x tx-mono">
        {xIdx.map((idx, k) => (
          <span
            key={k}
            style={{
              left: `${(idx / (series.length - 1)) * 100}%`,
              transform: k === 0 ? "none" : k === xIdx.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            {series[idx].date.slice(2, 7)}
          </span>
        ))}
      </div>
    </div>
  );
}
