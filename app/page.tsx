import type { Metadata } from "next";
import { PressHome } from "@/press/components/PressHome";
import { getTrackRecord } from "@/lib/trackRecord";
import { pressSans, pressSerif, pressMono } from "@/press/fonts";

export const metadata: Metadata = {
  title: "Charandeep Kapoor — Proof Press",
  description:
    "Using AI to build a money printing machine. Stocky +110% verified. Drishti live. Timelock founder. Product & AI at Delta Exchange.",
  robots: { index: false, follow: false },
};

export default async function Home() {
  const dhan = await getTrackRecord();
  return (
    <div className={`${pressSans.variable} ${pressSerif.variable} ${pressMono.variable}`}>
      <PressHome dhan={dhan} />
    </div>
  );
}
