import type { Metadata } from "next";
import { KineticLanding } from "@/components/spikes/KineticLanding";
import "@/spikes.css";

export const metadata: Metadata = {
  title: "B · Maximal kinetic",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KineticLanding />;
}
