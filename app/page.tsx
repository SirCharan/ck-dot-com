import type { Metadata } from "next";
import { TenXHome } from "@/components/tenx/TenXHome";
import { getTrackRecord } from "@/lib/trackRecord";
import "@/tenx.css";

export const metadata: Metadata = {
  title: "Charandeep Kapoor — AI that trades real markets",
  description:
    "AI Product Manager & Engineer at Delta Exchange. Stocky +110% verified. Drishti live signals. Timelock founder. Real capital, real systems.",
  robots: { index: false, follow: false },
};

export default async function Home() {
  const dhan = await getTrackRecord();
  return <TenXHome dhan={dhan} />;
}
