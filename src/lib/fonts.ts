import { Bricolage_Grotesque, Newsreader, IBM_Plex_Mono } from "next/font/google";

// PHOSPHOR type system. Display / UI — Bricolage Grotesque: characterful,
// popular-not-corporate (pointedly NOT Inter / system-ui). Extreme-contrast
// weights ONLY (200 thin ↔ 800 extra-bold) — never 400/500/600 mush; bolder
// class requests resolve to 800. Var name kept as --font-grotesk so existing
// components keep resolving.
export const grotesk = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "800"],
  variable: "--font-grotesk",
  display: "swap",
});

// Prose — Newsreader, kept for the essays' reading measure.
export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Data / telemetry — IBM Plex Mono for every number, register, timestamp,
// coordinate. Computing-heritage face that fits the guidance-computer concept.
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
