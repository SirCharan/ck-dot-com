import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "claude-browse, Claude Code plugin by Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({
    kicker: "Open source · Claude Code plugin",
    title: "claude-browse",
    stat: "Give Claude Code a browser. Keep your chat light.",
  });
}
