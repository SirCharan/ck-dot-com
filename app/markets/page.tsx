import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { StockyGrowth } from "@/components/StockyGrowth";
import { StockyModule } from "@/components/StockyModule";
import { BuildsList } from "@/components/BuildsList";
import { TOOLS } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/markets" },
  title: "Indian Stock Market",
  description:
    "Quant trading the Indian stock market. Stocky ran Claude-driven Zerodha trades for a year on real capital (₹16.57L profit, +110%, verified), plus a live Dhan book, voice trading, and options tooling.",
};

const marketTools = TOOLS.filter((t) => t.tags?.includes("Markets"));

export default function MarketsPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Indian stock market"
        title="Trading the Indian markets"
        lede="Stocky traded Indian F&O for a year on real capital, verified. The live Dhan book runs on the track record. Builds and tools below."
      />

      <StockyGrowth />
      <StockyModule />

      <BuildsList
        heading="Builds"
        intro="Tools and experiments built around Indian-market trading."
        tools={marketTools}
      />
    </PageShell>
  );
}
