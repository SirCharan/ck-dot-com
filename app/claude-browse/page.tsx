import type { Metadata } from "next";
import { githubStars } from "@/lib/githubStars";
import { Nav } from "@/components/claude-browse/Nav";
import { Hero } from "@/components/claude-browse/Hero";
import { Reveal } from "@/components/claude-browse/Reveal";
import {
  Close,
  Faq,
  Footer,
  HowItWorks,
  Install,
  Measured,
  Problem,
  Proof,
  Safe,
  Windows,
  WorksWith,
} from "@/components/claude-browse/Sections";

const DESCRIPTION =
  "Give Claude Code a browser and keep your chat light. A helper reads websites for you and brings back a short answer. Open source, MIT, no API key.";

export const metadata: Metadata = {
  title: "claude-browse: give Claude Code a browser, keep your chat light",
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
        <Problem />
        <Proof />
        <HowItWorks />
        <Measured />
        <Windows />
        <Safe />
        <Install />
        <Faq />
        <Close />
      </main>
      <Footer />
    </>
  );
}
