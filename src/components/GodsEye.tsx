"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * God's Eye — an SVG isometric wireframe of a PnL / optimization landscape
 * that tilts and parallaxes on pointer. No react-three-fiber: the "3D" is a
 * static isometric projection + CSS 3D transforms, so it ships at ~zero
 * bundle cost and degrades to a still image under reduced-motion.
 */

const N = 16; // grid resolution
const CELL = 34; // iso cell half-width
const H = 150; // max peak height (px)

// Deterministic "optimization surface": a couple of gaussian bumps. Pure math,
// computed once at module load (no Date/Math.random — keeps SSR/CSR identical).
function surface(u: number, v: number): number {
  const g = (du: number, dv: number, s: number) =>
    Math.exp(-((du * du + dv * dv) / s));
  return (
    g(u - 0.12, v + 0.06, 0.07) * 1.0 +
    g(u + 0.28, v - 0.22, 0.035) * 0.55 +
    g(u + 0.05, v + 0.34, 0.05) * 0.3
  );
}

type Pt = { x: number; y: number; h: number };

const grid: Pt[][] = [];
let maxH = 0;
for (let i = 0; i < N; i++) {
  const row: Pt[] = [];
  for (let j = 0; j < N; j++) {
    const u = i / (N - 1) - 0.5;
    const v = j / (N - 1) - 0.5;
    const h = surface(u, v) * H;
    if (h > maxH) maxH = h;
    // isometric projection
    const x = (i - j) * CELL;
    const y = (i + j) * (CELL * 0.5) - h;
    row.push({ x, y, h });
  }
  grid.push(row);
}

const toLine = (pts: Pt[]) =>
  pts.map((p, k) => `${k === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

const rows = grid.map(toLine);
const cols = Array.from({ length: N }, (_, j) =>
  toLine(grid.map((r) => r[j]))
);

// brightest vertices → glowing nodes
const peaks = grid
  .flat()
  .filter((p) => p.h > maxH * 0.72)
  .slice(0, 10);

export function GodsEye() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -6]), {
    stiffness: 80,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), {
    stiffness: 80,
    damping: 18,
  });

  function onMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
      className="pointer-events-auto absolute -right-24 -top-6 hidden h-[420px] w-[680px] select-none opacity-[0.85] sm:block md:-right-16 lg:-right-8"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: reduced ? 18 : rx,
          rotateY: reduced ? -14 : ry,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <svg
          viewBox="-520 -180 1040 520"
          className={`h-full w-full overflow-visible ${reduced ? "" : "godseye-float"}`}
        >
          <defs>
            <linearGradient id="ge-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.08" />
            </linearGradient>
            <filter id="ge-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g fill="none" stroke="url(#ge-fade)" strokeWidth="1">
            {cols.map((d, i) => (
              <path key={`c${i}`} d={d} strokeOpacity={0.35} />
            ))}
            {rows.map((d, i) => (
              <path key={`r${i}`} d={d} strokeOpacity={0.5} />
            ))}
          </g>
          {peaks.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={2.4}
              fill="rgb(var(--accent))"
              filter="url(#ge-glow)"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
