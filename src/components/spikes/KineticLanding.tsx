"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { PROOF } from "./proof";
import { SpikeTopbar } from "./SpikeTopbar";

export function KineticLanding() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
  const glow = useTransform(scrollYProgress, [0, 1], [0.15, 0.55]);

  useEffect(() => {
    if (reduce) return;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, [reduce]);

  return (
    <div className="spike-root kin">
      <SpikeTopbar variant="kinetic" label="B · Maximal kinetic" />
      {!reduce && <motion.div className="kin-progress" style={{ scaleX }} />}

      <section className="kin-panel">
        <div>
          <p className="kin-kicker spike-mono">Scroll the story</p>
          <h1 className="kin-title">
            Built different.
            <br />
            <em>Trades real money.</em>
          </h1>
          <p className="kin-body spike-serif">{PROOF.ledeOptions.kinetic}</p>
          <div className="kin-row">
            <a className="spike-btn spike-btn-primary" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
              Book a call
            </a>
            <a className="kin-chip" href="#proof">
              See the proof ↓
            </a>
          </div>
        </div>
        {!reduce && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              right: "-10%",
              top: "20%",
              width: "50vw",
              height: "50vw",
              maxWidth: 480,
              maxHeight: 480,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)",
              filter: "blur(4px)",
              opacity: glow,
              pointerEvents: "none",
            }}
          />
        )}
      </section>

      <section className="kin-panel" id="proof">
        <p className="kin-kicker spike-mono">01 · Proof</p>
        <p className="kin-bigstat spike-mono">+110%</p>
        <p className="kin-body">
          Stocky — Claude traded Indian F&amp;O on real capital for a year. Sharpe 2.29 · 73% win ·
          externally verified. Not a backtest. Not vibes.
        </p>
        <div className="kin-row">
          {PROOF.stats.map((s) => (
            <a key={s.label} className="kin-chip spike-mono" href={s.href} target="_blank" rel="noreferrer">
              {s.value} · {s.label}
            </a>
          ))}
        </div>
      </section>

      <section className="kin-panel">
        <p className="kin-kicker spike-mono">02 · Shipped</p>
        <h2 className="kin-title" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
          Work that hits different
        </h2>
        <div className="kin-grid3">
          {PROOF.projects.map((p, i) => (
            <motion.a
              key={p.title}
              className="kin-card"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
            >
              <h3>{p.title}</h3>
              <p>{p.line}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="kin-panel">
        <p className="kin-kicker spike-mono">03 · Next</p>
        <h2 className="kin-title" style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}>
          Your move.
        </h2>
        <p className="kin-body">
          {PROOF.role}. If you want systems with teeth — or just want to talk markets and machines —
          book a call.
        </p>
        <div className="kin-row">
          <a className="spike-btn spike-btn-primary" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
            Book a call
          </a>
          <a className="kin-chip" href={PROOF.links.work}>
            All work
          </a>
          <a className="kin-chip" href={PROOF.links.blog}>
            Writing
          </a>
          <a className="kin-chip" href={PROOF.links.twitter} target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </section>
    </div>
  );
}
