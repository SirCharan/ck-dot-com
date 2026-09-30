import type { Metadata } from "next";
import { githubStars } from "@/lib/githubStars";
import { Nav } from "@/components/claude-browse/Nav";
import { Hero } from "@/components/claude-browse/Hero";
import { Reveal } from "@/components/claude-browse/Reveal";
import {
  Bento,
  Close,
  Engines,
  Faq,
  Footer,
  Install,
  Ledger,
  Measured,
  Proof,
  WorksWith,
} from "@/components/claude-browse/Sections";

const DESCRIPTION =
  "claude-browse is an open-source Claude Code plugin. A Sonnet sub-agent does the browsing so the main model reads a summary of 12 lines or fewer.";

export const metadata: Metadata = {
  title: "claude-browse, browse the web without filling your context",
  description: DESCRIPTION,
  alternates: { canonical: "/claude-browse" },
  openGraph: {
    title: "claude-browse",
    description: DESCRIPTION,
    url: "/claude-browse",
    type: "website",
  },
};

export default async function ClaudeBrowsePage() {
  const stars = await githubStars("SirCharan/claude-browse");
  return (
    <>
      <Reveal />
      <Nav stars={stars} />
      <main>
        <Hero />
        <WorksWith />
        <Proof />
        <Engines />
        <Measured />
        <Ledger />
        <Bento />
        <Install />
        <Faq />
        <Close />
      </main>
      <Footer />
    </>
  );
}
