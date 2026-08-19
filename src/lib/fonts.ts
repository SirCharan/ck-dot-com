import { Hanken_Grotesk, Newsreader, IBM_Plex_Mono } from "next/font/google";

// Mission-Control type system (ground-up redesign, replaces the Ephemeris trio).
// Display / UI — Hanken Grotesk, a warm humanist grotesque (pointedly NOT
// Inter / Space Grotesk). Var name kept as --font-grotesk so existing
// components keep resolving while the site migrates.
// preload: false on all three — these are applied by the ROOT layout, so every
// route (including the Proof Press home, which renders none of them) was
// preloading them and starving the fonts it does render. They still load on
// demand wherever --font-* is actually matched; only the preload hint is gone.
export const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-grotesk",
  display: "swap",
  preload: false,
});

// Prose — Newsreader, kept for the essays' reading measure.
export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

// Data / telemetry — IBM Plex Mono for every number, register, timestamp,
// coordinate. Computing-heritage face that fits the guidance-computer concept.
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
