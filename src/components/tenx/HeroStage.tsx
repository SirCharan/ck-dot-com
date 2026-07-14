"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroCurve } from "./HeroCurve";
import { inr } from "@/lib/format";
import type { Payload } from "@/lib/trackRecord";
import { PROOF } from "@/components/spikes/proof";

gsap.registerPlugin(useGSAP);

function MagButton({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className: string;
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
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.a
      href={href}
      className={className}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
    >
      {children}
    </motion.a>
  );
}

export function HeroStage({ dhan }: { dhan: Payload | null }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);

  const series = dhan?.series ?? [];
  const e0 = dhan?.meta?.e0 ?? 0;
  const gross = dhan?.metrics?.grossCumulative ?? dhan?.metrics?.cumulative ?? null;
  const retPct =
    gross != null && e0 > 0 ? `${gross >= 0 ? "+" : ""}${((gross / e0) * 100).toFixed(1)}%` : null;
  const enough = series.length >= 2;

  useGSAP(
    () => {
      if (reduce || !root.current) return;

      const ctx = gsap.context(() => {
        // Prevent FOUC: hide choreographed bits immediately
        gsap.set(".tx-name-line", { yPercent: 110, opacity: 0 });
        gsap.set([".tx-hero-kicker", ".tx-hero-copy-in"], { y: 18, opacity: 0 });
        gsap.set(".tx-proof-card", { y: 36, opacity: 0, scale: 0.97 });
        gsap.set(".tx-scroll-cue", { opacity: 0 });
        gsap.set(".tx-hero-orb", { scale: 0.65, opacity: 0 });
        gsap.set(".tx-hero-orb-2", { scale: 0.7, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Orbs
        tl.to(".tx-hero-orb", { scale: 1, opacity: 1, duration: 1.05, ease: "power2.out" }, 0);
        tl.to(".tx-hero-orb-2", { scale: 1, opacity: 0.75, duration: 1.1, ease: "power2.out" }, 0.12);

        // Kicker
        tl.fromTo(
          ".tx-hero-kicker",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.15,
        );

        // Name lines — clip reveal
        tl.fromTo(
          ".tx-name-line",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power4.out" },
          0.22,
        );

        // Lede / meta / actions
        tl.fromTo(
          ".tx-hero-copy-in",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          0.55,
        );

        // Proof card
        tl.fromTo(
          ".tx-proof-card",
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          0.35,
        );

        // Curve draw-on
        const line = root.current?.querySelector(".tx-curve-line") as SVGPathElement | null;
        if (line && line.getTotalLength) {
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
          gsap.set(".tx-curve-area", { opacity: 0 });
          gsap.set(".tx-curve-dot", { scale: 0, transformOrigin: "50% 50%" });
          tl.to(line, { strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut" }, 0.65);
          tl.to(".tx-curve-area", { opacity: 1, duration: 0.6 }, 1.2);
          tl.to(".tx-curve-dot", { scale: 1, duration: 0.35, ease: "back.out(2)" }, 1.55);
        }

        // Foot metrics
        tl.fromTo(
          ".tx-proof-foot > *",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
          1.5,
        );

        // Scroll cue
        tl.fromTo(".tx-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.7);

        // Continuous orb breathe (after intro)
        gsap.to(".tx-hero-orb", {
          scale: 1.08,
          opacity: 0.88,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.9,
        });
        gsap.to(".tx-hero-orb-2", {
          scale: 1.12,
          opacity: 0.55,
          duration: 4.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.1,
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: root, dependencies: [reduce, enough, series.length] },
  );

  // Subtle mouse parallax on proof card
  useGSAP(
    () => {
      if (reduce || !root.current) return;
      const card = root.current.querySelector(".tx-proof-card") as HTMLElement | null;
      if (!card) return;

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: px * 4,
          rotateX: -py * 4,
          transformPerspective: 900,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section className="tx-hero" aria-label="Hero" ref={root}>
      <div className="tx-hero-orb" aria-hidden />
      <div className="tx-hero-orb tx-hero-orb-2" aria-hidden />

      <div className="tx-hero-left">
        <p className="tx-kicker tx-mono tx-hero-kicker">
          <span className="tx-kicker-dot" aria-hidden />
          Live systems · real capital · Delta Exchange
        </p>

        <h1 className="tx-name">
          <span className="tx-name-mask">
            <span className="tx-name-line">Charandeep</span>
          </span>
          <span className="tx-name-mask">
            <span className="tx-name-line">Kapoor</span>
          </span>
        </h1>

        <p className="tx-lede tx-serif tx-hero-copy-in">
          I build AI that trades markets — <em>for real</em>. Verified bots, live signals, products
          people actually use.
        </p>

        <div className="tx-meta-row tx-mono tx-hero-copy-in">
          <a href={PROOF.links.timelock} target="_blank" rel="noreferrer">
            Timelock
          </a>
          <span aria-hidden>·</span>
          <Link href="/markets">Stocky</Link>
          <span aria-hidden>·</span>
          <span>ex-quant</span>
          <span aria-hidden>·</span>
          <span className="tx-meta-strong">Delta Exchange</span>
        </div>

        <div className="tx-actions tx-hero-copy-in">
          <MagButton href={PROOF.links.topmate} className="tx-btn tx-btn-go" external>
            Book a call
          </MagButton>
          <MagButton href="#proof" className="tx-btn tx-btn-ghost">
            See the proof
          </MagButton>
          <MagButton href={PROOF.links.twitter} className="tx-btn tx-btn-ghost" external>
            @yourasianquant
          </MagButton>
        </div>
      </div>

      <div className="tx-proof-card">
        <div className="tx-proof-head tx-mono">
          <span>portfolio · Dhan · return %</span>
          <span className="live">
            <span className="tx-kicker-dot" style={{ width: 6, height: 6 }} aria-hidden />
            {dhan?.asOf ? `as of ${dhan.asOf.slice(0, 10)}` : "live"}
          </span>
        </div>

        {enough ? (
          <HeroCurve
            series={series}
            e0={e0}
            provisional={dhan?.provisional ?? false}
            height={210}
          />
        ) : (
          <div className="tx-curve-empty" style={{ height: 210 }}>
            <span className="tx-mono">LIVE P&amp;L · ACCUMULATING</span>
          </div>
        )}

        <div className="tx-proof-foot tx-mono">
          {retPct && <strong>{retPct} return</strong>}
          {gross != null && (
            <span>
              · {gross >= 0 ? "+" : ""}
              {inr(gross)} gross
            </span>
          )}
          <span>· updates daily ~00:00 IST</span>
        </div>
      </div>

      <a href="#proof" className="tx-scroll-cue tx-mono" aria-label="Scroll to proof">
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden>
          <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.2" />
          <circle className="tx-scroll-dot" cx="9" cy="9" r="2.2" fill="var(--tx-go)" />
        </svg>
        scroll
      </a>
    </section>
  );
}
