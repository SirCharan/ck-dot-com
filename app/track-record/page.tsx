import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { Caption, MetaGutter, Rule } from "@/components/lab/Primitives";
import { TickNumber } from "@/components/lab/TickNumber";
import { PnlCalendarInteractive } from "@/components/track/PnlCalendarInteractive";
import { ClientOnly } from "@/components/lab/ClientOnly";
import { inr } from "@/lib/format";
import { SITE } from "@/data/site";
import { getTrackRecord, type SeriesPt } from "@/lib/trackRecord";

export const metadata: Metadata = {
  title: "Live Track Record",
  description:
    "Charandeep Kapoor's live Dhan trading track record — aggregate P&L, Sharpe, drawdown and win-rate, updated daily. Illustrative only; not investment advice.",
};

const TONE: Record<string, string> = {
  pos: "text-[rgb(var(--pos))]",
  accent: "text-[rgb(var(--amber))]",
  neg: "text-[rgb(var(--neg))]",
  neutral: "text-[rgb(var(--bone))]",
};

/** Hairline-engraving equity curve (server-rendered SVG; provisional tip dashed). */
function EquityCurve({ series, provisional }: { series: SeriesPt[]; provisional: boolean }) {
  if (series.length < 2) {
    return (
      <div className="grid h-64 place-items-center border border-dashed border-[rgb(var(--bone)/0.14)]">
        <span className="num text-[0.75rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
          accumulating — need ≥2 settled days
        </span>
      </div>
    );
  }
  const W = 800;
  const H = 260;
  const P = 8;
  // Curve plots GROSS cumulative (matches the calendar + Dhan app headline).
  // Fall back to net cumulative if gross is absent (CDN may serve a pre-gross copy).
  const gc = (s: SeriesPt) => s.grossCumulative ?? s.cumulative;
  const ys = series.map(gc);
  const min = Math.min(...ys, 0);
  const max = Math.max(...ys, 0);
  const span = max - min || 1;
  const x = (i: number) => P + (i / (series.length - 1)) * (W - 2 * P);
  const y = (v: number) => H - P - ((v - min) / span) * (H - 2 * P);
  const pts = series.map((s, i) => [x(i), y(gc(s))] as const);
  const solid = provisional ? pts.slice(0, -1) : pts;
  const line = (p: readonly (readonly [number, number])[]) =>
    p.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const zeroY = y(0);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-64 w-full" preserveAspectRatio="none" aria-hidden>
      {/* zero baseline */}
      <line x1={P} y1={zeroY} x2={W - P} y2={zeroY} stroke="rgb(var(--bone) / 0.14)" strokeWidth="1" strokeDasharray="2 4" />
      <path d={line(solid)} fill="none" stroke="rgb(var(--amber))" strokeOpacity="0.9" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      {provisional && pts.length >= 2 && (
        <path
          d={line(pts.slice(-2))}
          fill="none"
          stroke="rgb(var(--amber))"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

export default async function TrackRecordPage() {
  const data = await getTrackRecord();
  const m = data?.metrics;
  // Ratios are shown as soon as there is any settled data — no 30-day gate.
  // Individual ratios still null-guard (Sharpe/Sortino need ≥2 active days).
  const gated = !m;

  // KPI display strings (fall back to "—" until data accrues). Headline P&L is
  // GROSS (matches the Dhan app) with a net-of-charges sub-line.
  const grossVal = m?.grossCumulative ?? m?.cumulative ?? null;
  const grossStr = grossVal != null ? inr(grossVal) : "—";
  const netSub = m?.cumulative != null ? `net ${inr(m.cumulative)}` : "";
  const sharpeStr =
    m?.sharpeAnnualized != null ? m.sharpeAnnualized.toFixed(2) : "—";
  const ddStr = !gated && m?.maxDrawdown != null ? inr(-Math.abs(m.maxDrawdown)) : "—";
  const winStr = !gated && m?.positiveDays != null ? `${Math.round(m.positiveDays * 100)}%` : "—";
  const daysStr = m ? String(m.activeDays) : "—";
  const asOfStr = data?.asOf ?? "—";

  const KPIS: { value: string; label: string; tone: string; sub?: string }[] = [
    { value: grossStr, label: "P&L (₹) · gross", sub: netSub, tone: (grossVal != null && grossVal < 0 ? "neg" : "pos") },
    { value: sharpeStr, label: "Sharpe (ann.)", tone: "accent" },
    { value: ddStr, label: "Max drawdown", tone: "neg" },
    { value: winStr, label: "Positive days", tone: "accent" },
    { value: daysStr, label: "Active days", tone: "neutral" },
    { value: asOfStr, label: "As of", tone: "neutral" },
  ];

  return (
    <PageShell>
      <PageIntro
        kicker="Live track record"
        title="My Dhan account, in the open"
        lede="Real capital on my Dhan account — aggregate P&L, Sharpe, drawdown and positive-day rate, refreshed daily. Click any day on the calendar to see the individual trades behind it."
      />

      {/* KPIs — mono tabular figure block */}
      <figure className="m-0">
        <div className="grid grid-cols-2 border-y border-[rgb(var(--bone)/0.11)] sm:grid-cols-3">
          {KPIS.map((k, i) => (
            <div
              key={k.label}
              className={`px-4 py-5 ${i % 2 === 0 ? "border-r border-[rgb(var(--bone)/0.11)]" : ""} sm:border-r sm:[&:nth-child(3n)]:border-r-0 ${i < KPIS.length - 2 ? "border-b border-[rgb(var(--bone)/0.11)] sm:border-b-0" : ""}`}
            >
              <div className={`num text-[1.7rem] leading-none tracking-tight tabular-nums md:text-[2.1rem] ${TONE[k.tone]}`}>
                <TickNumber value={k.value} />
              </div>
              {k.sub && (
                <div className="num mt-1 text-[0.75rem] tabular-nums text-[rgb(var(--bone-dim))]">
                  {k.sub}
                </div>
              )}
              <Caption className="mt-2 block">{k.label}</Caption>
            </div>
          ))}
        </div>
        <figcaption className="mt-2.5">
          <Caption>
            Tab. 1 — account metrics · refreshed daily{data ? "" : " · awaiting first settled day"}
          </Caption>
        </figcaption>
      </figure>

      {/* Equity curve */}
      <figure className="m-0 mt-12">
        {data && data.series.length >= 2 ? (
          <EquityCurve series={data.series} provisional={data.provisional} />
        ) : (
          <div className="grid h-64 place-items-center border border-dashed border-[rgb(var(--bone)/0.14)]">
            <span className="num text-[0.75rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
              equity curve — accumulating from live data
            </span>
          </div>
        )}
        <figcaption className="mt-2.5">
          <Caption>
            Fig. 1 — cumulative P&L · gross ₹{data?.provisional ? " · dashed tip = today (provisional)" : ""}
          </Caption>
        </figcaption>
      </figure>

      {/* P&L calendar */}
      <figure className="m-0 mt-12">
        {data && data.series.length > 0 ? (
          <ClientOnly
            fallback={<div className="h-[116px]" aria-hidden />}
          >
            <PnlCalendarInteractive
              series={data.series.map((s) => ({ date: s.date, net: s.gross ?? s.net }))}
            />
          </ClientOnly>
        ) : (
          <div className="grid h-28 place-items-center border border-dashed border-[rgb(var(--bone)/0.14)]">
            <span className="num text-[0.75rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
              calendar — accumulating from live data
            </span>
          </div>
        )}
        <figcaption className="mt-2.5">
          <Caption>Fig. 2 — daily P&L calendar · gross · green profit / red loss · click a day for its trades</Caption>
        </figcaption>
      </figure>

      {/* Quant ratios — mono tabular, gated at N<30 */}
      <figure className="m-0 mt-12">
        {!gated && m ? (
          <div className="grid grid-cols-2 border-y border-[rgb(var(--bone)/0.11)] sm:grid-cols-3">
            {[
              { v: m.sortino != null ? m.sortino.toFixed(2) : "—", l: "Sortino" },
              { v: m.calmar != null ? m.calmar.toFixed(2) : "—", l: "Calmar" },
              { v: m.profitFactor != null ? m.profitFactor.toFixed(2) : "—", l: "Profit factor" },
              { v: m.expectancy != null ? inr(m.expectancy) : "—", l: "Expectancy / day" },
              { v: m.annualizedReturnPct != null ? `${m.annualizedReturnPct.toFixed(1)}%` : "—", l: "Ann. return" },
              { v: m.volatilityAnnualizedPct != null ? `${m.volatilityAnnualizedPct.toFixed(1)}%` : "—", l: "Ann. volatility" },
              { v: `${m.maxWinStreak}d`, l: "Win streak" },
              { v: `${m.maxLossStreak}d`, l: "Loss streak" },
              { v: m.recoveryFactor != null ? m.recoveryFactor.toFixed(2) : "—", l: "Recovery factor" },
            ].map((r, i) => (
              <div
                key={r.l}
                className={`px-4 py-4 ${i % 2 === 0 ? "border-r border-[rgb(var(--bone)/0.11)]" : ""} sm:border-r sm:[&:nth-child(3n)]:border-r-0 ${i < 7 ? "border-b border-[rgb(var(--bone)/0.11)] sm:[&:nth-last-child(-n+3)]:border-b-0" : ""}`}
              >
                <div className="num text-[1.4rem] leading-none tracking-tight tabular-nums text-[rgb(var(--bone))] md:text-[1.6rem]">
                  {r.v}
                </div>
                <Caption className="mt-2 block">{r.l}</Caption>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid h-28 place-items-center border border-dashed border-[rgb(var(--bone)/0.14)]">
            <span className="num text-[0.75rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
              ratios — accumulating from live data
            </span>
          </div>
        )}
        <figcaption className="mt-2.5">
          <Caption>
            Tab. 2 — risk-adjusted ratios · per-active-day
            {m ? ` · N=${m.activeDays} days (small sample)` : ""}
          </Caption>
        </figcaption>
      </figure>

      {/* Follow / book CTA — the one amber CTA */}
      <section className="mt-14">
        <Rule className="mb-8" />
        <MetaGutter meta={["§ follow", "mirror"]}>
          <h2 className="display text-[1.6rem] text-[rgb(var(--bone))] md:text-[1.9rem]">
            Want to follow these trades?
          </h2>
          <p className="mt-3 max-w-[60ch] font-serif text-[1.125rem] leading-[1.6] text-[rgb(var(--bone)/0.84)]">
            I share how I run this book and how you can mirror it on your own
            account. Book a call and I&apos;ll walk you through the setup.
          </p>
          <a
            href={SITE.socials.topmate}
            target="_blank"
            rel="noreferrer"
            className="num mt-6 inline-block bg-[rgb(var(--amber))] px-5 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-[rgb(var(--ink-void))] transition-opacity hover:opacity-90"
          >
            Book a call on Topmate ↗
          </a>
        </MetaGutter>
      </section>

      {/* Disclaimer + honest-stats notes */}
      <div className="mt-12 max-w-[70ch] space-y-3 font-serif text-[0.9rem] leading-relaxed text-[rgb(var(--bone-dim))]">
        <p>
          <strong className="text-[rgb(var(--bone)/0.7)]">Disclaimer.</strong> An
          illustrative record of my own personal trading account, shown for
          transparency and educational purposes only. <em>Not</em> investment
          advice, a research recommendation, or a solicitation to buy, sell or
          copy any trade. Past performance is not indicative of future results;
          derivatives carry substantial risk of loss. I am not a SEBI-registered
          investment adviser.
        </p>
        <p className="num text-[0.8rem] text-[rgb(var(--bone-dim))]">
          Method — reconstructed from my Dhan trade book by FIFO. Headline, calendar
          and curve show <em>gross</em> realized P&L (matching the Dhan app); the
          net-of-charges figure (after brokerage/STT) is shown alongside, and each
          day's drill-down lists both. Risk-adjusted ratios below are computed on the
          net series. The current day is mark-to-market (provisional).
          Stats use settled days only; open-day figures are excluded. Sharpe is per-active-day, annualized
          ×√252 (no-position days excluded, so not calendar-annualized), risk-free
          = 0. Drawdown-% is on a declared capital base. Ratios are shown from a
          small sample ({m?.activeDays ?? 0} active days) and will move materially
          as the record grows. Single account, single regime, no benchmark.
        </p>
      </div>
    </PageShell>
  );
}
