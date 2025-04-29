
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-crypto-gradient z-0"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            <span className="text-crypto-purple">Charandeep Kapoor</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Crypto, Finance & Mathematics
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "400ms" }}>
            A seasoned professional with over 5 years of experience in the crypto domain with a strong interest and background in mathematics, finance, trading, and product building. Have excelled at diverse roles including product management, venture capital analysis, quantitative research, and trading at early-stage startups, often taking on 0-1 responsibilities.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <a 
              href="#experience" 
              className={cn(
                "px-6 py-2 rounded-md bg-crypto-purple text-white",
                "hover:bg-crypto-purple/80 transition-all",
                "flex items-center justify-center"
              )}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className={cn(
                "px-6 py-2 rounded-md bg-transparent border border-crypto-purple text-crypto-purple",
                "hover:bg-crypto-purple/10 transition-all",
                "flex items-center justify-center"
              )}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-crypto-purple">
          <ArrowDown size={24} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
