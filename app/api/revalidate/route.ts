import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * On-demand ISR revalidation for /track-record, /dhan and / (default). Hit by the zerodha-tg-bot daily
 * writer after it persists the day's record, so the page reflects new data within
 * minutes instead of waiting for the 24h ISR window. Secret-guarded.
 *   GET /api/revalidate?secret=<REVALIDATE_SECRET>[&path=/track-record]
 */
export async function GET(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret || req.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  const path = req.nextUrl.searchParams.get("path");
  const paths = path ? path : ["/track-record", "/dhan", "/"];
  for (const p of Array.isArray(paths) ? paths : [paths]) revalidatePath(p);
  return NextResponse.json({ ok: true, revalidated: paths, at: new Date().toISOString() });
}
