
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
    
    // Observe only visible sections instead of all sections
    const visibleSections = Array.from(document.querySelectorAll('section')).slice(0, 5);
    visibleSections.forEach((section) => {
      section.classList.add('section-animate');
      observer.observe(section);
    });
    
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
