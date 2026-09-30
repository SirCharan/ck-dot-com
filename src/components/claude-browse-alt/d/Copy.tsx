"use client";

import { useState } from "react";
import { INSTALL } from "@/components/claude-browse/data";

export function Copy({
  text = INSTALL,
  label = "Copy install command",
  done = "Copied to clipboard",
  className = "ss-btn",
  icon = true,
}: {
  text?: string;
  label?: string;
  done?: string;
  className?: string;
  icon?: boolean;
}) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={className}
      data-ok={ok ? "1" : undefined}
      aria-label={ok ? done : `${label}: ${text}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          window.setTimeout(() => setOk(false), 1800);
        } catch {
          /* Clipboard blocked. The command is printed next to the button. */
        }
      }}
    >
      {icon ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {ok ? (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          ) : (
            <>
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </>
          )}
        </svg>
      ) : null}
      <span aria-live="polite">{ok ? done : label}</span>
    </button>
  );
}
