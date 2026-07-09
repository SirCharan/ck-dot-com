import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { Experience } from "@/components/Experience";
import { Viz3D } from "@/components/viz/Viz3D";
import { ACADEMICS, CERTIFICATIONS, BIO, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Charandeep Kapoor — AI Product Manager at Delta Exchange. Experience, skills, education and certifications.",
};

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI / LLM",
    items: [
      "Claude (Opus/Sonnet)",
      "Prompt & context engineering",
      "Model Context Protocol (MCP)",
      "RAG / vector search",
      "Agentic tool-calling",
      "Cost-aware model routing",
    ],
  },
  {
    group: "Markets & quant",
    items: [
      "Perpetual futures & options",
      "Options pricing (Black-Scholes)",
      "Delta-neutral strategies",
      "Backtesting & signal research",
      "Risk management",
    ],
  },
  {
    group: "Build",
    items: [
      "Next.js / React / TypeScript",
      "Python",
      "Solidity / DeFi",
      "Vercel / Cloudflare",
      "Redis / vector DBs",
    ],
  },
  {
    group: "Product",
    items: ["0→1 product", "Team leadership", "GTM & growth", "Protocol design"],
  },
];

export default function ResumePage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Résumé"
        title="Experience & skillset"
        lede="AI Product Manager at Delta Exchange. Founder, quant, and builder at the intersection of models and markets."
      />

      <div className="mb-10">
        <Viz3D variant="spiral" height={280} />
      </div>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="kicker mb-5">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.group}>
              <h3 className="mb-3 text-sm font-medium text-ink">{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span key={i} className="pill num text-xs">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience (reused) */}
      <Experience />

      {/* Education + certs */}
      <section className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="kicker mb-5">Education & honors</h2>
          <ul className="space-y-3">
            {ACADEMICS.map((a) => (
              <li key={a.title} className="flex justify-between gap-4">
                <span className="text-ink/90">{a.title}</span>
                <span className="num shrink-0 text-sm text-mute">{a.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="kicker mb-5">Certifications</h2>
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c.title} className="flex justify-between gap-4">
                <span className="text-ink/90">{c.title}</span>
                <span className="num shrink-0 text-sm text-mute">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-12 text-sm text-mute">
        {BIO.highlights[0]}{" "}
        <a href={SITE.socials.linkedin} className="text-accent hover:underline">
          Full profile on LinkedIn ↗
        </a>
      </p>
    </PageShell>
  );
}
