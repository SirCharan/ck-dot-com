import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { Experience } from "@/components/Experience";
import { ACADEMICS, CERTIFICATIONS, BIO, SITE, SKILLS } from "@/data/site";
import { PROOF } from "@/press/lib/proof";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Charandeep Kapoor, AI Product Manager at Delta Exchange. Experience, skills, education and certifications.",
};

/** Hairline-ruled ledger row: label left, mono detail right. */
function LedgerRow({ title, detail }: { title: string; detail: string }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "1rem",
        borderTop: "1px solid var(--p-line)",
        padding: "0.7rem 0",
      }}
    >
      <span className="press-serif" style={{ fontSize: "1rem", lineHeight: 1.3, color: "var(--p-ink)" }}>
        {title}
      </span>
      <span className="press-mono" style={{ flexShrink: 0, fontSize: "0.78rem", color: "var(--p-mute)" }}>
        {detail}
      </span>
    </li>
  );
}

export default function ResumePage() {
  return (
    <PageShell>
      <PageIntro
        kicker="About"
        title="Background"
        lede="AI Product Manager and Engineer at Delta Exchange. I ship systems that trade real capital, and the products around them."
      />

      <div style={{ maxWidth: "var(--p-max)", margin: "0 auto", padding: "0 clamp(1.1rem, 4vw, 2.5rem)" }}>
        <PrintButton />
      </div>

      <section className="press-section">
        <h2>Profile</h2>
        <div style={{ maxWidth: "64ch", display: "grid", gap: "1rem" }}>
          {BIO.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="press-serif" style={{ fontSize: "1.1rem", lineHeight: 1.65, color: "var(--p-mute)", margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="press-section">
        <h2>By the numbers</h2>
        <div className="press-tickets">
          {PROOF.tickets.map((t) => (
            <a key={t.label} className="press-ticket" href={t.href} target="_blank" rel="noopener noreferrer">
              <div className="press-ticket-val">{t.value}</div>
              <div className="press-ticket-label">{t.label}</div>
              <div className="press-ticket-sub">{t.sub}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="press-section">
        <h2>Skills</h2>
        <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))" }}>
          {SKILLS.map((s) => (
            <div key={s.group} className="press-ledger">
              <div className="press-ledger-head"><span>{s.group}</span></div>
              <ul style={{ display: "grid", gap: "0.35rem", listStyle: "none", padding: 0, margin: 0 }}>
                {s.items.map((i) => (
                  <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "var(--p-mute)" }}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="press-section">
        <h2>History</h2>
        <Experience showKicker={false} />
      </section>

      <section className="press-section">
        <h2>Credentials</h2>
        <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
          <div className="press-ledger">
            <div className="press-ledger-head"><span>Education &amp; honors</span></div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {ACADEMICS.map((a) => (
                <LedgerRow key={a.title} title={a.title} detail={a.detail} />
              ))}
            </ul>
          </div>
          <div className="press-ledger">
            <div className="press-ledger-head"><span>Certifications</span></div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CERTIFICATIONS.map((c) => (
                <LedgerRow key={c.title} title={c.title} detail={c.detail} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="press-section">
        <p className="press-serif" style={{ margin: 0, color: "var(--p-mute)" }}>
          Full profile on{" "}
          <a href={SITE.socials.linkedin} className="link-ink" target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </p>
      </section>
    </PageShell>
  );
}
