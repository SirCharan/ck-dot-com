"use client";

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ExperienceItem {
  company: string;
  position: string;
  duration?: string;
  description: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    company: "Timelock Trade",
    position: "Founder / Product Manager",
    duration: "Apr 2025 – Present",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          Bootstrapped Timelock Trade and led a cross-functional team of 6 across tech, product, design, BD and marketing.
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3 pl-0">
            <li>House of Finance (perpetual futures, options, prediction markets, binary options etc.) decentralized, oracle-less and liquidation free.</li>
            <li>Bootstrapped and led a team of 6; owned cross-functional execution across tech, product, design, BD and marketing.</li>
            <li>Achieved $7.3M in trading volume, $2M Total Value Locked (TVL), and onboarded 1,000+ active users on Monad testnet.</li>
            <li>
              <a href="https://www.canva.com/design/DAGm2s_RFrg/do31HlTouT9NRVeG3pjH8w/edit?utm_content=DAGm2s_RFrg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" className="crypto-link" target="_blank" rel="noopener noreferrer">Pitch Deck</a> | <a href="https://docs.timelock.trade/docs" className="crypto-link" target="_blank" rel="noopener noreferrer">Docs</a> | <a href="https://perps.timelock.trade/" className="crypto-link" target="_blank" rel="noopener noreferrer">Perps</a> | <a href="https://swap.timelock.trade/" className="crypto-link" target="_blank" rel="noopener noreferrer">Swap</a>
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    company: "Diffusion Labs",
    position: "Product Manager",
    duration: "Dec 2023 – Apr 2025",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          0→1 product leader for DeFi protocols, prediction markets and liquidation-free lending.
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3 pl-0">
            <li>0→1: Defined roadmap and led a 15-person team across product, engineering, design and growth for Methlab.</li>
            <li>Scaled Methlab to 20,000+ users and $50M TVL in 6 months with tight GTM and community strategy.</li>
            <li>0→1: Launched <a href="https://puffthedragon.xyz/" className="crypto-link" target="_blank" rel="noopener noreferrer">Puff</a>, a +EV prediction marketplace that reached $75M market cap and generated $2.5M in revenue.</li>
            <li>Partnered cross-functionally with design, engineering, and growth teams to ship and scale live products with measurable traction.</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    company: "Delta Exchange",
    position: "Product & Growth",
    duration: "Jun 2023 – Jul 2024",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          Led Socials & Traded live
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 space-y-4">
            <div>
              <h4 className="font-orbitron text-sm font-bold uppercase tracking-wider text-[var(--neon-cyan)] mb-2">Algo Trading</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300 pl-0">
                <li><strong>BTC ATM Short Straddles</strong>: 2860% return in 1 year. (<a href="https://www.youtube.com/watch?v=DuPdKyXKNh0" className="crypto-link">Video</a>, <a href="https://www.delta.exchange/blog/the-algo-trading-strategy-which-made-2860-returns-in-the-past-2-years" className="crypto-link">Blog</a>)</li>
                <li><strong>Refined MACD Strategy</strong>: 100% in 2 years. (<a href="https://youtu.be/1h_JSM_ZtkU" className="crypto-link">Video</a>, <a href="https://www.delta.exchange/blog/optimising-returns-pairing-ma-crossovers-with-a-trend-indicator?category=all" className="crypto-link">Blog</a>)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron text-sm font-bold uppercase tracking-wider text-[var(--neon-cyan)] mb-2">Growth</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300 pl-0">
                <li>Scaled social and education verticals; grew YouTube from 3K → 25K subscribers (+733%) in ~6 months.</li>
                <li>Led interactive live-trading sessions focused on strategy explainers, algo trading setups, AMAs and user feedback collection.</li>
              </ul>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    company: "Stader Labs",
    position: "Analyst",
    duration: "Mar 2023 – Nov 2023",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          On-chain analytics and treasury optimisation for multi-chain staking products.
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3 pl-0">
            <li>Delivered data-driven insights from blockchain analytics to guide Stader’s token launch, cross-chain growth and partnership strategy.</li>
            <li>Optimised stablecoin treasury yield generation using AMMs, lending, looping and Pendle.</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    company: "Heru Finance",
    position: "Trader & Investment Analyst",
    duration: "May 2022 – Feb 2023",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          Managed a $500K fund with a focus on delta-neutral DeFi strategies and risk management.
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3 pl-0">
            <li>Managed $500K fund, targeting &gt;30% delta-neutral yields from arbitrage, basis trading and pricing inefficiencies.</li>
            <li>Engineered hedging strategies using derivatives to offset &gt;$5M portfolio exposures and mitigate drawdowns across market cycles.</li>
            <li>Conducted technical due diligence and risk assessments on DeFi protocols for seed investments for the VC arm.</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    company: "Tykhe Block Ventures",
    position: "VC Analyst",
    duration: "Mar 2023 – Nov 2023",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          Technical due diligence on DeFi protocols
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3 pl-0">
            <li>Conducted <strong>technical due diligence</strong> on DeFi protocols, identifying critical mechanism flaws.</li>
            <li>Supported portfolio company <strong>NFTPerp</strong> in developing trading mechanisms and derivative pricing.</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    company: "Valiane Solutions",
    position: "Digital Marketing Executive",
    duration: "Jul 2020 – Feb 2023",
    description: (
      <Collapsible>
        <p className="text-gray-300">
          Led multi-channel digital marketing and shipped an NLP-powered support widget as a college project.
        </p>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 mt-2 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-rajdhani text-sm uppercase tracking-wider cursor-pointer"
          >
            <span className="group-data-[state=open]:hidden">Show more</span>
            <span className="hidden group-data-[state=open]:inline">Show less</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3 pl-0">
            <li>Led a team of 3 for full-cycle content creation, publishing, and multi-channel marketing campaigns and SEO improvements for clients.</li>
            <li>Built an NLP-powered chat support widget for customer support (before Intercom) and sold it to clients as a college project.</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
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
          <h2 className="font-orbitron text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            Work Experience
          </h2>
          <p className="font-rajdhani text-base md:text-xl uppercase tracking-[0.2em] text-gray-200">
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
                    <h3 className="font-orbitron text-lg font-bold uppercase tracking-wide text-white">
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
