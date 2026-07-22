import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy as CaseStudyData } from "@/data/site";
import { PressShell, PressFrame } from "@/press/components/PressShell";

/** No em-dashes in rendered copy (cross-surface rule): use a colon. */
const stripEm = (s: string) => s.replace(/\s*—\s*/g, ": ");

const section: CSSProperties = {
  borderTop: "1px solid var(--p-line)",
  marginTop: "2.75rem",
  paddingTop: "2.5rem",
};
const h2: CSSProperties = {
  fontSize: "clamp(1.5rem, 3.2vw, 2.1rem)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
  margin: "0 0 1rem",
};
const shotBox: CSSProperties = {
  position: "relative",
  aspectRatio: "16 / 10",
  border: "1px solid var(--p-line)",
  borderRadius: 6,
  overflow: "hidden",
  background: "var(--p-elev)",
};
const cover: CSSProperties = { objectFit: "cover", objectPosition: "top" };

export function CaseStudy({
  data,
  prev,
  next,
}: {
  data: CaseStudyData;
  prev?: CaseStudyData | null;
  next?: CaseStudyData | null;
}) {
  const shots = data.shots ?? [];
  const link = data.links[0];
  const host = link ? new URL(link.href).host : null;

  const near: { node: CaseStudyData; label: string }[] = [];
  if (prev && prev.slug !== data.slug) near.push({ node: prev, label: "Previous" });
  if (next && next.slug !== data.slug && next.slug !== prev?.slug)
    near.push({ node: next, label: "Next" });

  return (
    <PressShell>
      <article style={{ paddingBottom: "1rem" }}>
        <Link
          href="/work"
          className="press-mono link-ink"
          style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}
        >
          ← Proof of work
        </Link>

        <PressFrame kicker={stripEm(data.kicker)} title={stripEm(data.title)} lede={stripEm(data.tagline)} />

        <p
          className="press-mono"
          style={{ margin: "0 0 0.5rem", color: "var(--p-mute)", fontSize: "0.85rem", lineHeight: 1.6 }}
        >
          {[stripEm(data.role), data.period, data.stack.slice(0, 6).join(" · ")].join("  ·  ")}
        </p>

        {data.metrics.length > 0 && (
          <div className="press-tickets" style={{ marginTop: "2rem" }}>
            {data.metrics.map((m) => (
              <div key={m.label} className="press-ticket">
                <div className="press-ticket-val press-mono">{m.value}</div>
                <div className="press-ticket-label press-mono">{stripEm(m.label)}</div>
              </div>
            ))}
          </div>
        )}

        {data.sections.map((s) => (
          <section key={s.heading} style={section}>
            <h2 style={h2}>{stripEm(s.heading)}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {s.body.map((p, j) => (
                <p
                  key={j}
                  className="press-serif [&_a]:link-ink"
                  style={{
                    margin: 0,
                    maxWidth: "64ch",
                    fontSize: "1.075rem",
                    lineHeight: 1.65,
                    color: "var(--p-ink)",
                  }}
                  dangerouslySetInnerHTML={{ __html: stripEm(p) }}
                />
              ))}
            </div>
          </section>
        ))}

        {shots.length > 0 ? (
          <div style={section}>
            <div style={shotBox}>
              <Image
                src={shots[0].src}
                alt={stripEm(shots[0].alt)}
                fill
                sizes="(min-width: 72rem) 72rem, 100vw"
                style={cover}
              />
            </div>
            {shots.length > 1 && (
              <div
                style={{
                  display: "grid",
                  gap: "1.5rem",
                  marginTop: "1.5rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
                }}
              >
                {shots.slice(1).map((s) => (
                  <figure key={s.src} style={{ margin: 0 }}>
                    <div style={shotBox}>
                      <Image
                        src={s.src}
                        alt={stripEm(s.alt)}
                        fill
                        sizes="(min-width: 900px) 45vw, 100vw"
                        style={cover}
                      />
                    </div>
                    <figcaption
                      className="press-mono"
                      style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--p-faint)" }}
                    >
                      {stripEm(s.alt)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        ) : (
          data.shotsPending && (
            <div className="press-ledger" style={{ marginTop: "2.75rem" }}>
              <div className="press-ledger-head press-mono">
                <span>Live system</span>
                <span>{host ?? "internal"}</span>
              </div>
              <p className="press-mono" style={{ margin: 0, color: "var(--p-mute)", fontSize: "0.9rem" }}>
                Screenshots forthcoming. See it running.
              </p>
              {link && (
                <div className="press-ledger-foot press-mono">
                  <a className="link-ink" href={link.href} target="_blank" rel="noreferrer">
                    Open {host} ↗
                  </a>
                </div>
              )}
            </div>
          )
        )}

        <section style={section}>
          <h2 style={h2}>Colophon</h2>
          <div className="press-ledger">
            <div className="press-ledger-head press-mono">
              <span>Stack</span>
              <span>{data.period}</span>
            </div>
            <p
              className="press-mono"
              style={{ margin: 0, color: "var(--p-mute)", fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {data.stack.join("  ·  ")}
            </p>
            {data.links.length > 0 && (
              <div className="press-ledger-foot press-mono">
                {data.links.map((l) => (
                  <a key={l.href} className="link-ink" href={l.href} target="_blank" rel="noreferrer">
                    {stripEm(l.label)} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {near.length > 0 && (
          <section style={section}>
            <h2 style={h2}>More work</h2>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
              }}
            >
              {near.map(({ node, label }) => (
                <Link key={node.slug} href={`/work/${node.slug}`} className="press-plate">
                  {node.shots?.[0] && (
                    <div className="press-plate-media">
                      <Image
                        src={node.shots[0].src}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 40vw, 100vw"
                        style={cover}
                      />
                    </div>
                  )}
                  <div className="press-plate-body">
                    <p
                      className="press-mono"
                      style={{
                        margin: "0 0 0.35rem",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--p-faint)",
                      }}
                    >
                      {label} →
                    </p>
                    <h3>{stripEm(node.title)}</h3>
                    <p>{stripEm(node.kicker)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PressShell>
  );
}
