import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { CASE_STUDIES } from "@/data/site";

export const runtime = "nodejs";
export const alt = "Case study — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  return ogResponse({
    kicker: cs?.kicker ?? "Proof of work",
    title: cs?.title ?? "Case study",
    stat: cs?.tagline,
  });
}
