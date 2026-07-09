import Link from "next/link";
import type { CaseStudy as CaseStudyData } from "@/data/site";
import { PageShell } from "./PageShell";
import { Viz3D, type VizVariant } from "./viz/Viz3D";

const TONE: Record<string, string> = {
  pos: "text-positive",
  accent: "text-accent",
  neutral: "text-ink",
};

/** Long-form project page driven by a CASE_STUDIES entry. */
export function CaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <PageShell>
      <article className="pb-6">
        {/* Hero */}
        <header className="pt-12 md:pt-16">
          <Link href="/work" className="link-ink num text-xs uppercase tracking-[0.2em]">
            ← Proof of work
          </Link>
          <p className="kicker mt-6 mb-4">{data.kicker}</p>
          <h1 className="display text-4xl leading-[1.05] text-ink md:text-6xl">
            {data.title}
          </h1>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-ink/85">
            {data.tagline}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-mute">
            <div>
              <dt className="sr-only">Role</dt>
              <dd>{data.role}</dd>
            </div>
            <div>
              <dt className="sr-only">Period</dt>
              <dd className="num">{data.period}</dd>
            </div>
          </dl>
        </header>

        {/* Metrics */}
        {data.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.metrics.map((m) => (
              <div key={m.label} className="stat-tile">
                <div className={`num text-2xl md:text-3xl ${TONE[m.tone ?? "neutral"]}`}>
                  {m.value}
                </div>
                <div className="mt-1 text-xs text-mute">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Accent visualization */}
        {data.accent && data.accent !== "none" && (
          <div className="mt-12">
            <Viz3D variant={data.accent as VizVariant} height={320} />
          </div>
        )}

        {/* Body sections */}
        <div className="mt-12 space-y-10">
          {data.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="display text-2xl text-ink md:text-3xl">{s.heading}</h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="max-w-[64ch] leading-relaxed text-ink/85 [&_a]:text-accent [&_a:hover]:underline"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Screenshots */}
        {data.shots && data.shots.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {data.shots.map((shot) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="rounded-xl border border-rule"
              />
            ))}
          </div>
        )}

        {/* Stack + links */}
        <div className="mt-12 border-t border-rule pt-8">
          <div className="flex flex-wrap gap-2">
            {data.stack.map((t) => (
              <span key={t} className="pill num text-xs">
                {t}
              </span>
            ))}
          </div>
          {data.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {data.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </PageShell>
  );
}
