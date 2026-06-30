"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";
import portfolio from "@/data/portfolio.json";

/**
 * Equity-curve thread — the real portfolio curve drawn down the left margin as
 * the page scrolls (pathLength tied to scroll progress). It drifts right as the
 * value grows: the page's growth made literal. Decorative; hidden on mobile and
 * fully drawn under reduced-motion.
 */

const VBW = 120;
const VBH = 1000;
const PAD = 14;

const curve = portfolio.equityCurve;
const vals = curve.map((p) => p.value);
const lo = Math.min(...vals);
const hi = Math.max(...vals);
const span = hi - lo || 1;

const d = curve
  .map((p, i) => {
    const x = PAD + ((p.value - lo) / span) * (VBW - PAD * 2);
    const y = (i / (curve.length - 1)) * VBH;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(" ");

export function EquityThread() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-2 top-0 z-[1] hidden h-screen w-[120px] lg:block xl:left-6"
    >
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="thread" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.05" />
            <stop offset="50%" stopColor="rgb(var(--accent))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(var(--positive))" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* faint full track */}
        <path d={d} fill="none" stroke="rgb(var(--rule))" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* drawn-on-scroll curve */}
        <motion.path
          d={d}
          fill="none"
          stroke="url(#thread)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: reduced ? 1 : scrollYProgress }}
        />
      </svg>
    </div>
  );
}
