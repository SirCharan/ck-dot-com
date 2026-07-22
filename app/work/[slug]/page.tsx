import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/data/site";
import { CaseStudy } from "@/components/CaseStudy";

const stripEm = (s: string) => s.replace(/\s*—\s*/g, ": ");

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${stripEm(cs.title)}: ${stripEm(cs.kicker)}`,
    description: stripEm(cs.tagline),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const cs = CASE_STUDIES[i];
  const n = CASE_STUDIES.length;
  const prev = n > 1 ? CASE_STUDIES[(i - 1 + n) % n] : null;
  const next = n > 1 ? CASE_STUDIES[(i + 1) % n] : null;
  return <CaseStudy data={cs} prev={prev} next={next} />;
}
