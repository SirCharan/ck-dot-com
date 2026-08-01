import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PrintButton } from "@/components/PrintButton";
import { RESUME, type ResumeRole } from "@/data/resume";

export const metadata: Metadata = {
  alternates: { canonical: "/resume" },
  title: "Résumé",
  description:
    "Charandeep Kapoor, AI Product Manager at Delta Exchange. One page: shipped AI systems, experience, skills, education and certifications.",
};

/** Strip scheme and www so a printed link reads as a plain host, not a URL. */
function host(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

/** Hostname only. A long path would dominate the record's right-hand slot. */
function hostOnly(url: string): string {
  return host(url).split("/")[0];
}

/**
 * Rail row. Stacked, not a two-column register: the rail is too narrow to hold
 * title and detail side by side without the title wrapping and going ragged.
 * `data` sets ranks and dates in mono (they are data); `text` keeps prose in
 * sans, because mono on prose is a costume.
 */
function Row({
  title,
  detail,
  variant = "data",
}: {
  title: string;
  detail: string;
  variant?: "data" | "text";
}) {
  return (
    <li className="resume-row">
      <span className="resume-row-title">{title}</span>
      {detail ? (
        <span className={variant === "data" ? "resume-row-detail" : "resume-row-note"}>
          {detail}
        </span>
      ) : null}
    </li>
  );
}

function Record({ role }: { role: ResumeRole }) {
  return (
    <article className="resume-rec">
      <div className="resume-rec-head">
        <h3 className="resume-rec-name">
          {role.company}
          <span className="resume-rec-role">{role.position}</span>
        </h3>
        <span className="resume-rec-when">{role.duration}</span>
      </div>
      {role.bullets?.length ? (
        <ul className="resume-rec-bullets">
          {role.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {role.one ? <p className="resume-rec-one">{role.one}</p> : null}
    </article>
  );
}

export default function ResumePage() {
  const { name, title, contact, profile, systems, experience, skills, academics, certifications } =
    RESUME;

  return (
    <PageShell>
      <div className="resume">
        <header>
          <h1 className="resume-name">{name}</h1>
          <p className="resume-title">{title}</p>
          <ul className="resume-contact">
            {contact.phone ? <li>{contact.phone}</li> : null}
            {/* Literal address, not a label: an ATS can only parse what is
                actually in the text. */}
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={`https://${contact.site}`}>{contact.site}</a>
            </li>
            {/* Named links, not raw hosts. The PDF keeps them as real link
                annotations, so they stay clickable in a viewer. */}
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
          </ul>
          <div style={{ marginTop: "1.1rem" }}>
            <PrintButton />
          </div>
        </header>

        {/* Rail is FIRST in source so the PDF text layer extracts linearly for
            ATS parsers; the grid places it in the right-hand column. */}
        <div className="resume-grid">
          <aside className="resume-rail">
            <section className="resume-block">
              <h2>Skills</h2>
              <dl className="resume-rail-list">
                {skills.map((g) => (
                  <div key={g.group} className="resume-skill-group">
                    <dt>{g.group}</dt>
                    <dd>{g.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="resume-block">
              <h2>Education &amp; honours</h2>
              <ul className="resume-rail-list" style={{ gap: 0 }}>
                {academics.map((a) => (
                  <Row key={a.title} title={a.title} detail={a.detail} />
                ))}
              </ul>
            </section>

            <section className="resume-block">
              <h2>Certifications</h2>
              <ul className="resume-rail-list" style={{ gap: 0 }}>
                {certifications.map((c) => (
                  <Row key={c.title} title={c.title} detail={c.detail} variant="text" />
                ))}
              </ul>
            </section>
          </aside>

          <main className="resume-main">
            <section className="resume-block">
              <h2>Summary</h2>
              <p className="resume-profile">{profile}</p>
            </section>

            <section className="resume-block">
              <h2>Selected systems</h2>
              {systems.map((s) => (
                <article key={s.name} className="resume-rec">
                  <div className="resume-rec-head">
                    <h3 className="resume-rec-name">
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer">
                          {s.name}
                        </a>
                      ) : (
                        s.name
                      )}
                    </h3>
                    {/* The host prints as readable text, so the link survives paper. */}
                    {s.href || s.hrefLabel ? (
                      <span className="resume-rec-when">
                        {s.hrefLabel ?? hostOnly(s.href ?? "")}
                      </span>
                    ) : null}
                  </div>
                  <p className="resume-rec-line">
                    {s.line}
                    {s.proof ? (
                      <>
                        {" "}
                        <a
                          className="resume-proof"
                          href={s.proof.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.proof.label}
                        </a>
                      </>
                    ) : null}
                  </p>
                </article>
              ))}
            </section>

            <section className="resume-block">
              <h2>Experience</h2>
              {experience.map((role) => (
                <Record key={`${role.company}-${role.duration}`} role={role} />
              ))}
            </section>
          </main>
        </div>
      </div>
    </PageShell>
  );
}
