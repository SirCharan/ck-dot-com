import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { EXPERIENCE, TOOLS } from "@/data/site";

export const metadata: Metadata = {
  title: "Work at Delta Exchange",
  description:
    "AI Product Manager at Delta Exchange — building perpetual futures and AI-driven trading products at India's largest crypto derivatives exchange.",
};

const deltaRoles = EXPERIENCE.filter((e) => e.company === "Delta Exchange");
const deltaTools = TOOLS.filter((t) => t.tags?.includes("Delta"));

export default function DeltaPage() {
  return (
    <PageShell>
      <PageIntro
        kicker="Delta Exchange"
        title="Building at Delta Exchange"
        lede="I'm an AI Product Manager at Delta Exchange — India's largest crypto derivatives exchange. I work on perpetual futures, options, and the AI/LLM features that sit across the trading and research stack."
      />

      <section className="py-8 rule">
        <p className="kicker mb-6">Roles</p>
        <ul className="space-y-7">
          {deltaRoles.map((exp) => (
            <li key={exp.duration} className="grid grid-cols-1 gap-2 md:grid-cols-[12rem_1fr] md:gap-8">
              <div>
                <div className="display text-lg leading-tight text-ink">{exp.position}</div>
                <div className="num mt-0.5 text-sm text-mute">{exp.duration}</div>
              </div>
              <div>
                <p className="text-base leading-relaxed text-ink/90">{exp.one}</p>
                {exp.bullets && (
                  <ul className="mt-3 space-y-1.5 text-[0.95rem] text-ink/85">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed [&_a]:link-ink">
                        <span className="mt-1.5 shrink-0 text-mute">·</span>
                        <span dangerouslySetInnerHTML={{ __html: b.html }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {deltaTools.length > 0 && (
        <section className="py-10 rule">
          <p className="kicker mb-6">Builds</p>
          <ul className="divide-y divide-rule">
            {deltaTools.map((tool) => (
              <li key={tool.title} className="grid grid-cols-1 items-baseline gap-2 py-5 md:grid-cols-[1fr_auto] md:gap-6">
                <div>
                  <div className="display text-lg leading-snug text-ink">{tool.title}</div>
                  <p className="mt-1 max-w-[58ch] text-sm leading-relaxed text-mute">{tool.one}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4 text-sm">
                  {tool.live && (
                    <a href={tool.live} target="_blank" rel="noopener noreferrer" className="link-ink">
                      {tool.liveLabel ?? "Live"} →
                    </a>
                  )}
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer" className="link-ink">
                      Code →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="py-10">
        <p className="text-base text-mute">
          More on how exchanges and perpetuals actually work in my{" "}
          <a href="/blog" className="link-ink">
            writings
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
