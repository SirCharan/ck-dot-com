"use client";

import { useEffect, useState, type ReactNode } from "react";
import { COMMAND, DOCTOR, INSTALL, SUMMARY } from "./data";
import { CopyButton } from "./Hero";

/* Cycles an index every `ms` until the user picks one. */
function useAutoIndex(count: number, ms: number) {
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (manual) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [count, ms, manual]);
  return [i, (v: number) => { setManual(true); setI(v); }] as const;
}

function Term({ children }: { children: ReactNode }) {
  return <pre className="cb-term cb-term-panel">{children}</pre>;
}

const SAFE: { t: string; b: string; out: ReactNode }[] = [
  {
    t: "Stays on the sites you allow",
    b: "Name the sites when you start. Anything else is refused before the browser moves.",
    out: (
      <>
        <b>$ browse open ab-smoke --allow-domains example.com</b>{"\n"}
        <b>$ browse run ab-smoke open https://evil.com</b>{"\n"}
        <i>policy: evil.com not in allowed_domains</i>{"\n"}exit 3
      </>
    ),
  },
  {
    t: "Never keeps page text",
    b: "The log records what happened and a short fingerprint of each page. Never the words on it.",
    out: (
      <>
        <b>$ browse log ab-smoke -n 2 --json</b>{"\n"}
        {'{"action": "open", "ok": true, "ms": 9288, "url": "https://example.com"}'}{"\n"}
        {'{"action": "snapshot", "ok": true, "ms": 499, "snapshot_ref": "'}<i>7c1d40a9</i>{'"}'}
      </>
    ),
  },
  {
    t: "Closes only what it started",
    b: "Before closing a window it checks the process is its own browser. Nothing else is touched.",
    out: (
      <>
        <b>$ browse reap --idle-hours 4 --dry-run</b>{"\n"}
        <i>would close</i> kayak (idle 10d 15h){"\n"}
        skip default: headed/profile (use --force){"\n"}
        reap: closed 1, orphans removed 6, flagged 4, dry-run
      </>
    ),
  },
  {
    t: "Tells you what is wrong",
    b: "One command checks what is installed, what is reachable and what to fix.",
    out: (
      <>
        <b>$ browse doctor</b>{"\n"}
        {DOCTOR.split("\n").slice(0, 5).map((l, k) => {
          const m = l.match(/^(PASS|WARN)(.*)$/);
          return (
            <span key={k}>
              {m ? (<><i>{m[1]}</i>{m[2]}</>) : l}{"\n"}
            </span>
          );
        })}
      </>
    ),
  },
];

export function SafePanel() {
  const [i, pick] = useAutoIndex(SAFE.length, 4000);
  return (
    <div className="cb-panel2">
      <ul className="cb-picks" role="tablist" aria-label="Safety promises">
        {SAFE.map((s, k) => (
          <li key={s.t}>
            <button
              type="button"
              role="tab"
              aria-selected={k === i}
              className={`cb-pick${k === i ? " is-on" : ""}`}
              onClick={() => pick(k)}
            >
              <span className="t">{s.t}</span>
              <span className="b">{s.b}</span>
            </button>
          </li>
        ))}
      </ul>
      <Term>{SAFE[i].out}</Term>
    </div>
  );
}

const STEPS: { t: string; cmd: string; out: ReactNode }[] = [
  {
    t: "Add the plugin",
    cmd: INSTALL,
    out: (
      <>
        Added marketplace <b>SirCharan/claude-browse</b>{"\n"}
        Installed <b>claude-browse</b> 0.1.0{"\n"}
        {"  "}agent    browser{"\n"}
        {"  "}skill    browse-router{"\n"}
        {"  "}commands /browse, /browse-ls
      </>
    ),
  },
  {
    t: "Check your setup",
    cmd: "browse doctor",
    out: (
      <>
        {DOCTOR.split("\n").slice(0, 4).map((l, k) => {
          const m = l.match(/^(PASS|WARN)(.*)$/);
          return (
            <span key={k}>
              {m ? (<><i>{m[1]}</i>{m[2]}</>) : l}{"\n"}
            </span>
          );
        })}
      </>
    ),
  },
  {
    t: "Ask your first question",
    cmd: COMMAND,
    out: (
      <>
        {SUMMARY.slice(0, 6).map(([k, v], n) => (
          <span key={n}>{k ? <i>{k}</i> : null}{v}{"\n"}</span>
        ))}
        <span className="dim">... 3 more lines</span>
      </>
    ),
  },
];

export function InstallStepper() {
  const [i, pick] = useAutoIndex(STEPS.length, 5000);
  return (
    <div className="cb-stepper">
      <div className="cb-track" role="tablist" aria-label="Install steps">
        {STEPS.map((s, k) => (
          <button
            type="button"
            role="tab"
            aria-selected={k === i}
            key={s.t}
            className={`cb-tab${k === i ? " is-on" : k < i ? " is-done" : ""}`}
            onClick={() => pick(k)}
          >
            <span className="n">0{k + 1}</span>
            <span className="t">{s.t}</span>
            <span className="bar" />
          </button>
        ))}
      </div>
      <div className="cb-stage">
        <div className="cb-install">
          <code className="cb-cmd"><b>$</b><span>{STEPS[i].cmd}</span></code>
          <CopyButton className="cb-btn cb-btn-fill" text={STEPS[i].cmd} label="Copy" done="Copied" />
        </div>
        <Term>{STEPS[i].out}</Term>
      </div>
    </div>
  );
}
