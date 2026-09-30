"use client";

import { useEffect } from "react";

/* Opts the page into motion after mount. Without JS, or with reduced motion, every scene shows its final state. */
export function Live() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ss");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("ss-live");
    if (!("IntersectionObserver" in window)) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".ss-r"));
    root.classList.add("ss-js");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ss-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
