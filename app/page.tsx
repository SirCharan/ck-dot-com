import type { Metadata } from "next";
import { PressHome } from "@/press/components/PressHome";
import { getTrackRecord } from "@/lib/trackRecord";
import { getDrishtiStats } from "@/press/lib/drishti";
import { pressSans, pressSerif, pressMono } from "@/press/fonts";

export const metadata: Metadata = {
  title: "Charandeep Kapoor — Proof Press",
  description:
    "Using AI to build a money printing machine. Stocky +110% verified. Drishti live. Timelock founder. Product & AI at Delta Exchange.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [dhan, drishti] = await Promise.all([getTrackRecord(), getDrishtiStats()]);
  return (
    <div className={`${pressSans.variable} ${pressSerif.variable} ${pressMono.variable}`}>
      <PressHome dhan={dhan} drishti={drishti} />
    </div>
  );
}
