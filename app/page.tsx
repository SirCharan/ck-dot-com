import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StockyModule } from "@/components/StockyModule";
import { LatestEssay } from "@/components/LatestEssay";
import { Experience } from "@/components/Experience";
import { ToolStrip } from "@/components/ToolStrip";
import { Research } from "@/components/Research";
import { Bio } from "@/components/Bio";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Charandeep Kapoor — Perpetuals, Quant Finance, AI Trading",
  description:
    "Founder of Timelock Trade and creator of Stocky AI (Claude-driven Zerodha trading, 150%+ ROI). Writings on perpetuals, DeFi, and trading.",
  openGraph: {
    type: "website",
    url: "https://charandeepkapoor.com/",
    title: "Charandeep Kapoor — Perpetuals, Quant Finance, AI Trading",
    description:
      "Founder of Timelock Trade and creator of Stocky AI. Writings on perpetuals, DeFi, and trading.",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6">
        <Hero />
        <FadeIn><StockyModule /></FadeIn>
        <FadeIn><LatestEssay /></FadeIn>
        <FadeIn><Experience /></FadeIn>
        <FadeIn><ToolStrip /></FadeIn>
        <FadeIn><Research /></FadeIn>
        <FadeIn><Bio /></FadeIn>
        <Footer />
      </main>
    </>
  );
}
