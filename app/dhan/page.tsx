import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { DhanRecord } from "@/components/track/DhanRecord";
import { SITE } from "@/data/site";
import { getTrackRecord } from "@/lib/trackRecord";

export const metadata: Metadata = {
  alternates: { canonical: "/dhan" },
  title: "Dhan track record — Charandeep Kapoor",
  description:
    "Charandeep Kapoor's live Dhan trading track record: aggregate P&L, Sharpe, drawdown and win-rate, updated daily. Illustrative only; not investment advice.",
};

export default async function DhanPage() {
  const data = await getTrackRecord();
  return (
    <PageShell>
      <PageIntro
        kicker="Dhan · live"
        title="The live book"
        lede="A rule-based algorithm, no LLM in the loop, trading my own capital. Rebuilt from the trade book every evening."
      />

      <DhanRecord data={data} />

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
