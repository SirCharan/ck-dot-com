"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TOOLS, TOOL_TAGS, type Tool } from "@/data/site";
import { Caption } from "./lab/Primitives";

/**
 * Proof of Work — a hairline-ruled index / ledger, not a card grid.
 * Each entry is a row: a mono §-number in the left rail, the title + one-liner
 * to its right, and mono links. Filter pills cross-filter; rows reflow.
 */

const FILTERS = ["All", ...TOOL_TAGS] as const;

function ToolRow({ tool, n }: { tool: Tool; n: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[4rem,1fr]">
      <div className="num text-[0.8rem] leading-none tracking-tight text-[rgb(var(--bone-dim))] md:pt-1.5">
        {String(n).padStart(2, "0")}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="display text-[1.25rem] leading-snug text-[rgb(var(--bone))]">
            {tool.title}
          </span>
          {tool.tags && (
            <span className="flex flex-wrap gap-x-3">
              {tool.tags.map((t) => (
                <span
                  key={t}
                  className="num text-[0.65rem] uppercase tracking-[0.1em] text-[rgb(var(--bone-dim))]"
                >
                  {t}
                </span>
              ))}
            </span>
          )}
        </div>
        <p className="mt-1.5 max-w-[64ch] font-serif text-[1.05rem] leading-[1.55] text-[rgb(var(--bone)/0.72)]">
          {tool.one}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {tool.live && (
            <a
              href={tool.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink num text-[0.8rem]"
            >
              {tool.liveLabel ?? "Live"} →
            </a>
          )}
          {tool.github && (
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink num text-[0.8rem]"
            >
              Code →
            </a>
          )}
          {tool.verified && (
            <a
              href={tool.verified}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink num text-[0.8rem]"
            >
              Verified →
            </a>
          )}
          {tool.latest && (
            <a
              href={tool.latest}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink num text-[0.8rem]"
            >
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
    [filter]
  );

  return (
    <section id="tools" className="rule py-10 md:py-14">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Caption>Proof of work · index</Caption>
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

      <motion.div
        layout={!reduced}
        className="divide-y divide-[rgb(var(--bone)/0.11)] border-t border-[rgb(var(--bone)/0.11)]"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((tool, i) => (
            <motion.div
              key={tool.title}
              layout={!reduced}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            >
              <ToolRow tool={tool} n={i + 1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
