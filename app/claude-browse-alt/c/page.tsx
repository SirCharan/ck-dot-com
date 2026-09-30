import type { Metadata } from "next";
import { Defs } from "@/components/claude-browse-alt/c/Figures";
import { Reveal } from "@/components/claude-browse-alt/c/Reveal";
import { Footer, Hero, How, Nav, Problem, Proof, Shift, Start, Trust } from "@/components/claude-browse-alt/c/Sections";

export const metadata: Metadata = {
  title: { absolute: "claude-browse · whitepaper" },
  description: "Give Claude a browser and keep your chat light. A helper reads the web and sends back at most 12 lines. MIT, no API key.",
  robots: { index: false, follow: false },
};

export default function WhitepaperPage() {
  return (
    <>
      <Defs />
      <Reveal />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Shift />
        <How />
        <Proof />
        <Trust />
        <Start />
      </main>
      <Footer />
    </>
  );
}
