import type { ReactNode } from "react";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./alt.css";

const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--ss-font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ss-font-mono", display: "swap" });

export default function SplitLayout({ children }: { children: ReactNode }) {
  return <div className={`ss ${sans.variable} ${mono.variable}`}>{children}</div>;
}
