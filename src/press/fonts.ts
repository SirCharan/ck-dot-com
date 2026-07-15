import { Instrument_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";

export const pressSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--press-sans",
  display: "swap",
});

export const pressSerif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--press-serif",
  display: "swap",
});

export const pressMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--press-mono",
  display: "swap",
});
