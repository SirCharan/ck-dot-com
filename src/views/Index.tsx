"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import ResearchPapers from '@/components/ResearchPapers';
import Academic from '@/components/Academic';
import Personal from '@/components/Personal';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';
import FinancialTools from '@/components/FinancialTools';
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

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  const addToSectionsRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }
    );

    const sections = Array.from(document.querySelectorAll('section'));
    sections.forEach((section) => {
      section.classList.add('section-animate');
      observer.observe(section);
      section.classList.add('hover:shadow-glow-card', 'transition-all', 'duration-500');
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative" style={{ background: 'var(--deep-bg)' }}>
      <Sidebar />

      <main className="relative z-10">
        <Hero />
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <About />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Experience />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <ResearchPapers />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Academic />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <FinancialTools />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Personal />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Contact />
        </ParallaxSection>
      </main>
    </div>
  );
};

export default Index;
