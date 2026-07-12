/** Shared ₹ + number/time formatters for the track-record surface. */

/** Signed ₹, rounded, grouped — e.g. -1234.5 → "−₹1,235". */
export const inr = (n: number): string =>
  `${n < 0 ? "−" : ""}₹${Math.abs(Math.round(n)).toLocaleString("en-US")}`;

/** Compact ₹ for axis ticks — e.g. 3380000 → "₹34L", 12000000 → "₹1.2Cr". */
export const inrCompact = (n: number): string => {
  const a = Math.abs(n);
  const s = n < 0 ? "−" : "";
  if (a >= 1e7) return `${s}₹${(a / 1e7).toFixed(a >= 1e8 ? 0 : 1)}Cr`;
  if (a >= 1e5) return `${s}₹${(a / 1e5).toFixed(0)}L`;
  if (a >= 1e3) return `${s}₹${(a / 1e3).toFixed(0)}k`;
  return `${s}₹${Math.round(a)}`;
};

/** ₹ with paise (2dp) — for per-trade prices where rounding hides the fill. */
export const inr2 = (n: number): string =>
  `${n < 0 ? "−" : ""}₹${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/** "YYYY-MM-DD HH:MM:SS" (or ISO) → "HH:MM"; passes through anything unexpected. */
export const clockTime = (s: string): string => {
  const m = /(\d{2}):(\d{2})/.exec(s ?? "");
  return m ? `${m[1]}:${m[2]}` : s ?? "";
};
