"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROOF } from "./proof";
import { SpikeTopbar } from "./SpikeTopbar";

const ease = [0.23, 1, 0.32, 1] as const;

export function CinematicLanding() {
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <div className="spike-root cin">
      <SpikeTopbar variant="cinematic" label="A · Cinematic AI lab" />

      <section className="cin-hero">
        <div className="cin-orb" aria-hidden />
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <motion.p
            className="spike-mono"
            style={{
              textAlign: "center",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "0.72rem",
              color: "rgba(61,251,134,0.9)",
            }}
            {...fade(0)}
          >
            Live systems · Real capital · Delta Exchange
          </motion.p>

          <motion.h1 className="cin-name" {...fade(0.08)}>
            {PROOF.name}
          </motion.h1>

          <motion.p className="cin-lede spike-serif" {...fade(0.18)}>
            {PROOF.ledeOptions.cinematic}
          </motion.p>

          <motion.div className="cin-stats" {...fade(0.28)}>
            {PROOF.stats.map((s) => (
              <a key={s.label} className="cin-stat" href={s.href} target="_blank" rel="noreferrer">
                <strong className="spike-mono">{s.value}</strong>
                <span className="spike-mono">{s.label}</span>
              </a>
            ))}
          </motion.div>

          <motion.div className="cin-actions" {...fade(0.4)}>
            <a className="spike-btn spike-btn-primary" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
              Book a call
            </a>
            <a className="spike-btn spike-btn-ghost" href={PROOF.links.track}>
              Track record
            </a>
            <a className="spike-btn spike-btn-ghost" href={PROOF.links.blog}>
              Writing
            </a>
          </motion.div>
        </div>
      </section>

      <section className="cin-section">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease }}
        >
          Things that actually shipped
        </motion.h2>
        <div className="cin-proj">
          {PROOF.projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
            >
              <strong>{p.title}</strong>
              <span>{p.line}</span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="cin-section" style={{ paddingBottom: "6rem", textAlign: "center" }}>
        <p className="spike-mono" style={{ color: "rgba(232,238,245,0.45)", fontSize: "0.8rem" }}>
          {PROOF.role}
        </p>
        <h2 style={{ marginTop: "0.75rem" }}>Let&apos;s build something wild.</h2>
        <div className="cin-actions">
          <a className="spike-btn spike-btn-primary" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
            Book a call
          </a>
          <a className="spike-btn spike-btn-ghost" href={PROOF.links.twitter} target="_blank" rel="noreferrer">
            @yourasianquant
          </a>
        </div>
      </section>
    </div>
  );
}
