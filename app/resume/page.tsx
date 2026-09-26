import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { RESUME } from "@/data/resume";

export const metadata: Metadata = {
  alternates: { canonical: "/resume" },
  title: "Résumé",
  description:
    "Charandeep Kapoor, AI Product Manager at Delta Exchange. One page: shipped AI systems, experience, skills, education and certifications.",
};

export default function ResumePage() {
  return <ResumeView resume={RESUME} />;
}
