import type { ReactNode } from "react";
import { Instrument_Serif, Inter, IBM_Plex_Mono } from "next/font/google";
import "./claude-browse.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cb-serif",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-cb-sans", display: "swap" });
const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-cb-mono",
  display: "swap",
});

export default function ClaudeBrowseLayout({ children }: { children: ReactNode }) {
  return <div className={`cb ${serif.variable} ${sans.variable} ${mono.variable}`}>{children}</div>;
}
