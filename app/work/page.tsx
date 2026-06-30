import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { ProofOfWork } from "@/components/ProofOfWork";
import { Research } from "@/components/Research";

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
        lede="Live products, trading bots, and research — most of it built fast with Claude. Filter by area."
      />
      <ProofOfWork />
      <Research />
    </PageShell>
  );
}
