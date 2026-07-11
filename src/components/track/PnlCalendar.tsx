"use client";

/**
 * PnlCalendar — GitHub-style trailing-52-week P&L heatmap. Green = profit, red =
 * loss, intensity by |₹|. Deterministic from props (no `new Date()` in the cell
 * math) so it hydrates cleanly. Hover → an Ephemeris-styled tooltip with the
 * day's ₹ (native <title> kept as a no-JS/a11y fallback); click a trades-day →
 * the parent opens that day's trade table below.
 */
import { useState } from "react";
import { inr } from "@/lib/format";

const CELL = 11;
const GAP = 3;
const TOP = 18;
const WEEKS = 53;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Cell = { iso: string; net: number | null; week: number; dow: number; month: number };

export function PnlCalendar({
  series,
  selectedDate = null,
  onSelect,
}: {
  series: { date: string; net: number }[];
  selectedDate?: string | null;
  onSelect?: (iso: string) => void;
}) {
  const [hover, setHover] = useState<Cell | null>(null);

  const byDate = new Map(series.map((s) => [s.date, s.net]));
  const maxAbs = Math.max(1, ...series.map((s) => Math.abs(s.net)));

  // End at the latest data date (NOT new Date() — differs across the hydration
  // boundary and corrupts month labels). Start 52 weeks back, aligned to Sunday.
  const maxIso = series.reduce((m, s) => (s.date > m ? s.date : m), series[0]?.date ?? "1970-01-01");
  const [ey, em, ed] = maxIso.split("-").map(Number);
  const end = new Date(Date.UTC(ey, (em || 1) - 1, ed || 1));
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - 7 * (WEEKS - 1) - end.getUTCDay());

  const cells: Cell[] = [];
  const d = new Date(start);
  let i = 0;
  while (d <= end) {
    const iso = d.toISOString().slice(0, 10);
    cells.push({
      iso,
      net: byDate.has(iso) ? (byDate.get(iso) as number) : null,
      week: Math.floor(i / 7),
      dow: d.getUTCDay(),
      month: d.getUTCMonth(),
    });
    d.setUTCDate(d.getUTCDate() + 1);
    i++;
  }

  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  for (const c of cells) {
    if (c.dow === 0 && c.month !== lastMonth) {
      monthLabels.push({ x: c.week * (CELL + GAP), label: MONTHS[c.month] });
      lastMonth = c.month;
    }
  }

  const fill = (net: number | null): string => {
    if (net === null) return "rgb(var(--bone) / 0.06)";
    if (net === 0) return "rgb(var(--bone) / 0.14)";
    const level = Math.min(4, Math.ceil((Math.abs(net) / maxAbs) * 4)) || 1;
    const op = [0, 0.32, 0.52, 0.76, 1][level];
    return net > 0 ? `rgb(var(--pos) / ${op})` : `rgb(var(--neg) / ${op})`;
  };

  const W = WEEKS * (CELL + GAP);
  const H = TOP + 7 * (CELL + GAP);

  const cx = (c: Cell) => c.week * (CELL + GAP);
  const cy = (c: Cell) => TOP + c.dow * (CELL + GAP);

  return (
    <div className="relative overflow-x-auto">
      <svg width={W} height={H} role="img" aria-label="Daily P&L calendar (trailing 52 weeks)">
        {monthLabels.map((m, k) => (
          <text key={k} x={m.x} y={11} className="num" fontSize="9" fill="rgb(var(--bone-dim))">
            {m.label}
          </text>
        ))}
        {cells.map((c) => {
          const hasTrades = c.net !== null;
          const selected = hasTrades && c.iso === selectedDate;
          return (
            <rect
              key={c.iso}
              x={cx(c)}
              y={cy(c)}
              width={CELL}
              height={CELL}
              rx={2}
              fill={fill(c.net)}
              stroke={selected ? "rgb(var(--amber))" : "transparent"}
              strokeWidth={selected ? 2 : 0}
              className={hasTrades && onSelect ? "cursor-pointer" : undefined}
              onMouseEnter={() => setHover(c)}
              onMouseLeave={() => setHover((h) => (h?.iso === c.iso ? null : h))}
              onClick={hasTrades && onSelect ? () => onSelect(c.iso) : undefined}
            >
              <title>
                {c.iso}
                {c.net === null ? " · no trades" : ` · ${inr(c.net)}`}
              </title>
            </rect>
          );
        })}
      </svg>

      {/* Ephemeris-styled hover tooltip (JS enhancement over the native <title>). */}
      {hover && (
        <div
          role="presentation"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap border border-[rgb(var(--bone)/0.16)] bg-[rgb(var(--ink-void))] px-2 py-1"
          style={{ left: cx(hover) + CELL / 2, top: cy(hover) - 4 }}
        >
          <span className="num text-[0.7rem] tracking-tight text-[rgb(var(--bone-dim))]">
            {hover.iso}
          </span>
          <span
            className={`num ml-2 text-[0.7rem] tabular-nums ${
              hover.net === null
                ? "text-[rgb(var(--bone-dim))]"
                : hover.net >= 0
                  ? "text-[rgb(var(--pos))]"
                  : "text-[rgb(var(--neg))]"
            }`}
          >
            {hover.net === null ? "no trades" : inr(hover.net)}
          </span>
        </div>
      )}
    </div>
  );
}
