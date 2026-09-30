"use client";

import { useEffect } from "react";

/* Content is visible by default. After mount, off-screen blocks opt in to a 0.4 s reveal. */
export function RevealRoot() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ra .ra-rv"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("ra-rv-in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add("ra-rv-in"); return; }
      el.classList.add("ra-rv-armed");
      io.observe(el);
    });
    const all = window.setTimeout(() => els.forEach((el) => el.classList.add("ra-rv-in")), 1500);
    return () => { io.disconnect(); window.clearTimeout(all); };
  }, []);
  return null;
}
