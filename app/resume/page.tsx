import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { Experience } from "@/components/Experience";
import { Caption, MetaGutter, Rule } from "@/components/lab/Primitives";
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

/** A hairline-ruled ledger row: label left, mono detail right. */
function LedgerRow({ title, detail }: { title: string; detail: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-[rgb(var(--bone)/0.11)] py-3">
      <span className="font-serif text-[1.02rem] leading-snug text-[rgb(var(--bone)/0.9)]">
        {title}
      </span>
      <span className="num shrink-0 text-[0.8rem] text-[rgb(var(--bone-dim))]">
        {detail}
      </span>
    </li>
  );
}

export default function ResumePage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Résumé"
        title="Experience & skillset"
        lede="AI Product Manager at Delta Exchange — models meet markets."
      />

      {/* Skills — mono tabular, grouped */}
      <section className="mt-12">
        <Rule className="mb-8" />
        <MetaGutter meta={["§ 01", "skills"]}>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <Caption className="text-[rgb(var(--bone))]">{s.group}</Caption>
                <ul className="mt-2 space-y-1">
                  {s.items.map((i) => (
                    <li
                      key={i}
                      className="num text-[0.82rem] leading-relaxed text-[rgb(var(--bone)/0.78)]"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MetaGutter>
      </section>

      {/* Experience — reused journal grid */}
      <section className="mt-12">
        <Rule className="mb-8" />
        <MetaGutter meta={["§ 02", "history"]}>
          <Experience showKicker={false} />
        </MetaGutter>
      </section>

      {/* Education + certifications — mono tabular ledgers */}
      <section className="mt-12">
        <Rule className="mb-8" />
        <MetaGutter meta={["§ 03", "credentials"]}>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            <div>
              <Caption className="text-[rgb(var(--bone))]">Education & honors</Caption>
              <ul className="mt-3 border-t border-[rgb(var(--bone)/0.11)]">
                {ACADEMICS.map((a) => (
                  <LedgerRow key={a.title} title={a.title} detail={a.detail} />
                ))}
              </ul>
            </div>
            <div>
              <Caption className="text-[rgb(var(--bone))]">Certifications</Caption>
              <ul className="mt-3 border-t border-[rgb(var(--bone)/0.11)]">
                {CERTIFICATIONS.map((c) => (
                  <LedgerRow key={c.title} title={c.title} detail={c.detail} />
                ))}
              </ul>
            </div>
          </div>
        </MetaGutter>
      </section>

      <p className="mt-12 max-w-[64ch] font-serif text-[1.05rem] leading-[1.6] text-[rgb(var(--bone)/0.78)]">
        {BIO.highlights[0]}{" "}
        <a href={SITE.socials.linkedin} className="link-ink">
          Full profile on LinkedIn ↗
        </a>
      </p>
    </PageShell>
  );
}
