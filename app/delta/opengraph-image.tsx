import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Delta Exchange — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({ kicker: "Delta Exchange", title: "AI Product Manager", stat: "Perps, options, and the AI stack at India's largest crypto derivatives exchange." });
}
