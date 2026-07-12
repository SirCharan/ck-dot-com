"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { CycleData } from "@/lib/cycle";

/**
 * The telemetry panel — Phase-2 "come online" intro layered over the Phase-1
 * static end-state.
 *
 * JS-off / reduced-motion / mobile see the FULLY-RENDERED panel (bars full,
 * reasoning fully opaque, live clock). With motion allowed, on mount the panel
 * boots: bars fill from 0, the reasoning reveals word-by-word (every word stays
 * in the DOM — only opacity animates, so SSR/SEO/tests keep the full text), and
 * the next-cycle countdown starts ticking. The reset-to-empty happens in a
 * layout effect *before* paint, so there is no flash of the full state.
 */

function pct(v: number) {
  return `${Math.round(v * 100)}%`;
}

function Bar({ label, value, display, zero }: { label: string; value: number; display: string; zero: boolean }) {
  const w = zero ? 3 : Math.max(4, Math.min(100, Math.round(value * 100)));
  return (
    <div className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-[12px]">
      <span className="font-mono uppercase tracking-[0.12em] text-[rgb(var(--faint))]">{label}</span>
      <span className="h-[6px] overflow-hidden rounded-full bg-[rgb(var(--raised))]" role="presentation">
        <span
          className="block h-full rounded-full bg-accent motion-safe:transition-[width] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ width: `${w}%` }}
        />
      </span>
      <span className="font-mono tabular-nums text-ink">{display}</span>
    </div>
  );
}

export function MissionControlPanel({
  c,
  live = false,
  asOf,
}: {
  c: CycleData;
  live?: boolean;
  asOf?: string;
}) {
  const reduce = useReducedMotion();
  const stamp = (asOf ?? c.timestampIST).slice(0, 10);
  const words = useMemo(() => c.reasoning.split(/(\s+)/), [c.reasoning]);

  const [zero, setZero] = useState(false); // bars start empty during boot
  const [shown, setShown] = useState(words.length); // full text by default
  const [clk, setClk] = useState("··:··");
  const [booting, setBooting] = useState(false);

  // Reset to empty BEFORE paint (no flash of the full state), only if animating.
  useLayoutEffect(() => {
    const small = typeof window !== "undefined" && window.innerWidth < 640;
    if (reduce || small) return;
    setBooting(true);
    setZero(true);
    setShown(0);
  }, [reduce]);

  // Fill the bars one frame after boot.
  useEffect(() => {
    if (!zero) return;
    const r = requestAnimationFrame(() => setZero(false));
    return () => cancelAnimationFrame(r);
  }, [zero]);

  // Stream the reasoning (opacity only — every word stays in the DOM).
  useEffect(() => {
    if (!booting) return;
    const id = setInterval(
      () =>
        setShown((s) => {
          if (s >= words.length) {
            clearInterval(id);
            return s;
          }
          return s + 1;
        }),
      26
    );
    return () => clearInterval(id);
  }, [booting, words.length]);

  // Live countdown to the next 15-minute IST cycle boundary.
  useEffect(() => {
    function tick() {
      const now = new Date();
      const istMs = now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000;
      const ist = new Date(istMs);
      const rem = (15 - (ist.getMinutes() % 15)) * 60 - ist.getSeconds();
      const mm = Math.floor(rem / 60);
      const ss = rem % 60;
      setClk(`${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const skip = () => {
    setBooting(false);
    setZero(false);
    setShown(words.length);
  };

  const rrScaled = Math.min(1, c.rr / 3);

  return (
    <div className="relative rounded-2xl border border-[rgb(var(--rule))] border-t-[rgb(var(--line-hi))] bg-[rgb(var(--panel))]">
      {booting && shown < words.length && (
        <button
          type="button"
          onClick={skip}
          className="absolute right-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.1em] text-[rgb(var(--faint))] hover:text-accent"
        >
          skip
        </button>
      )}
      <div className="flex items-center justify-between border-b border-[rgb(var(--rule))] px-4 py-3 font-mono text-[11px] tracking-[0.06em] text-[rgb(var(--faint))]">
        <span>telemetry · {c.asset} cycle</span>
        <span className="flex items-center gap-2 text-accent">
          <span
            aria-hidden
            className="inline-block h-[7px] w-[7px] rounded-full bg-accent motion-safe:animate-pulse"
          />
          nominal · next <span className="tabular-nums text-ink">{clk}</span>
        </span>
      </div>
      <div className="space-y-3 px-4 pt-4">
        <Bar label="conviction" value={c.conviction} display={c.conviction.toFixed(2)} zero={zero} />
        <Bar label="win rate" value={c.winRateAgg} display={pct(c.winRateAgg)} zero={zero} />
        <Bar label="R:R" value={rrScaled} display={c.rr.toFixed(2)} zero={zero} />
      </div>
      <div className="mt-4 border-t border-[rgb(var(--rule))] px-4 py-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[13px]">
          <span className="rounded-md bg-accent px-2.5 py-1 font-semibold uppercase tracking-[0.04em] text-[rgb(var(--bg))]">
            ▸ {c.direction} {c.asset.replace("USD", "")}
          </span>
          <span className="text-[rgb(var(--mute))]">
            e <span className="tabular-nums text-ink">{c.entry.toLocaleString()}</span> · sl{" "}
            <span className="tabular-nums text-ink">{c.stop.toLocaleString()}</span> · tp{" "}
            <span className="tabular-nums text-ink">{c.target.toLocaleString()}</span>
          </span>
        </div>
        <p
          data-testid="mc-reasoning"
          className="mt-3 max-w-[46ch] font-serif text-[14px] leading-[1.6] text-[rgb(var(--mute))]"
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="motion-safe:transition-opacity motion-safe:duration-300"
              style={{ opacity: i < shown ? 1 : 0.16 }}
            >
              {w}
            </span>
          ))}
        </p>
        <div className="mt-3 font-mono text-[12px] text-[rgb(var(--faint))]">
          burn armed ·{" "}
          {c.resolved ? (
            <span className={c.result.outcome === "win" ? "text-positive" : "text-neg"}>
              resolved {c.result.r > 0 ? "+" : ""}
              {c.result.r}R
            </span>
          ) : (
            <span className="text-amber">pending</span>
          )}{" "}
          · {live ? "live cycle" : "latest archived cycle"} · {stamp}
        </div>
      </div>
    </div>
  );
}
