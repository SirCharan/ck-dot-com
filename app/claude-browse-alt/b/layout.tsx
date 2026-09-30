import type { ReactNode } from "react";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./alt.css";

const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-sb-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sb-sans", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-sb-mono", display: "swap" });

export default function StoryboardLayout({ children }: { children: ReactNode }) {
  return <div className={`sb ${serif.variable} ${sans.variable} ${mono.variable}`}>{children}</div>;
}
