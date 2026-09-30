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
          /* clipboard blocked: the command is printed below */
        }
      }}
    >
      {done ? "Copied the command" : label}
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

type Phase = "cmd" | "read" | "sum" | "done";

/* Flattened summary text so we can type it character by character. */
const SUMMARY_TEXT = SUMMARY.map(([k, v]) => k + v).join("\n");

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

export function Replay() {
  /* SSR and reduced-motion both render the finished state. */
  const [phase, setPhase] = useState<Phase>("done");
  const [typed, setTyped] = useState(COMMAND.length);
  const [sumLen, setSumLen] = useState(SUMMARY_TEXT.length);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = timers.current;
    const later = (fn: () => void, ms: number) => t.push(window.setTimeout(fn, ms));

    const loop = () => {
      setPhase("cmd");
      setTyped(0);
      setSumLen(0);
      let i = 0;
      const typeCmd = () => {
        i += 1;
        setTyped(i);
        if (i < COMMAND.length) later(typeCmd, 22);
        else later(() => setPhase("read"), 450);
      };
      later(typeCmd, 1100);
    };

    /* phase transitions */
    const onRead = () => later(() => setPhase("sum"), 2300);
    const onSum = () => {
      let j = 0;
      const typeSum = () => {
        j += 3;
        setSumLen(Math.min(j, SUMMARY_TEXT.length));
        if (j < SUMMARY_TEXT.length) later(typeSum, 24);
        else later(() => setPhase("done"), 300);
      };
      typeSum();
    };
    const onDone = () => later(loop, 6500);

    /* start after the card's own entrance (0.9 s delay + 1 s) */
    later(loop, 2000);

    const unsub = phaseRef.subscribe((p) => {
      if (p === "read") onRead();
      if (p === "sum") onSum();
      if (p === "done") onDone();
    });
    return () => {
      t.forEach(clearTimeout);
      t.length = 0;
      unsub();
    };
  }, []);

  useEffect(() => {
    phaseRef.emit(phase);
  }, [phase]);

  const showCmdCursor = phase === "cmd";
  const showRead = phase === "read";
  const showSum = phase === "sum" || phase === "done";

  return (
    <div className="cb-card" aria-label="A real claude-browse run, replayed">
      <div className="cb-card-h">
        <span>claude code · /browse</span>
        <span className={phase === "done" ? "" : "live"}>{phase === "done" ? "returned" : "running"}</span>
      </div>
      <pre className="cb-card-b">
        <span className="p">›</span> {COMMAND.slice(0, typed)}
        {showCmdCursor ? <span className="cb-cur" /> : null}
        {"\n"}
        {phase !== "cmd" ? (
          <>
            <span className="d">
              browser agent · sonnet · reading news.ycombinator.com
              {showRead ? (
                <span className="cb-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                ` · ${MEASURED.full.toLocaleString("en-US")} tokens`
              )}
            </span>
            {"\n"}
          </>
        ) : null}
        {showRead ? (
          <div className="cb-read" aria-hidden>
            <div className="cb-read-roll">{[...NOISE, ...NOISE].join("\n")}</div>
          </div>
        ) : null}
        {showSum ? renderSummary(SUMMARY_TEXT.slice(0, sumLen)) : null}
        {phase === "sum" ? <span className="cb-cur" /> : null}
      </pre>
      <div className="cb-card-f">
        <span>
          <b>{MEASURED.summary}</b> tokens reached the main model
        </span>
        <span>
          <b>{MEASURED.seconds} s</b> end to end
        </span>
      </div>
    </div>
  );
}

/* Tiny pub/sub so phase transitions can schedule the next step without effect ordering issues. */
const phaseRef = (() => {
  const subs = new Set<(p: Phase) => void>();
  return {
    subscribe(fn: (p: Phase) => void) {
      subs.add(fn);
      return () => subs.delete(fn);
    },
    emit(p: Phase) {
      subs.forEach((fn) => fn(p));
    },
  };
})();

export function Hero() {
  return (
    <section className="cb-wrap cb-hero">
      <div className="cb-hero-copy">
        <p className="cb-k">Open-source Claude Code plugin</p>
        <h1 className="cb-h1">
          Browse the web without filling your <em>context</em>.
        </h1>
        <p className="cb-sub">
          A Sonnet sub-agent does the browsing. Your main model reads a summary of 12 lines or fewer.
        </p>
        <div className="cb-actions">
          <CopyButton className="cb-btn cb-btn-fill" />
          <a className="cb-btn cb-btn-ghost" href={REPO}>
            Read the source
          </a>
        </div>
        <p className="cb-micro">MIT licence · Python stdlib · macOS and Linux</p>
      </div>
      <div className="cb-hero-art">
        <div className="cb-panel">
          <div className="cb-panel-img">
            <HeroImage />
          </div>
          <Replay />
        </div>
      </div>
    </section>
  );
}

/* Swapped for a real <img> when public/images/claude-browse/hero.webp ships. */
function HeroImage() {
  return (
    <>
      <div className="cb-ground" />
      <div className="cb-shadow" />
      <div className="cb-window" />
    </>
  );
}
