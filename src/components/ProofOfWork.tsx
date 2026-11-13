"use client";

import { useMemo, useState } from "react";
import { TOOLS, TOOL_TAGS, ERAS, type Tool, type EraKey } from "@/data/site";

/**
 * Proof of Work: the full index as a timeline. Eras (newest first) head each
 * group; each build is one row under the role I held when it shipped. Builds
 * with no clear era sit in a final "Also" group. Content is always visible
 * (no entrance opacity gate); the tag filter just hides rows.
 */

const FILTERS = ["All", ...TOOL_TAGS] as const;

const STATUS_NOTE: Partial<Record<Tool["status"], string>> = {
  verified: "Verified",
  archived: "Archived",
  building: "In progress",
};

const LINK_STYLE = {
  fontSize: "0.8rem",
  display: "inline-flex",
  alignItems: "center",
  minHeight: 44,
} as const;

function ToolRow({ tool }: { tool: Tool }) {
  const archived = tool.status === "archived";
  const note = STATUS_NOTE[tool.status];
  return (
    <li className="pw-row" style={{ opacity: archived ? 0.6 : 1 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.3rem 0.9rem" }}>
        {tool.status === "live" && (
          <span className="press-live-dot" role="img" aria-label="Live" />
        )}
        <span className="press-serif" style={{ fontSize: "1.2rem", color: "var(--p-ink)", lineHeight: 1.25 }}>
          {tool.title}
        </span>
        {note && (
          <span
            className="press-mono"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tool.status === "verified" ? "var(--p-metal)" : "var(--p-mute)",
            }}
          >
            {note}
          </span>
        )}
        {tool.tags && (
          <span style={{ display: "flex", flexWrap: "wrap", gap: "0 0.75rem" }}>
            {tool.tags.map((t) => (
              <span
                key={t}
                className="press-mono"
                style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--p-faint)" }}
              >
                {t}
              </span>
            ))}
          </span>
        )}
      </div>
      <p className="press-ticket-sub" style={{ maxWidth: "64ch" }}>
        {tool.one}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 1.25rem" }}>
        {tool.live && (
          <a href={tool.live} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={LINK_STYLE}>
            {tool.liveLabel ?? "Live"} →
          </a>
        )}
        {tool.github && (
          <a href={tool.github} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={LINK_STYLE}>
            Code →
          </a>
        )}
        {tool.verified && (
          <a href={tool.verified} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={LINK_STYLE}>
            Verified ↗
          </a>
        )}
        {tool.latest && (
          <a href={tool.latest} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={LINK_STYLE}>
            {tool.latestLabel ?? "Latest"} →
          </a>
        )}
      </div>
    </li>
  );
}

export function ProofOfWork() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const groups = useMemo(() => {
    const keep = (t: Tool) => filter === "All" || t.tags?.includes(filter);
    const era = (k: EraKey) => TOOLS.filter((t) => t.era === k && keep(t));
    const out: { id: string; title: string; meta: string; tools: Tool[] }[] = ERAS.map((e) => ({
      id: e.key,
      title: e.company,
      meta: `${e.role} · ${e.dates}`,
      tools: era(e.key),
    }));
    out.push({ id: "also", title: "Also", meta: "Undated side builds", tools: TOOLS.filter((t) => !t.era && keep(t)) });
    return out.filter((g) => g.tools.length > 0 || (filter === "All" && g.id !== "also"));
  }, [filter]);

  return (
    <section className="press-section" id="tools">
      <h2>Full index</h2>
      <div
        role="group"
        aria-label="Filter projects"
        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0 0 2rem" }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="press-btn press-btn-ghost press-btn-sm pw-filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="pw-timeline">
        {groups.map((g) => (
          <section key={g.id} className="pw-era" aria-label={`${g.title}, ${g.meta}`}>
            <header className="pw-era-head">
              <h3>{g.title}</h3>
              <span className="press-mono">{g.meta}</span>
            </header>
            {g.tools.length > 0 ? (
              <ul className="pw-rows">
                {g.tools.map((t) => (
                  <ToolRow key={t.title} tool={t} />
                ))}
              </ul>
            ) : (
              <p className="pw-empty press-ticket-sub">No public build from this stretch.</p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
