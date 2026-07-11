"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Ephemeris — the hero's Fig. 1. A top-down orrery of the inner solar system,
 * drawn as a lab-notebook figure: hairline elliptical orbits (Sun at a focus),
 * the four terrestrial planets plotted at their REAL heliocentric ecliptic
 * longitude for *today*, computed from J2000 mean orbital elements. Not
 * decoration — a live integration you can check against an almanac.
 *
 * Perf: orbits + rim are static SVG (drawn once). The planets advance via a
 * single rAF loop that mutates element attributes by ref — no React state per
 * frame. On phones (< 640px) or prefers-reduced-motion the loop never starts;
 * the figure is frozen at today's true positions.
 */

// ── J2000.0 mean orbital elements (Standish) ──────────────────────────────
//   a  semi-major axis (AU)   e  eccentricity
//   w  longitude of perihelion (deg)   L  mean longitude at epoch (deg)
//   n  mean motion (deg / day)
type Body = {
  name: string;
  a: number;
  e: number;
  w: number;
  L: number;
  n: number;
  color: string;
  r: number; // dot radius (px)
};

const BODIES: Body[] = [
  { name: "Mercury", a: 0.38709927, e: 0.20563593, w: 77.45779628, L: 252.2503235, n: 4.09233445, color: "#B9B4A6", r: 1.8 },
  { name: "Venus", a: 0.72333566, e: 0.00677672, w: 131.60246718, L: 181.9790995, n: 1.60213034, color: "#E8A33D", r: 2.6 },
  { name: "Earth", a: 1.00000261, e: 0.01671123, w: 102.93768193, L: 100.46457166, n: 0.98560912, color: "#6B8AAF", r: 2.7 },
  { name: "Mars", a: 1.52371034, e: 0.0933941, w: 336.06023395, L: 355.44656795, n: 0.5240384, color: "#C0603B", r: 2.2 },
];

const CX = 400;
const CY = 230;
const SCALE = 200 / 1.5237; // px per AU — Mars aphelion just inside the frame
const DEG = Math.PI / 180;

// Round to 1dp for RENDERED coordinates. sin/cos are not bit-identical across
// V8 builds (SSG build machine vs the browser), so raw floats produce a
// server/client hydration mismatch on the position-dependent SVG children.
// Rounding to the sub-pixel precision the rAF loop already uses erases the ULP
// difference without any visible change.
const r1 = (n: number): number => Number(n.toFixed(1));

/** Days since the J2000.0 epoch (2000-01-01 12:00 TT). */
function daysSinceJ2000(ms: number): number {
  return ms / 86400000 - 10957.5;
}

/** Heliocentric ecliptic (x, y) in px for a body at day `d`. */
function positionAt(b: Body, d: number): { x: number; y: number } {
  const L = b.L + b.n * d; // mean longitude
  const M = (L - b.w) * DEG; // mean anomaly
  // equation of centre (series in e) → true anomaly offset
  const C =
    (2 * b.e - b.e ** 3 / 4) * Math.sin(M) +
    1.25 * b.e ** 2 * Math.sin(2 * M) +
    (13 / 12) * b.e ** 3 * Math.sin(3 * M);
  const lambda = (L - b.w) * DEG + C + b.w * DEG; // true longitude (rad)
  const nu = lambda - b.w * DEG; // true anomaly
  const rAU = (b.a * (1 - b.e ** 2)) / (1 + b.e * Math.cos(nu));
  const rp = rAU * SCALE;
  return { x: r1(CX + rp * Math.cos(lambda)), y: r1(CY + rp * Math.sin(lambda)) };
}

