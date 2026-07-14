"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { EquityCurveSvg } from "@/components/lab/EquityCurveSvg";
import { curveValue, type Payload } from "@/lib/trackRecord";
import { inr } from "@/lib/format";
import { PROOF, STOCKY_VERIFIED } from "@/components/spikes/proof";

const ease = [0.23, 1, 0.32, 1] as const;

const WORK = [
  {
    title: "Drishti",
    line: "Live LLM signals · 15-min cycle · real capital on Delta",
    href: "https://drishti-beryl.vercel.app",
    detail: "/work/drishti",
    cover: "/images/work/drishti/feed.png",
    chip: "live system",
    priority: true,
  },
  {
    title: "Stocky AI",
    line: "+110% verified · Sharpe 2.29 · Claude traded for a year",
    href: STOCKY_VERIFIED,
    detail: "/markets",
    cover: "/images/stocky/stocky-terminal.png",
    chip: "verified pnl",
  },
  {
    title: "Timelock",
    line: "Oracle-less DeFi perps · $7.3M volume · founded end-to-end",
    href: "https://perps.timelock.trade/",
    detail: "/work/timelock",
    cover: "/images/work/timelock/protected-perps.jpg",
    chip: "founded",
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

function MagLink({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <motion.a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex" }}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

export function TenXHome({ dhan }: { dhan: Payload | null }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.2 });
  const [curiosity, setCuriosity] = useState(0);
  const [termKey, setTermKey] = useState(0);

  const series = dhan?.series ?? [];
  const e0 = dhan?.meta?.e0 ?? 0;
  const gross = dhan?.metrics?.grossCumulative ?? dhan?.metrics?.cumulative ?? null;
  const retPct =
    gross != null && e0 > 0 ? `${gross >= 0 ? "+" : ""}${((gross / e0) * 100).toFixed(1)}%` : null;
  const enough = series.length >= 2;

  const fadeUp: Variants = useMemo(
    () =>
      reduce
        ? { hidden: {}, show: {} }
        : {
            hidden: { opacity: 0, y: 28 },
            show: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, delay: 0.06 * i, ease },
            }),
          },
    [reduce],
  );

  const pctY = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

  return (
    <div className="tx">
      <div className="tx-ambient" aria-hidden />
      <div className="tx-grain" aria-hidden />
      {!reduce && <motion.div className="tx-progress" style={{ scaleX }} />}

      <header className="tx-nav">
        <Link href="/" className="tx-nav-brand">
          <Image
            src="/images/signature-neon-trans.png"
            alt=""
            width={36}
            height={36}
            className="h-7 w-7 object-contain"
            aria-hidden
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
        <a className="tx-btn tx-btn-go" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
          Book a call
        </a>
      </header>

      <div className="tx-main">
        {/* HERO */}
        <section className="tx-hero" aria-label="Hero">
          <div className="tx-hero-orb" aria-hidden />
          <div>
            <motion.p className="tx-kicker tx-mono" custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span className="tx-kicker-dot" aria-hidden />
              Live systems · real capital · Delta Exchange
            </motion.p>

            <motion.h1 className="tx-name" custom={1} variants={fadeUp} initial="hidden" animate="show">
              <span className="tx-name-line">Charandeep</span>
              <span className="tx-name-line">Kapoor</span>
            </motion.h1>

            <motion.p
              className="tx-lede tx-serif"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              I build AI that trades markets — <em>for real</em>. Verified bots, live signals, products
              people actually use.
            </motion.p>

            <motion.div
              className="tx-meta-row tx-mono"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <a href={PROOF.links.timelock} target="_blank" rel="noreferrer">
                Timelock
              </a>
              <span aria-hidden>·</span>
              <Link href="/markets">Stocky</Link>
              <span aria-hidden>·</span>
              <span>ex-quant</span>
              <span aria-hidden>·</span>
              <span style={{ color: "var(--tx-ink)" }}>Delta Exchange</span>
            </motion.div>

            <motion.div
              className="tx-actions"
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <MagLink href={PROOF.links.topmate} className="tx-btn tx-btn-go" external>
                Book a call
              </MagLink>
              <MagLink href="#proof" className="tx-btn tx-btn-ghost">
                See the proof
              </MagLink>
              <MagLink href={PROOF.links.twitter} className="tx-btn tx-btn-ghost" external>
                @yourasianquant
              </MagLink>
            </motion.div>
          </div>

          <motion.div
            className="tx-proof-card"
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease }}
          >
            <div className="tx-proof-head tx-mono">
              <span>portfolio · Dhan · return %</span>
              <span className="live">
                <span className="tx-kicker-dot" style={{ width: 6, height: 6 }} aria-hidden />
                {dhan?.asOf ? `as of ${dhan.asOf.slice(0, 10)}` : "live"}
              </span>
            </div>
            {enough ? (
              <EquityCurveSvg
                series={series}
                valueOf={(s) => (e0 > 0 ? (curveValue(s) / e0) * 100 : 0)}
                height={200}
                showAxes
                formatY={pctY}
                provisional={dhan?.provisional ?? false}
                stroke="#3dfb86"
                glow
              />
            ) : (
              <div
                style={{
                  height: 200,
                  display: "grid",
                  placeItems: "center",
                  border: "1px dashed rgba(61,251,134,0.3)",
                  borderRadius: 12,
                }}
              >
                <span className="tx-mono" style={{ fontSize: 11, color: "var(--tx-mute)", letterSpacing: "0.12em" }}>
                  LIVE P&amp;L · ACCUMULATING
                </span>
              </div>
            )}
            <div className="tx-proof-foot tx-mono">
              {retPct && <strong>{retPct} return</strong>}
              {gross != null && <span>· {gross >= 0 ? "+" : ""}{inr(gross)} gross</span>}
              <span>· updates daily ~00:00 IST</span>
            </div>
          </motion.div>

          <div className="tx-scroll-cue tx-mono" aria-hidden>
            <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
              <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.2" />
              <motion.circle
                cx="9"
                cy="9"
                r="2.2"
                fill="var(--tx-go)"
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            scroll
          </div>
        </section>

        {/* STATS */}
        <section className="tx-stats" id="proof" aria-label="Proof metrics">
          {PROOF.stats.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="tx-stat"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease }}
              onClick={() => setCuriosity((c) => c + 1)}
            >
              <strong className="tx-mono">{s.value}</strong>
              <span className="tx-mono">{s.label}</span>
              <small>{s.sub}</small>
            </motion.a>
          ))}
        </section>

        {/* WORK */}
        <section className="tx-section" id="work">
          <motion.p
            className="tx-section-label tx-mono"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            02 · Selected work
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            Things that actually shipped
          </motion.h2>
          <p className="tx-sub tx-serif">
            Live products and trading systems — not mockups. Most of them still running.
          </p>

          <div className="tx-work-grid">
            {WORK.map((w, i) => (
              <motion.a
                key={w.title}
                href={w.detail}
                className="tx-work-card"
                initial={reduce ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease }}
              >
                <div className="tx-work-media">
                  <Image
                    src={w.cover}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width:900px) 50vw, 100vw" : "(min-width:900px) 40vw, 100vw"}
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

          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/work" className="tx-btn tx-btn-ghost">
              All work &amp; tools →
            </Link>
          </div>
        </section>

        {/* PLAY */}
        <section className="tx-section" id="play">
          <p className="tx-section-label tx-mono">03 · Lab</p>
          <h2>Poke the machine</h2>
          <p className="tx-sub tx-serif">
            Same numbers as the verified track record — just more fun to touch. Curiosity is a feature.
          </p>

          <div className="tx-play">
            <motion.div
              key={termKey}
              className="tx-term tx-mono"
              initial={reduce ? false : { opacity: 0.4 }}
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
                <p className="tx-curiosity tx-mono">
                  curiosity {curiosity}
                  {curiosity >= 8 ? " · ok, you get it — book the call" : " · keep going"}
                </p>
              )}
              <div className="tx-actions" style={{ marginTop: "1.25rem" }}>
                <a className="tx-btn tx-btn-go" href={PROOF.links.topmate} target="_blank" rel="noreferrer">
                  Book a call
                </a>
                <Link className="tx-btn tx-btn-ghost" href="/track-record">
                  Full track record
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="tx-section tx-contact" id="contact">
          <p className="tx-section-label tx-mono">04 · Contact</p>
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
              © {new Date().getFullYear()} {PROOF.name} · wow track preview
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
