import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { SITE } from "@/data/site";
import { deriveDhanStats, getTrackRecord } from "@/lib/trackRecord";
import { StockyTrackRecord } from "@/components/StockyTrackRecord";
import { DhanTeaser } from "@/components/track/DhanTeaser";
import { DhanDisclaimer } from "@/components/track/DhanRecord";

export const metadata: Metadata = {
  alternates: { canonical: "/track-record" },
  title: "Live Track Record",
  description:
    "Charandeep Kapoor's live Dhan trading track record: aggregate P&L, Sharpe, drawdown and win-rate, updated daily. Illustrative only; not investment advice.",
};

export default async function TrackRecordPage() {
  const data = await getTrackRecord();
  const { m } = deriveDhanStats(data);

  return (
    <PageShell>
      <PageIntro
        kicker="Stock market"
        title="Real capital, in the open"
        lede="Live Dhan (rule-based algo) and Stocky (AI, verified): the same book I run, shown for transparency."
      />


      <DhanTeaser data={data} />
      <section className="press-section">
        <DhanDisclaimer m={m} />
      </section>

      <StockyTrackRecord />

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
