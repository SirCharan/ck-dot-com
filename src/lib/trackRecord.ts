// Live Dhan track-record data contract — shared by /track-record and the hero.
// gross = P&L before charges (matches the Dhan app); net = after brokerage/STT.

export type SeriesPt = {
  date: string;
  net: number;
  gross: number;
  cumulative: number;
  grossCumulative: number;
};

export type Metrics = {
  building: boolean;
  have: number;
  need: number;
  activeDays: number;
  cumulative: number | null;
  grossCumulative: number | null;
  sharpeAnnualized: number | null;
  maxDrawdown: number | null;
  maxDrawdownPct: number | null;
  positiveDays: number | null;
  sortino: number | null;
  calmar: number | null;
  profitFactor: number | null;
  expectancy: number | null;
  annualizedReturnPct: number | null;
  volatilityAnnualizedPct: number | null;
  maxWinStreak: number;
  maxLossStreak: number;
  recoveryFactor: number | null;
  note: string;
};

export type Payload = {
  ok: true;
  asOf: string | null;
  provisional: boolean;
  series: SeriesPt[];
  metrics: Metrics;
  /** `from` is the first day the API publishes — the window start (ISO). */
  meta: { e0: number; from?: string; note: string };
};

export const TRACK_URL =
  process.env.NEXT_PUBLIC_TRACK_RECORD_URL ||
  "https://zerodha-tg-bot.vercel.app/api/dhan/track-record";

export async function getTrackRecord(): Promise<Payload | null> {
  try {
    // Daily cache-bust: the endpoint is CDN-cached (s-maxage 3600); a per-day
    // query key guarantees the first fetch each IST day gets fresh data even if
    // the CDN copy is up to an hour stale at the boundary.
    const d = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
    const url = `${TRACK_URL}${TRACK_URL.includes("?") ? "&" : "?"}d=${d}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.ok ? (json as Payload) : null;
  } catch {
    return null;
  }
}

/** Curve value: gross cumulative, falling back to net cumulative. */
export const curveValue = (s: SeriesPt): number => s.grossCumulative ?? s.cumulative;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Window-start label: "2026-08-01" → "1 Aug 2026". Read from `meta.from` so the copy
 * follows the API and cannot drift from the data. Null when the API omits it.
 */
export function formatWindowStart(from?: string | null): string | null {
  const m = from ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(from) : null;
  const month = m ? MONTHS[Number(m[2]) - 1] : undefined;
  return m && month ? `${Number(m[3])} ${month} ${m[1]}` : null;
}
