"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Hero3D — full-bleed three-body backdrop for the landing hero.
 *
 * Sits behind the hero copy (absolute, pointer-events-none, low z) with a
 * vignette + bottom fade so text stays readable. Protects LCP: the WebGL
 * scene is dynamically imported (ssr:false) and only mounted after first
 * paint (idle callback), and never on reduced-motion or small screens — those
 * get the static CSS gradient base that is always painted underneath.
 */
const ThreeBodyScene = dynamic(() => import("./viz/scenes/ThreeBody"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    if (reduce || small) return;

    let idleId = 0;
    let timeoutId = 0;
    const start = () => setMount(true);
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(start, 500);
    }
    return () => {
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 z-0 h-[130%] w-screen -translate-x-1/2 -translate-y-[12%] overflow-hidden"
    >
      {/* Always-painted base: deep near-black wash with a faint cyan aura. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 68% 30%, rgb(var(--accent) / 0.10), transparent 70%), radial-gradient(45% 40% at 30% 60%, rgb(var(--positive) / 0.06), transparent 72%)",
        }}
      />
      {mount && (
        <div className="absolute inset-0">
          <ThreeBodyScene />
        </div>
      )}
      {/* Readability mask: fade to bg at the bottom + left, soft vignette. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--bg) / 0.35) 0%, transparent 22%, transparent 55%, rgb(var(--bg) / 0.85) 100%), linear-gradient(90deg, rgb(var(--bg) / 0.7) 0%, transparent 42%)",
        }}
      />
    </div>
  );
}
