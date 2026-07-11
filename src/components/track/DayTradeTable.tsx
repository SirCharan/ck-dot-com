"use client";

/**
 * DayTradeTable — the calendar drill-down. When a day is selected, lazily fetches
 * that day's per-trade rows from the public track-trades endpoint and renders them
 * as a hairline grid (no shadcn <table>; mirrors the KPI/ratios grid grammar).
 * Per-trade P&L = realized − charges; the footer sums to the day's realized total.
 *
 * ⚠️ This surfaces per-instrument detail publicly — a ck-authorized override of
 * the aggregate-only invariant (2026-07-11).
 */
import { useEffect, useRef, useState } from "react";
import { Caption, Rule } from "@/components/lab/Primitives";
import { inr, inr2, clockTime } from "@/lib/format";

const TRADES_URL =
  process.env.NEXT_PUBLIC_TRACK_TRADES_URL ||
  "https://zerodha-tg-bot.vercel.app/api/dhan/track-trades";

type TradeRow = {
  time: string;
  sym: string;
  side: "BUY" | "SELL";
  qty: number;
  price: number;
  realized: number;
  charges: number;
};
type State =
  | { k: "loading" }
  | { k: "error" }
  | { k: "ok"; trades: TradeRow[]; net: number; gross: number; charges: number };

export function DayTradeTable({ date }: { date: string | null }) {
  const [state, setState] = useState<State | null>(null);
  const cache = useRef<Map<string, State>>(new Map());

  useEffect(() => {
    if (!date) {
      setState(null);
      return;
    }
    const cached = cache.current.get(date);
    if (cached) {
      setState(cached);
      return;
    }
    let alive = true;
    setState({ k: "loading" });
    (async () => {
      try {
        const res = await fetch(
          `${TRADES_URL}?date=${date}&t=${Math.floor(Date.now() / 60000)}`
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        const next: State = json?.ok
          ? {
              k: "ok",
              trades: json.trades ?? [],
              net: json.net ?? 0,
              gross: json.gross ?? json.net ?? 0,
              charges: json.charges ?? 0,
            }
          : { k: "error" };
        cache.current.set(date, next);
        if (alive) setState(next);
      } catch {
        if (alive) setState({ k: "error" });
      }
    })();
    return () => {
      alive = false;
    };
  }, [date]);

  if (!date || !state) return null;

  return (
    <figure className="m-0 mt-8">
      <Rule className="mb-4" />
      <Caption className="mb-3 block text-[rgb(var(--bone))]">
        Fig. 3 — trades on {date}
      </Caption>

      {state.k === "loading" && (
        <div className="num py-6 text-[0.8rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
          loading trades…
        </div>
      )}

      {state.k === "error" && (
        <div className="num py-6 text-[0.8rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
          trade detail unavailable for this day
        </div>
      )}

      {state.k === "ok" && state.trades.length === 0 && (
        <div className="num py-6 text-[0.8rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
          no trade detail retained for this day
        </div>
      )}

      {state.k === "ok" && state.trades.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            {/* header */}
            <div className="grid grid-cols-[3.5rem_1fr_3.5rem_3rem_5.5rem_6rem] gap-x-3 border-b border-[rgb(var(--bone)/0.14)] pb-2">
              {["Time", "Instrument", "Side", "Qty", "Price", "P&L (₹)"].map((h, i) => (
                <Caption key={h} className={i >= 3 ? "text-right" : ""}>
                  {h}
                </Caption>
              ))}
            </div>
            {/* rows — per-trade P&L is GROSS (realized), so rows sum to the gross
                calendar cell; charges are aggregated into the footer's net line. */}
            {state.trades.map((r, i) => {
              const pnl = r.realized;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[3.5rem_1fr_3.5rem_3rem_5.5rem_6rem] gap-x-3 border-b border-[rgb(var(--bone)/0.06)] py-1.5"
                >
                  <span className="num text-[0.8rem] tabular-nums text-[rgb(var(--bone-dim))]">
                    {clockTime(r.time)}
                  </span>
                  <span className="num truncate text-[0.8rem] text-[rgb(var(--bone))]" title={r.sym}>
                    {r.sym}
                  </span>
                  <span
                    className={`num text-[0.8rem] ${
                      r.side === "BUY" ? "text-[rgb(var(--pos))]" : "text-[rgb(var(--neg))]"
                    }`}
                  >
                    {r.side}
                  </span>
                  <span className="num text-right text-[0.8rem] tabular-nums text-[rgb(var(--bone))]">
                    {r.qty}
                  </span>
                  <span className="num text-right text-[0.8rem] tabular-nums text-[rgb(var(--bone))]">
                    {inr2(r.price)}
                  </span>
                  <span
                    className={`num text-right text-[0.8rem] tabular-nums ${
                      pnl >= 0 ? "text-[rgb(var(--pos))]" : "text-[rgb(var(--neg))]"
                    }`}
                  >
                    {inr(pnl)}
                  </span>
                </div>
              );
            })}
            {/* footer — day gross total (rows sum here) + net sub-line */}
            <div className="grid grid-cols-[3.5rem_1fr_3.5rem_3rem_5.5rem_6rem] gap-x-3 border-t border-[rgb(var(--bone)/0.14)] pt-2">
              <span className="num col-span-5 text-[0.72rem] uppercase tracking-[0.12em] text-[rgb(var(--bone-dim))]">
                Day total · gross
              </span>
              <span
                className={`num text-right text-[0.85rem] font-medium tabular-nums ${
                  state.gross >= 0 ? "text-[rgb(var(--pos))]" : "text-[rgb(var(--neg))]"
                }`}
              >
                {inr(state.gross)}
              </span>
            </div>
            <div className="grid grid-cols-[3.5rem_1fr_3.5rem_3rem_5.5rem_6rem] gap-x-3 pt-1">
              <span className="num col-span-5 text-[0.7rem] tracking-[0.04em] text-[rgb(var(--bone-dim))]">
                net of ₹{Math.abs(Math.round(state.charges)).toLocaleString("en-US")} charges
              </span>
              <span className="num text-right text-[0.78rem] tabular-nums text-[rgb(var(--bone-dim))]">
                {inr(state.net)}
              </span>
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
