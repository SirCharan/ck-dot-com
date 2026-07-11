"use client";

/**
 * Client wrapper that owns the calendar's selected-day state: the GitHub-style
 * heatmap on top, and — when a trades-day is clicked — that day's per-trade table
 * directly below it. Clicking the selected day again closes the table.
 */
import { useState } from "react";
import { PnlCalendar } from "./PnlCalendar";
import { DayTradeTable } from "./DayTradeTable";

export function PnlCalendarInteractive({
  series,
}: {
  series: { date: string; net: number }[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const toggle = (iso: string) => setSelected((cur) => (cur === iso ? null : iso));

  return (
    <>
      <PnlCalendar series={series} selectedDate={selected} onSelect={toggle} />
      <DayTradeTable date={selected} />
    </>
  );
}
