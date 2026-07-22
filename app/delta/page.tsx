import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { BuildsList } from "@/components/BuildsList";
import { EXPERIENCE, TOOLS } from "@/data/site";

export const metadata: Metadata = {
  title: "Work at Delta Exchange",
  description:
    "AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange. I build perpetual futures, options, and the AI features across the trading and research stack.",
};

const deltaRoles = EXPERIENCE.filter((e) => e.company === "Delta Exchange");
const deltaTools = TOOLS.filter((t) => t.tags?.includes("Delta"));

export default function DeltaPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Delta Exchange"
        title="Building at Delta Exchange"
        lede="I'm an AI Product Manager at Delta Exchange, India's largest crypto derivatives exchange. I work on perpetual futures, options, and the AI features that run across the trading and research stack."
      />

      <section className="press-section">
        <h2>Roles</h2>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {deltaRoles.map((exp) => (
            <div key={exp.duration} className="press-ledger">
              <div className="press-ledger-head">
                <span>{exp.position}</span>
                <span>{exp.duration}</span>
              </div>
              <p style={{ color: "var(--p-ink)", lineHeight: 1.5, margin: 0 }}>{exp.one}</p>
              {exp.bullets && (
                <ul style={{ marginTop: "0.75rem", display: "grid", gap: "0.4rem", listStyle: "none", padding: 0 }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.7rem", lineHeight: 1.5, color: "var(--p-mute)" }} className="[&_a]:link-ink">
                      <span style={{ color: "var(--p-faint)", flexShrink: 0 }} aria-hidden>·</span>
                      <span dangerouslySetInnerHTML={{ __html: b.html }} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <BuildsList
        heading="Shipped at Delta"
        intro="AI and trading tools built on the Delta stack."
        tools={deltaTools}
      />

      <section className="press-section">
        <p className="press-section-sub press-serif" style={{ margin: 0 }}>
          More on how exchanges and perpetuals actually work in my{" "}
          <a href="/blog" className="link-ink">writing →</a>
        </p>
      </section>
    </PageShell>
  );
}
