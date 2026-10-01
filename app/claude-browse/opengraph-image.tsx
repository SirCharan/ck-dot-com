import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Claude Browse: 6,400 tokens read, 90 tokens kept";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({
    kicker: "Open source · Claude Code plugin",
    title: "Claude Browse",
    stat: "Give Claude a browser. Keep your chat light. 6,400 tokens read. 90 tokens kept.",
  });
}
