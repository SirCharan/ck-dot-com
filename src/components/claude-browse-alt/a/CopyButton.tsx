"use client";

import { useEffect, useRef, useState } from "react";

type Props = { text: string; label: string; variant?: "primary" | "ghost" | "small"; className?: string };

function ClipIcon({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="ra-ico">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="ra-ico">
      <rect x="4" y="3" width="9" height="11" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 3V2.2h4V3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function CopyButton({ text, label, variant = "primary", className = "" }: Props) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 2200);
  }

  return (
    <button type="button" onClick={copy} className={`ra-btn ra-btn-${variant} ${done ? "is-done" : ""} ${className}`}>
      <ClipIcon done={done} />
      <span>{done ? "Copied to clipboard" : label}</span>
      <span className="ra-sr" aria-live="polite">{done ? "Copied to clipboard" : ""}</span>
    </button>
  );
}
