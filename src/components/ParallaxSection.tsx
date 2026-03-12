"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionParticles } from '@/components/SectionParticles';

const ParallaxSection = React.forwardRef<
  HTMLElement,
  { children: React.ReactNode; className?: string }
>(({ children, className = '' }, forwardedRef) => {
  const sectionRef = useRef<HTMLElement>(null);
  const setRef = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 0]);

  return (
    <section ref={setRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y }}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--neon-purple)]/5 via-transparent to-[var(--neon-cyan)]/5"
          style={{ backgroundSize: '100% 200%' }}
        />
      </motion.div>
      <SectionParticles />
      <div className="relative z-10">{children}</div>
    </section>
  );
});
ParallaxSection.displayName = 'ParallaxSection';

export default ParallaxSection;
