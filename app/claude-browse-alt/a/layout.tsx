import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./alt.css";

const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ra-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ra-mono", display: "swap" });

export default function ReceiptLayout({ children }: { children: ReactNode }) {
  return <div className={`ra ${sans.variable} ${mono.variable}`}>{children}</div>;
}
