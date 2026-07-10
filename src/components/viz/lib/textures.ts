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

/** Ephemeris palette as THREE colors (kept in sync with src/index.css .terminal). */
export const PALETTE = {
  bone: "#E8E4DA", // body 1 — paper ink
  amber: "#E8A33D", // body 2 — signal
  slate: "#6B8AAF", // body 3 — data
  void: "#0B0B0D",
  // legacy aliases (any older consumer)
  accent: "#E8A33D",
  green: "#7FB88A",
  pale: "#E8E4DA",
  bg: "#0B0B0D",
} as const;
