"use client";

import { useEffect } from "react";

/* Scroll reveal. Content is visible without JS; this only opts in after mount. */
export function Reveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".cb");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".cb-r"));
    root.classList.add("is-js");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    const all = window.setTimeout(() => nodes.forEach((n) => n.classList.add("revealed")), 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(all);
    };
  }, []);
  return null;
}
