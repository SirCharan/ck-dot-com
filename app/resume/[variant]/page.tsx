import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeView } from "@/components/ResumeView";
import { loadResume } from "@/data/resume";

type Variant = {
  title: string;
  description: string;
  index: boolean;
  pdfHref?: string;
  alt?: { label: string; href: string };
};

// Allowlist. Each key maps to content/resume-<key>.md. Anything else 404s.
const VARIANTS: Record<string, Variant> = {
  // Unlisted until the [[TODO]] slots in content/resume-vc.md are filled.
  vc: {
    title: "Résumé · Venture",
    description: "Charandeep Kapoor, operator-investor in AI and fintech.",
    index: false,
  },
  eng: {
    title: "Résumé · Engineering",
    description:
      "Charandeep Kapoor, senior backend engineer for trading systems. One page: live-money systems, experience, skills, education and certifications.",
    index: true,
    pdfHref: "/charandeep-kapoor-eng-resume.pdf",
    alt: { label: "Product version", href: "/resume" },
  },
  // Private, tailored copy. Not linked from anywhere.
  trackk: {
    title: "Résumé · Engineering",
    description: "Charandeep Kapoor, senior backend engineer for trading systems.",
    index: false,
  },
};

type Props = { params: Promise<{ variant: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  const v = VARIANTS[variant];
  if (!v) return {};
  return {
    title: v.title,
    description: v.description,
    ...(v.index
      ? { alternates: { canonical: `/resume/${variant}` } }
      : { robots: { index: false, follow: false } }),
  };
}

export default async function VariantResumePage({ params }: Props) {
  const { variant } = await params;
  const v = VARIANTS[variant];
  if (!v) notFound();
  return <ResumeView resume={loadResume(`resume-${variant}`)} pdfHref={v.pdfHref} alt={v.alt} />;
}
