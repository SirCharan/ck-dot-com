import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Writings — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({ kicker: "Writings", title: "Essays on markets & building", stat: "Protected perps, trading psychology, AI, and building systems." });
}
