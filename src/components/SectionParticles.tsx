"use client";

import { useMemo } from "react";

const COLORS = ["#8B5CF6", "#6366F1", "#8B5CF6"];
const COUNT = 5;

interface Particle {
  width: number;
  left: string;
  top: string;
  color: string;
  duration: string;
  delay: string;
}

export function SectionParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: COUNT }, () => {
      const size = Math.random() * 50 + 20;
      return {
        width: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 5}s`,
      };
    });
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-icon"
          aria-hidden
          style={{
            width: p.width,
            height: p.width,
            borderRadius: "50%",
            backgroundColor: p.color,
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}
