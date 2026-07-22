import { RESEARCH } from "@/data/site";

export function Research() {
  if (RESEARCH.length === 0) return null;
  return (
    <section className="press-section" id="research">
      <h2>Research</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {RESEARCH.map((r, i) => (
          <li
            key={r.title}
            style={{
              padding: "1.15rem 0",
              borderBottom: i === RESEARCH.length - 1 ? "none" : "1px solid var(--p-line)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem 0.85rem" }}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="press-serif"
                style={{ fontSize: "1.15rem", color: "var(--p-ink)", textDecoration: "none", lineHeight: 1.25 }}
              >
                {r.title} <span className="press-mono" style={{ color: "var(--p-go)" }}>↗</span>
              </a>
              <span className="press-mono" style={{ fontSize: "0.72rem", color: "var(--p-faint)" }}>
                {r.venue}
              </span>
            </div>
            <p className="press-ticket-sub" style={{ maxWidth: "62ch" }}>
              {r.one}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
