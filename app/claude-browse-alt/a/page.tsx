import type { Metadata } from "next";
import { Hero, Nav } from "@/components/claude-browse-alt/a/Hero";
import { RevealRoot } from "@/components/claude-browse-alt/a/RevealRoot";
import { Closing, Faq, Footer, How, Pain, Proof, Shift, Start, Trust } from "@/components/claude-browse-alt/a/Sections";

export const metadata: Metadata = {
  title: { absolute: "claude-browse · Receipt" },
  description: "Give Claude a browser and keep your chat light. A helper reads the web and sends back 12 short lines.",
  robots: { index: false, follow: false },
};

export default function ReceiptPage() {
  return (
    <>
      <RevealRoot />
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Shift />
        <How />
        <Proof />
        <Trust />
        <Start />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
