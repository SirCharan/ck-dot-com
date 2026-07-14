import Link from "next/link";
import stocky from "@/data/stocky-curve.json";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";

/**
 * Stocky (Zerodha) track record — verified history first on /track-record.
 * Chronology + image placement mirror content/blog/stocky-ai.md (heatmap → P&L).
 * Reconciled labelling (net verified vs gross) — never "+150%".
 */

const H = stocky.headline;
const pctY = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v)}%`;

type Shot = { src: string; cap: string };
type Milestone = { date: string; title: string; note: string; stat?: string; imgs?: Shot[] };

/** Image order matches the blog markdown (heatmap then P&L; F&O overall then commodity). */
const MILESTONES: Milestone[] = [
  {
    date: "Jun 2025",
    title: "Stocky goes live",
    note: "Claude MCP + fine-tuned Haiku · ₹15L · Bank Nifty / Nifty / Sensex weeklies.",
    stat: "₹15L capital",
  },
  {
    date: "Jun–Sep 2025",
    title: "Four months, zero losses",
    note: "₹3.6L by September · ~₹90k/mo auto-pilot · 51 days · 0 losses.",
    stat: "+₹3.6L · 51 days · 0 losses",
    imgs: [
      { src: "/images/stocky/stocky-heatmap-jun-sep.png", cap: "F&O · calendar · Jun–Sep (all green)" },
      { src: "/images/stocky/stocky-pnl-jun-sep.png", cap: "F&O · P&L · Jun–Sep 2025" },
    ],
  },
  {
    date: "29 Sep 2025",
    title: "First loss",
    note: "Over-traded volatile names (Eternal, Asian Paints, Tata Motors, BSE) · tightened the universe · net +2.87L after the red day.",
    stat: "1st loss day",
    imgs: [
      {
        src: "/images/stocky/stocky-heatmap-first-loss.png",
        cap: "F&O · calendar · to 29 Sep (1st red day)",
      },
      {
        src: "/images/stocky/stocky-pnl-first-loss.png",
        cap: "F&O · P&L · after first loss (+2.87L net)",
      },
    ],
  },
  {
    date: "Oct 2025",
    title: "Adapt & rebound",
    note: "Bank Nifty weekly → monthly · explored Deepseek · October rebounded hard.",
  },
  {
    date: "Nov 2025",
    title: "Second loss",
    note: "Second loss day of the run · net +3.94L through 24 Nov (two red days on the calendar).",
    stat: "2nd loss day",
    imgs: [
      {
        src: "/images/stocky/stocky-heatmap-second-loss.png",
        cap: "F&O · calendar · to 24 Nov (2nd red day)",
      },
      {
        src: "/images/stocky/stocky-pnl-second-loss.png",
        cap: "F&O · P&L · after second loss (+3.94L net)",
      },
    ],
  },
  {
    date: "Dec 2025",
    title: "Six months in",
    note: "₹5.32L PnL · 212 profitable days · only 2 loss days.",
    stat: "₹5.32L · 2 loss days",
    imgs: [
      { src: "/images/stocky/stocky-heatmap-jun-dec.png", cap: "F&O · calendar · Jun–Dec (2 red days)" },
      { src: "/images/stocky/stocky-pnl-jun-dec.png", cap: "F&O · P&L · Jun–Dec 2025" },
    ],
  },
  {
    date: "Year one",
    title: "₹15L → ₹31.57L",
    note: "Commodities ₹14.2L + F&O ₹2.37L = ₹16.57L profit · 73% win · Sharpe 2.29 · externally verified.",
    stat: "₹16.57L profit · verified",
    imgs: [
      { src: "/images/stocky/stocky-fno-overall.png", cap: "F&O · overall" },
      { src: "/images/stocky/stocky-commodity-overall.png", cap: "Commodity · overall" },
    ],
  },
];

export function StockyTrackRecord() {
  const w = stocky.window;
  return (
    <section className="pt-2" aria-label="Stocky track record">
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className="kicker">Stocky · Zerodha</span>
        <span className="rounded-full border border-[rgb(var(--ink)/0.3)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
          AI
        </span>
        <span className="rounded-full border border-[rgb(var(--faint)/0.4)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[rgb(var(--faint))]">
          retired
        </span>
      </div>
      <p className="mb-6 max-w-[52ch] font-serif text-[1.05rem] leading-[1.6] text-[rgb(var(--bone)/0.84)]">
        Fine-tuned <span className="text-ink">{H.method}</span> placed every trade itself — Indian F&amp;O and
        commodities · {H.run} · now retired.
      </p>

      <div className="rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))] p-5">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
          <span>
            Zerodha · return % · {w.start} → {w.end}
          </span>
          <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]">
            verified ↗
          </a>
        </div>
        <div className="mt-4">
          <EquityCurveSvg series={stocky.series} valueOf={(p) => p.pct} height={240} showAxes formatY={pctY} />
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[rgb(var(--rule))] pt-4 font-mono text-[12.5px] text-[rgb(var(--mute))]">
          <span className="text-ink">
            {H.capital} → {H.endNet} <span className="text-accent">({H.roiNetPct} net)</span>
          </span>
          <span>
            ·{" "}
            <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-ink">
              {H.profit} net verified ↗
            </a>
          </span>
          <span>· {H.winRate} win</span>
          <span>· Sharpe {H.sharpe}</span>
          <span className="text-[rgb(var(--faint))]">· realized P&amp;L, % of ₹15L, holding-period-smoothed</span>
        </div>
      </div>

      <ol className="mt-8 border-l border-[rgb(var(--rule))] pl-6">
        {MILESTONES.map((m) => (
          <li key={m.date} className="relative pb-8 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[27px] top-1.5 h-[9px] w-[9px] rounded-full bg-[rgb(var(--faint))]"
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[rgb(var(--mute))]">{m.date}</span>
              <h3 className="font-grotesk text-[1.05rem] font-semibold text-ink">{m.title}</h3>
              {m.stat && <span className="font-mono text-[11px] text-[rgb(var(--faint))]">· {m.stat}</span>}
            </div>
            <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.5] text-[rgb(var(--mute))]">{m.note}</p>
            {m.imgs && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {m.imgs.map((shot) => (
                  <figure
                    key={shot.src}
                    className="m-0 overflow-hidden rounded-xl border border-[rgb(var(--rule))] bg-[rgb(var(--panel))] p-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shot.src}
                      alt={`Stocky — ${shot.cap}`}
                      loading="lazy"
                      className="h-auto w-full rounded-lg object-contain"
                    />
                    <figcaption className="mt-2 px-0.5 font-mono text-[11px] text-[rgb(var(--faint))]">
                      {shot.cap}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      <Link
        href="/blog/stocky-ai"
        className="mt-6 inline-block font-mono text-[13px] text-ink underline decoration-[rgb(var(--ink)/0.3)] underline-offset-2 hover:decoration-[rgb(var(--ink)/0.6)]"
      >
        Full story →
      </Link>
    </section>
  );
}
