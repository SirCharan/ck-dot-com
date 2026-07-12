"use client";

import { useEffect, useState } from "react";

/**
 * Mission-Control side decor — bolder neon treatment in BOTH empty gutters (lg+
 * only). Each side: a base rail + a scroll-progress fill + a bright neon "comet"
 * flowing downward (CSS keyframe, staggered per side), over a faint drifting
 * hexagon field so the margins read as ambient/textured, not empty. All
 * aria-hidden + decorative; prefers-reduced-motion → static full rail, no flow
 * (handled in CSS). See .mc-rail / .mc-comet / .mc-hex in src/index.css.
 */

function Rail({ side, p, comet2 }: { side: "l" | "r"; p: number; comet2?: boolean }) {
  return (
    <div aria-hidden className={`mc-rail mc-rail-${side} hidden lg:block`}>
      <div className="mc-rail-fill" style={{ height: `${Math.max(3, p * 100)}%` }} />
      <div className={`mc-comet ${comet2 ? "mc-comet-2" : ""}`} />
    </div>
  );
}

export function ScrollRail() {
  const [p, setP] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="mc-hex mc-hex-l hidden lg:block" />
      <div aria-hidden className="mc-hex mc-hex-r hidden lg:block" />
      <Rail side="l" p={p} />
      <Rail side="r" p={p} comet2 />
    </>
  );
}
