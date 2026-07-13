import type { Metadata } from "next";
import { MissionControlHero } from "@/components/MissionControlHero";
import { McHeader, McWork, McTrackRecord, McWriting, McAbout, McContact } from "@/components/mc/Sections";
import { ScrollRail } from "@/components/mc/ScrollRail";
import { AmbientBackdrop } from "@/components/mc/AmbientBackdrop";
import { ConsoleFrame } from "@/components/mc/ConsoleFrame";

export const metadata: Metadata = {
  title: "Charandeep Kapoor — AI Product Manager & Engineer",
  description:
    "Product & AI engineer at Delta Exchange. I build AI systems that trade real capital, DeFi derivatives, exchange tooling — and write about how markets work.",
  openGraph: {
    type: "website",
    url: "https://charandeepkapoor.com/",
    title: "Charandeep Kapoor — AI Product Manager & Engineer",
    description:
      "AI systems that trade real capital · DeFi derivatives · MCP tooling · writing. Product & AI engineer at Delta Exchange.",
  },
};

export default function Home() {
  return (
    <div className="mc relative min-h-dvh overflow-x-clip">
      <AmbientBackdrop />
      <ConsoleFrame />
      <ScrollRail />
      <McHeader />
      <div className="relative z-10">
        <MissionControlHero />
        <main>
          <McWork />
          <McTrackRecord />
          <McWriting />
          <McAbout />
          <McContact />
        </main>
      </div>
    </div>
  );
}
