
import React from 'react';
import { Mail, MessageSquare, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <p className="text-gray-300 mb-6">
            I'm always open to discussing crypto projects, trading strategies, or potential collaborations. Feel free to reach out through any of the channels below:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-6">
              <div className="flex hover-scale">
                <div className="w-12 h-12 rounded-full bg-crypto-purple/20 flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                  <Linkedin size={20} className="text-crypto-purple" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium mb-1">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/charandeep-kapoor/" target="_blank" rel="noopener noreferrer" className="text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                    charandeep-kapoor
                  </a>
                </div>
              </div>
              
              <div className="flex hover-scale">
                <div className="w-12 h-12 rounded-full bg-crypto-purple/20 flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                  <Twitter size={20} className="text-crypto-purple" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium mb-1">Twitter</h3>
                  <a href="https://x.com/yourasianquant" target="_blank" rel="noopener noreferrer" className="text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                    @yourasianquant
                  </a>
                </div>
              </div>
              
              <div className="flex hover-scale">
                <div className="w-12 h-12 rounded-full bg-crypto-purple/20 flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                  <MessageSquare size={20} className="text-crypto-purple" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium mb-1">Telegram</h3>
                  <a href="https://t.me/charandeep_kapoor" target="_blank" rel="noopener noreferrer" className="text-crypto-purple hover:text-crypto-purple/80 transition-colors">
                    @charandeep_kapoor
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-6">
              <a 
                href="https://calendly.com/charan-kapoor/30min" 
                className="flex items-center p-4 border border-crypto-purple/20 rounded-lg hover:bg-crypto-purple/5 transition-colors hover-scale"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 rounded-full bg-crypto-purple/20 flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                  <Mail size={20} className="text-crypto-purple" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium mb-1">Book a Meeting</h3>
                  <p className="text-gray-300 text-sm">Schedule a call to discuss your project</p>
                </div>
              </a>
              
              <div className="flex flex-col p-4 border border-crypto-purple/20 rounded-lg hover-scale">
                <h3 className="text-white font-medium mb-3">Quick Response</h3>
                <p className="text-gray-300 text-sm mb-2">
                  I typically respond within 24 hours. For urgent matters, Telegram is the fastest way to reach me.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <p className="text-gray-500">
            © {new Date().getFullYear()} Charandeep Kapoor. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
