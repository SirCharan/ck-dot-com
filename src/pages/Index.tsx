import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const ParallaxSection = React.forwardRef<
  HTMLElement,
  { children: React.ReactNode; className?: string }
>(({ children, className = '' }, forwardedRef) => {
  const sectionRef = useRef<HTMLElement>(null);
  const setRef = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 0]);

  return (
    <section ref={setRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ y }}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--neon-purple)]/5 via-transparent to-[var(--neon-cyan)]/5"
          style={{ backgroundSize: '100% 200%' }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  );
});
ParallaxSection.displayName = 'ParallaxSection';

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
      section.classList.add('hover:shadow-glow-card', 'transition-all', 'duration-500');
    });
    
    // Setup background particles after a short delay
    setTimeout(setupBackgroundParticles, 500);
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative" style={{ background: 'var(--deep-bg)' }}>
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
      
      <main className="relative z-10">
        <Hero />
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <About />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Experience />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Academic />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <FinancialTools />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Personal />
        </ParallaxSection>
        <ParallaxSection ref={addToSectionsRef} className="transition-all duration-300">
          <Contact />
        </ParallaxSection>
      </main>
    </div>
  );
};

export default Index;
