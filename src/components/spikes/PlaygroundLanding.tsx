"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROOF } from "./proof";
import { SpikeTopbar } from "./SpikeTopbar";

const LINES = [
  { t: "ok", s: "$ ck --whoami" },
  { t: "dim", s: "Charandeep Kapoor · Delta Exchange · AI PM" },
  { t: "ok", s: "$ ck --proof stocky" },
  { t: "ok", s: "ROI +110% · Sharpe 2.29 · win 73% · VERIFIED" },
  { t: "ok", s: "$ ck --proof timelock" },
  { t: "ok", s: "volume $7.3M · TVL $2M · users 1000+" },
  { t: "warn", s: "$ ck --status drishti" },
  { t: "ok", s: "LIVE · 15m cycle · real capital · 8 markets" },
  { t: "dim", s: "$ _" },
];

export function PlaygroundLanding() {
  const reduce = useReducedMotion();
  const [clicks, setClicks] = useState(0);
  const [termKey, setTermKey] = useState(0);
  const [boost, setBoost] = useState(0);

  const toys = useMemo(
    () => [
      {
        value: "+110%",
        label: "tap me",
        onClick: () => setClicks((c) => c + 1),
      },
      {
        value: "2.29",
        label: "sharpe",
        onClick: () => setBoost((b) => Math.min(b + 1, 5)),
      },
      {
        value: "73%",
        label: "win rate",
        onClick: () => setTermKey((k) => k + 1),
      },
      {
        value: "$7.3M",
        label: "volume",
        onClick: () => setClicks((c) => c + 3),
      },
    ],
    [],
  );

  return (
    <div className="spike-root play">
      <SpikeTopbar variant="playground" label="C · Playful engineer" />

      <section className="play-hero">
        <div>
          <p
            className="spike-mono"
            style={{
              color: "var(--play-accent)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontSize: "0.72rem",
              marginBottom: "0.75rem",
            }}
          >
            interactive · please touch things
          </p>
          <h1 className="play-name">
            <span>Charandeep</span>
            <br />
            Kapoor
          </h1>
          <p className="play-lede spike-serif" style={{ marginTop: "1rem" }}>
            {PROOF.ledeOptions.playground} AI systems on real capital — and a website that refuses
            to sit still.
          </p>

          <div className="play-toys">
            {toys.map((toy) => (
              <button key={toy.label} type="button" className="play-toy" onClick={toy.onClick}>
                <strong className="spike-mono" style={{ transform: `scale(${1 + boost * 0.03})` }}>
                  {toy.value}
                </strong>
                <span className="spike-mono">{toy.label}</span>
              </button>
            ))}
          </div>

          {clicks > 0 && (
            <p className="spike-mono" style={{ marginTop: "0.75rem", color: "var(--play-go)", fontSize: "0.8rem" }}>
              curiosity score: {clicks}
              {clicks >= 7 ? " · ok you get it" : " · keep poking"}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginTop: "1.5rem" }}>
            <a className="spike-btn spike-btn-primary" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
              Book a call
            </a>
            <a className="spike-btn spike-btn-ghost" href={PROOF.links.track}>
              Track record
            </a>
          </div>
        </div>

        <motion.div
          key={termKey}
          className="play-term"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bar" aria-hidden>
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          {LINES.map((line, i) => (
            <motion.div
              key={`${termKey}-${i}`}
              className={`line ${line.t}`}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
            >
              {line.s}
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="play-section">
        <h2 style={{ fontSize: "1.6rem", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Open a project
        </h2>
        <div className="play-project">
          {PROOF.projects.map((p) => (
            <a key={p.title} className="play-proj-row" href={p.href} target="_blank" rel="noreferrer">
              <div>
                <strong style={{ display: "block" }}>{p.title}</strong>
                <span style={{ color: "rgba(232,238,245,0.5)", fontSize: "0.88rem" }}>{p.line}</span>
              </div>
              <span className="spike-mono" style={{ color: "var(--play-accent)" }}>
                run →
              </span>
            </a>
          ))}
        </div>

        <p
          className="spike-mono"
          style={{
            marginTop: "2.5rem",
            color: "rgba(232,238,245,0.4)",
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          {PROOF.role} · numbers are real · site is allowed to be fun
        </p>
      </section>
    </div>
  );
}
