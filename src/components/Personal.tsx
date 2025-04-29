
import React from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';

const Personal: React.FC = () => {
  return (
    <section id="personal" className="py-20 bg-crypto-black/80">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Personal Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-8 h-8 rounded-full bg-crypto-purple/20 text-crypto-purple flex items-center justify-center mr-2">
                <span className="text-sm">№1</span>
              </span>
              Topmate Creator
            </h3>
            <p className="text-gray-300 mb-4">
              Top 0.1% creator in finance, rated 4.9/5 across 30+ client reviews.
            </p>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              <span>View Profile</span>
            </a>
          </div>
          
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-8 h-8 rounded-full bg-crypto-purple/20 text-crypto-purple flex items-center justify-center mr-2">
                <span className="text-sm">№2</span>
              </span>
              Social Influence
            </h3>
            <p className="text-gray-300 mb-4">
              6,000+ followers on LinkedIn, followed by notable figures in the crypto space.
            </p>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors"
            >
              <Linkedin size={16} className="mr-1" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
          
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-8 h-8 rounded-full bg-crypto-purple/20 text-crypto-purple flex items-center justify-center mr-2">
                <span className="text-sm">№3</span>
              </span>
              Stock Market
            </h3>
            <p className="text-gray-300">
              Personal mutual fund portfolio ranked in top 1% of all Indians according to ET Money (XIRR >50%).
            </p>
          </div>
        </div>
        
        <div className="mt-12 glass-card p-6 animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-4">Market Insights</h3>
          <p className="text-gray-300 mb-4">
            Beyond trading, I actively share market insights and educational content across various platforms. My approach combines technical analysis with fundamental market understanding, focusing on sustainable strategies rather than short-term gains.
          </p>
          <p className="text-gray-300">
            I believe in demystifying the complexities of crypto and finance, making these subjects accessible to enthusiasts at all levels of expertise. This philosophy has guided my content creation and mentorship activities, helping clients and followers navigate the often confusing world of cryptocurrency and investment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Personal;
