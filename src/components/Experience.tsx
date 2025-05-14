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
    company: "Timelock Trade",
    position: "Founder",
    description: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Ideated & built <strong>Timelock Trade</strong>, a novel DeFi protocol that enables:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>
                Traders to access higher (&gt;1000x) leverage on any token without liquidations for fixed durations
              </li>
              <li>
                Uniswap LPs to earn higher risk-neutral premium yield with 1-click deposits into managed vaults
              </li>
            </ul>
          </li>
          <li>
            <a href="https://www.canva.com/design/DAGm2s_RFrg/do31HlTouT9NRVeG3pjH8w/edit?utm_content=DAGm2s_RFrg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" className="crypto-link" target="_blank" rel="noopener noreferrer">Pitch Deck</a> | <a href="https://docs.timelock.trade/docs" className="crypto-link" target="_blank" rel="noopener noreferrer">Docs</a> | <a href="https://www.timelock.trade/" className="crypto-link" target="_blank" rel="noopener noreferrer">Live Beta</a>
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
              <strong>BTC ATM Short Straddles</strong>: 2860% return in 1 year. (<a href="https://www.youtube.com/watch?v=DuPdKyXKNh0" className="crypto-link">Video</a>, <a href="https://www.delta.exchange/blog/the-algo-trading-strategy-which-made-2860-returns-in-the-past-2-years" className="crypto-link">Blog</a>)
            </li>
            <li>
              <strong>Refined MACD Strategy</strong>: 100% in 2 years. (<a href="https://youtu.be/1h_JSM_ZtkU" className="crypto-link">Video</a>, <a href="https://www.delta.exchange/blog/optimising-returns-pairing-ma-crossovers-with-a-trend-indicator?category=all" className="crypto-link">Blog</a>)
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-2">Growth:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              First Hire, grew YouTube channel by 733% from 3k to 25k subscribers in 6 months via creating educational content and live trading
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-white font-medium mb-2">Product:</h4>
          <p className="text-gray-300 pl-5">
            <li>
            Built new products based on Youtube feedback including a pioneering product in algo trading automation, Signal Trading <a href="https://www.youtube.com/watch?v=S_D8W_oqo-A" className="crypto-link" target="_blank" rel="noopener noreferrer">(Video)</a>            </li>
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
            <strong>Managed $500k</strong> for HNIs & uHNIs. <strong>30% return in 9 months</strong> in 2022 bear.
          </li>
          <li>
            Built arbitrage strategy with 50% APR exploiting price discrepancies between Delta Exchange and Deribit
          </li>
          <li>
            Hedged &gt;$50M fund's exposure with BTC & ETH futures and options.
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
            Optimized incentive mechanisms (bribe, reward) using data-driven systems for MaticX on Polygon.
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
