"use client";

import { useMemo, useState, useEffect } from "react";

const COLORS = ["#8B5CF6", "#6366F1", "#8B5CF6"];

interface Particle {
  width: number;
  left: string;
  top: string;
  color: string;
  duration: string;
  delay: string;
}

export function SectionParticles() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    if (isMobile) return [];
    return Array.from({ length: 2 }, () => {
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
  }, [isMobile]);

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
