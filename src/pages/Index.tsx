import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Academic from '@/components/Academic';
import Personal from '@/components/Personal';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';
import FinancialTools from '@/components/FinancialTools';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  const addToSectionsRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Optimize animation observers using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }
    );

    // Background particles setup
    const setupBackgroundParticles = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        if (!section.querySelector('.floating-particles')) {
          const colors = ['#8B5CF6', '#6366F1', '#8B5CF6'];
          const count = 5;
          
          for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 50 + 20;
            
            particle.className = 'floating-icon';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Randomize animation duration and delay
            particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            section.appendChild(particle);
          }
          
          // Add class to mark that we've added particles
          const particlesContainer = document.createElement('div');
          particlesContainer.className = 'floating-particles';
          section.appendChild(particlesContainer);
        }
      });
    };
    
    // Observe sections and set up animations
    const sections = Array.from(document.querySelectorAll('section'));
    sections.forEach((section) => {
      section.classList.add('section-animate');
      observer.observe(section);
      
      // Add hover effect to sections
      section.classList.add('hover:shadow-lg', 'hover:shadow-crypto-purple/10', 'transition-all', 'duration-500');
    });
    
    // Setup background particles after a short delay
    setTimeout(setupBackgroundParticles, 500);
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-crypto-black text-white">
      <SEO 
        title="Charandeep Kapoor | Crypto, Finance & Mathematics Expert"
        description="Charandeep Kapoor - Crypto professional with 5+ years of experience in trading, quant research, VC, and product management. Expert in finance and mathematics."
        keywords={[
          "crypto", 
          "finance", 
          "mathematics", 
          "trading", 
          "quant research", 
          "blockchain", 
          "DeFi", 
          "venture capital", 
          "Charandeep Kapoor",
          "cryptocurrency expert",
          "financial analyst",
          "mathematics specialist",
          "blockchain analyst"
        ]}
      />
      <StructuredData 
        type="Person"
        data={{
          name: "Charandeep Kapoor",
          url: "https://charandeepkapoor.com",
          image: "https://charandeepkapoor.com/favicon.png",
          sameAs: [
            "https://twitter.com/yourasianquant",
            "https://linkedin.com/in/charandeepkapoor"
          ],
          jobTitle: "Crypto, Finance & Mathematics Expert",
          worksFor: {
            "@type": "Organization",
            "name": "Crypto Industry"
          },
          description: "Crypto professional with 5+ years of experience in trading, quant research, VC, and product management. Expert in finance and mathematics."
        }}
      />
      <StructuredData 
        type="WebSite"
        data={{
          name: "Charandeep Kapoor - Portfolio",
          url: "https://charandeepkapoor.com",
          description: "Personal portfolio of Charandeep Kapoor, showcasing expertise in crypto, finance, and mathematics.",
          author: {
            "@type": "Person",
            "name": "Charandeep Kapoor"
          }
        }}
      />
      <Sidebar />
      
      <main>
        <Hero />
        <section ref={addToSectionsRef} className="transition-all duration-300 hover:bg-crypto-black/90">
          <About />
        </section>
        <section ref={addToSectionsRef} className="transition-all duration-300 hover:bg-crypto-black/90">
          <Experience />
        </section>
        <section ref={addToSectionsRef} className="transition-all duration-300 hover:bg-crypto-black/90">
          <Academic />
        </section>
        <section ref={addToSectionsRef} className="transition-all duration-300 hover:bg-crypto-black/90">
          <FinancialTools />
        </section>
        <section ref={addToSectionsRef} className="transition-all duration-300 hover:bg-crypto-black/90">
          <Personal />
        </section>
        <section ref={addToSectionsRef} className="transition-all duration-300 hover:bg-crypto-black/90">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Index;
