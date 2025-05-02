import React from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';

const Personal: React.FC = () => {
  return <section id="personal" className="py-20 bg-crypto-black/80">
      <div className="container mx-auto px-8 md:px-12 max-w-6xl">
        <h2 className="section-title">Personal Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 animate-fade-in transition-all duration-300 hover:shadow-lg hover:shadow-crypto-purple/20 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-8 h-8 rounded-full bg-crypto-purple/20 text-crypto-purple flex items-center justify-center mr-2">
                <span className="text-sm">№1</span>
              </span>
              Topmate Creator
            </h3>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/4e6f0209-d05c-46d9-b7fd-fafbf4370013.png" 
                alt="Topmate Creator Achievements" 
                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Top 0.1% creator in finance, rated 4.9/5 across 30+ client reviews.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors">
              <ExternalLink size={16} className="mr-1" />
              <span>View Profile</span>
            </a>
          </div>
          
          <div className="glass-card p-6 animate-fade-in transition-all duration-300 hover:shadow-lg hover:shadow-crypto-purple/20 hover:-translate-y-1" style={{
          animationDelay: "100ms"
        }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-8 h-8 rounded-full bg-crypto-purple/20 text-crypto-purple flex items-center justify-center mr-2">
                <span className="text-sm">№2</span>
              </span>
              Social Influence
            </h3>
            <p className="text-gray-300 mb-4">
              6,000+ followers on LinkedIn, followed by notable figures in the crypto space.
            </p>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors">
              <Linkedin size={16} className="mr-1" />
              <span>Connect on LinkedIn</span>
            </a>
            <p className="text-gray-300 mt-2">
              Followed by Polymarket, Trade Paradigm, AD Derivatives & founders of Pendle, Greeks.Live, and Delta Exchange on Twitter.
            </p>
            <a href="https://twitter.com/yourasianquant" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-crypto-purple hover:text-crypto-purple/80 transition-colors mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1">
                <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.485 0-4.5 2.014-4.5 4.5 0 .353.04.697.116 1.027C7.728 9.37 4.1 7.6 1.67 4.905c-.388.666-.61 1.44-.61 2.263 0 1.563.796 2.942 2.008 3.75a4.48 4.48 0 0 1-2.037-.563v.057c0 2.185 1.555 4.007 3.623 4.424-.378.104-.777.16-1.188.16-.29 0-.57-.028-.844-.08.57 1.78 2.223 3.078 4.183 3.113A8.98 8.98 0 0 1 2 19.54a12.67 12.67 0 0 0 6.88 2.017c8.253 0 12.77-6.836 12.77-12.77 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.94 8.94 0 0 1-2.54.698z"/>
              </svg>
              <span>Connect on Twitter</span>
            </a>
          </div>
          
          <div className="glass-card p-6 animate-fade-in transition-all duration-300 hover:shadow-lg hover:shadow-crypto-purple/20 hover:-translate-y-1" style={{
          animationDelay: "200ms"
        }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <span className="inline-block w-8 h-8 rounded-full bg-crypto-purple/20 text-crypto-purple flex items-center justify-center mr-2">
                <span className="text-sm">№3</span>
              </span>
              Stock Market
            </h3>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/5c63e2fd-b03f-4df6-94b6-1491914231a5.png" 
                alt="Portfolio Performance" 
                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-300">
              Personal mutual fund portfolio ranked in top 1% of all Indians according to ET Money (XIRR &gt;50%).
            </p>
          </div>
        </div>
        
      </div>
    </section>;
};

export default Personal;
