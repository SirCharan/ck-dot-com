import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { loadResume } from "@/data/resume";

// Unlisted until the [[TODO]] slots in content/resume-vc.md are filled.
export const metadata: Metadata = {
  title: "Résumé · Venture",
  description: "Charandeep Kapoor, operator-investor in AI and fintech.",
  robots: { index: false, follow: false },
};

export default function VcResumePage() {
  return <ResumeView resume={loadResume("resume-vc")} />;
}
