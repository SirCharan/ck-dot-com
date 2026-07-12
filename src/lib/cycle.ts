import committed from "@/data/decision-cycle.json";

/**
 * Live-decision data contract for the Mission-Control hero.
 *
 * The committed `decision-cycle.json` is the guaranteed render contract. When
 * DRISHTI_CYCLE_URL is set, `getCycle()` fetches Drishti's public R2 snapshot
 * (ISR-cached), adapts + validates it, and upgrades the hero to the genuine
 * latest cycle. ANY failure — unset URL, network/403/CORS, bad shape, or a
 * degraded `status` — falls back to the committed cycle with `live:false`, so
 * the hero renders identically and never breaks (mirrors tatkaal's
 * degraded-payload guard).
 */

export type CycleFeature = { label: string; value: string; dir: "up" | "down" | "flat" };
export type CycleData = {
  status: string;
  asset: string;
  cadence: string;
  model: string;
  cycle: number;
  timestampIST: string;
  direction: string;
  entry: number;
  stop: number;
  target: number;
  rr: number;
  conviction: number;
  winRateAgg: number;
  reasoning: string;
  features: CycleFeature[];
  resolved: boolean;
  result: { outcome: string; r: number; note?: string };
};

export type CycleResult = { cycle: CycleData; live: boolean; asOf: string };

const COMMITTED = committed as CycleData;
const REVALIDATE_S = 900; // 15 min — matches the decision cadence

function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/** Validate + normalise an unknown payload into a CycleData, or null if unusable. */
export function adaptCycle(raw: unknown): CycleData | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  // Explicit degraded gate: a feed that self-reports non-ok never renders.
  if (typeof r.status === "string" && r.status !== "ok") return null;

  const entry = num(r.entry);
  const stop = num(r.stop);
  const target = num(r.target);
  const rr = num(r.rr);
  if (entry === null || stop === null || target === null || rr === null) return null;
  if (typeof r.direction !== "string" || typeof r.reasoning !== "string") return null;

  return {
    status: "ok",
    asset: typeof r.asset === "string" ? r.asset : COMMITTED.asset,
    cadence: typeof r.cadence === "string" ? r.cadence : COMMITTED.cadence,
    model: typeof r.model === "string" ? r.model : COMMITTED.model,
    cycle: num(r.cycle) ?? COMMITTED.cycle,
    timestampIST: typeof r.timestampIST === "string" ? r.timestampIST : COMMITTED.timestampIST,
    direction: r.direction,
    entry,
    stop,
    target,
    rr,
    conviction: num(r.conviction) ?? COMMITTED.conviction,
    winRateAgg: num(r.winRateAgg) ?? COMMITTED.winRateAgg,
    reasoning: r.reasoning,
    features: Array.isArray(r.features) ? (r.features as CycleFeature[]) : COMMITTED.features,
    resolved: typeof r.resolved === "boolean" ? r.resolved : false,
    result:
      r.result && typeof r.result === "object"
        ? (r.result as CycleData["result"])
        : { outcome: "pending", r: 0 },
  };
}

export async function getCycle(): Promise<CycleResult> {
  const url = process.env.DRISHTI_CYCLE_URL;
  const fallback: CycleResult = { cycle: COMMITTED, live: false, asOf: COMMITTED.timestampIST };
  if (!url) return fallback;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_S } });
    if (!res.ok) return fallback;
    const adapted = adaptCycle(await res.json());
    if (!adapted) return fallback;
    return { cycle: adapted, live: true, asOf: adapted.timestampIST };
  } catch {
    return fallback;
  }
}
