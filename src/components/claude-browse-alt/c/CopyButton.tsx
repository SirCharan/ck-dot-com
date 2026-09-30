"use client";

import { useEffect, useState } from "react";

type Props = { text: string; label?: string; done?: string; size?: "lg" | "sm" };

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export function CopyButton({ text, label = "Copy install command", done = "Copied to clipboard", size = "lg" }: Props) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);
  return (
    <button
      type="button"
      className={`wp-btn wp-btn-${size}${copied ? " is-done" : ""}`}
      onClick={async () => setCopied(await copy(text))}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="wp-btn-ic">
        {copied ? (
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        ) : (
          <>
            <rect x="8" y="3" width="8" height="4" rx="1" />
            <path d="M8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
