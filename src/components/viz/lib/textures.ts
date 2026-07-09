import * as THREE from "three";

/**
 * A soft radial-gradient sprite texture, generated once on the client.
 * Used for additive "glow" halos and round particle points so we get a
 * bloom-like feel with zero postprocessing dependency.
 */
export function makeGlowTexture(): THREE.Texture {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0.0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.55)");
    g.addColorStop(0.5, "rgba(255,255,255,0.16)");
    g.addColorStop(1.0, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/** Token palette as THREE colors (kept in sync with src/index.css .terminal). */
export const PALETTE = {
  accent: "#3B9FE8", // cyan
  green: "#22C97A", // soft green
  pale: "#CFE8FF", // pale blue-white (restrained third body)
  bg: "#0D0D0F",
} as const;
