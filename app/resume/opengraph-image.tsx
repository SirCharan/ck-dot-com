import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "About — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({ kicker: "About", title: "AI Product Manager & Engineer", stat: "Delta Exchange. I ship systems that trade real capital." });
}
