import React from 'react';
const About: React.FC = () => {
  return <section id="about" className="py-20">
      <div className="container mx-auto px-8 md:px-12 max-w-6xl">
        <h2 className="section-title">About Me</h2>
        
        <div className="glass-card p-6 md:p-8 mb-8 animate-fade-in">
          <p className="text-gray-300 leading-relaxed mb-4">
            Crypto native with 5+ years in product, research, and trading. I blend math and finance expertise to build DeFi products and quant strategies, transforming concepts into functional tools at the intersection of models and markets.
          </p>
          
          <div className="mt-4 border-t border-crypto-purple/30 pt-4">
            <h3 className="text-crypto-purple text-lg font-medium mb-2">Highlights:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Founded <strong>Timelock Trade</strong> — non-liquidable leverage protocol</li>
              <li>Managed $500k at <strong>Heru Finance</strong> with 30% returns in bear market</li>
              <li>Specialized in quantitative research and strategy development</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          
          
          
          
        </div>
      </div>
    </section>;
};
export default About;
