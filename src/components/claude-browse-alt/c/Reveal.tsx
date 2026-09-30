"use client";

import { useEffect } from "react";

/* Opt-in scroll reveal. Without JS, or with reduced motion, nothing is hidden. */
export function Reveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".wp");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".wp-r"));
    root.classList.add("wp-js");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    const all = window.setTimeout(() => nodes.forEach((n) => n.classList.add("is-in")), 1500);
    return () => { io.disconnect(); window.clearTimeout(all); };
  }, []);
  return null;
}
