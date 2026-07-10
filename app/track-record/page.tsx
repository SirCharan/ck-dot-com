import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { Caption, MetaGutter, Rule } from "@/components/lab/Primitives";
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
  pos: "text-[rgb(var(--pos))]",
  accent: "text-[rgb(var(--amber))]",
  neg: "text-[rgb(var(--neg))]",
  neutral: "text-[rgb(var(--bone))]",
};

export default function TrackRecordPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Live track record"
        title="My Dhan account, in the open"
        lede="Real capital, real trades on my Dhan account — P&L, Sharpe, drawdown and win-rate, refreshed daily. Full transparency, nothing curated."
      />

      {/* KPIs — mono tabular figure block */}
      <figure className="m-0">
        <div className="grid grid-cols-2 border-y border-[rgb(var(--bone)/0.11)] sm:grid-cols-3">
          {KPIS.map((k, i) => (
            <div
              key={k.label}
              className={`px-4 py-5 ${
                i % 2 === 0 ? "border-r border-[rgb(var(--bone)/0.11)]" : ""
              } sm:border-r sm:[&:nth-child(3n)]:border-r-0 ${
                i < KPIS.length - 2 ? "border-b border-[rgb(var(--bone)/0.11)] sm:border-b-0" : ""
              }`}
            >
              <div
                className={`num text-[2rem] leading-none tracking-tight tabular-nums md:text-[2.4rem] ${TONE[k.tone]}`}
              >
                {k.value}
              </div>
              <Caption className="mt-2 block">{k.label}</Caption>
            </div>
          ))}
        </div>
        <figcaption className="mt-2.5">
          <Caption>Tab. 1 — account metrics · refreshed daily</Caption>
        </figcaption>
      </figure>

      {/* Equity curve — captioned figure placeholder (Phase 3: Recharts) */}
      <figure className="m-0 mt-12">
        <div className="grid h-64 place-items-center border border-dashed border-[rgb(var(--bone)/0.14)]">
          <span className="num text-[0.75rem] uppercase tracking-[0.15em] text-[rgb(var(--bone-dim))]">
            equity curve — live data wiring in progress
          </span>
        </div>
        <figcaption className="mt-2.5">
          <Caption>Fig. 1 — cumulative equity · ₹ · to be wired</Caption>
        </figcaption>
      </figure>

      {/* Follow / book CTA — the one amber CTA, hairline band (no card) */}
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

      {/* Disclaimer */}
      <p className="mt-12 max-w-[70ch] font-serif text-[0.9rem] leading-relaxed text-[rgb(var(--bone-dim))]">
        <strong className="text-[rgb(var(--bone)/0.7)]">Disclaimer.</strong> This is
        an illustrative record of my own personal trading account, shown for
        transparency and educational purposes only. It is <em>not</em> investment
        advice, a research recommendation, or a solicitation to buy or sell any
        security or to copy any trade. Past performance is not indicative of future
        results; trading in derivatives carries substantial risk of loss. I am not a
        SEBI-registered investment adviser. Make your own decisions or consult a
        registered adviser.
      </p>
    </PageShell>
  );
}
