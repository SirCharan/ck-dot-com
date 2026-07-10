"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Hero3D — the live three-body integration that fills the hero's sim band.
 *
 * Fills its (positioned) parent. Renders a static SVG trajectory plate as the
 * always-painted base; on capable clients the WebGL scene is dynamically
 * imported (ssr:false) and mounted only after first paint (idle callback),
 * replacing the plate. R3F NEVER mounts on phones (< 640px) or with
 * prefers-reduced-motion — those keep the static plate. Protects LCP.
 */
const ThreeBodyScene = dynamic(() => import("./viz/scenes/ThreeBody"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const [scene, setScene] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    if (reduce || small) return; // keep the static plate

    let idleId = 0;
    let timeoutId = 0;
    const start = () => setScene(true);
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
    <div aria-hidden className="absolute inset-0">
      {scene ? <ThreeBodyScene /> : <StaticPlate />}
    </div>
  );
}

/** Pre-rendered three-body trajectory plate (also the reduced-motion view). */
function StaticPlate() {
  return (
    <svg
      viewBox="0 0 800 460"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      data-testid="hero-static-plate"
      role="img"
      aria-label="Static three-body trajectory plate"
    >
      {/* bone */}
      <path
        d="M120 250 C 260 60, 360 300, 470 150 S 700 120, 660 240"
        fill="none"
        stroke="#E8E4DA"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      {/* amber */}
      <path
        d="M180 120 C 320 240, 300 90, 440 200 S 640 300, 700 140"
        fill="none"
        stroke="#E8A33D"
        strokeOpacity="0.7"
        strokeWidth="1.4"
      />
      {/* slate */}
      <path
        d="M140 300 C 300 180, 420 260, 520 90 S 660 60, 620 200"
        fill="none"
        stroke="#6B8AAF"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <circle cx="660" cy="240" r="3.2" fill="#E8E4DA" />
      <circle cx="700" cy="140" r="3.6" fill="#E8A33D" />
      <circle cx="620" cy="200" r="3.2" fill="#6B8AAF" />
    </svg>
  );
}
