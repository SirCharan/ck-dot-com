/**
 * PnlCalendar — GitHub-style trailing-52-week P&L heatmap, server-rendered SVG
 * (no client JS, no deps). Green = profit, red = loss, intensity by |₹|; native
 * <title> gives hover. Aggregate only — one net ₹ per day, never a position.
 */
const CELL = 11;
const GAP = 3;
const TOP = 18;
const WEEKS = 53;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const inr = (n: number) =>
  `${n < 0 ? "−" : ""}₹${Math.abs(Math.round(n)).toLocaleString("en-US")}`;

export function PnlCalendar({ series }: { series: { date: string; net: number }[] }) {
  const byDate = new Map(series.map((s) => [s.date, s.net]));
  const maxAbs = Math.max(1, ...series.map((s) => Math.abs(s.net)));

  // End at today (UTC date is fine for grid layout); start 52 weeks back, aligned to Sunday.
  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - 7 * (WEEKS - 1) - end.getUTCDay());

  type Cell = { iso: string; net: number | null; week: number; dow: number; month: number };
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

  // Month labels at the first week whose Sunday starts a new month.
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

  return (
    <div className="overflow-x-auto">
      <svg width={W} height={H} role="img" aria-label="Daily P&L calendar (trailing 52 weeks)">
        {monthLabels.map((m, k) => (
          <text
            key={k}
            x={m.x}
            y={11}
            className="num"
            fontSize="9"
            fill="rgb(var(--bone-dim))"
          >
            {m.label}
          </text>
        ))}
        {cells.map((c) => (
          <rect
            key={c.iso}
            x={c.week * (CELL + GAP)}
            y={TOP + c.dow * (CELL + GAP)}
            width={CELL}
            height={CELL}
            rx={2}
            fill={fill(c.net)}
          >
            <title>
              {c.iso}
              {c.net === null ? " · no trades" : ` · ${inr(c.net)}`}
            </title>
          </rect>
        ))}
      </svg>
    </div>
  );
}
