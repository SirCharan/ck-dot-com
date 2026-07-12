import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { StockyGrowth } from "@/components/StockyGrowth";
import { StockyModule } from "@/components/StockyModule";
import { TOOLS } from "@/data/site";

export const metadata: Metadata = {
  title: "Indian Stock Market",
  description:
    "Quant trading the Indian stock market — Stocky (Claude-driven Zerodha trading, ₹16.57L profit / +110%, verified), a live Dhan portfolio, voice trading, and market tooling.",
};

const marketTools = TOOLS.filter((t) => t.tags?.includes("Markets"));

export default function MarketsPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Indian stock market"
        title="Trading the Indian markets"
        lede="Quant strategies and AI-driven trading on NSE — fine-tuned Claude on a custom Zerodha MCP. My live Dhan portfolio updates daily on the track record; Stocky's realized growth is below."
      />

      <StockyGrowth />
      <StockyModule />

      {marketTools.length > 0 && (
        <section className="py-10 rule">
          <p className="kicker mb-6">Builds</p>
          <ul className="divide-y divide-rule">
            {marketTools.map((tool) => (
              <li key={tool.title} className="grid grid-cols-1 items-baseline gap-2 py-5 md:grid-cols-[1fr_auto] md:gap-6">
                <div>
                  <div className="display text-lg leading-snug text-ink">{tool.title}</div>
                  <p className="mt-1 max-w-[58ch] text-sm leading-relaxed text-mute">{tool.one}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4 text-sm">
                  {tool.live && (
                    <a href={tool.live} target="_blank" rel="noopener noreferrer" className="link-ink">
                      {tool.liveLabel ?? "Live"} →
                    </a>
                  )}
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer" className="link-ink">
                      Code →
                    </a>
                  )}
                  {tool.verified && (
                    <a href={tool.verified} target="_blank" rel="noopener noreferrer" className="link-ink">
                      Verified →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
