import { inr } from "./format";

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

export const pctY = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

export function deriveDhanStats(data: Payload | null) {
  const m = data?.metrics;
  // Ratios show as soon as there is any settled data (no 30-day gate).
  // Individual ratios still null-guard (Sharpe/Sortino need >=2 active days).
  const gated = !m;

  // Headline is RETURN % (capital-based); rupee figures move to the fine print.
  const grossVal = m?.grossCumulative ?? m?.cumulative ?? null;
  const e0 = data?.meta?.e0 ?? 0;
  const retPctStr =
    grossVal != null && e0 > 0 ? `${grossVal >= 0 ? "+" : ""}${((grossVal / e0) * 100).toFixed(1)}%` : "n/a";
  const inrSub =
    grossVal != null
      ? `gross ${inr(grossVal)}${m?.cumulative != null ? ` · net ${inr(m.cumulative)}` : ""}`
      : "";
  const sharpeStr = m?.sharpeAnnualized != null ? m.sharpeAnnualized.toFixed(2) : "n/a";
  const ddStr = !gated && m?.maxDrawdown != null ? inr(-Math.abs(m.maxDrawdown)) : "n/a";
  const winStr = !gated && m?.positiveDays != null ? `${Math.round(m.positiveDays * 100)}%` : "n/a";
  const daysStr = m ? String(m.activeDays) : "n/a";
  const asOfStr = data?.asOf ?? "n/a";
  const since = formatWindowStart(data?.meta?.from);

  const KPIS: { value: string; label: string; sub?: string }[] = [
    { value: retPctStr, label: "Return", sub: inrSub },
    { value: sharpeStr, label: "Sharpe" },
    { value: ddStr, label: "Max drawdown" },
    { value: winStr, label: "Win days" },
    { value: daysStr, label: "Active days" },
    { value: asOfStr, label: "As of" },
  ];

  const RATIOS: { v: string; l: string }[] = !gated && m
    ? [
        { v: m.sortino != null ? m.sortino.toFixed(2) : "n/a", l: "Sortino" },
        { v: m.calmar != null ? m.calmar.toFixed(2) : "n/a", l: "Calmar" },
        { v: m.profitFactor != null ? m.profitFactor.toFixed(2) : "n/a", l: "Profit factor" },
        { v: m.expectancy != null ? inr(m.expectancy) : "n/a", l: "Expectancy / day" },
        { v: m.annualizedReturnPct != null ? `${m.annualizedReturnPct.toFixed(1)}%` : "n/a", l: "Ann. return" },
        { v: m.volatilityAnnualizedPct != null ? `${m.volatilityAnnualizedPct.toFixed(1)}%` : "n/a", l: "Ann. volatility" },
        { v: `${m.maxWinStreak}d`, l: "Win streak" },
        { v: `${m.maxLossStreak}d`, l: "Loss streak" },
        { v: m.recoveryFactor != null ? m.recoveryFactor.toFixed(2) : "n/a", l: "Recovery factor" },
      ]
    : [];

  return { m, gated, e0, grossVal, retPctStr, inrSub, sharpeStr, ddStr, winStr, daysStr, asOfStr, since, KPIS, RATIOS };
}

export type MonthRow = { month: string; label: string; net: number; gross: number; activeDays: number; winDays: number };

/**
 * Per-month totals over settled days. SeriesPt carries no per-point provisional
 * flag; the payload-level `provisional` means the LAST point is the mark-to-market
 * tip, so pass it and that point is skipped. Ascending by month.
 */
export function monthlyRollup(series: SeriesPt[], provisional = false): MonthRow[] {
  const settled = provisional ? series.slice(0, -1) : series;
  const by = new Map<string, MonthRow>();
  for (const s of [...settled].sort((a, b) => a.date.localeCompare(b.date))) {
    const mm = /^(\d{4})-(\d{2})/.exec(s.date);
    const name = mm ? MONTHS[Number(mm[2]) - 1] : undefined;
    if (!mm || !name) continue;
    const key = `${mm[1]}-${mm[2]}`;
    let r = by.get(key);
    if (!r) {
      r = { month: key, label: `${name} ${mm[1]}`, net: 0, gross: 0, activeDays: 0, winDays: 0 };
      by.set(key, r);
    }
    const g = s.gross ?? s.net;
    r.net += s.net;
    r.gross += g;
    r.activeDays += 1;
    if (g > 0) r.winDays += 1;
  }
  return [...by.values()].sort((a, b) => a.month.localeCompare(b.month));
}
