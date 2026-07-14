"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Count / type-in effect for hero proof tiles. Displays final `display` string. */
export function CountStat({
  display,
  label,
  sub,
  href,
  delay = 0,
}: {
  display: string;
  label: string;
  sub: string;
  href: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? display : "");
  const ref = useRef<HTMLAnchorElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (reduce || done.current) {
      setText(display);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (done.current) return;
      done.current = true;

      // Numeric count-up when leading number exists
      const m = display.match(/^([+$₹$]?)(-?[\d.]+)(.*)$/);
      if (m) {
        const prefix = m[1] ?? "";
        const num = parseFloat(m[2]);
        const suffix = m[3] ?? "";
        const isInt = !m[2].includes(".");
        const start = performance.now();
        const dur = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = num * eased;
          setText(
            `${prefix}${isInt ? Math.round(v) : v.toFixed(2)}${suffix}`,
          );
          if (t < 1) requestAnimationFrame(tick);
          else setText(display);
        };
        window.setTimeout(() => requestAnimationFrame(tick), delay);
        return;
      }
      setText(display);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [display, delay, reduce]);

  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer" className="tx-stat">
      <strong className="tx-mono">{text || "\u00a0"}</strong>
      <span className="tx-mono">{label}</span>
      <small>{sub}</small>
    </a>
  );
}
