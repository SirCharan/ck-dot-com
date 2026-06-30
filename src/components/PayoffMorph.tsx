"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Payoff-curve morph — an SVG options/perp P&L line that draws on scroll and
 * morphs between strategy shapes when you tap the pills. The "perps PM" motif,
 * and a section divider in one. Pure SVG + Framer (interpolates the `d` string
 * because every shape samples the same number of points).
 */

const N = 48;
const W = 400;
const Z = 100; // zero-P&L baseline (y)
const clamp = (y: number) => Math.max(8, Math.min(192, y));

type Shape = "call" | "straddle" | "perp";

function build(fn: (xn: number) => number): string {
  let d = "";
  for (let k = 0; k < N; k++) {
    const t = k / (N - 1);
    const x = t * W;
    const xn = (t - 0.5) * 2; // -1 .. 1
    const y = clamp(fn(xn));
    d += `${k === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
}

const SHAPES: Record<Shape, string> = {
  call: build((xn) => Z + 30 - Math.max(xn, 0) * 130),
  straddle: build((xn) => Z + 46 - Math.abs(xn) * 128),
  perp: build((xn) => Z - xn * 82),
};

const META: { key: Shape; label: string; caption: string }[] = [
  { key: "call", label: "Long call", caption: "Capped downside, convex upside — pay premium, keep the right tail." },
  { key: "straddle", label: "Straddle", caption: "Long volatility — profit on a big move either way, bleed if it sits still." },
  { key: "perp", label: "Perp", caption: "Linear, symmetric exposure — the building block I work on at Delta." },
];

export function PayoffMorph() {
  const reduced = useReducedMotion();
  const [shape, setShape] = useState<Shape>("call");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const caption = META.find((m) => m.key === shape)!.caption;

  return (
    <section className="py-10 md:py-14 rule" id="payoffs">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">Payoffs</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Payoff shape">
          {META.map((m) => (
            <button
              key={m.key}
              type="button"
              className="pill"
              data-active={shape === m.key}
              aria-pressed={shape === m.key}
              onClick={() => setShape(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="rounded-lg border border-rule bg-[rgb(var(--surface-1))] p-4 md:p-6">
        <svg viewBox={`0 0 ${W} 200`} className="h-44 w-full md:h-56" role="img" aria-label={`${shape} payoff diagram`}>
          {/* zero P&L axis + strike guide */}
          <line x1="0" y1={Z} x2={W} y2={Z} stroke="rgb(var(--rule))" strokeWidth="1" />
          <line x1={W / 2} y1="6" x2={W / 2} y2="194" stroke="rgb(var(--rule))" strokeWidth="1" strokeDasharray="3 5" />
          <text x="6" y={Z - 6} fill="rgb(var(--mute))" fontSize="9" fontFamily="var(--font-mono)">P&amp;L 0</text>
          <text x={W / 2 + 5} y="16" fill="rgb(var(--mute))" fontSize="9" fontFamily="var(--font-mono)">strike</text>
          <motion.path
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              d: SHAPES[shape],
              pathLength: reduced || inView ? 1 : 0,
              opacity: reduced || inView ? 1 : 0,
            }}
            transition={{
              pathLength: { duration: 1, ease: "easeInOut" },
              opacity: { duration: 0.4 },
              d: { duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] },
            }}
          />
        </svg>
        <p className="mt-3 text-sm text-mute">{caption}</p>
      </div>
    </section>
  );
}
