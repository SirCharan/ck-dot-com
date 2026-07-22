"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TOOLS, TOOL_TAGS, type Tool } from "@/data/site";

/**
 * Proof of Work: the full index. One ledger, one row per build. The left rail
 * is a mono status seal (live/verified/archived), tonal-colored, not a §number.
 * Filter pills cross-filter; rows reflow. Content is always visible (no entrance
 * opacity gate); only exit + layout animate, and only when motion is allowed.
 */

const FILTERS = ["All", ...TOOL_TAGS] as const;

const SEAL: Record<Tool["status"], { label: string; color: string }> = {
  live: { label: "LIVE", color: "var(--p-go)" },
  verified: { label: "VERIFIED", color: "var(--p-metal)" },
  archived: { label: "ARCHIVED", color: "var(--p-mute)" },
};

function ToolRow({ tool, last }: { tool: Tool; last: boolean }) {
  const seal = SEAL[tool.status];
  return (
    <div
      className="grid grid-cols-[5rem_1fr] gap-x-5 py-6"
      style={{ borderBottom: last ? "none" : "1px solid var(--p-line)" }}
    >
      <div
        className="press-mono"
        style={{ fontSize: "0.62rem", letterSpacing: "0.12em", color: seal.color, paddingTop: "0.4rem" }}
      >
        {seal.label}
      </div>
      <div className="min-w-0">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem 0.9rem" }}>
          <span className="press-serif" style={{ fontSize: "1.2rem", color: "var(--p-ink)", lineHeight: 1.25 }}>
            {tool.title}
          </span>
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
        <div style={{ marginTop: "0.65rem", display: "flex", flexWrap: "wrap", gap: "0 1.25rem" }}>
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
          {tool.latest && (
            <a href={tool.latest} target="_blank" rel="noopener noreferrer" className="link-ink press-mono" style={{ fontSize: "0.8rem" }}>
              {tool.latestLabel ?? "Latest"} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProofOfWork() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const shown = useMemo(
    () => (filter === "All" ? TOOLS : TOOLS.filter((t) => t.tags?.includes(filter))),
    [filter],
  );

  return (
    <section className="press-section" id="tools">
      <h2>Full index</h2>
      <div
        role="group"
        aria-label="Filter projects"
        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0 0 1.75rem" }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="press-btn press-btn-ghost press-btn-sm"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout={!reduced} className="press-ledger">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((tool, i) => (
            <motion.div
              key={tool.title}
              layout={!reduced}
              exit={reduced ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <ToolRow tool={tool} last={i === shown.length - 1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
