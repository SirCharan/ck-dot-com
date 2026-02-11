import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, MessageCircle, Github } from 'lucide-react';

interface ParticleType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const obj3dRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const gridOffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: ParticleType[] = [];
    let animationId: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2,
          color: Math.random() > 0.5 ? '#a855f7' : '#06b6d4',
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(67, 56, 202, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      gridOffsetRef.current = (gridOffsetRef.current + 0.2) % gridSize;
      const gridOffset = gridOffsetRef.current;

      for (let x = gridOffset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const obj3d = obj3dRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      if (window.innerWidth > 768) {
        if (card) card.style.transform = `rotateY(${x * 0.5}deg) rotateX(${y * 0.5}deg)`;
        if (obj3d) obj3d.style.transform = `translateX(${x * 2}px) translateY(${y * 2}px)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 opacity-60"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="hero-aurora" />
      <div className="hero-scanlines" />

      <div className="relative z-10 flex flex-col min-h-screen p-6 md:p-12">
        <header
          className="flex justify-between items-center w-full mb-auto opacity-0"
          style={{
            animation: 'hero-fade-in-down 1s ease-out forwards',
            animationDelay: '0.5s',
            animationFillMode: 'forwards',
          }}
        >
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 border border-purple-500/50 flex items-center justify-center relative bg-black/20 backdrop-blur-sm group-hover:border-cyan-400 transition-colors duration-300">
              <span className="font-orbitron font-bold text-lg text-purple-400 group-hover:text-cyan-400 transition-colors">
                CK
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/30" />
            </div>
          </a>

          <nav className="hidden md:flex gap-12 font-rajdhani text-sm tracking-widest uppercase text-gray-300">
            <a href="#about" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              About
            </a>
            <a href="/blog" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Writings
            </a>
            <a href="#research-papers" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Research
            </a>
            <a href="#tools" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Tools
            </a>
            <a href="#contact" className="hero-nav-link hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Contact
            </a>
          </nav>

          <div className="md:hidden text-white">
            <button type="button" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center relative w-full">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-0"
            style={{
              animation: 'hero-slide-in-left 1s ease-out forwards',
              animationDelay: '1s',
              animationFillMode: 'forwards',
            }}
          >
            <div className="flex flex-col gap-2 text-gray-500">
              <a href="https://www.linkedin.com/in/charandeep-kapoor/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="https://x.com/yourasianquant" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-label="Twitter">
                <Twitter className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="https://t.me/ck_timekeeper" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-label="Telegram">
                <MessageCircle className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="https://github.com/SirCharan" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]" aria-label="GitHub">
                <Github className="w-5 h-5" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 w-full max-w-7xl mx-auto z-20">
            <div
              ref={cardRef}
              className={`hero-glass-card w-full max-w-2xl p-8 md:p-12 md:py-16 rounded-sm transition-all duration-1000 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="hero-hud-corner tl" aria-hidden />
              <div className="hero-hud-corner tr" aria-hidden />
              <div className="hero-hud-corner bl" aria-hidden />
              <div className="hero-hud-corner br" aria-hidden />

              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <h1 className="font-orbitron text-4xl md:text-6xl font-bold uppercase tracking-wide leading-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Charandeep
                  <br className="hidden md:block" /> Kapoor
                </h1>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-6" />

                <div className="relative font-rajdhani text-base md:text-xl text-gray-200 tracking-[0.2em] uppercase overflow-hidden">
                  <span className="invisible block" aria-hidden>
                    Building and scaling products 0→1
                  </span>
                  <span className="hero-subtitle-line1 absolute inset-x-0 top-0 text-center md:text-left">
                    Building and scaling products 0→1
                  </span>
                  <span className="hero-subtitle-line2 absolute inset-x-0 top-0 text-center md:text-left">
                    Crypto | AI | Stock Markets
                  </span>
                </div>

                <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg mt-4 leading-relaxed tracking-wide">
                  6+ years of experience across product, research and VC in crypto & stock markets. Building and scaling products 0→1.
                </p>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex gap-4">
                  <a
                    href="https://web.sensibull.com/verified-pnl/imported-hare/longterm-pnl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-3 bg-purple-600/20 border border-purple-500 text-white font-orbitron text-xs tracking-widest uppercase hover:bg-purple-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 overflow-hidden inline-block"
                  >
                    <span className="relative z-10">Sensibull Showcase</span>
                    <div
                      className="hero-btn-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{ transform: 'translateX(-100%) skewX(-15deg)' }}
                    />
                  </a>
                  <a
                    href="#contact"
                    className="px-8 py-3 border border-white/20 text-gray-300 font-orbitron text-xs tracking-widest uppercase hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 inline-block"
                  >
                    Contact
                  </a>
                  </div>
                  <div className="flex gap-2 lg:hidden">
                    <a href="https://www.linkedin.com/in/charandeep-kapoor/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" strokeWidth={2} />
                    </a>
                    <a href="https://x.com/yourasianquant" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-label="Twitter">
                      <Twitter className="w-5 h-5" strokeWidth={2} />
                    </a>
                    <a href="https://t.me/ck_timekeeper" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-label="Telegram">
                      <MessageCircle className="w-5 h-5" strokeWidth={2} />
                    </a>
                    <a href="https://github.com/SirCharan" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]" aria-label="GitHub">
                      <Github className="w-5 h-5" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-900/10 rounded-full blur-3xl -z-10"
                aria-hidden
              />
            </div>

            <div
              ref={obj3dRef}
              className="relative hidden md:block opacity-0"
              style={{
                animation: 'hero-fade-in-up 1s ease-out forwards',
                animationDelay: '1.5s',
                animationFillMode: 'forwards',
              }}
            >
              <div className="hero-scene-3d">
                <div className="hero-polyhedron">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="hero-face" aria-hidden />
                  ))}
                  <div className="hero-core" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer
          className="mt-auto pt-6 border-t border-white/5 flex justify-between items-end opacity-0"
          style={{
            animation: 'hero-fade-in-up 1s ease-out forwards',
            animationDelay: '0.8s',
            animationFillMode: 'forwards',
          }}
        >
          <div className="hidden md:flex gap-1">
            <a href="#experience" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-all">
              Experience
            </a>
            <a href="#research-papers" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-all">
              Research Papers
            </a>
            <a href="/blog" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-all">
              Writings
            </a>
            <a href="#tools" className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-orbitron tracking-widest text-gray-400 hover:bg-purple-900/40 hover:border-purple-500 hover:text-white transition-all">
              Open Source Tools
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Hero;
