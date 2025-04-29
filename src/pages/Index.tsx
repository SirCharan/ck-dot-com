
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Academic from '@/components/Academic';
import Personal from '@/components/Personal';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Charandeep Kapoor | Crypto, Finance & Mathematics";
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-crypto-black text-white">
      <Sidebar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Academic />
        <Personal />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