/** Full orbit ellipse (Sun at focus) sampled as an SVG path. */
function orbitPath(b: Body): string {
  const pts: string[] = [];
  for (let i = 0; i <= 180; i++) {
    const nu = (i / 180) * 2 * Math.PI;
    const lambda = nu + b.w * DEG;
    const rAU = (b.a * (1 - b.e ** 2)) / (1 + b.e * Math.cos(nu));
    const rp = rAU * SCALE;
    const x = CX + rp * Math.cos(lambda);
    const y = CY + rp * Math.sin(lambda);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

const RATE = 4; // simulated days advanced per real second — a calm drift

export function Ephemeris() {
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const vectorRef = useRef<SVGLineElement | null>(null);
  const dateRef = useRef<SVGTextElement | null>(null);

  // Compute today's epoch only AFTER mount. During SSR/SSG and the first client
  // render, d0 is null → dd falls back to the J2000 epoch (a fixed, deterministic
  // reference), so the server HTML and the hydration render are byte-identical
  // (no hydration mismatch on the position-dependent children). Once mounted we
  // recompute for *today* — this also guarantees the frozen reduced-motion /
  // mobile figure shows today's real positions, not a stale build-time date.
  const [d0, setD0] = useState<number | null>(null);
  useEffect(() => setD0(daysSinceJ2000(Date.now())), []);
  const dd = d0 ?? 0;

  const orbits = useMemo(() => BODIES.map(orbitPath), []);
  const start = useMemo(() => BODIES.map((b) => positionAt(b, dd)), [dd]);

  useEffect(() => {
    if (d0 == null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    if (reduce || small) return; // frozen at today

    let raf = 0;
    const t0 = performance.now();
    const earthIdx = BODIES.findIndex((b) => b.name === "Earth");

    const tick = (now: number) => {
      const d = d0 + ((now - t0) / 1000) * RATE;
      for (let i = 0; i < BODIES.length; i++) {
        const p = positionAt(BODIES[i], d);
        const dot = dotRefs.current[i];
        if (dot) {
          dot.setAttribute("cx", p.x.toFixed(1));
          dot.setAttribute("cy", p.y.toFixed(1));
        }
        const lab = labelRefs.current[i];
        if (lab) {
          lab.setAttribute("x", (p.x + 7).toFixed(1));
          lab.setAttribute("y", (p.y - 6).toFixed(1));
        }
        if (i === earthIdx && vectorRef.current) {
          vectorRef.current.setAttribute("x2", p.x.toFixed(1));
          vectorRef.current.setAttribute("y2", p.y.toFixed(1));
        }
      }
      if (dateRef.current) {
        const jd = d + 2451545.0;
        const unixMs = (jd - 2440587.5) * 86400000;
        dateRef.current.textContent = new Date(unixMs)
          .toISOString()
          .slice(0, 10);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [d0]);

  const rimTicks = Array.from({ length: 12 }, (_, i) => i * 30);
  const rimR = 212;
  const startDate = useMemo(() => {
    const jd = dd + 2451545.0;
    return new Date((jd - 2440587.5) * 86400000).toISOString().slice(0, 10);
  }, [dd]);

  return (
    <svg
      viewBox="0 0 800 460"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Inner solar system ephemeris — heliocentric orrery"
      suppressHydrationWarning
    >
      {/* rim — faint dial + longitude ticks */}
      <circle cx={CX} cy={CY} r={rimR} fill="none" stroke="#E8E4DA" strokeOpacity="0.06" strokeWidth="1" />
      {rimTicks.map((deg) => {
        const a = deg * DEG;
        const inner = deg % 90 === 0 ? rimR - 10 : rimR - 5;
        const x1 = r1(CX + Math.cos(a) * rimR);
        const y1 = r1(CY + Math.sin(a) * rimR);
        const x2 = r1(CX + Math.cos(a) * inner);
        const y2 = r1(CY + Math.sin(a) * inner);
        return (
          <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8E4DA" strokeOpacity={deg % 90 === 0 ? 0.22 : 0.1} strokeWidth="1" />
        );
      })}
      {[0, 90, 180, 270].map((deg) => {
        const a = deg * DEG;
        const x = r1(CX + Math.cos(a) * (rimR + 12));
        const y = r1(CY + Math.sin(a) * (rimR + 12));
        return (
          <text key={deg} x={x} y={y} className="num" fontSize="9" fill="#E8E4DA" fillOpacity="0.28" textAnchor="middle" dominantBaseline="middle">
            {deg}°
          </text>
        );
      })}

      {/* orbit ellipses (Sun at focus) */}
      {orbits.map((d, i) => (
        <path key={BODIES[i].name} d={d} fill="none" stroke={BODIES[i].color} strokeOpacity="0.18" strokeWidth="1" />
      ))}

      {/* Earth's radius vector — a faint measurement line from the Sun */}
      <line
        ref={vectorRef}
        x1={CX}
        y1={CY}
        x2={start[2].x}
        y2={start[2].y}
        stroke="#6B8AAF"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Sun */}
      <circle cx={CX} cy={CY} r="8" fill="#E8A33D" fillOpacity="0.12" />
      <circle cx={CX} cy={CY} r="3.4" fill="#E8A33D" />

      {/* planets + labels */}
      {BODIES.map((b, i) => (
        <g key={b.name}>
          <circle
            ref={(el) => { dotRefs.current[i] = el; }}
            cx={start[i].x}
            cy={start[i].y}
            r={b.r}
            fill={b.color}
          />
          <text
            ref={(el) => { labelRefs.current[i] = el; }}
            x={start[i].x + 7}
            y={start[i].y - 6}
            className="num"
            fontSize="8.5"
            fill={b.color}
            fillOpacity="0.65"
          >
            {b.name}
          </text>
        </g>
      ))}

      {/* simulated-date readout */}
      <text ref={dateRef} x="788" y="448" className="num" fontSize="9" fill="#E8E4DA" fillOpacity="0.3" textAnchor="end">
        {startDate}
      </text>
    </svg>
  );
}
