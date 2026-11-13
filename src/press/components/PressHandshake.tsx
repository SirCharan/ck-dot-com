"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const APART = 120; // px of travel per hand in viewBox units

/** One fist, drawn facing right with its front edge at x=316. Mirrored for the right hand. */
function Fist() {
  return (
    <g className="hs-line">
      {/* forearm with a cuff line */}
      <path d="M-80 100 H236 V172 H-80 Z" />
      <path d="M96 100 V172" />
      {/* back of the hand */}
      <rect x="226" y="90" width="64" height="92" rx="16" />
      {/* four curled fingers, stacked on the striking face */}
      <rect x="262" y="90" width="54" height="24" rx="12" />
      <rect x="262" y="111" width="54" height="24" rx="12" />
      <rect x="262" y="132" width="54" height="24" rx="12" />
      <rect x="262" y="153" width="54" height="24" rx="12" />
      {/* thumb folded across the lower fingers */}
      <rect x="234" y="150" width="62" height="26" rx="13" />
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
        viewBox="40 52 560 160"
        role="img"
        aria-label="Two forearms, one labelled AI and one labelled Fintech, reaching in from either side and meeting in a fist bump"
      >
        <g className="hs-left">
          <Fist />
          <text className="hs-label" x="162" y="141" textAnchor="middle">AI</text>
        </g>
        <g className="hs-right">
          <g transform="translate(640 0) scale(-1 1)">
            <Fist />
          </g>
          <text className="hs-label" x="478" y="141" textAnchor="middle">Fintech</text>
        </g>
        <g className="hs-burst" fill="none">
          <path pathLength={1} d="M320 66 V80 M296 74 L303 86 M344 74 L337 86 M320 190 V204 M296 198 L303 186 M344 198 L337 186" />
        </g>
      </svg>
    </div>
  );
}
