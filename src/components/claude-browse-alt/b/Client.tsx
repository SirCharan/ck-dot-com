"use client";

import { useEffect, useState } from "react";
import { INSTALL } from "@/components/claude-browse/data";

export function CopyButton({ text = INSTALL, label = "Copy install command", small }: { text?: string; label?: string; small?: boolean }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={`sb-btn sb-btn-fill${small ? " sb-btn-sm" : ""}`}
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          window.setTimeout(() => setOk(false), 1800);
        } catch {
          /* clipboard blocked: the text is printed on the page */
        }
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {ok ? <path d="M5 12l5 5L20 7" /> : <><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>}
      </svg>
      {ok ? "Copied to clipboard" : label}
    </button>
  );
}

/* Opts into motion after mount. Without JS, or with reduced motion, every element stays static and visible. */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sb");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("sb-js");
    const reveals = Array.from(root.querySelectorAll<HTMLElement>(".sb-r"));
    const rio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("sb-in"); rio.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    reveals.forEach((n) => rio.observe(n));
    /* Only scenes mostly on screen loop, so one ambient loop runs at a time. */
    const sio = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("sb-play", e.intersectionRatio >= 0.6)),
      { threshold: [0, 0.6, 1] },
    );
    root.querySelectorAll(".sb-scene").forEach((n) => sio.observe(n));
    const t = window.setTimeout(() => reveals.forEach((n) => n.classList.add("sb-in")), 2500);
    return () => { rio.disconnect(); sio.disconnect(); window.clearTimeout(t); };
  }, []);
  return null;
}
