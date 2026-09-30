import type { Metadata } from "next";
import { Nav, Footer } from "@/components/claude-browse-alt/d/Chrome";
import { Hero } from "@/components/claude-browse-alt/d/Hero";
import { Live } from "@/components/claude-browse-alt/d/Live";
import { Weight, How, Proof, Windows, Safety, Setup, Faq, Close } from "@/components/claude-browse-alt/d/Sections";

export const metadata: Metadata = {
  title: { absolute: "claude-browse: split screen" },
  description: "Give Claude a browser and keep your chat light. A helper reads the web and sends back a short reply.",
  robots: { index: false, follow: false },
};

export default function SplitScreenPage() {
  return (
    <>
      <Live />
      <Nav />
      <main>
        <Hero />
        <Weight />
        <How />
        <Proof />
        <Windows />
        <Safety />
        <Setup />
        <Faq />
        <Close />
      </main>
      <Footer />
    </>
  );
}
