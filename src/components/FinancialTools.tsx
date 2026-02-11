import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Tool {
  title: string;
  summary: string;
  description: string;
  descriptionList?: string[];
  github?: string;
  demo?: string;
  demoLabel?: string;
  latest?: string;
  latestLabel?: string;
  sensibull?: string;
}

const tools: Tool[] = [
  {
    title: 'Voice Powered Trade Automation (Zerodha)',
    summary: 'Voice-powered trading automation for Zerodha via MCP',
    description: 'Developed a voice-powered trading automation using Model Context Protocol (MCP) to execute hands-free stock trades and backtests on Zerodha. Integrated AI-driven commands for efficient strategy implementation, significantly enhancing trading.',
    github: 'https://github.com/SirCharan/Zerodha-MCP-Tradin',
    demo: 'https://www.linkedin.com/posts/charandeep-kapoor_itc-claude-zerodha-activity-7330161190741987329-Ge1d?utm_source=share&utm_medium=member_desktop&rcm=ACoAACo1UwcBKImygIilymyjMGilKAFSb3fWG7Y',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Option Premium Calculator',
    summary: 'Live prices, real-time IV for options portfolio management',
    description: 'Built to deliver live prices, real-time IV, and trader-focused features, aiding in precise options portfolio management.',
    github: 'https://github.com/SirCharan/option-bloom-calculator',
    demo: 'https://option-premium-calculator.vercel.app/',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Market Matters With CK',
    summary: 'ChatGPT wrapper for daily stock market updates and insights',
    description: 'Built a user-friendly ChatGPT wrapper to deliver daily stock market updates, news highlights, and quick insights for retail and professional traders. Integrated LLM-powered Q&A interface to allow users to explore financial terms, stock-specific news, and macroeconomic trends conversationally.',
    demo: 'https://chatgpt.com/share/684fbf8b-196c-800f-a41f-9502a50cc8a9',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Voice-Activated Delta Trading Bot',
    summary: 'Voice-activated crypto trading via Claude MCP + Delta API',
    description: "Voice-activated trading bot integrates Claude's MCP server with Delta Exchange API, enabling natural language processing to decode commands, identify product IDs, craft request headers, and execute trades in under an hour. Supports seamless Ethereum trading with simple voice commands like \"Buy 1000 rupees of Ethereum.\"",
    github: 'https://github.com/SirCharan/Delta',
    demo: 'https://www.linkedin.com/posts/charandeep-kapoor_crypto-claude-vibecoding-activity-7334621565780721664-SDqO?utm_source=share&utm_medium=member_desktop&rcm=ACoAACo1UwcBKImygIilymyjMGilKAFSb3fWG7Y',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Stocky AI',
    summary: '100%+ ROI in the stock market, 73% win rate',
    description: '',
    descriptionList: [
      'Fine tuned a Claude 3.5 Sonnet model and built a custom MCP server to connect it to Zerodha to trade the Indian stock market.',
      'Achieved 100%+ ROI in 9 months, with Share 2.29 and 73% win rate on INR 15L capital.',
    ],
    demo: 'https://stockai-red.vercel.app/',
    demoLabel: 'Live Link',
    latest: 'https://www.linkedin.com/posts/charandeep-kapoor_150-in-8-months-i-gave-stocky-15l-in-june-activity-7427296096374308865-HdkN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACo1UwcBKImygIilymyjMGilKAFSb3fWG7Y',
    latestLabel: 'Latest',
    sensibull: 'https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl',
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
    className="inline-flex items-center px-5 py-2.5 rounded font-orbitron text-base uppercase tracking-wider border border-[var(--neon-purple)] bg-purple-600/20 text-white hover:bg-purple-600/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] btn-shine transition-all duration-300"
  >
    <Icon size={16} className="mr-2" strokeWidth={2} />
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
                <Collapsible>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 mt-2" title="Live" />
                    <h3 className="font-orbitron text-lg md:text-xl font-bold uppercase tracking-wide text-white">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 text-base md:text-lg font-medium mb-2 leading-relaxed">
                    {tool.summary}
                  </p>
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="group flex items-center gap-1.5 mt-3 text-[var(--neon-cyan)] hover:text-[var(--neon-purple)] transition-colors font-orbitron text-base uppercase tracking-wider cursor-pointer"
                    >
                      <span className="group-data-[state=open]:hidden">Show more</span>
                      <span className="hidden group-data-[state=open]:inline">Show less</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {tool.descriptionList ? (
                      <ul className="list-disc list-inside space-y-2 text-gray-200 mt-4 mb-4 text-base md:text-lg font-medium leading-relaxed pl-0">
                        {tool.descriptionList.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-200 mt-4 mb-4 text-base md:text-lg font-medium leading-relaxed">{tool.description}</p>
                    )}
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
                      {tool.latest && (
                        <BtnPrimary href={tool.latest} icon={ExternalLink}>
                          {tool.latestLabel || 'Latest'}
                        </BtnPrimary>
                      )}
                      {tool.sensibull && (
                        <BtnPrimary href={tool.sensibull} icon={ExternalLink}>
                          Sensibull
                        </BtnPrimary>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialTools;
