"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { COMMAND, INSTALL, MEASURED, NOISE, REPO, SUMMARY } from "./data";

export function CopyButton({ className, label = "Install the plugin" }: { className: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(INSTALL);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard blocked: the command is printed on the page */
        }
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}

export function InstallRow({ center }: { center?: boolean }) {
  return (
    <div className={`cb-install${center ? " is-center" : ""}`}>
      <code className="cb-cmd">
        <b>$</b>
        <span>{INSTALL}</span>
      </code>
      <CopyButton className="cb-btn cb-btn-fill" label="Copy" />
    </div>
  );
}

/* Phases of one replayed run. "read" is split in three so the browser can show clicks. */
type Phase = "cmd" | "open" | "read1" | "read2" | "sum" | "done";
const ORDER: Phase[] = ["cmd", "open", "read1", "read2", "sum", "done"];
const HOLD: Record<Phase, number> = { cmd: 0, open: 1300, read1: 1500, read2: 1400, sum: 0, done: 6500 };

const SUMMARY_TEXT = SUMMARY.map(([k, v]) => k + v).join("\n");
const URL = "news.ycombinator.com";

function renderSummary(text: string) {
  const out: ReactNode[] = [];
  text.split("\n").forEach((line, i) => {
    const m = line.match(/^([A-Z ]+:)(.*)$/);
    out.push(
      <span key={i}>
        {m ? (
          <>
            <span className="k">{m[1]}</span>
            {m[2]}
          </>
        ) : (
          line
        )}
        {"\n"}
      </span>,
    );
  });
  return out;
}

/* A browser window that Sonnet drives. Only row 1 is real; the rest are skeleton rows. */
function BrowserMock({ phase }: { phase: Phase }) {
  const i = ORDER.indexOf(phase);
  const opened = i >= 1;
  const loaded = i >= 2;
  return (
    <div className="cb-browser" data-phase={phase} aria-hidden>
      <div className="cb-browser-bar">
        <span className="cb-browser-url">{opened ? URL : ""}</span>
        <span className="cb-browser-tag">agent-browser · headless</span>
      </div>
      <div className="cb-browser-page">
        {loaded ? (
          <>
            <div className="cb-row is-real">
              <span className="cb-rank">1.</span>
              <span className="cb-title">
                Livenerf: Has Opus 5.5 been nerfed yet?
                <span className="cb-ref">@e11</span>
              </span>
              <span className="cb-meta">
                561 points · <em>239 comments</em>
                <span className="cb-ref cb-ref-2">@e12</span>
              </span>
            </div>
            {[2, 3, 4, 5, 6].map((r) => (
              <div className="cb-row" key={r} style={{ animationDelay: `${r * 70}ms` }}>
                <span className="cb-rank">{r}.</span>
                <span className="cb-sk" style={{ width: `${46 + ((r * 37) % 40)}%` }} />
                <span className="cb-sk cb-sk-meta" />
              </div>
            ))}
          </>
        ) : null}
        <div className="cb-cursor" />
      </div>
    </div>
  );
}

export function Replay() {
  const [phase, setPhase] = useState<Phase>("done");
  const [typed, setTyped] = useState(COMMAND.length);
  const [sumLen, setSumLen] = useState(SUMMARY_TEXT.length);
  const timers = useRef<number[]>([]);
  const body = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = timers.current;
    const later = (fn: () => void, ms: number) => t.push(window.setTimeout(fn, ms));
    let alive = true;

    const go = (p: Phase) => {
      if (!alive) return;
      setPhase(p);
      if (p === "cmd") {
        setTyped(0);
        setSumLen(0);
        let i = 0;
        const step = () => {
          i += 1;
          setTyped(i);
          if (i < COMMAND.length) later(step, 22);
          else later(() => go("open"), 500);
        };
        later(step, 900);
        return;
      }
      if (p === "sum") {
        let j = 0;
        const step = () => {
          j += 3;
          setSumLen(Math.min(j, SUMMARY_TEXT.length));
          if (j < SUMMARY_TEXT.length) later(step, 22);
          else later(() => go("done"), 300);
        };
        step();
        return;
      }
      const next = ORDER[(ORDER.indexOf(p) + 1) % ORDER.length];
      later(() => go(next), HOLD[p]);
    };

    later(() => go("cmd"), 1800);
    return () => {
      alive = false;
      t.forEach(clearTimeout);
      t.length = 0;
    };
  }, []);

  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [sumLen, phase]);

  const reading = phase === "open" || phase === "read1" || phase === "read2";
  const showSum = phase === "sum" || phase === "done";

  return (
    <>
      <BrowserMock phase={phase} />
      <div className="cb-card" aria-label="A real claude-browse run, replayed">
        <div className="cb-card-h">
          <span>claude code · /browse</span>
          <span className={phase === "done" ? "" : "live"}>{phase === "done" ? "returned" : "running"}</span>
        </div>
        <pre className="cb-card-b" ref={body}>
          <span className="p">›</span> {COMMAND.slice(0, typed)}
          {phase === "cmd" ? <span className="cb-cur" /> : null}
          {"\n"}
          {phase !== "cmd" ? (
            <span className="d">
              sonnet · {reading ? "reading " + URL : `read ${MEASURED.full.toLocaleString("en-US")} tokens`}
              {reading ? (
                <span className="cb-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              ) : null}
              {"\n"}
            </span>
          ) : null}
          {reading ? (
            <div className="cb-read" aria-hidden>
              <div className="cb-read-roll">{[...NOISE, ...NOISE].join("\n")}</div>
            </div>
          ) : null}
          {showSum ? renderSummary(SUMMARY_TEXT.slice(0, sumLen)) : null}
          {phase === "sum" ? <span className="cb-cur" /> : null}
        </pre>
        <div className="cb-card-f">
          <span>
            <b>{MEASURED.summary}</b> tokens reach your chat
          </span>
          <span>
            <b>{MEASURED.seconds} s</b>
          </span>
        </div>
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section className="cb-wrap cb-hero">
      <div className="cb-hero-copy">
        <p className="cb-k">Open source · Free · Built for Claude Code</p>
        <h1 className="cb-h1">
          Give Claude Code a browser. Keep your chat <em>light</em>.
        </h1>
        <p className="cb-sub">
          claude-browse sends a helper to read websites for you and brings back a short answer. Pages never pile
          up in your chat, so it stays fast and cheap.
        </p>
        <div className="cb-actions">
          <CopyButton className="cb-btn cb-btn-fill" />
          <a className="cb-btn cb-btn-ghost" href={REPO}>
            Read the source
          </a>
        </div>
        <p className="cb-micro">MIT · No API key · macOS and Linux</p>
      </div>
      <div className="cb-hero-art">
        <div className="cb-panel">
          <Replay />
        </div>
      </div>
    </section>
  );
}
