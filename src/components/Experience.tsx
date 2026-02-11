import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

interface ExperienceItem {
  company: string;
  position: string;
  duration?: string;
  description: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    company: "Timelock Trade",
    position: "Founder",
    description: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Ideated & built <strong>Timelock Trade</strong>, a novel DeFi protocol that enables:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Traders to access higher (&gt;1000x) leverage on any token without liquidations for fixed durations</li>
              <li>Uniswap LPs to earn higher risk-neutral premium yield with 1-click deposits into managed vaults</li>
            </ul>
          </li>
          <li>
            <a href="https://www.canva.com/design/DAGm2s_RFrg/do31HlTouT9NRVeG3pjH8w/edit?utm_content=DAGm2s_RFrg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" className="crypto-link" target="_blank" rel="noopener noreferrer">Pitch Deck</a> | <a href="https://docs.timelock.trade/docs" className="crypto-link" target="_blank" rel="noopener noreferrer">Docs</a> | <a href="https://www.timelock.trade/" className="crypto-link" target="_blank" rel="noopener noreferrer">Live Beta</a>
          </li>
        </ul>
      </>
    ),
  },
  {
    company: "Diffusion Labs",
    position: "Quantitative Researcher",
    description: (
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Worked on developing mechanism, pricing and risk management strategies for <a href="https://www.methlab.xyz/" className="crypto-link" target="_blank" rel="noopener noreferrer">Methlab</a></li>
      </ul>
    ),
  },
  {
    company: "Delta Exchange",
    position: "Product & Growth",
    description: (
      <>
        <div className="mb-4">
          <h4 className="font-orbitron text-sm font-bold uppercase tracking-wider text-[var(--neon-cyan)] mb-2">Algo Trading</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>BTC ATM Short Straddles</strong>: 2860% return in 1 year. (<a href="https://www.youtube.com/watch?v=DuPdKyXKNh0" className="crypto-link">Video</a>, <a href="https://www.delta.exchange/blog/the-algo-trading-strategy-which-made-2860-returns-in-the-past-2-years" className="crypto-link">Blog</a>)</li>
            <li><strong>Refined MACD Strategy</strong>: 100% in 2 years. (<a href="https://youtu.be/1h_JSM_ZtkU" className="crypto-link">Video</a>, <a href="https://www.delta.exchange/blog/optimising-returns-pairing-ma-crossovers-with-a-trend-indicator?category=all" className="crypto-link">Blog</a>)</li>
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-orbitron text-sm font-bold uppercase tracking-wider text-[var(--neon-cyan)] mb-2">Growth</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>First Hire, grew YouTube channel by 733% from 3k to 25k subscribers in 6 months via creating educational content and live trading</li>
          </ul>
        </div>
        <div>
          <h4 className="font-orbitron text-sm font-bold uppercase tracking-wider text-[var(--neon-cyan)] mb-2">Product</h4>
          <p className="text-gray-300 pl-5">
            Built new products based on Youtube feedback including a pioneering product in algo trading automation, Signal Trading <a href="https://www.youtube.com/watch?v=S_D8W_oqo-A" className="crypto-link" target="_blank" rel="noopener noreferrer">(Video)</a>
          </p>
        </div>
      </>
    ),
  },
  {
    company: "Heru Finance",
    position: "Trader",
    description: (
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li><strong>Managed $500k</strong> for HNIs & uHNIs. <strong>30% return in 9 months</strong> in 2022 bear.</li>
        <li>Built arbitrage strategy with 50% APR exploiting price discrepancies between Delta Exchange and Deribit</li>
        <li>Hedged &gt;$50M fund's exposure with BTC & ETH futures and options.</li>
      </ul>
    ),
  },
  {
    company: "Tykhe Block Ventures",
    position: "VC Analyst",
    description: (
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Conducted <strong>technical due diligence</strong> on DeFi protocols, identifying critical mechanism flaws.</li>
        <li>Supported portfolio company <strong>NFTPerp</strong> in developing trading mechanisms and derivative pricing.</li>
      </ul>
    ),
  },
  {
    company: "Stader Labs",
    position: "Analyst",
    description: (
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Optimized incentive mechanisms (bribe, reward) using data-driven systems for MaticX on Polygon.</li>
      </ul>
    ),
  },
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section id="experience" className="py-16 md:py-24">
      <div ref={containerRef} className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-4">
            Work Experience
          </h2>
          <p className="font-rajdhani text-lg md:text-2xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Timeline <span className="text-[var(--neon-cyan)]">|</span> Roles
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)] origin-top rounded-full"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative pl-12 md:pl-24"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 w-4 h-4 -translate-x-1/2 rounded-full bg-[var(--deep-bg)] border-2 border-[var(--neon-purple)] flex items-center justify-center z-10 shadow-[0_0_12px_var(--neon-purple)]" />

                <GlassCard className="p-6 md:p-8 mb-0 border-l-2 border-l-[var(--neon-purple)]/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="font-orbitron text-xl font-bold uppercase tracking-wide text-white">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-rajdhani text-sm uppercase tracking-widest text-[var(--neon-purple)]">
                        {exp.company}
                      </span>
                      {exp.duration && (
                        <span className="font-mono text-xs text-[var(--neon-cyan)]/80">{exp.duration}</span>
                      )}
                    </div>
                  </div>
                  <div>{exp.description}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
