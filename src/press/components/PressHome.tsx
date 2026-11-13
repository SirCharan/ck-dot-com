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
import { curveValue, formatWindowStart, type Payload } from "@/lib/trackRecord";
import { inr } from "@/lib/format";
import { PROOF } from "@/press/lib/proof";
import type { DrishtiStats } from "@/press/lib/drishti";
import { isRewritten } from "@/press/lib/links";
import { PressShell } from "./PressShell";
import { PressHandshake } from "./PressHandshake";
import { AndreaLead } from "./AndreaLead";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PressHome({ dhan, drishti }: { dhan: Payload | null; drishti: DrishtiStats | null }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  const lead = PROOF.ships.find((x) => x.title === "Andrea's World");
  const rest = PROOF.ships.filter((x) => x.title !== "Andrea's World");

  const series = dhan?.series ?? [];
  const e0 = dhan?.meta?.e0 ?? 0;
  const gross = dhan?.metrics?.grossCumulative ?? dhan?.metrics?.cumulative ?? null;
  const retPct =
    gross != null && e0 > 0 ? `${gross >= 0 ? "+" : ""}${((gross / e0) * 100).toFixed(1)}%` : null;
  const since = formatWindowStart(dhan?.meta?.from);
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

        gsap.from(".press-plate", {
          y: 20,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".press-bento",
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
              <p className="press-hero-id ph-fade">AI Product Manager at Delta Exchange. <span>2x founder.</span></p>
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
              <PressHandshake triggerSelector=".press-hero" />
            </div>
          </div>
          <div className="press-hero-stats ph-fade" id="proof">
            {PROOF.tickets.map((t, i) => (
              <a
                key={t.label}
                className={i === 0 ? "press-stat press-stat-lead" : "press-stat"}
                href={t.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="press-stat-val press-mono">{t.value}</span>
                <span className="press-stat-label press-mono">{t.label}</span>
                <span className="press-stat-sub">{t.sub}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="press-section" id="ships">
          <h2>Ships that run</h2>
          <p className="press-section-sub press-serif">
            Live systems and products. Most of them still on.
          </p>
          {lead && <AndreaLead title={lead.title} line={lead.line} cover={lead.cover} alt={lead.alt} />}
          <div className="press-bento">
            {rest.map((s) => {
              const external = s.href.startsWith("http");
              const plain = external || isRewritten(s.href);
              const Tag = plain ? "a" : Link;
              const span2 = s.title === "Calculator sites";
              if (s.title === "Drishti" && drishti) {
                return (
                  <Tag key={s.title} href={s.href} className="press-plate">
                    <div className="press-plate-live">
                      <span className="press-live-k press-mono">
                        <span className="press-live-dot" aria-hidden /> Live ledger
                      </span>
                      <span className="press-live-big press-mono">{drishti.winRate.toFixed(1)}%</span>
                      <span className="press-live-row press-mono">win rate, all-time</span>
                      <span className="press-live-row press-mono">
                        {drishti.wins.toLocaleString("en-US")} W / {drishti.losses.toLocaleString("en-US")} L
                        {drishti.open != null ? ` · ${drishti.open} open` : ""}
                      </span>
                    </div>
                    <div className="press-plate-body">
                      <h3>{s.title}</h3>
                      <p>{s.line}</p>
                    </div>
                  </Tag>
                );
              }
              return (
                <Tag
                  key={s.title}
                  href={s.href}
                  className={span2 ? "press-plate press-plate-span2" : "press-plate"}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <div className="press-plate-media">
                    <Image
                      src={s.cover}
                      alt={s.alt}
                      fill
                      sizes={span2 ? "(min-width:900px) 40vw, 100vw" : "(min-width:900px) 24rem, 100vw"}
                    />
                  </div>
                  <div className="press-plate-body">
                    <h3>{s.title}</h3>
                    <p>{s.line}</p>
                  </div>
                </Tag>
              );
            })}
            <Link href="/work" className="press-plate press-plate-more">
              <strong>All work</strong>
              <span>Every build, grouped by the role I was in.</span>
              <em>See the timeline →</em>
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
              <span>Dhan · return %{since ? ` · since ${since}` : ""}</span>
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
                zeroOrigin
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
