
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="glass-card p-6 md:p-8 mb-8 animate-fade-in">
          <p className="text-gray-300 leading-relaxed mb-4">
            I'm Charandeep Kapoor, a professional with over 5 years of experience in the cryptocurrency space. My expertise spans across product management, venture capital analysis, quantitative research, and trading at early-stage startups.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            With a strong background in mathematics and finance, I've developed and implemented various trading strategies and worked on building innovative crypto products from the ground up. I'm particularly passionate about finding the intersection between mathematical models and practical applications in the crypto and DeFi space.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Throughout my career, I've taken on numerous 0-1 responsibilities, helping turn nascent ideas into functional products and services. My approach combines rigorous analysis with creative problem-solving, allowing me to navigate the rapidly evolving crypto landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="text-xl font-semibold text-white mb-3">Product Development</h3>
            <p className="text-gray-300">
              Building and optimizing crypto products with focus on user experience and market fit. Experienced in taking products from ideation to launch.
            </p>
          </div>
          
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-xl font-semibold text-white mb-3">Quantitative Trading</h3>
            <p className="text-gray-300">
              Designing algorithmic trading strategies with proven track records. Specialized in options, futures, and DeFi yield optimization.
            </p>
          </div>
          
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="text-xl font-semibold text-white mb-3">Risk Management</h3>
            <p className="text-gray-300">
              Developing sophisticated risk models for crypto portfolios and protocols. Experience managing multi-million dollar funds in volatile markets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
