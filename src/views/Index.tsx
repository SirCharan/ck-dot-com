import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import ResearchPapers from '@/components/ResearchPapers';
import Academic from '@/components/Academic';
import Personal from '@/components/Personal';
import Contact from '@/components/Contact';
import Sidebar from '@/components/Sidebar';
import FinancialTools from '@/components/FinancialTools';
import ParallaxSection from '@/components/ParallaxSection';
import SectionAnimator from '@/components/SectionAnimator';

const Index = () => {
  return (
    <div className="min-h-screen text-white relative" style={{ background: 'var(--deep-bg)' }}>
      <Sidebar />
      <SectionAnimator />

      <main className="relative z-10">
        <Hero />
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <About />
        </ParallaxSection>
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <Experience />
        </ParallaxSection>
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <ResearchPapers />
        </ParallaxSection>
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <Academic />
        </ParallaxSection>
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <FinancialTools />
        </ParallaxSection>
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <Personal />
        </ParallaxSection>
        <ParallaxSection className="transition-[box-shadow] duration-300">
          <Contact />
        </ParallaxSection>
      </main>
    </div>
  );
};

export default Index;
