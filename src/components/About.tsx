"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            About Me
          </h2>
          <p className="font-rajdhani text-base md:text-xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Crypto native · Quant · Builder
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="max-w-5xl mx-auto p-8 md:p-12">
            <div className="relative z-10">
              <p className="text-gray-200 leading-relaxed mb-6 font-medium text-base md:text-lg">
                6+ years of experience across product, research and VC in crypto & stock markets. Building and scaling products 0→1. I blend math and finance expertise to build DeFi products and quant strategies, transforming concepts into functional tools at the intersection of models and markets.
              </p>

              <div className="mt-6 border-t border-[var(--glass-border)] pt-6">
                <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-[var(--neon-purple)] mb-4">
                  Highlights
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-200 text-base md:text-lg font-medium leading-relaxed">
                  <li>Founder, Timelock Trade. Built leverage without liquidations.</li>
                  <li>Fine tuned a claude 3.5 sonnet model to generate 150%+ returns trading options.</li>
                  <li>Top 0.1% in academics. Engineering, IIT Kanpur.</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
