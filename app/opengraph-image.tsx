import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Charandeep Kapoor — AI Product Manager & quant";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return ogResponse({ title: "Charandeep Kapoor", stat: "Using AI to build a money printing machine." });
}
