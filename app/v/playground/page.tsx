import type { Metadata } from "next";
import { PlaygroundLanding } from "@/components/spikes/PlaygroundLanding";
import "@/spikes.css";

export const metadata: Metadata = {
  title: "C · Playful engineer",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PlaygroundLanding />;
}
