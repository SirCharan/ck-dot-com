"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * CrosshairCursor — an ephemeris-style crosshair that replaces the cursor over
 * its POSITIONED parent only (drop it inside a `relative` element). A spring-
 * followed amber ring tracks the pointer with a live mono x,y readout
 * (normalized to -1..1). transform + opacity only.
 *
 * Confined to the parent element (listeners bound to `parentElement`); it never
 * leaks to the rest of the page. Hidden on touch/coarse pointers and under
 * prefers-reduced-motion (renders nothing → the native cursor is untouched).
 */
export function CrosshairCursor({ label }: { label?: string }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [coarse, setCoarse] = useState(true); // assume touch until proven otherwise
  const [active, setActive] = useState(false);
  const [coord, setCoord] = useState({ nx: 0, ny: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    setCoarse(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (reduced || coarse) return;
    const el = rootRef.current?.parentElement;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      x.set(px);
      y.set(py);
      setCoord({
        nx: r.width ? (px / r.width) * 2 - 1 : 0,
        ny: r.height ? -((py / r.height) * 2 - 1) : 0,
      });
    };
    const onEnter = () => {
      setActive(true);
      el.style.cursor = "none";
    };
    const onLeave = () => {
      setActive(false);
      el.style.cursor = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.style.cursor = "";
    };
  }, [reduced, coarse, x, y]);

  if (reduced || coarse) return null;

  const fmt = (n: number) => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(2)}`;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-testid="crosshair-cursor"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: sx, y: sy }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* ring */}
          <div
            className="h-8 w-8 rounded-full"
            style={{ boxShadow: "0 0 0 1px rgb(var(--amber) / 0.75)" }}
          />
          {/* ticks */}
          <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-[rgb(var(--amber)/0.75)]" />
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-[rgb(var(--amber)/0.75)]" />
          {/* live readout */}
          <span className="num absolute left-7 top-4 whitespace-nowrap text-[10px] leading-none tracking-tight text-[rgb(var(--bone-dim))]">
            {label ? `${label} · ` : ""}x {fmt(coord.nx)} y {fmt(coord.ny)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
