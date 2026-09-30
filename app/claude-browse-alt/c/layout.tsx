import type { ReactNode } from "react";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./alt.css";

const mono = JetBrains_Mono({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-wp-mono", display: "swap" });
const sans = IBM_Plex_Sans({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-wp-sans", display: "swap" });

export default function WhitepaperLayout({ children }: { children: ReactNode }) {
  return <div className={`wp ${mono.variable} ${sans.variable}`}>{children}</div>;
}
