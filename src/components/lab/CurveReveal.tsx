"use client";

/**
 * Arms the EquityCurveSvg draw-in when the chart scrolls into view, by adding
 * `.ecs-armed` around server-rendered children. The line is FULLY VISIBLE by
 * default — no JS, no IntersectionObserver, reduced-motion, or jsdom all leave
 * it drawn. The class only re-runs the stroke as a draw animation.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

export function CurveReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || armed) return;
    if (typeof window.matchMedia !== "function" || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return (
    <div ref={ref} className={armed ? "ecs-armed" : undefined}>
      {children}
    </div>
  );
}
