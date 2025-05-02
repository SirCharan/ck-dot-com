
import React from 'react';
import { cn } from '@/lib/utils';

interface ExperienceItem {
  company: string;
  position: string;
  duration?: string;
  description: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    company: "Diffusion Labs",
    position: "Quantitative Researcher",
    description: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Ideated and developed <a href="#" className="crypto-link"><strong>Timelock Trade</strong></a>: Enabled traders to access <strong>high-leverage</strong> positions on all ERC20 tokens with <strong>zero liquidation risk</strong> for fixed durations. Each position is fully collateralized and created by borrowing tick liquidity from Uniswap V3 LP positions. This eliminates the need for liquidations during the trade duration while preserving risk-neutral optionality for LPs. <a href="#" className="crypto-link">Pitch deck</a> | <a href="#" className="crypto-link">Docs</a>
          </li>
          <li>
            Contributed to <a href="#" className="crypto-link"><strong>Methlab</strong></a>, offering non-liquidable loans and leverage trading, by developing pricing and risk management strategies.
          </li>
        </ul>
      </>
    )
  },
  {
    company: "Delta Exchange",
    position: "Product & Growth",
    description: (
      <>
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">Algo Trading:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>BTC ATM Short Straddles</strong>: 2860% return in 1 year. (<a href="#" className="crypto-link">Video</a>, <a href="#" className="crypto-link">Blog</a>)
            </li>
            <li>
              <strong>Refined MACD Strategy</strong>: 100% in 2 years. (<a href="#" className="crypto-link">Video</a>, <a href="#" className="crypto-link">Blog</a>)
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-2">Growth:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Grew YouTube channel from <strong>3k to 25k</strong> subscribers as the 1st hire.
            </li>
            <li>
              Showcased portfolio, live trading, and interacted with audience to grow the brand and educate the masses.
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-white font-medium mb-2">Product:</h4>
          <p className="text-gray-300 pl-5">
            Took feedback from YouTube audience and worked on building new products like <strong>Signal Trading</strong> (<a href="#" className="crypto-link">Video</a>) to increase user adoption and experience.
          </p>
        </div>
      </>
    )
  },
  {
    company: "Heru Finance",
    position: "Trader",
    description: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Managed a <strong>$500k fund</strong>, achieving a <strong>30% return</strong> ($145k) in 9 months during the 2022 bear market.
          </li>
          <li>
            Designed an <strong>arbitrage strategy</strong> between Delta Exchange and Deribit, yielding <strong>50% return</strong> on $150k.
          </li>
          <li>
            Hedged <strong>&gt;$50M</strong> fund exposure using futures and options on BTC, ETH, and Solana.
          </li>
        </ul>
      </>
    )
  },
  {
    company: "Tykhe Block Ventures",
    position: "VC Analyst",
    description: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Conducted <strong>technical due diligence</strong> on DeFi protocols, identifying critical mechanism flaws.
          </li>
          <li>
            Supported portfolio company <strong>NFTPerp</strong> in developing trading mechanisms and derivative pricing.
          </li>
        </ul>
      </>
    )
  },
  {
    company: "Stader Labs",
    position: "Analyst",
    description: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Optimized <strong>incentive mechanisms</strong> for MaticX token on Polygon.
          </li>
          <li>
            Analyzed trends and growth drivers for DeFi products to formulate launch strategies.
          </li>
        </ul>
      </>
    )
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-crypto-black/80">
      <div className="container mx-auto px-8 md:px-12 max-w-6xl">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={cn(
                "glass-card p-6 md:p-8 animate-fade-in",
                "border-l-4 border-crypto-purple",
                "transition-all duration-300 hover:shadow-lg hover:shadow-crypto-purple/20 hover:-translate-y-1 hover:border-crypto-purple/80"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                <div className="flex items-center">
                  <span className="text-crypto-purple font-medium">{exp.company}</span>
                  {exp.duration && (
                    <span className="text-gray-400 text-sm ml-2">({exp.duration})</span>
                  )}
                </div>
              </div>
              <div>{exp.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
