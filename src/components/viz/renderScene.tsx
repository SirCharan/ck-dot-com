"use client";

import dynamic from "next/dynamic";
import type { VizVariant } from "./Viz3D";

/**
 * Scene mapper for Viz3D. Each R3F scene is dynamically imported with
 * `ssr: false` so no WebGL/three code runs during server render and each
 * scene ships as its own lazy chunk (only fetched when it actually mounts,
 * i.e. in-view, motion-allowed, non-mobile — see Viz3D). Passed as the
 * default `renderScene` to Viz3D so every call site is auto-wired.
 */
const OrbitsScene = dynamic(() => import("./scenes/ThreeBody"), { ssr: false });
const SpiralScene = dynamic(() => import("./scenes/GoldenSpiral"), {
  ssr: false,
});
const FractalScene = dynamic(() => import("./scenes/Fractal"), { ssr: false });

export function renderScene(variant: VizVariant): React.ReactNode {
  switch (variant) {
    case "orbits":
      return <OrbitsScene />;
    case "spiral":
      return <SpiralScene />;
    case "fractal":
      return <FractalScene />;
    default:
      return null;
  }
}
