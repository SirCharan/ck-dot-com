import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/PageShell";
import { ProofOfWork } from "@/components/ProofOfWork";
import { Research } from "@/components/Research";
import { CASE_STUDIES } from "@/data/site";

export const metadata: Metadata = {
  title: "Proof of Work",
  description:
    "Live projects and research by Charandeep Kapoor — AI trading systems, MCP servers, options tooling, and protocol research across crypto and Indian equities.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Proof of work"
        title="Things I've shipped"
        lede="Live products, trading bots, and research — most of it built fast with Claude."
      />

      <section className="py-10 rule">
        <p className="kicker mb-6">Case studies</p>
        <ul className="divide-y divide-rule">
          {CASE_STUDIES.map((cs) => (
            <li key={cs.slug} className="grid grid-cols-1 items-baseline gap-2 py-5 md:grid-cols-[1fr_auto] md:gap-6">
              <div>
                <Link href={`/work/${cs.slug}`} className="display text-lg leading-snug text-ink hover:text-accent">
                  {cs.title}
                </Link>
                <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-mute">{cs.tagline}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                {cs.links[0] && (
                  <a href={cs.links[0].href} target="_blank" rel="noopener noreferrer" className="link-ink">
                    Live →
                  </a>
                )}
                <Link href={`/work/${cs.slug}`} className="link-ink">Details →</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ProofOfWork />
      <Research />
    </PageShell>
  );
}
