import type { ReactNode } from "react";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { PressShell } from "@/press/components/PressShell";
import { pressSans, pressSerif, pressMono } from "@/press/fonts";
import "./claude-browse.css";

const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-cb-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-cb-sans", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-cb-mono", display: "swap" });

export default function ClaudeBrowseLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${pressSans.variable} ${pressSerif.variable} ${pressMono.variable}`}>
      <PressShell bare>
        <div className={`cb ${serif.variable} ${sans.variable} ${mono.variable}`}>{children}</div>
      </PressShell>
    </div>
  );
}
