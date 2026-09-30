import type { Metadata } from "next";
import { Motion } from "@/components/claude-browse-alt/b/Client";
import { Close, Footer, Hero, How, Nav, Proof, Start, Story, Trust } from "@/components/claude-browse-alt/b/Sections";

export const metadata: Metadata = {
  title: "claude-browse: Storyboard",
  description: "Give Claude a browser and keep your chat light. A helper reads the web and hands back a short note.",
  robots: { index: false, follow: false },
};

export default function StoryboardPage() {
  return (
    <>
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Story />
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
