/**
 * Refresh src/data/portfolio.json from the Dhan API (daily).
 *
 * What it does:
 *   1. Reads the existing portfolio.json (keeps `startValue` + the historical
 *      `equityCurve` so the curve genuinely grows day over day).
 *   2. Fetches current holdings → portfolio value, plus the day's trade book.
 *   3. Appends/updates today's equity point, recomputes growth, writes the file
 *      with source:"live". On ANY failure it exits non-zero and leaves the
 *      last-good file untouched (never corrupts the site's data).
 *
 * Usage: `npm run pull:portfolio`
 *
 * Required env (set in .env locally / GitHub Actions secrets — never in code):
 *   DHAN_CLIENT_ID     your Dhan client id
 *   DHAN_ACCESS_TOKEN  Dhan API access token (v2)
 * Optional:
 *   DHAN_API_BASE      default https://api.dhan.co
 *
 * NOTE (verify before going live): Dhan response field names occasionally
 * differ across API versions. The TODO-marked spots below are where to confirm
 * shapes against your account's /v2/holdings and /v2/trades responses. Until
 * confirmed + secrets are set, the site happily renders the seed data.
 */

import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "src", "data", "portfolio.json");
const BASE = process.env.DHAN_API_BASE || "https://api.dhan.co";
const CLIENT_ID = process.env.DHAN_CLIENT_ID;
const ACCESS_TOKEN = process.env.DHAN_ACCESS_TOKEN;

interface Trade {
  date: string;
  symbol: string;
  side: string;
  qty: number;
  pnl: number;
}
interface Portfolio {
  source: string;
  asOf: string;
  currency: string;
  startValue: number;
  currentValue: number;
  growthPct: number;
  dayChangePct: number;
  note?: string;
  equityCurve: { date: string; value: number }[];
  recentTrades: Trade[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

async function dhan<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: {
      "access-token": ACCESS_TOKEN!,
      "client-id": CLIENT_ID!,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Dhan ${endpoint} → ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as T;
}

async function main() {
  if (!CLIENT_ID || !ACCESS_TOKEN) {
    throw new Error(
      "Missing DHAN_CLIENT_ID / DHAN_ACCESS_TOKEN — set them in env before running."
    );
  }

  const prev: Portfolio = JSON.parse(fs.readFileSync(OUT, "utf-8"));

  // ---- 1. Current portfolio value from holdings -------------------------
  // TODO(verify): confirm holding field names on your account.
  type Holding = {
    tradingSymbol?: string;
    totalQty?: number;
    lastTradedPrice?: number;
    ltp?: number;
  };
  const holdings = await dhan<Holding[]>("/v2/holdings");
  const holdingsValue = holdings.reduce((sum, h) => {
    const qty = h.totalQty ?? 0;
    const price = h.lastTradedPrice ?? h.ltp ?? 0;
    return sum + qty * price;
  }, 0);

  // Available cash (Dhan uses the field name "availabelBalance" — sic).
  type Fund = { availabelBalance?: number; availableBalance?: number };
  let cash = 0;
  try {
    const fund = await dhan<Fund>("/v2/fundlimit");
    cash = fund.availabelBalance ?? fund.availableBalance ?? 0;
  } catch {
    // fund balance is best-effort; portfolio value still works without it
  }

  const currentValue = Math.round(holdingsValue + cash);
  if (!currentValue || currentValue <= 0) {
    throw new Error("Computed portfolio value is 0 — aborting to keep last-good data.");
  }

  // ---- 2. Today's trades (best-effort) ----------------------------------
  // TODO(verify): confirm trade-book endpoint + fields for your account.
  type DhanTrade = {
    tradingSymbol?: string;
    transactionType?: string;
    quantity?: number;
    realizedProfit?: number;
    // TODO(verify): confirm the execution-time field name on your account.
    exchangeTime?: string;
    tradeDate?: string;
  };
  let recentTrades = prev.recentTrades;
  try {
    const trades = await dhan<DhanTrade[]>("/v2/trades");
    if (Array.isArray(trades) && trades.length > 0) {
      recentTrades = trades.slice(0, 6).map((t) => ({
        date: (t.exchangeTime ?? t.tradeDate ?? today()).slice(0, 10),
        symbol: t.tradingSymbol ?? "—",
        side: (t.transactionType ?? "").toUpperCase().startsWith("S") ? "SELL" : "BUY",
        qty: t.quantity ?? 0,
        pnl: Math.round(t.realizedProfit ?? 0),
      }));
    }
  } catch {
    // keep previous trades if the trade book can't be read
  }

  // ---- 3. Update equity curve (append/replace today) --------------------
  const t = today();
  const curve = prev.equityCurve.filter((p) => p.date !== t);
  curve.push({ date: t, value: currentValue });
  curve.sort((a, b) => (a.date < b.date ? -1 : 1));

  const startValue = prev.startValue || curve[0].value;
  const prevPoint = curve.length >= 2 ? curve[curve.length - 2].value : startValue;

  const next: Portfolio = {
    ...prev,
    source: "live",
    asOf: t,
    startValue,
    currentValue,
    growthPct: +(((currentValue / startValue) - 1) * 100).toFixed(1),
    dayChangePct: +(((currentValue / prevPoint) - 1) * 100).toFixed(2),
    equityCurve: curve,
    recentTrades,
  };
  delete next.note;

  fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
  console.log("Updated", OUT);
  console.log(`value=${currentValue} growth=${next.growthPct}% trades=${recentTrades.length}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
