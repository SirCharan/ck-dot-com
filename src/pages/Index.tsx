
import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Academic from '@/components/Academic';
import Personal from '@/components/Personal';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  const addToSectionsRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = "Charandeep Kapoor | Crypto, Finance & Mathematics Expert";
    
    // Add meta description for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Charandeep Kapoor - Crypto professional with 5+ years of experience in trading, quant research, VC, and product management. Expert in finance and mathematics.');
    }
    
    // Add meta keywords for SEO
    const metaKeywords = document.head.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const keywordsTag = document.createElement('meta');
      keywordsTag.name = 'keywords';
      keywordsTag.content = 'crypto, finance, mathematics, trading, quant research, blockchain, DeFi, venture capital, Charandeep Kapoor';
      document.head.appendChild(keywordsTag);
    }

    // Update social media OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Charandeep Kapoor | Crypto, Finance & Mathematics Expert');
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', 'Crypto professional with 5+ years of experience across trading, quant research, VC, and product.');
    }
    
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
      <Sidebar />
      
      <main>
        <Hero />
        <section ref={addToSectionsRef}>
          <About />
        </section>
        <section ref={addToSectionsRef}>
          <Experience />
        </section>
        <section ref={addToSectionsRef}>
          <Academic />
        </section>
        <section ref={addToSectionsRef}>
          <Personal />
        </section>
        <section ref={addToSectionsRef}>
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Index;
