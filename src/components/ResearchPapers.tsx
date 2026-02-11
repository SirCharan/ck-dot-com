import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface ResearchItem {
  title: string;
  venue?: string;
  year?: string;
  link?: string;
  description?: string;
}

const items: ResearchItem[] = [
  {
    title: 'Options Pricing | Timelock Protocol',
    venue: 'Protocol Docs',
    year: '',
    link: 'https://docs.timelock.trade/docs/protocol/mechanism/pricing',
    description: 'Mathematical derivation of oracle-less option pricing. Black-Scholes adaptation for crypto, implied volatility from Uniswap data, theta approximation using Dirac distributions.',
  },
];

const ResearchPapers: React.FC = () => {
  return (
    <section id="research-papers" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            Research Papers
          </h2>
          <p className="font-rajdhani text-base md:text-xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Academic &amp; Technical Research
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard className="p-6 md:p-8 border-l-4 border-l-[var(--neon-cyan)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-orbitron text-lg md:text-xl font-bold uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    {(item.venue || item.year) && (
                      <p className="text-base md:text-lg text-gray-400 mt-1 font-medium">
                        {[item.venue, item.year].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-gray-200 text-base md:text-lg mt-2 font-medium leading-relaxed">{item.description}</p>
                    )}
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-orbitron text-base uppercase tracking-wider border border-[var(--neon-cyan)] bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 transition-all shrink-0"
                    >
                      <ExternalLink size={16} strokeWidth={2} />
                      Read
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers;
