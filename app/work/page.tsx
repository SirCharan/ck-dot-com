import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { ProofOfWork } from "@/components/ProofOfWork";
import { Research } from "@/components/Research";
import { WorkBento } from "@/components/mc/WorkBento";

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
        lede="Live products and trading systems on real capital — not mockups, not vapor."
      />

      <section className="py-10 rule">
        <p className="kicker mb-6">Case studies</p>
        <WorkBento footerHref="/" footerLabel="← Home" />
      </section>

      <ProofOfWork />
      <Research />
    </PageShell>
  );
}
