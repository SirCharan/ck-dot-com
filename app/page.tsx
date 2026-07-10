import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LivePortfolio } from "@/components/LivePortfolio";
import { Experience } from "@/components/Experience";
import { ProofOfWork } from "@/components/ProofOfWork";
import { Research } from "@/components/Research";
import { LatestEssay } from "@/components/LatestEssay";
import { Bio } from "@/components/Bio";
import { Footer } from "@/components/Footer";
import { EquityThread } from "@/components/EquityThread";
import { GrainOverlay } from "@/components/GrainOverlay";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Charandeep Kapoor — AI Product, Perpetuals & Quant Trading",
  description:
    "AI Product Manager at Delta Exchange. I build perpetuals and AI-driven trading systems — and run Claude-powered bots trading real capital across crypto and Indian equities.",
  openGraph: {
    type: "website",
    url: "https://charandeepkapoor.com/",
    title: "Charandeep Kapoor — AI Product, Perpetuals & Quant Trading",
    description:
      "AI Product Manager at Delta Exchange. Perpetuals, AI trading systems, and Claude-driven bots across crypto and Indian equities.",
  },
};

export default function Home() {
  return (
    <div className="terminal relative min-h-dvh overflow-x-clip">
      <div className="terminal-grid" />
      <GrainOverlay />
      <EquityThread />
      <Header />
      <main className="relative z-10 mx-auto max-w-3xl px-6">
        <Hero />
        <LivePortfolio />
        <FadeIn>
          <Experience />
        </FadeIn>
        <ProofOfWork />
        <FadeIn>
          <Research />
        </FadeIn>
        <FadeIn>
          <LatestEssay />
        </FadeIn>
        <FadeIn>
          <Bio />
        </FadeIn>
        <Footer />
      </main>
    </div>
  );
}
