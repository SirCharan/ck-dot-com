
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
    // Update document title
    document.title = "Charandeep Kapoor | Crypto, Finance & Mathematics";
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Add animation observers for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Add floating cryptocurrency icons to background
    const addFloatingIcons = () => {
      const iconSymbols = ['₿', 'Ξ', 'Ł', '₳', 'Ð', '₮'];
      const container = document.querySelector('main');
      if (!container) return;
      
      for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.textContent = iconSymbols[Math.floor(Math.random() * iconSymbols.length)];
        icon.className = 'floating-icon';
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.fontSize = `${Math.random() * 20 + 10}px`;
        icon.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(icon);
      }
    };
    
    // Observe all section elements
    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('section-animate');
      observer.observe(section);
    });
    
    addFloatingIcons();
    
    // Cleanup
    return () => {
      observer.disconnect();
      document.querySelectorAll('.floating-icon').forEach(icon => icon.remove());
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
