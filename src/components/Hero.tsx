import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles with optimized rendering
    const particlesArray: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 80 : 120; // Increased particle count
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      blinkSpeed: number;
      opacity: number;
      pulseSize: boolean;
      originalSize: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.originalSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.7 + 0.3})`;
        this.blinkSpeed = Math.random() * 0.005 + 0.002;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.pulseSize = Math.random() > 0.7; // 30% of particles will pulse in size
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Less frequent opacity updates
        if (Math.random() > 0.7) {
          this.opacity += Math.sin(Date.now() * this.blinkSpeed) * 0.01;
          this.opacity = Math.max(0.2, Math.min(0.9, this.opacity));
        }

        // Pulse size for some particles
        if (this.pulseSize) {
          this.size = this.originalSize + Math.sin(Date.now() * 0.002) * 1;
        }

        // Wrap around the edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Connect particles with lines - optimized
    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 120;
      
      const connectStep = window.innerWidth < 768 ? 1 : 2;
      
      for (let a = 0; a < particlesArray.length; a += connectStep) {
        for (let b = a; b < particlesArray.length; b += connectStep) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Use requestAnimationFrame for smoother animation
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const fpsInterval = 1000 / fps;
    
    const animate = (currentTime: number = 0) => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsed = currentTime - lastTime;
      
      if (elapsed > fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);
        
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(particle => {
          particle.update();
          particle.draw();
        });
        
        connectParticles();
      }
    };
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-crypto-gradient z-0"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            <span className="text-crypto-purple animate-text-glow">Charandeep Kapoor</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6 animate-fade-in" style={{
          animationDelay: "200ms"
        }}>
            Portfolio Manager, Quantitative Researcher, Trader
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed animate-fade-in" style={{
          animationDelay: "400ms"
        }}>Crypto professional with 5+ years of experience across product development, research, VC, and trading — blending finance, math, and 0→1 execution.</p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{
          animationDelay: "600ms"
        }}>
            <a href="#experience" className={cn("px-6 py-2 rounded-md bg-crypto-purple text-white", "hover:bg-crypto-purple/80 transition-all", "flex items-center justify-center animate-button-pulse")}>
              View My Work
            </a>
            <a href="#contact" className={cn("px-6 py-2 rounded-md bg-transparent border border-crypto-purple text-crypto-purple", "hover:bg-crypto-purple/10 transition-all", "flex items-center justify-center")}>
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float-slow">
        <a href="#about" className="text-crypto-purple hover:text-white transition-colors">
          <ArrowDown size={24} />
        </a>
      </div>
    </div>;
};

export default Hero;
