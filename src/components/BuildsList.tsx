import type { Tool } from "@/data/site";

/**
 * Shared "builds" list for /markets and /delta — stacked press-ticket panels,
 * one per tool. Self-bordered, hover→green. Title in serif, one-liner muted,
 * inline link-ink actions. Not press-plate (that's the image-cover card).
 */
export function BuildsList({
  heading,
  intro,
  tools,
}: {
  heading: string;
  intro: string;
  tools: Tool[];
}) {
  return (
    <section className="press-section">
      <h2>{heading}</h2>
      <p className="press-section-sub press-serif">{intro}</p>
      {tools.length > 0 ? (
        <ul style={{ display: "grid", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
          {tools.map((tool) => (
            <li key={tool.title}>
              <div className="press-ticket" style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem 1.5rem" }}>
                <div style={{ minWidth: 0, flex: "1 1 22rem" }}>
                  <div className="press-serif" style={{ fontSize: "1.15rem", color: "var(--p-ink)", lineHeight: 1.2 }}>
                    {tool.title}
                  </div>
                  <p className="press-ticket-sub" style={{ maxWidth: "60ch" }}>{tool.one}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0 1.1rem", flexShrink: 0 }}>
                  {tool.live && (
                    <a href={tool.live} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={{ fontSize: "0.8rem" }}>
                      {tool.liveLabel ?? "Live"} →
                    </a>
                  )}
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={{ fontSize: "0.8rem" }}>
                      Code →
                    </a>
                  )}
                  {tool.verified && (
                    <a href={tool.verified} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={{ fontSize: "0.8rem" }}>
                      Verified ↗
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="press-mono" style={{ color: "var(--p-mute)", fontSize: "0.85rem" }}>
          Nothing shipped here yet.
        </p>
      )}
    </section>
  );
}
