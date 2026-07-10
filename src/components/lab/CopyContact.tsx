"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * CopyContact — a contact affordance that copies `value` to the clipboard and
 * crossfades its label to "Copied ✓" (amber) for ~1.5s, then reverts. It is a
 * real <button> with an aria-live announcement, so screen readers hear the
 * confirmation. Reduced-motion → instant swap (no crossfade).
 */
export function CopyContact({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      /* clipboard unavailable — still flip the label so the click feels alive */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  }

  const dur = reduced ? 0 : 0.15;

  return (
    <button
      type="button"
      onClick={copy}
      data-testid="copy-contact"
      aria-label={`Copy ${label} to clipboard`}
      className="relative inline-grid text-left align-baseline text-ink transition-colors hover:text-[rgb(var(--amber))]"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={copied ? "copied" : "idle"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
          className={
            copied
              ? "num text-[rgb(var(--amber))] [grid-area:1/1]"
              : "num [grid-area:1/1]"
          }
        >
          {copied ? "Copied ✓" : label}
        </motion.span>
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {copied ? `${value} copied to clipboard` : ""}
      </span>
    </button>
  );
}
