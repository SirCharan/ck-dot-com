"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const APART = 60; // px of travel per hand in viewBox units

/** One fist seen from the side, facing right, front edge at x=270. Mirrored for the right hand.
 *  Shapes only touch at edges (no crossing strokes): forearm, back of hand, four knuckle
 *  segments stacked on the striking face, thumb tucked underneath. */
function Fist() {
  return (
    <g className="hs-line">
      {/* forearm with a cuff line */}
      <path d="M-30 64 H164 V128 H-30 Z" />
      <path d="M40 64 V128" />
      {/* back of the hand, peeking out behind the knuckles */}
      <rect x="158" y="54" width="58" height="84" rx="12" />
      {/* four knuckle segments */}
      <rect x="208" y="48" width="62" height="24" rx="12" />
      <rect x="208" y="72" width="62" height="24" rx="12" />
      <rect x="208" y="96" width="62" height="24" rx="12" />
      <rect x="208" y="120" width="62" height="24" rx="12" />
      {/* thumb wrapped beneath the fingers */}
      <rect x="190" y="146" width="70" height="22" rx="11" />
    </g>
  );
}

export function PressHandshake({ triggerSelector }: { triggerSelector: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const build = (st: ScrollTrigger.Vars) => {
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { scrub: 0.6, ...st } });
        tl.fromTo(".hs-left", { x: -APART }, { x: 0, duration: 1 }, 0)
          .fromTo(".hs-right", { x: APART }, { x: 0, duration: 1 }, 0)
          .fromTo(".hs-burst path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18, ease: "power2.out" }, 0.82);
      };
      // Desktop: the hero holds for a short scroll while the hands close, then releases.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        build({ trigger: root.current?.closest(triggerSelector) ?? undefined, start: "top top", end: "+=55%", pin: true, anticipatePin: 1 });
      });
      // Mobile: hero is taller than the screen, so no pin. The hands close as the art rises.
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 899px)", () => {
        build({ trigger: root.current?.closest(triggerSelector) ?? undefined, start: "top top", end: () => `+=${window.innerHeight * 0.4}` });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="press-handshake">
      <svg
        ref={root}
        viewBox="0 14 540 190"
        role="img"
        aria-label="Two forearms, one labelled AI and one labelled Fintech, reaching in from either side and meeting in a fist bump"
      >
        <g className="hs-left">
          <Fist />
          <text className="hs-label" x="108" y="101" textAnchor="middle">AI</text>
        </g>
        <g className="hs-right">
          <g transform="translate(540 0) scale(-1 1)">
            <Fist />
          </g>
          <text className="hs-label" x="432" y="101" textAnchor="middle">Fintech</text>
        </g>
        <g className="hs-burst" fill="none">
          <path pathLength={1} d="M270 22 V38 M242 30 L251 43 M298 30 L289 43 M270 194 V178 M242 186 L251 173 M298 186 L289 173" />
        </g>
      </svg>
    </div>
  );
}
