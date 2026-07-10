"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HERO_STATS, type HeroStat } from "@/data/site";
import { TickNumber } from "./lab/TickNumber";

const toneClass: Record<NonNullable<HeroStat["tone"]>, string> = {
  pos: "text-[rgb(var(--positive))]",
  accent: "text-[rgb(var(--accent))]",
  neutral: "text-ink",
};

function Tile({ stat }: { stat: HeroStat }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 15,
  });

  function onMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const inner = (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: reduced ? 0 : rx,
        rotateY: reduced ? 0 : ry,
        transformPerspective: 600,
      }}
      className="stat-tile h-full"
    >
      <div
        className={`stat-value text-3xl md:text-[2.1rem] ${toneClass[stat.tone ?? "neutral"]}`}
      >
        <TickNumber value={stat.value} />
      </div>
      <div className="mt-2 text-sm font-medium text-ink">{stat.label}</div>
      <div className="mt-0.5 text-xs text-mute">{stat.sub}</div>
    </motion.div>
  );

  if (!stat.href) return inner;
  return (
    <a
      href={stat.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]"
      aria-label={`${stat.label}: ${stat.value} (opens source)`}
    >
      {inner}
    </a>
  );
}

export function StatTiles() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {HERO_STATS.map((s) => (
        <Tile key={s.label} stat={s} />
      ))}
    </div>
  );
}
