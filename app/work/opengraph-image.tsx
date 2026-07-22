import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Work — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({ kicker: "Proof of work", title: "Things I've shipped", stat: "Live products and trading systems on real capital." });
}
