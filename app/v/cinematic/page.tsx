import type { Metadata } from "next";
import { CinematicLanding } from "@/components/spikes/CinematicLanding";
import "@/spikes.css";

export const metadata: Metadata = {
  title: "A · Cinematic AI lab",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CinematicLanding />;
}
