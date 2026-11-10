import { ogResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { deriveDhanStats, getTrackRecord } from "@/lib/trackRecord";

export const runtime = "nodejs";
export const alt = "Dhan track record — Charandeep Kapoor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  const { retPctStr } = deriveDhanStats(await getTrackRecord());
  return ogResponse({ kicker: "DHAN · LIVE", title: "The live book", stat: retPctStr });
}
