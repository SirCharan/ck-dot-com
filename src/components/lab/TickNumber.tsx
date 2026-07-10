"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Parse a display string into an animatable numeric part plus its
 * (un-animated) prefix/suffix. Non-numeric strings fall through with
 * `target = NaN` so the caller renders them verbatim.
 *
 *   "150%+"  → { prefix:"",  target:150,  decimals:0, suffix:"%+", grouped:false }
 *   "$7.3M"  → { prefix:"$", target:7.3,  decimals:1, suffix:"M",  grouped:false }
 *   "1,000+" → { prefix:"",  target:1000, decimals:0, suffix:"+",  grouped:true  }
 */
export function parseNumeric(v: string) {
  const m = v.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!m) {
    return { prefix: "", num: "", target: NaN, decimals: 0, suffix: v, grouped: false };
  }
  const num = m[2];
  const clean = num.replace(/,/g, "");
  const dot = clean.indexOf(".");
  return {
    prefix: m[1],
    num,
    target: parseFloat(clean),
    decimals: dot === -1 ? 0 : clean.length - dot - 1,
    suffix: m[3],
    grouped: /,/.test(num),
  };
}

/**
 * TickNumber — a tabular-nums value that springs to its target on mount /
 * value-change with ZERO layout shift: the settled string is rendered as an
 * invisible width-reserving placeholder while the animating value floats over
 * it. Prefix/suffix (e.g. "$", "%+", "M") are preserved; the value settles to
 * the exact provided string. Reduced-motion → the final string, instantly.
 */
export function TickNumber({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, num, target, decimals, suffix, grouped } = parseNumeric(value);

  const settled = `${prefix}${num}${suffix}`;
  const fmt = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });

  const spring = useSpring(0, { stiffness: 90, damping: 20, mass: 1 });
  // SSR-deterministic: render the settled digits on the server AND the first
  // client render (no dependence on useReducedMotion, which differs across the
  // hydration boundary → mismatch). The count-up starts only after mount.
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(num);

  useMotionValueEvent(spring, "change", (v) => setDisplay(fmt.format(v)));

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || Number.isNaN(target)) return;
    if (reduced) {
      setDisplay(num);
      return;
    }
    if (inView) spring.set(target);
  }, [mounted, inView, target, reduced, num, spring]);

  const cls = `num relative inline-block tabular-nums ${className}`.trim();

  // Non-numeric ("150%+" still parses; only truly number-free strings hit this).
  if (Number.isNaN(target)) {
    return (
      <span ref={ref} data-testid="tick-number" className={cls}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} data-testid="tick-number" className={cls}>
      {/* accessible + width-reserving copies (settled value) */}
      <span className="sr-only">{settled}</span>
      <span aria-hidden className="invisible">
        {settled}
      </span>
      {/* the animating value, floated over the reserved box */}
      <span aria-hidden className="absolute inset-0">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
