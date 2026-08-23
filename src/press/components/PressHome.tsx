"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { EquityCurveSvg } from "@/components/lab/EquityCurveSvg";
import { CurveReveal } from "@/components/lab/CurveReveal";
import { curveValue, type Payload } from "@/lib/trackRecord";
import { inr } from "@/lib/format";
import { PROOF } from "@/press/lib/proof";
import { PressShell } from "./PressShell";
import { PressMachine } from "./PressMachine";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PressHome({ dhan }: { dhan: Payload | null }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  const series = dhan?.series ?? [];
  const e0 = dhan?.meta?.e0 ?? 0;
  const gross = dhan?.metrics?.grossCumulative ?? dhan?.metrics?.cumulative ?? null;
  const retPct =
    gross != null && e0 > 0 ? `${gross >= 0 ? "+" : ""}${((gross / e0) * 100).toFixed(1)}%` : null;
  const enough = series.length >= 2;
  const pctY = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

  useGSAP(
    () => {
      if (reduce || !root.current) return;
      const ctx = gsap.context(() => {
        gsap.from(".ph-line-in", {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
        });

        // Position-only entrances. Opacity gating is banned in this repo:
        // it hides real content behind an animation, tanks the axe contrast
        // audit (which samples mid-fade) and makes the page feel slow.
        gsap.from(".ph-fade", {
          y: 22,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.18,
          clearProps: "all",
        });

        gsap.from(".pm-in, .pm-core, .pm-out, .pm-flow", {
          y: 16,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.5,
        });

        gsap.from(".press-ticket", {
          y: 24,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".press-tickets",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".press-plate", {
          y: 20,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".press-ships",
            start: "top 85%",
            once: true,
          },
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root, dependencies: [reduce, enough] },
  );

  return (
    <PressShell bare>
      <div ref={root}>
        <section className="press-hero" aria-label="Hero">
          <div className="press-hero-grid">
            <div className="press-hero-copy">
              <p className="press-frame-k press-serif ph-fade">Delta Exchange · systems that trade</p>
              <h1 className="press-hero-name">
                <span className="ph-line"><span className="ph-line-in">Charandeep</span></span>
                <span className="ph-line"><span className="ph-line-in">Kapoor</span></span>
              </h1>
              <p className="press-hero-line press-serif ph-fade">
                Using AI to build a <em>money printing machine</em>.
              </p>
              <div className="press-hero-actions ph-fade">
                <a className="press-btn press-btn-go" href={PROOF.socials.topmate} target="_blank" rel="noreferrer">
                  Book a call
                </a>
                <a className="press-btn press-btn-ghost" href="#proof">
                  See the proof
                </a>
              </div>
              {/* No aria-label: it overrode the visible text and failed WCAG 2.5.3
                  (Label in Name). The visible copy is the accessible name. */}
              <a href="/track-record" className="press-live ph-fade">
                <span className="press-live-dot" aria-hidden />
                <span className="press-mono">
                  Live · Stocky <strong>+110%</strong> verified · Dhan book rebuilt daily
                  {dhan?.asOf ? ` · as of ${dhan.asOf}` : ""}
                </span>
              </a>
            </div>
            <div className="press-hero-art ph-fade">
              <PressMachine />
            </div>
          </div>
        </section>

        <section className="press-section" id="proof">
          <h2>Stamped proof</h2>
          <p className="press-section-sub press-serif">
            Real capital. External verification. Not a backtest deck.
          </p>
          <div className="press-tickets">
            {PROOF.tickets.map((t) => (
              <a key={t.label} className="press-ticket" href={t.href} target="_blank" rel="noreferrer">
                <div className="press-ticket-val press-mono">{t.value}</div>
                <div className="press-ticket-label press-mono">{t.label}</div>
                <div className="press-ticket-sub">{t.sub}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="press-section" id="ships">
          <h2>Ships that run</h2>
          <p className="press-section-sub press-serif">
            Live systems and products. Most of them still on.
          </p>
          <div className="press-ships">
            {PROOF.ships.map((s, i) => {
              const wide = "wide" in s && s.wide;
              return (
              <Link
                key={s.title}
                href={s.href}
                className={wide ? "press-plate press-plate-wide" : "press-plate"}
              >
                <div className="press-plate-media">
                  <Image
                    src={s.cover}
                    alt={s.alt}
                    fill
                    sizes={
                      wide
                        ? "(min-width:900px) 72rem, 100vw"
                        : i === 0
                          ? "(min-width:900px) 55vw, 100vw"
                          : "(min-width:900px) 40vw, 100vw"
                    }
                    priority={i === 0}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <div className="press-plate-body">
                  <h3>{s.title}</h3>
                  <p>{s.line}</p>
                </div>
              </Link>
              );
            })}
          </div>
          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/work" className="press-btn press-btn-ghost">
              All work
            </Link>
          </div>
        </section>

        <section className="press-section" id="ledger">
          <h2>Live ledger</h2>
          <p className="press-section-sub press-serif">
            Rule-based book on Dhan. Rebuilt daily. No LLM in the loop.
          </p>
          <div className="press-ledger">
            <div className="press-ledger-head press-mono">
              <span>Dhan · return %</span>
              <span style={{ whiteSpace: "nowrap" }}>{dhan?.asOf ? dhan.asOf.slice(0, 10) : "live"}</span>
            </div>
            {enough ? (
              <CurveReveal>
              <EquityCurveSvg
                series={series}
                valueOf={(s) => (e0 > 0 ? (curveValue(s) / e0) * 100 : 0)}
                height={200}
                showAxes
                formatY={pctY}
                formatAnnot={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`}
                provisional={dhan?.provisional ?? false}
                stroke="var(--p-go)"
                glow={false}
                annotate
                tipLabel={retPct ?? undefined}
                showDayCount
              />
              </CurveReveal>
            ) : (
              <div
                style={{
                  height: 180,
                  display: "grid",
                  placeItems: "center",
                  border: "1px dashed rgba(78,207,122,0.3)",
                  borderRadius: 6,
                  color: "var(--p-mute)",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                }}
                className="press-mono"
              >
                ACCUMULATING
              </div>
            )}
            <div className="press-ledger-foot press-mono">
              {retPct && <strong>{retPct} return</strong>}
              {gross != null && (
                <span>
                  {gross >= 0 ? "+" : ""}
                  {inr(gross)} gross
                </span>
              )}
              <Link href="/track-record" style={{ color: "var(--p-go)" }}>
                Full track record →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PressShell>
  );
}
