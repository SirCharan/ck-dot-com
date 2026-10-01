import type { Metadata } from "next";
import { githubStars } from "@/lib/githubStars";
import { Motion } from "@/components/claude-browse/Client";
import { Close, Footer, Hero, How, Nav, Proof, Split, Start, Story, Trust, Example } from "@/components/claude-browse/Sections";

const DESCRIPTION =
  "Give Claude a browser and keep your chat light. A helper reads websites for you and brings back a short note. Open source, MIT, no API key.";

export const metadata: Metadata = {
  title: "claude-browse: give Claude a browser, keep your chat light",
  description: DESCRIPTION,
  alternates: { canonical: "/claude-browse" },
  openGraph: { title: "claude-browse", description: DESCRIPTION, url: "/claude-browse", type: "website" },
};

export default async function ClaudeBrowsePage() {
  const stars = await githubStars("SirCharan/claude-browse");
  return (
    <>
      <Motion />
      <Nav stars={stars} />
      <main>
        <Hero />
        <Example />
        <Story />
        <Split />
        <How />
        <Proof />
        <Trust />
        <Start />
        <Close />
      </main>
      <Footer />
    </>
  );
}
