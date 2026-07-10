import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";

// Ephemeris tri-role type system.
// Display / labels — Space Grotesk (tight, left-aligned).
export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

// Prose — Newsreader, the notebook voice (optical sizing on by default).
export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Data — JetBrains Mono for every number, ticker, timestamp, coordinate, equation.
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
