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
          <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            About Me
          </h2>
          <p className="font-rajdhani text-lg md:text-2xl uppercase tracking-[0.2em] text-gray-200">
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
              <p className="text-gray-300 leading-relaxed mb-6 font-medium text-base md:text-lg">
                Crypto native with 5+ years in product, research, and trading. I blend math and finance expertise to build DeFi products and quant strategies, transforming concepts into functional tools at the intersection of models and markets.
              </p>

              <div className="mt-6 border-t border-[var(--glass-border)] pt-6">
                <h3 className="font-orbitron text-lg font-bold uppercase tracking-wide text-[var(--neon-purple)] mb-3">
                  Highlights
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Founded <strong>Timelock Trade</strong> — non-liquidable leverage protocol</li>
                  <li>Managed $500k at <strong>Heru Finance</strong> with 30% returns in bear market</li>
                  <li>Specialized in quantitative research and strategy development</li>
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
