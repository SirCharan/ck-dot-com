import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

interface AcademicItem {
  title: string;
  details: string;
}

const academics: AcademicItem[] = [
  { title: 'B.Tech', details: 'IIT Kanpur (2018-2022)' },
  { title: 'JEE Advanced 2018', details: 'AIR 638 (99.96% percentile)' },
  { title: 'JEE Main 2018', details: 'AIR 272 (99.98% percentile)' },
  { title: 'CAT 2022', details: '99.79%ile' },
  { title: 'CAT 2023', details: '99.85%ile' },
  { title: 'CAT 2024', details: '98.80%ile' },
  { title: 'National Maths Olympiad', details: 'AIR 3' },
];

const certifications: AcademicItem[] = [
  { title: 'NTSE, KVPY Scholar', details: '' },
  { title: 'NISM Series VA', details: 'Mutual Fund Distributor' },
  { title: 'NISM Series VIII', details: 'Equity Derivatives' },
  { title: 'NISM Series XV', details: 'Research Analyst' },
];

const Academic: React.FC = () => {
  return (
    <section id="academic" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            Academic Background
          </h2>
          <p className="font-rajdhani text-lg md:text-2xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Education <span className="text-[var(--neon-cyan)]">|</span> Certifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-8 md:p-10">
              <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-[var(--neon-purple)] mb-6">
                Education & Achievements
              </h3>
              <div className="space-y-6">
                {academics.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0"
                  >
                    <h4 className="font-rajdhani text-sm uppercase tracking-widest text-[var(--neon-cyan)] font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 mt-1 font-mono text-sm">{item.details}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="p-8 md:p-10">
              <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-[var(--neon-purple)] mb-6">
                Certifications
              </h3>
              <div className="space-y-6">
                {certifications.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0"
                  >
                    <h4 className="font-rajdhani text-sm uppercase tracking-widest text-[var(--neon-cyan)] font-semibold">
                      {item.title}
                    </h4>
                    {item.details && <p className="text-gray-300 mt-1 font-mono text-sm">{item.details}</p>}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Academic;
