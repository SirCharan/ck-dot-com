"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const Personal: React.FC = () => {
  return (
    <section id="personal" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            Personal Achievements
          </h2>
          <p className="font-rajdhani text-base md:text-xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Social <span className="text-[var(--neon-cyan)]">|</span> Portfolio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform transform-gpu">
              <h3 className="font-orbitron text-base font-bold uppercase tracking-wide text-white mb-3 flex items-center gap-2">
                <span className="inline-flex w-8 h-8 rounded-full bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] items-center justify-center text-sm font-mono">
                  №1
                </span>
                Topmate Creator
              </h3>
              <div className="mb-4">
                <img
                  src="/lovable-uploads/4e6f0209-d05c-46d9-b7fd-fafbf4370013.png"
                  alt="Topmate Creator Achievements"
                  className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                />
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Top 0.1% creator in finance, rated 4.9/5 across 30+ client reviews.
              </p>
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-rajdhani text-sm uppercase tracking-wider text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors">
                <ExternalLink size={14} className="mr-1" strokeWidth={2} />
                View Profile
              </a>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform transform-gpu">
              <h3 className="font-orbitron text-base font-bold uppercase tracking-wide text-white mb-3 flex items-center gap-2">
                <span className="inline-flex w-8 h-8 rounded-full bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] items-center justify-center text-sm font-mono">
                  №2
                </span>
                Social Influence
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                6,000+ followers on LinkedIn, followed by notable figures in the crypto space.
              </p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-rajdhani text-sm uppercase tracking-wider text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors mb-2">
                <Linkedin size={14} className="mr-1" strokeWidth={2} />
                Connect on LinkedIn
              </a>
              <p className="text-gray-400 text-xs mt-2 mb-2">
                Followed by Polymarket, Trade Paradigm, AD Derivatives & founders of Pendle, Greeks.Live, and Delta Exchange on Twitter.
              </p>
              <a href="https://twitter.com/yourasianquant" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-rajdhani text-sm uppercase tracking-wider text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1" strokeWidth={2}>
                  <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.485 0-4.5 2.014-4.5 4.5 0 .353.04.697.116 1.027C7.728 9.37 4.1 7.6 1.67 4.905c-.388.666-.61 1.44-.61 2.263 0 1.563.796 2.942 2.008 3.75a4.48 4.48 0 0 1-2.037-.563v.057c0 2.185 1.555 4.007 3.623 4.424-.378.104-.777.16-1.188.16-.29 0-.57-.028-.844-.08.57 1.78 2.223 3.078 4.183 3.113A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.253 0 12.77-6.836 12.77-12.77 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.94 8.94 0 0 1-2.54.698z" />
                </svg>
                Connect on Twitter
              </a>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform transform-gpu">
              <h3 className="font-orbitron text-base font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-2">
                <span className="inline-flex w-8 h-8 rounded-full bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] items-center justify-center text-sm font-mono">
                  №3
                </span>
                Stock Market
              </h3>
              <div className="flex flex-col gap-6">
                <div>
                  <div className="mb-3 space-y-3">
                    <img
                      src="/lovable-uploads/portfolio-dashboard.png"
                      alt="Portfolio Dashboard - Account Overview"
                      className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                    />
                    <p className="text-gray-300 text-sm">
                      Achieved 100%+ ROI in 9 months, with Share 2.29 and 73% win rate on INR 15L capital.
                    </p>
                    <img
                      src="/lovable-uploads/5c63e2fd-b03f-4df6-94b6-1491914231a5.png"
                      alt="Portfolio Performance"
                      className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 transform-gpu"
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    Personal mutual fund portfolio ranked in top 1% of all Indians according to ET Money (XIRR &gt;50%).
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Personal;
