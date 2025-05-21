import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const FinancialTools: React.FC = () => {
  return (
    <section id="tools" className="py-20">
      <div className="container mx-auto px-8 md:px-12 max-w-6xl">
        <h2 className="section-title">Custom-Built Financial Tools</h2>
        
        <div className="space-y-8">
          <div className="glass-card p-6 md:p-8 animate-fade-in border-l-4 border-crypto-purple transition-all duration-300 hover:shadow-lg hover:shadow-crypto-purple/20 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-crypto-purple mr-3"></span>
              Voice Powered Trade Automation (Zerodha)
            </h3>
            <div className="mb-4">
              <p className="text-gray-300 mb-3">
                Developed a voice-powered trading automation using Model Context Protocol (MCP) to execute hands-free stock trades and backtests on Zerodha. Integrated AI-driven commands for efficient strategy implementation, significantly enhancing trading.
              </p>
              <div className="flex items-center space-x-3">
                <a href="https://github.com/SirCharan/Zerodha-MCP-Tradin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                  <Github size={16} className="mr-1" />
                  <span>Github</span>
                </a>
                <a href="https://www.linkedin.com/posts/charandeep-kapoor_itc-claude-zerodha-activity-7330161190741987329-Ge1d?utm_source=share&utm_medium=member_desktop&rcm=ACoAACo1UwcBKImygIilymyjMGilKAFSb3fWG7Y" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                  <ExternalLink size={16} className="mr-1" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 animate-fade-in border-l-4 border-crypto-purple transition-all duration-300 hover:shadow-lg hover:shadow-crypto-purple/20 hover:-translate-y-1" style={{
            animationDelay: "100ms"
          }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-crypto-purple mr-3"></span>
              Option Premium Calculator
            </h3>
            <div className="mb-4">
              <p className="text-gray-300 mb-3">
                Built to deliver live prices, real-time IV, and trader-focused features, aiding in precise options portfolio management.
              </p>
              <div className="flex items-center space-x-3">
                <a href="https://github.com/SirCharan/option-bloom-calculator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                  <Github size={16} className="mr-1" />
                  <span>Github</span>
                </a>
                <a href="https://option-premium-calculator.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                  <ExternalLink size={16} className="mr-1" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialTools; 