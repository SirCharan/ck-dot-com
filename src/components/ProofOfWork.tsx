"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TOOLS, TOOL_TAGS, type Tool } from "@/data/site";

/**
 * Proof of Work — the tools grid with interactive filter pills.
 * Tapping a pill cross-filters the grid; cards reflow with a layout animation.
 */

const FILTERS = ["All", ...TOOL_TAGS] as const;

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="stat-tile flex h-full flex-col p-5">
      <div className="display text-lg leading-snug text-ink">{tool.title}</div>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-mute">{tool.one}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
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
        {tool.verified && (
          <a href={tool.verified} target="_blank" rel="noopener noreferrer" className="link-ink">
            Verified →
          </a>
        )}
        {tool.latest && (
          <a href={tool.latest} target="_blank" rel="noopener noreferrer" className="link-ink">
            {tool.latestLabel ?? "Latest"} →
          </a>
        )}
        {tool.tags && (
          <span className="ml-auto flex gap-1.5">
            {tool.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-rule px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-mute"
              >
                {t}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProofOfWork() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const shown = useMemo(
    () => (filter === "All" ? TOOLS : TOOLS.filter((t) => t.tags?.includes(filter))),
    [filter]
  );

  return (
    <section id="tools" className="py-10 md:py-14 rule">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">Proof of work</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className="pill"
              data-active={filter === f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout={!reduced} className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((tool) => (
            <motion.div
              key={tool.title}
              layout={!reduced}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
