import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Crypto, Quant Finance & Stocky AI Portfolio",
  description:
    "Portfolio of Charandeep Kapoor – creator of Stocky AI (AI-powered Zerodha trading, 100%+ ROI). Crypto, quant finance, algorithmic trading and DeFi essays, tools and research.",
  keywords: [
    "Charandeep Kapoor portfolio",
    "Stocky AI trading",
    "AI Zerodha trading bot",
    "AI trading India",
    "crypto quant portfolio",
    "algorithmic trading systems",
    "DeFi research",
    "quant finance essays",
  ],
  openGraph: {
    type: "website",
    url: "https://charandeepkapoor.com/",
    title: "Crypto, Quant Finance & Stocky AI Portfolio",
    description:
      "Explore Charandeep Kapoor’s portfolio – Stocky AI trading system, crypto & quant research, protected perps, and trading psychology essays.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourasianquant",
    creator: "@yourasianquant",
    title: "Crypto, Quant Finance & Stocky AI Portfolio",
    description:
      "Creator of Stocky AI with 100%+ ROI. Crypto, DeFi, algorithmic trading and quantitative finance portfolio by Charandeep Kapoor.",
  },
};

export default function Home() {
  return <Index />;
}
