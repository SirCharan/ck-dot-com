"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { HeroStage } from "./HeroStage";
import { CountStat } from "./CountStat";
import type { Payload } from "@/lib/trackRecord";
import { PROOF, STOCKY_VERIFIED } from "@/components/spikes/proof";

const ease = [0.23, 1, 0.32, 1] as const;

const WORK = [
  {
    title: "Drishti",
    line: "Live LLM signals · 15-min cycle · real capital on Delta",
    detail: "/work/drishti",
    cover: "/images/work/drishti/equity-curve.png",
    chip: "live system",
    alt: "Drishti equity curve and win/loss stats from the live dashboard",
  },
  {
    title: "Stocky AI",
    line: "+110% verified · Sharpe 2.29 · Claude traded for a year",
    detail: "/markets",
    cover: "/images/stocky/stocky-terminal.png",
    chip: "verified pnl",
    alt: "Stocky terminal dashboard",
  },
  {
    title: "Timelock",
    line: "Oracle-less DeFi perps · $7.3M volume · founded end-to-end",
    detail: "/work/timelock",
    cover: "/images/work/timelock/perps-terminal.jpg",
    chip: "founded",
    alt: "Timelock Protected Perps trading terminal — WMON/USDC chart and order ticket",
  },
] as const;

const TERM = [
  { c: "ok", t: "$ whoami" },
  { c: "dim", t: "Charandeep · AI PM @ Delta · builder of systems that move capital" },
  { c: "ok", t: "$ proof --stocky" },
  { c: "ok", t: "ROI +110% · Sharpe 2.29 · win 73% · Sensibull VERIFIED" },
  { c: "ok", t: "$ proof --timelock" },
  { c: "ok", t: "volume $7.3M · TVL $2M · 1000+ users" },
  { c: "warn", t: "$ status --drishti" },
  { c: "ok", t: "LIVE · 8 markets · 15m cycle · real orders" },
  { c: "dim", t: "$ _" },
] as const;

export function TenXHome({ dhan }: { dhan: Payload | null }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.2 });
  const [curiosity, setCuriosity] = useState(0);
  const [termKey, setTermKey] = useState(0);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="tx">
      <div className="tx-ambient" aria-hidden />
      <div className="tx-grain" aria-hidden />
      {!reduce && <motion.div className="tx-progress" style={{ scaleX }} />}

      <header className={`tx-nav${navSolid ? " tx-nav-solid" : ""}`}>
        <Link href="/" className="tx-nav-brand">
          <Image
            src="/images/signature-neon-trans.png"
            alt=""
            width={36}
            height={36}
            className="h-7 w-7 object-contain"
            aria-hidden
            priority
          />
          CK<span style={{ color: "var(--tx-go)" }}>.</span>
        </Link>
        <nav className="tx-nav-links tx-mono" aria-label="Primary">
          <a href="#proof">Proof</a>
          <a href="#work">Work</a>
          <a href="#play">Lab</a>
          <Link href="/track-record">Track record</Link>
          <Link href="/blog">Writing</Link>
        </nav>
        <a
          className="tx-btn tx-btn-go tx-btn-sm"
          href={PROOF.links.topmate}
          target="_blank"
          rel="noreferrer"
        >
          Book a call
        </a>
      </header>

      <div className="tx-main">
        <HeroStage dhan={dhan} />

        <section className="tx-stats" id="proof" aria-label="Proof metrics">
          {PROOF.stats.map((s, i) => (
            <CountStat
              key={s.label}
              display={s.value}
              label={s.label}
              sub={s.sub}
              href={s.href}
              delay={i * 80}
            />
          ))}
        </section>

        <section className="tx-section" id="work">
          <p className="tx-section-label tx-mono">01 · Selected work</p>
          <h2>Things that actually shipped</h2>
          <p className="tx-sub tx-serif">
            Live products and trading systems — not mockups. Most of them still running.
          </p>

          <div className="tx-work-grid">
            {WORK.map((w, i) => (
              <motion.a
                key={w.title}
                href={w.detail}
                className="tx-work-card"
                initial={reduce ? false : { y: 18 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease }}
                whileHover={reduce ? undefined : { y: -6 }}
              >
                <div className="tx-work-media">
                  <Image
                    src={w.cover}
                    alt={w.alt}
                    fill
                    sizes={
                      i === 0 ? "(min-width:900px) 50vw, 100vw" : "(min-width:900px) 40vw, 100vw"
                    }
                    priority={i === 0}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div className="tx-work-body">
                  <h3>{w.title}</h3>
                  <p>{w.line}</p>
                  <span className="chip tx-mono">{w.chip} →</span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="tx-section-cta">
            <Link href="/work" className="tx-btn tx-btn-ghost">
              All work &amp; tools →
            </Link>
            <a
              href={STOCKY_VERIFIED}
              className="tx-btn tx-btn-ghost"
              target="_blank"
              rel="noreferrer"
            >
              Verified Stocky PnL ↗
            </a>
          </div>
        </section>

        <section className="tx-section" id="play">
          <p className="tx-section-label tx-mono">02 · Lab</p>
          <h2>Poke the machine</h2>
          <p className="tx-sub tx-serif">
            Same numbers as the verified track record — just more fun to touch. Curiosity is a
            feature.
          </p>

          <div className="tx-play">
            <motion.div
              key={termKey}
              className="tx-term tx-mono"
              initial={reduce ? false : { opacity: 0.5 }}
              animate={{ opacity: 1 }}
            >
              <div className="tx-term-bar" aria-hidden>
                <i />
                <i />
                <i />
              </div>
              {TERM.map((line, i) => (
                <motion.div
                  key={`${termKey}-${i}`}
                  className={line.c}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  {line.t}
                </motion.div>
              ))}
            </motion.div>

            <div>
              <div className="tx-toys">
                {PROOF.stats.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="tx-toy"
                    onClick={() => {
                      setCuriosity((c) => c + 1);
                      if (s.label === "Win rate") setTermKey((k) => k + 1);
                    }}
                  >
                    <strong className="tx-mono">{s.value}</strong>
                    <span className="tx-mono">{s.label}</span>
                  </button>
                ))}
              </div>
              {curiosity > 0 && (
                <p className="tx-curiosity tx-mono" role="status">
                  curiosity {curiosity}
                  {curiosity >= 8 ? " · ok, you get it — book the call" : " · keep going"}
                </p>
              )}
              <div className="tx-actions" style={{ marginTop: "1.25rem" }}>
                <a
                  className="tx-btn tx-btn-go"
                  href={PROOF.links.topmate}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a call
                </a>
                <Link className="tx-btn tx-btn-ghost" href="/track-record">
                  Full track record
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="tx-section tx-contact" id="contact">
          <p className="tx-section-label tx-mono">03 · Contact</p>
          <h2>
            Let&apos;s build something.{" "}
            <a href={PROOF.links.topmate} target="_blank" rel="noreferrer">
              Book a call ↗
            </a>
          </h2>
          <p className="tx-sub" style={{ marginTop: "0.75rem" }}>
            {PROOF.role}
          </p>
          <div className="tx-socials tx-mono">
            <a href={PROOF.links.twitter} target="_blank" rel="noreferrer">
              X / @yourasianquant
            </a>
            <a href={PROOF.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROOF.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/blog">Writing</Link>
            <Link href="/resume">About</Link>
          </div>

          <div className="tx-sig">
            <Image
              src="/images/signature-neon-trans.png"
              alt="CK monogram"
              width={200}
              height={200}
              className="h-24 w-auto"
            />
            <p className="tx-footer-note tx-mono">
              © {new Date().getFullYear()} {PROOF.name}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
