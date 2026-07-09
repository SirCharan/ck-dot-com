import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Live Track Record",
  description:
    "Charandeep Kapoor's live Dhan trading track record — P&L, Sharpe, drawdown and win-rate, updated daily. Illustrative only; not investment advice.",
};

// Phase 0 placeholder KPIs. Phase 3 replaces this with a daily fetch of
// zerodha-tg-bot's /api/dhan/track-record (real ₹ series + computed metrics).
const KPIS = [
  { value: "—", label: "Net P&L (₹)", tone: "pos" },
  { value: "—", label: "Sharpe ratio", tone: "accent" },
  { value: "—", label: "Max drawdown", tone: "neg" },
  { value: "—", label: "Win rate", tone: "accent" },
  { value: "—", label: "Trades", tone: "neutral" },
  { value: "—", label: "Track length", tone: "neutral" },
];

const TONE: Record<string, string> = {
  pos: "text-positive",
  accent: "text-accent",
  neg: "text-[rgb(var(--neg))]",
  neutral: "text-ink",
};

export default function TrackRecordPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Live track record"
        title="My Dhan account, in the open"
        lede="Real capital, real trades on my Dhan account — P&L, Sharpe, drawdown and win-rate, refreshed daily. Full transparency, nothing curated."
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {KPIS.map((k) => (
          <div key={k.label} className="stat-tile">
            <div className={`num text-2xl md:text-3xl ${TONE[k.tone]}`}>{k.value}</div>
            <div className="mt-1 text-xs text-mute">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Equity curve placeholder (Phase 3: Recharts from live series) */}
      <div className="mt-8 grid h-64 place-items-center rounded-xl border border-dashed border-rule text-sm text-mute">
        Equity curve — live data wiring in progress
      </div>

      {/* Copy / book CTA */}
      <section className="glass mt-10 rounded-xl p-6">
        <h2 className="display text-2xl text-ink">Want to follow these trades?</h2>
        <p className="mt-3 max-w-[60ch] text-ink/85">
          I share how I run this book and how you can mirror it on your own account.
          Book a call and I&apos;ll walk you through the setup.
        </p>
        <a
          href={SITE.socials.topmate}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-lg bg-[rgb(var(--accent))] px-5 py-2.5 font-medium text-[rgb(var(--surface-0))] transition-opacity hover:opacity-90"
        >
          Book a call on Topmate ↗
        </a>
      </section>

      {/* Disclaimer */}
      <p className="mt-8 max-w-[70ch] text-xs leading-relaxed text-mute">
        <strong className="text-ink/70">Disclaimer.</strong> This is an illustrative
        record of my own personal trading account, shown for transparency and
        educational purposes only. It is <em>not</em> investment advice, a
        research recommendation, or a solicitation to buy or sell any security or
        to copy any trade. Past performance is not indicative of future results;
        trading in derivatives carries substantial risk of loss. I am not a
        SEBI-registered investment adviser. Make your own decisions or consult a
        registered adviser.
      </p>
    </PageShell>
  );
}
