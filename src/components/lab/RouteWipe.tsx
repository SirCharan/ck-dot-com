"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * RouteWipe — a GSAP orbital route transition. On every route change a panel
 * wipes across the viewport (cover, then uncover) while a masked amber
 * trajectory line draws through it. Mounted once at the layout root so it
 * survives route swaps. Total ≤0.8s, transform-driven.
 *
 * Hard-disabled under prefers-reduced-motion: the component renders NOTHING
 * (no overlay in the DOM, no animation) — navigation is instant.
 */
export function RouteWipe() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;
      // Skip the wipe on initial load; only animate real navigations.
      if (first.current) {
        first.current = false;
        return;
      }
      const el = rootRef.current;
      if (!el) return;
      const panel = el.querySelector<HTMLElement>("[data-wipe-panel]");
      const line = el.querySelector<SVGPathElement>("[data-wipe-line]");
      if (!panel) return;

      gsap.set(el, { autoAlpha: 1 });
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => gsap.set(el, { autoAlpha: 0 }),
      });
      tl.fromTo(panel, { xPercent: -100 }, { xPercent: 0, duration: 0.34 });
      const len = line?.getTotalLength?.() ?? 0;
      if (line && len) {
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(line, { strokeDashoffset: 0, duration: 0.3 }, "-=0.2");
      }
      tl.to(panel, { xPercent: 100, duration: 0.34 }, "+=0.02");
    },
    { dependencies: [pathname, enabled], scope: rootRef },
  );

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-testid="route-wipe"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      <div
        data-wipe-panel
        className="absolute inset-0 -translate-x-full bg-[rgb(var(--ink-void-2))]"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            data-wipe-line
            d="M0,72 C24,18 52,92 100,26"
            fill="none"
            stroke="rgb(var(--amber))"
            strokeOpacity="0.55"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
