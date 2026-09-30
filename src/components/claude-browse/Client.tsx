"use client";

import { useEffect, useState } from "react";
import { INSTALL } from "@/components/claude-browse/data";

export function CopyButton({ text = INSTALL, label = "Copy install command", small }: { text?: string; label?: string; small?: boolean }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={`cb-btn cb-btn-fill${small ? " cb-btn-sm" : ""}`}
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

const EASE = (t: number) => 1 - Math.pow(1 - t, 3);

/* Counts from 0 to the printed value, keeping its commas and suffix, and ends on the exact text. */
function countUp(el: HTMLElement) {
  const final = el.textContent ?? "";
  const m = final.match(/^([\d,]+)(.*)$/);
  if (!m) return;
  const target = Number(m[1].replace(/,/g, ""));
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min((now - t0) / 900, 1);
    el.textContent = p < 1 ? Math.round(target * EASE(p)).toLocaleString("en-US") + m[2] : final;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Opts into motion after mount. Without JS, or with reduced motion, every element stays static and visible. */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".cb");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reveals = Array.from(root.querySelectorAll<HTMLElement>(".cb-r"));
    root.classList.add("is-js");
    let fired = false;
    const show = (n: Element) => {
      if (n.classList.contains("cb-in")) return;
      n.classList.add("cb-in");
      n.querySelectorAll<HTMLElement>(".cb-count").forEach(countUp);
    };
    const rio = new IntersectionObserver(
      (es) => {
        fired = true;
        /* Siblings that arrive together fan in 60 ms apart. */
        const seen = new Map<Element | null, number>();
        es.filter((e) => e.isIntersecting).forEach(({ target: n }) => {
          const k = seen.get(n.parentElement) ?? 0;
          seen.set(n.parentElement, k + 1);
          (n as HTMLElement).style.setProperty("--st", `${k * 60}ms`);
          show(n);
          rio.unobserve(n);
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((n) => rio.observe(n));
    /* Only scenes mostly on screen loop, so one ambient loop runs at a time. */
    const sio = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("cb-play", e.intersectionRatio >= 0.6)),
      { threshold: [0, 0.6, 1] },
    );
    root.querySelectorAll(".cb-scene").forEach((n) => sio.observe(n));
    /* Safety net: if the observer never reports, or content sits above the fold line, show it after 1.5 s. */
    const t = window.setTimeout(() => {
      reveals.forEach((n) => show(n));
    }, 1500);
    const nav = root.querySelector(".cb-nav");
    const onScroll = () => nav?.classList.toggle("is-solid", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { rio.disconnect(); sio.disconnect(); window.clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);
  return null;
}
