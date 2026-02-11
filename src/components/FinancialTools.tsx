import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface Tool {
  title: string;
  description: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
}

const tools: Tool[] = [
  {
    title: 'Voice Powered Trade Automation (Zerodha)',
    description: 'Developed a voice-powered trading automation using Model Context Protocol (MCP) to execute hands-free stock trades and backtests on Zerodha. Integrated AI-driven commands for efficient strategy implementation, significantly enhancing trading.',
    github: 'https://github.com/SirCharan/Zerodha-MCP-Tradin',
    demo: 'https://www.linkedin.com/posts/charandeep-kapoor_itc-claude-zerodha-activity-7330161190741987329-Ge1d?utm_source=share&utm_medium=member_desktop&rcm=ACoAACo1UwcBKImygIilymyjMGilKAFSb3fWG7Y',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Option Premium Calculator',
    description: 'Built to deliver live prices, real-time IV, and trader-focused features, aiding in precise options portfolio management.',
    github: 'https://github.com/SirCharan/option-bloom-calculator',
    demo: 'https://option-premium-calculator.vercel.app/',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Market Matters With CK',
    description: 'Built a user-friendly ChatGPT wrapper to deliver daily stock market updates, news highlights, and quick insights for retail and professional traders. Integrated LLM-powered Q&A interface to allow users to explore financial terms, stock-specific news, and macroeconomic trends conversationally.',
    demo: 'https://chatgpt.com/share/684fbf8b-196c-800f-a41f-9502a50cc8a9',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Voice-Activated Delta Trading Bot',
    description: "Voice-activated trading bot integrates Claude's MCP server with Delta Exchange API, enabling natural language processing to decode commands, identify product IDs, craft request headers, and execute trades in under an hour. Supports seamless Ethereum trading with simple voice commands like \"Buy 1000 rupees of Ethereum.\"",
    github: 'https://github.com/SirCharan/Delta',
    demo: 'https://www.linkedin.com/posts/charandeep-kapoor_crypto-claude-vibecoding-activity-7334621565780721664-SDqO?utm_source=share&utm_medium=member_desktop&rcm=ACoAACo1UwcBKImygIilymyjMGilKAFSb3fWG7Y',
    demoLabel: 'Live Demo',
  },
];

const BtnPrimary = ({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-4 py-2 rounded font-orbitron text-sm uppercase tracking-wider border border-[var(--neon-purple)] bg-purple-600/20 text-white hover:bg-purple-600/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] btn-shine transition-all duration-300"
  >
    <Icon size={14} className="mr-2" strokeWidth={2} />
    {children}
  </a>
);

const FinancialTools: React.FC = () => {
  return (
    <section id="tools" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            Financial Tools
          </h2>
          <p className="font-rajdhani text-base md:text-xl uppercase tracking-[0.2em] text-gray-200">
            <span className="text-[var(--neon-purple)]">|</span> Custom-built <span className="text-[var(--neon-cyan)]">|</span> Live
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard className="p-6 md:p-8 border-l-4 border-l-[var(--neon-purple)]">
                <div className="flex items-start gap-3 mb-3">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 mt-1.5" title="Live" />
                  <h3 className="font-orbitron text-base font-bold uppercase tracking-wide text-white">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base font-mono">{tool.description}</p>
                <div className="flex flex-wrap gap-3">
                  {tool.github && (
                    <BtnPrimary href={tool.github} icon={Github}>
                      Github
                    </BtnPrimary>
                  )}
                  {tool.demo && (
                    <BtnPrimary href={tool.demo} icon={ExternalLink}>
                      {tool.demoLabel || 'Live Demo'}
                    </BtnPrimary>
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

export default FinancialTools;
