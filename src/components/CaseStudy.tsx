import Link from "next/link";
import type { CaseStudy as CaseStudyData } from "@/data/site";
import { PageShell } from "./PageShell";
import { Viz3D, type VizVariant } from "./viz/Viz3D";
import { Caption, Figure, MetaGutter, Rule } from "./lab/Primitives";

const TONE: Record<string, string> = {
  pos: "text-[rgb(var(--pos))]",
  accent: "text-[rgb(var(--amber))]",
  neutral: "text-[rgb(var(--bone))]",
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Ephemeris case study — a journal entry, not a card stack.
 *
 *  - Hero: a left meta-gutter (role / period / stack as mono meta) beside the
 *    display title + serif tagline.
 *  - Metrics: one hairline-ruled, mono tabular figure block (Tab. 1).
 *  - Accent Viz3D: framed as a captioned Figure.
 *  - Sections: divided by hairline Rules, each § numbered in the gutter, prose
 *    in Newsreader serif at reading measure.
 *  - Screenshots: captioned Figures.
 */
export function CaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <PageShell>
      <article className="pb-8">
        {/* Back link */}
        <div className="pt-12 md:pt-16">
          <Link
            href="/work"
            className="link-ink num text-[11px] uppercase tracking-[0.2em]"
          >
            ← Index / proof of work
          </Link>
        </div>

        {/* Hero — meta gutter + display title + serif tagline */}
        <MetaGutter
          className="mt-8 md:mt-10"
          meta={[
            `§ ${data.slug}`,
            data.role,
            <span key="period" className="num">
              {data.period}
            </span>,
            ...data.stack.slice(0, 6),
          ]}
        >
          <Caption>{data.kicker}</Caption>
          <h1 className="display mt-3 text-[2.4rem] leading-[1.04] text-[rgb(var(--bone))] md:text-[3.9rem]">
            {data.title}
          </h1>
          <p className="mt-5 max-w-[62ch] font-serif text-[1.25rem] leading-[1.6] text-[rgb(var(--bone)/0.86)]">
            {data.tagline}
          </p>
        </MetaGutter>

        {/* Metrics — mono tabular figure block */}
        {data.metrics.length > 0 && (
          <figure className="m-0 mt-12">
            <div className="grid grid-cols-2 border-y border-[rgb(var(--bone)/0.11)] sm:grid-cols-4">
              {data.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`px-4 py-5 ${
                    i % 2 === 0 ? "border-r border-[rgb(var(--bone)/0.11)]" : ""
                  } sm:border-r sm:[&:nth-child(4n)]:border-r-0`}
                >
                  <div
                    className={`num text-[1.9rem] leading-none tracking-tight md:text-[2.2rem] ${
                      TONE[m.tone ?? "neutral"]
                    }`}
                  >
                    {m.value}
                  </div>
                  <Caption className="mt-2 block">{m.label}</Caption>
                </div>
              ))}
            </div>
            <figcaption className="mt-2.5">
              <Caption>Tab. 1 — key metrics</Caption>
            </figcaption>
          </figure>
        )}

        {/* Accent visualization — captioned figure */}
        {data.accent && data.accent !== "none" && (
          <Figure
            className="mt-12"
            label="Fig. 1"
            caption={`accent field · ${data.accent}`}
          >
            <Viz3D variant={data.accent as VizVariant} height={320} />
          </Figure>
        )}

        {/* Body sections — hairline-ruled, § numbered in the gutter */}
        <div className="mt-14">
          {data.sections.map((s, i) => (
            <section key={s.heading} className={i === 0 ? "" : "mt-12"}>
              <Rule className="mb-8" />
              <MetaGutter meta={[`§ ${pad(i + 1)}`]}>
                <h2 className="display text-[1.6rem] text-[rgb(var(--bone))] md:text-[1.9rem]">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="max-w-[64ch] font-serif text-[1.125rem] leading-[1.65] text-[rgb(var(--bone)/0.84)] [&_a]:link-ink"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                </div>
              </MetaGutter>
            </section>
          ))}
        </div>

        {/* Screenshots — captioned figures */}
        {data.shots && data.shots.length > 0 && (
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {data.shots.map((shot, i) => (
              <Figure key={shot.src} label={`Fig. ${i + 2}`} caption={shot.alt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="w-full shadow-[0_0_0_1px_rgb(var(--bone)/0.09)]"
                />
              </Figure>
            ))}
          </div>
        )}

        {/* Screenshot-pending — a captioned live-deployment plate (swaps for a real shot) */}
        {data.shotsPending && (!data.shots || data.shots.length === 0) && (
          <Figure
            className="mt-14"
            label="Fig. 2"
            caption={
              data.links[0]
                ? `live deployment · ${new URL(data.links[0].href).host}`
                : "internal system · screenshot forthcoming"
            }
          >
            {data.links[0] ? (
              <a
                href={data.links[0].href}
                target="_blank"
                rel="noreferrer"
                className="group grid h-56 place-items-center border border-dashed border-[rgb(var(--bone)/0.16)] transition-colors hover:border-[rgb(var(--amber)/0.5)]"
              >
                <span className="num text-[0.8rem] uppercase tracking-[0.14em] text-[rgb(var(--bone-dim))] group-hover:text-[rgb(var(--amber))]">
                  ▶ view live · {new URL(data.links[0].href).host}
                </span>
              </a>
            ) : (
              <div className="grid h-56 place-items-center border border-dashed border-[rgb(var(--bone)/0.16)]">
                <span className="num text-[0.8rem] uppercase tracking-[0.14em] text-[rgb(var(--bone-dim))]">
                  internal system · not publicly hosted
                </span>
              </div>
            )}
          </Figure>
        )}

        {/* Colophon — full stack + links */}
        <div className="mt-14">
          <Rule className="mb-6" />
          <MetaGutter meta={["§ colophon"]}>
            <Caption className="text-[rgb(var(--bone))]">Stack</Caption>
            <p className="num mt-2 max-w-[62ch] text-[0.85rem] leading-relaxed text-[rgb(var(--bone-dim))]">
              {data.stack.join("  ·  ")}
            </p>
            {data.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {data.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-ink num text-[0.85rem]"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </MetaGutter>
        </div>
      </article>
    </PageShell>
  );
}
