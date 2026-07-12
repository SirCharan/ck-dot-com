"use client";

import { useEffect, useState } from "react";

/**
 * A thin neon progress rail down the left margin (lg+ only — it lives in the
 * otherwise-empty gutter). Fills with scroll position, with a soft glow for
 * strong neon-on-black contrast. prefers-reduced-motion → shown full and
 * static. Decorative + aria-hidden, so JS-off simply shows the empty track.
 */
export function ScrollRail() {
  const [p, setP] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-4 top-1/2 z-20 hidden h-[44vh] w-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-[rgb(var(--rule))] lg:block xl:left-8"
    >
      <div
        className="w-full rounded-full bg-accent transition-[height] duration-150 ease-out"
        style={{ height: `${Math.max(4, p * 100)}%`, boxShadow: "0 0 8px rgb(var(--accent) / 0.7)" }}
      />
    </div>
  );
}
