"use client";

import { useEffect, useRef, useState } from "react";
import { renderScene as defaultRenderScene } from "./renderScene";

/**
 * Viz3D — the perf-safe wrapper for every WebGL/canvas visual on the site.
 *
 * Contract (enforced here so individual scenes don't have to re-implement it):
 *  - Never renders during SSR (mounts only after hydration).
 *  - Only mounts the heavy scene when scrolled into view (IntersectionObserver),
 *    and unmounts when far offscreen — keeps the GPU idle and protects LCP.
 *  - Respects `prefers-reduced-motion`: shows the static fallback, never the scene.
 *  - Falls back to `fallback` on small screens when `mobile="fallback"`.
 *
 * Phase 1 fills `renderScene` with the real react-three-fiber scenes
 * (3-body orbits, golden spiral, Mandelbrot). Until then it renders the
 * ambient placeholder so all routes build and lay out correctly.
 */
export type VizVariant = "orbits" | "spiral" | "fractal";

export function Viz3D({
  variant,
  className = "",
  height = 420,
  mobile = "fallback",
  fallback,
  renderScene = defaultRenderScene,
}: {
  variant: VizVariant;
  className?: string;
  height?: number;
  mobile?: "fallback" | "scene";
  fallback?: React.ReactNode;
  /** Provided by Phase 1; when absent the ambient placeholder is used. */
  renderScene?: (variant: VizVariant) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [allowScene, setAllowScene] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small =
      typeof window !== "undefined" && window.innerWidth < 640;
    setAllowScene(!reduce && !(small && mobile === "fallback"));
  }, [mobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showScene = allowScene && inView && !!renderScene;

  return (
    <div
      ref={ref}
      className={`viz3d relative overflow-hidden rounded-xl border border-rule ${className}`}
      style={{ height }}
      aria-hidden="true"
      data-variant={variant}
    >
      {showScene ? renderScene!(variant) : fallback ?? <VizPlaceholder variant={variant} />}
    </div>
  );
}

/** Static, dependency-free ambient fallback (also the reduced-motion view). */
function VizPlaceholder({ variant }: { variant: VizVariant }) {
  return (
    <div className="absolute inset-0">
      <div className="viz-blob viz-blob-a" />
      <div className="viz-blob viz-blob-b" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="num text-xs uppercase tracking-[0.2em] text-ink/30">
          {variant}
        </span>
      </div>
    </div>
  );
}
