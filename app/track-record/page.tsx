import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { PnlCalendarInteractive } from "@/components/track/PnlCalendarInteractive";
import { ClientOnly } from "@/components/lab/ClientOnly";
import { inr } from "@/lib/format";
import { SITE } from "@/data/site";
import { getTrackRecord, curveValue, formatWindowStart } from "@/lib/trackRecord";
import { StockyTrackRecord } from "@/components/StockyTrackRecord";
import { EquityCurveSvg } from "@/components/lab/EquityCurveSvg";
import { CurveReveal } from "@/components/lab/CurveReveal";

const pctY = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

export const metadata: Metadata = {
  alternates: { canonical: "/track-record" },
  title: "Live Track Record",
  description:
    "Charandeep Kapoor's live Dhan trading track record: aggregate P&L, Sharpe, drawdown and win-rate, updated daily. Illustrative only; not investment advice.",
};

export default async function TrackRecordPage() {
  const data = await getTrackRecord();
  const m = data?.metrics;
  // Ratios show as soon as there is any settled data (no 30-day gate).
  // Individual ratios still null-guard (Sharpe/Sortino need >=2 active days).
  const gated = !m;

  // Headline is RETURN % (capital-based); rupee figures move to the fine print.
  const grossVal = m?.grossCumulative ?? m?.cumulative ?? null;
  const e0 = data?.meta?.e0 ?? 0;
  const retPctStr =
    grossVal != null && e0 > 0 ? `${grossVal >= 0 ? "+" : ""}${((grossVal / e0) * 100).toFixed(1)}%` : "n/a";
  const inrSub =
    grossVal != null
      ? `gross ${inr(grossVal)}${m?.cumulative != null ? ` · net ${inr(m.cumulative)}` : ""}`
      : "";
  const sharpeStr = m?.sharpeAnnualized != null ? m.sharpeAnnualized.toFixed(2) : "n/a";
  const ddStr = !gated && m?.maxDrawdown != null ? inr(-Math.abs(m.maxDrawdown)) : "n/a";
  const winStr = !gated && m?.positiveDays != null ? `${Math.round(m.positiveDays * 100)}%` : "n/a";
  const daysStr = m ? String(m.activeDays) : "n/a";
  const asOfStr = data?.asOf ?? "n/a";
  const since = formatWindowStart(data?.meta?.from);

  const KPIS: { value: string; label: string; sub?: string }[] = [
    { value: retPctStr, label: "Return", sub: inrSub },
    { value: sharpeStr, label: "Sharpe" },
    { value: ddStr, label: "Max drawdown" },
    { value: winStr, label: "Win days" },
    { value: daysStr, label: "Active days" },
    { value: asOfStr, label: "As of" },
  ];

  const RATIOS = !gated && m
    ? [
        { v: m.sortino != null ? m.sortino.toFixed(2) : "n/a", l: "Sortino" },
        { v: m.calmar != null ? m.calmar.toFixed(2) : "n/a", l: "Calmar" },
        { v: m.profitFactor != null ? m.profitFactor.toFixed(2) : "n/a", l: "Profit factor" },
        { v: m.expectancy != null ? inr(m.expectancy) : "n/a", l: "Expectancy / day" },
        { v: m.annualizedReturnPct != null ? `${m.annualizedReturnPct.toFixed(1)}%` : "n/a", l: "Ann. return" },
        { v: m.volatilityAnnualizedPct != null ? `${m.volatilityAnnualizedPct.toFixed(1)}%` : "n/a", l: "Ann. volatility" },
        { v: `${m.maxWinStreak}d`, l: "Win streak" },
        { v: `${m.maxLossStreak}d`, l: "Loss streak" },
        { v: m.recoveryFactor != null ? m.recoveryFactor.toFixed(2) : "n/a", l: "Recovery factor" },
      ]
    : [];

  const caption = { fontSize: "0.72rem", color: "var(--p-faint)", marginTop: "0.75rem" } as const;

  return (
    <PageShell>
      <PageIntro
        kicker="Track record"
        title="Real capital, in the open"
        lede="Stocky (AI, verified) and live Dhan (rule-based algo): the same book I run, shown for transparency."
      />

      <StockyTrackRecord />

      <section className="press-section">
        <h2>Dhan, the live book</h2>
        <div className="press-ledger-head press-mono" style={{ maxWidth: "34rem" }}>
          <span>Dhan · live</span>
          <span>algorithmic</span>
        </div>
        <p className="press-section-sub press-serif">
          Rule-based algo. No LLM. Rebuilt daily from the Dhan trade book.
        </p>

        {/* Account metrics */}
        <div className="press-tickets">
          {KPIS.map((k) => (
            <div key={k.label} className="press-ticket">
              <div className="press-ticket-val press-mono">{k.value}</div>
              <div className="press-ticket-label press-mono">{k.label}</div>
              {k.sub && <div className="press-ticket-sub press-mono">{k.sub}</div>}
            </div>
          ))}
        </div>
        <p className="press-mono" style={caption}>
          Account metrics · refreshed daily{data ? "" : " · awaiting first settled day"}
        </p>
        {since && (
          <p className="press-mono" style={{ ...caption, maxWidth: "62ch" }}>
            Window: {since} onward. The book traded before that date; those days are
            excluded here.
          </p>
        )}

        {/* Equity curve */}
        <div className="press-ledger" style={{ marginTop: "2.5rem" }}>
          <div className="press-ledger-head press-mono">
            <span>Cumulative return · % of capital{since ? ` · since ${since}` : ""}</span>
            <span style={{ whiteSpace: "nowrap" }}>{asOfStr}</span>
          </div>
          {data && data.series.length >= 2 ? (
            <CurveReveal>
            <EquityCurveSvg
              series={data.series}
              valueOf={(s) => (e0 > 0 ? (curveValue(s) / e0) * 100 : 0)}
              height={280}
              showAxes
              formatY={pctY}
              formatAnnot={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`}
              glow={false}
              provisional={data.provisional}
              annotate
              tipLabel={retPctStr === "n/a" ? undefined : retPctStr}
              showDayCount
              zeroOrigin
            />
            </CurveReveal>
          ) : (
            <div
              className="press-mono"
              style={{
                height: 240,
                display: "grid",
                placeItems: "center",
                border: "1px dashed var(--p-line)",
                borderRadius: 6,
                color: "var(--p-mute)",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              accumulating from live data
            </div>
          )}
          <div className="press-ledger-foot press-mono">
            <span>{e0 > 0 ? inr(e0) : "n/a"} base · gross</span>
            {data?.provisional && <span>dashed tip = today (provisional)</span>}
          </div>
        </div>

        {/* Daily P&L calendar */}
        <div className="press-ledger" style={{ marginTop: "1.5rem" }}>
          <div className="press-ledger-head press-mono">
            <span>Daily P&amp;L · gross</span>
            <span>green profit / red loss</span>
          </div>
          {data && data.series.length > 0 ? (
            <ClientOnly fallback={<div className="h-[116px]" aria-hidden />}>
              <PnlCalendarInteractive
                series={data.series.map((s) => ({ date: s.date, net: s.gross ?? s.net }))}
              />
            </ClientOnly>
          ) : (
            <div
              className="press-mono"
              style={{
                height: 112,
                display: "grid",
                placeItems: "center",
                border: "1px dashed var(--p-line)",
                borderRadius: 6,
                color: "var(--p-mute)",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              accumulating from live data
            </div>
          )}
          <div className="press-ledger-foot press-mono">
            <span>Click a day for its trades.</span>
          </div>
        </div>

        {/* Risk-adjusted ratios */}
        {RATIOS.length > 0 ? (
          <>
            <div className="press-tickets" style={{ marginTop: "2.5rem" }}>
              {RATIOS.map((r) => (
                <div key={r.l} className="press-ticket">
                  <div className="press-ticket-val press-mono">{r.v}</div>
                  <div className="press-ticket-label press-mono">{r.l}</div>
                </div>
              ))}
            </div>
            <p className="press-mono" style={caption}>
              Risk-adjusted ratios · per active day
              {m ? ` · N=${m.activeDays} days (small sample)` : ""}
            </p>
          </>
        ) : (
          <p className="press-mono" style={{ ...caption, marginTop: "2.5rem" }}>
            Ratios accumulating from live data.
          </p>
        )}

        {/* Disclaimer + method notes */}
        <div className="press-serif" style={{ marginTop: "3rem", maxWidth: "70ch", color: "var(--p-mute)", fontSize: "0.9rem", lineHeight: 1.65 }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--p-ink)" }}>Disclaimer.</strong> An illustrative record
            of my own personal trading account, shown for transparency and educational purposes
            only. <em>Not</em> investment advice, a research recommendation, or a solicitation to
            buy, sell or copy any trade. Past performance is not indicative of future results;
            derivatives carry substantial risk of loss. I am not a SEBI-registered investment
            adviser.
          </p>
          <p className="press-mono" style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--p-faint)", lineHeight: 1.6 }}>
            Method: reconstructed from my Dhan trade book by FIFO. Headline, calendar and curve
            show <em>gross</em> realized P&amp;L (matching the Dhan app); the net-of-charges figure
            (after brokerage/STT) is shown alongside, and each day&apos;s drill-down lists both.
            Risk-adjusted ratios are computed on the net series. The current day is
            mark-to-market (provisional). Stats use settled days only; open-day figures are
            excluded. Sharpe is per-active-day, annualized by root-252 (no-position days excluded,
            so not calendar-annualized), risk-free = 0. Drawdown-% is on a declared capital base.
            Ratios come from a small sample ({m?.activeDays ?? 0} active days) and will move
            materially as the record grows. Single account, single regime, no benchmark.
          </p>
        </div>
      </section>

      <section className="press-section">
        <p className="press-serif" style={{ margin: 0, color: "var(--p-mute)", fontSize: "1.05rem" }}>
          Want to run this yourself?{" "}
          <a className="link-ink" href={SITE.socials.topmate} target="_blank" rel="noreferrer">
            Mirror this book on your own account ↗
          </a>
        </p>
      </section>
    </PageShell>
  );
}
