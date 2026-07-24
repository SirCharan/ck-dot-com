import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Indian Stock Market — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({ kicker: "Indian markets", title: "Stocky: +110% verified", stat: "Claude-driven Zerodha trading on real capital — Sharpe 2.29, 73% win rate." });
}
