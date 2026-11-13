// Public Drishti ledger. Only fields the endpoint really returns are used;
// any fetch or shape failure returns null and the home page shows the screenshot card.
export interface DrishtiStats {
  winRate: number;
  wins: number;
  losses: number;
  open: number | null;
}

const URL_STATS = "https://www.drishtisignals.in/api/stats.json";

export async function getDrishtiStats(): Promise<DrishtiStats | null> {
  try {
    const res = await fetch(URL_STATS, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const j: unknown = await res.json();
    if (typeof j !== "object" || j === null) return null;
    const o = j as Record<string, unknown>;
    const winRate = o.win_rate;
    const wins = o.wins;
    const losses = o.losses;
    if (
      typeof winRate !== "number" ||
      typeof wins !== "number" ||
      typeof losses !== "number" ||
      !Number.isFinite(winRate) ||
      wins < 0 ||
      losses < 0
    ) {
      return null;
    }
    return { winRate, wins, losses, open: typeof o.open === "number" ? o.open : null };
  } catch {
    return null;
  }
}
