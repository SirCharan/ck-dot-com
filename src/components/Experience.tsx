
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
            Ideated and developed <a href="#" className="crypto-link">Timelock Trade</a>: Enabled traders to access high-leverage positions on all ERC20 tokens with zero liquidation risk for fixed durations. Each position is fully collateralized and created by borrowing tick liquidity from Uniswap V3 LP positions. This eliminates the need for liquidations during the trade duration while preserving risk-neutral optionality for LPs. <a href="#" className="crypto-link">Pitch deck</a> | <a href="#" className="crypto-link">Docs</a>
          </li>
          <li>
            Contributed to <a href="#" className="crypto-link">Methlab</a>, offering non-liquidable loans and leverage trading, by developing pricing and risk management strategies.
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
              BTC ATM Short Straddles: 2860% return in 1 year. (<a href="#" className="crypto-link">Video</a>, <a href="#" className="crypto-link">Blog</a>)
            </li>
            <li>
              Refined MACD Strategy: 100% in 2 years. (<a href="#" className="crypto-link">Video</a>, <a href="#" className="crypto-link">Blog</a>)
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-2">Growth:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Grew YouTube channel from 3k to 25k subscribers as the 1st hire.
            </li>
            <li>
              Showcased portfolio, live trading, and interacted with audience to grow the brand and educate the masses.
            </li>
            <li>
              Product: Took feedback from YouTube audience and worked on building new products like Signal Trading (<a href="#" className="crypto-link">Video</a>) to increase user adoption and experience.
            </li>
          </ul>
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
            Managed a $500k fund, achieving a 30% return ($145k) in 9 months during the 2022 bear market.
          </li>
          <li>
            Designed an arbitrage strategy between Delta Exchange and Deribit, yielding 50% return on $150k.
          </li>
          <li>
            Hedged &gt;$50M fund exposure using futures and options on BTC, ETH, and Solana.
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
            Conducted technical due diligence on DeFi protocols, identifying critical mechanism flaws.
          </li>
          <li>
            Supported portfolio company NFTPerp in developing trading mechanisms and derivative pricing.
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
            Optimized incentive mechanisms for MaticX token on Polygon.
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
      <div className="container mx-auto px-4">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={cn(
                "glass-card p-6 md:p-8 animate-fade-in",
                "border-l-4 border-crypto-purple"
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
