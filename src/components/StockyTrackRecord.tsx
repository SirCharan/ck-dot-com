import Link from "next/link";
import stocky from "@/data/stocky-curve.json";
import { EquityCurveSvg } from "./lab/EquityCurveSvg";

/**
 * Stocky (Zerodha) track record: verified history first on /track-record.
 * Chronology + image placement mirror content/blog/stocky-ai.md (heatmap then P&L).
 * Reconciled labelling (net verified vs gross); never "+150%".
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
    note: "Claude MCP + Haiku · ₹15L · Bank Nifty / Nifty / Sensex weeklies.",
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

const imgFrame = {
  border: "1px solid var(--p-line)",
  borderRadius: 6,
  background: "var(--p-elev)",
  padding: "0.5rem",
} as const;

export function StockyTrackRecord() {
  const w = stocky.window;
  return (
    <section className="press-section" aria-label="Stocky track record">
      <h2>Stocky, the AI run</h2>
      <div className="press-ledger-head press-mono" style={{ maxWidth: "34rem" }}>
        <span>Stocky · Zerodha</span>
        <span>AI · retired</span>
      </div>
      <p className="press-section-sub press-serif">
        {H.method} placed every trade itself. Indian F&amp;O and commodities · {H.run} · now
        retired.
      </p>

      <div className="press-ledger">
        <div className="press-ledger-head press-mono">
          <span>
            Zerodha · return % · {w.start} → {w.end}
          </span>
          <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="link-ink">
            verified ↗
          </a>
        </div>
        <EquityCurveSvg series={stocky.series} valueOf={(p) => p.pct} height={240} showAxes formatY={pctY} glow={false} />
        <div className="press-ledger-foot press-mono">
          <strong>
            {H.capital} → {H.endNet} ({H.roiNetPct} net)
          </strong>
          <a href={H.verifiedUrl} target="_blank" rel="noopener noreferrer" className="link-ink">
            {H.profit} net verified ↗
          </a>
          <span>{H.winRate} win</span>
          <span>Sharpe {H.sharpe}</span>
        </div>
      </div>
      <p className="press-mono" style={{ marginTop: "0.75rem", fontSize: "0.72rem", color: "var(--p-faint)" }}>
        Realized P&amp;L · % of ₹15L · holding-period-smoothed.
      </p>

      <div style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
        {MILESTONES.map((m) => (
          <div key={m.date} className="press-ledger">
            <div className="press-ledger-head press-mono">
              <span>{m.date}</span>
              {m.stat && <span>{m.stat}</span>}
            </div>
            <h3 className="press-serif" style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "var(--p-ink)" }}>
              {m.title}
            </h3>
            <p style={{ margin: "0.4rem 0 0", maxWidth: "58ch", fontSize: "0.9rem", lineHeight: 1.55, color: "var(--p-mute)" }}>
              {m.note}
            </p>
            {m.imgs && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {m.imgs.map((shot) => (
                  <figure key={shot.src} className="m-0 overflow-hidden" style={imgFrame}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shot.src}
                      alt={`Stocky · ${shot.cap}`}
                      loading="lazy"
                      className="h-auto w-full"
                      style={{ borderRadius: 4, objectFit: "contain" }}
                    />
                    <figcaption className="press-mono" style={{ marginTop: "0.5rem", fontSize: "0.72rem", color: "var(--p-faint)" }}>
                      {shot.cap}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Link href="/blog/stocky-ai" className="press-mono link-ink" style={{ display: "inline-block", marginTop: "1.5rem", fontSize: "0.85rem" }}>
        Full story →
      </Link>
    </section>
  );
}
