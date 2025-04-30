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

    // Create particles
    const particlesArray: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around the edges
        if (this.x > canvas.width) this.x = 0;else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Connect particles with lines
    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 150;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-crypto-gradient z-0"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            <span className="text-crypto-purple">Charandeep Kapoor</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6 animate-fade-in" style={{
          animationDelay: "200ms"
        }}>
            Crypto, Finance & Mathematics
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed animate-fade-in" style={{
          animationDelay: "400ms"
        }}>Crypto professional with 5+ years of experience across trading, quant research, VC, and product — blending finance, math, and 0→1 execution.</p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{
          animationDelay: "600ms"
        }}>
            <a href="#experience" className={cn("px-6 py-2 rounded-md bg-crypto-purple text-white", "hover:bg-crypto-purple/80 transition-all", "flex items-center justify-center")}>
              View My Work
            </a>
            <a href="#contact" className={cn("px-6 py-2 rounded-md bg-transparent border border-crypto-purple text-crypto-purple", "hover:bg-crypto-purple/10 transition-all", "flex items-center justify-center")}>
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-crypto-purple">
          <ArrowDown size={24} />
        </a>
      </div>
    </div>;
};
export default Hero;