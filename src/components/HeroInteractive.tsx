"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_zoom;
  uniform vec2 u_center;

  vec3 palette(float t) {
    vec3 a = vec3(0.02, 0.0, 0.04);
    vec3 b = vec3(0.55, 0.15, 0.95);
    vec3 c = vec3(0.02, 0.72, 0.84);
    vec3 d = vec3(0.95, 0.65, 0.15);
    vec3 e = vec3(1.0, 1.0, 1.0);

    t = fract(t);
    if (t < 0.25) return mix(a, b, t * 4.0);
    if (t < 0.5)  return mix(b, c, (t - 0.25) * 4.0);
    if (t < 0.75) return mix(c, d, (t - 0.5) * 4.0);
    return mix(d, e, (t - 0.75) * 4.0);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 c = u_center + st / u_zoom;
    vec2 z = vec2(0.0);

    float max_iter = 300.0 + log(u_zoom) * 40.0;

    float iter = 0.0;
    for (float i = 0.0; i < 800.0; i++) {
      if (i > max_iter) break;
      float x = (z.x * z.x - z.y * z.y) + c.x;
      float y = (2.0 * z.x * z.y) + c.y;
      if (x * x + y * y > 256.0) break;
      z.x = x;
      z.y = y;
      iter++;
    }

    vec3 color = vec3(0.01, 0.0, 0.02);

    if (iter < max_iter) {
      float log_zn = log(z.x * z.x + z.y * z.y) / 2.0;
      float nu = log(log_zn / log(2.0)) / log(2.0);
      float smooth_iter = iter + 1.0 - nu;

      float t = smooth_iter / 45.0 + u_time * 0.03;
      vec3 baseColor = palette(t);

      float fade = smoothstep(0.0, 15.0, smooth_iter);
      float glow = 0.3 + 0.7 * pow(sin(smooth_iter * 0.15), 2.0);
      float intensity = fade * glow;

      color = baseColor * intensity * 0.7;

      float edgeDist = smooth_iter / max_iter;
      float edgeGlow = exp(-edgeDist * 8.0) * 0.4;
      color += vec3(0.4, 0.2, 0.9) * edgeGlow;

      float sparkle = pow(max(sin(smooth_iter * 0.4 + u_time * 1.5), 0.0), 16.0);
      color += sparkle * 0.08 * vec3(0.2, 0.9, 1.0);
    }

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float vignette = 1.0 - 0.3 * length(uv - 0.5);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const MANDELBROT_CENTER = { x: -0.743643887037158, y: 0.131825904205311 };
const ZOOM_MIN = 1.0;
const ZOOM_MAX = 500000.0;

function zoomToSliderValue(zoom: number): number {
  return (Math.log(zoom) / Math.log(ZOOM_MAX)) * 100;
}

function sliderValueToZoom(value: number): number {
  return Math.pow(ZOOM_MAX, value / 100);
}

interface ParticleType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const HeroInteractive: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mandelbrotCanvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1.0);
  const [autoZoom, setAutoZoom] = useState(true);
  const zoomRef = useRef(1.0);
  const gridOffsetRef = useRef(0);
  const autoZoomRef = useRef(true);

  zoomRef.current = zoom;
  autoZoomRef.current = autoZoom;

  // Particle canvas animation
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

    const isMobile = window.innerWidth < 768;

    const initParticles = () => {
      particles = [];
      const count = isMobile ? 12 : 60;
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
      if (!isMobile) drawGrid();
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
      if (!isMobile) drawConnections();
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

  // WebGL Mandelbrot
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = mandelbrotCanvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const createShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'position');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uZoomLoc = gl.getUniformLocation(program, 'u_zoom');
    const uCenterLoc = gl.getUniformLocation(program, 'u_center');

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let animationId: number;
    let lastTime = 0;
    const render = (timestamp: number) => {
      const dt = lastTime ? (timestamp - lastTime) / 1000 : 0;
      lastTime = timestamp;

      if (autoZoomRef.current && dt > 0 && dt < 0.1) {
        const newZoom = Math.min(zoomRef.current * (1 + 0.15 * dt), ZOOM_MAX);
        zoomRef.current = newZoom;
      }

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, timestamp * 0.001);
      gl.uniform1f(uZoomLoc, zoomRef.current);
      gl.uniform2f(uCenterLoc, MANDELBROT_CENTER.x, MANDELBROT_CENTER.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    resize();
    animationId = requestAnimationFrame(render);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Mouse tracking 3D effect on hero card
  useEffect(() => {
    const card = document.getElementById('hero-card');

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      if (window.innerWidth > 768) {
        if (card) card.style.transform = `rotateY(${x * 0.5}deg) rotateX(${y * 0.5}deg)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* WebGL Mandelbrot canvas — positioned absolute behind everything */}
      <canvas
        id="canvas-webgl"
        ref={mandelbrotCanvasRef}
        className="absolute top-0 left-0 w-full h-full -z-[1] opacity-70 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
        aria-hidden
      />
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 opacity-60"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Zoom slider control */}
      <div
        className="absolute bottom-4 right-4 z-10 hidden md:flex items-center gap-2 w-56 px-3 py-2 rounded-lg bg-black/30 backdrop-blur-sm border border-purple-500/20"
        aria-label="Mandelbrot zoom control"
      >
        <button
          type="button"
          onClick={() => {
            if (autoZoom) {
              setAutoZoom(false);
              setZoom(zoomRef.current);
            } else {
              setAutoZoom(true);
            }
          }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
          aria-label={autoZoom ? "Pause auto-zoom" : "Resume auto-zoom"}
        >
          {autoZoom ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3" height="12"/><rect x="7" y="0" width="3" height="12"/></svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><polygon points="0,0 10,6 0,12"/></svg>
          )}
        </button>
        <Slider
          value={[zoomToSliderValue(autoZoom ? zoomRef.current : zoom)]}
          onValueChange={([v]) => {
            setAutoZoom(false);
            setZoom(sliderValueToZoom(v));
          }}
          min={0}
          max={100}
          step={0.25}
          className="flex-1"
        />
        <span className="font-mono text-[10px] text-gray-400 tabular-nums min-w-[3rem] text-right">
          {(autoZoom ? zoomRef.current : zoom) >= 1000
            ? `${((autoZoom ? zoomRef.current : zoom) / 1000).toFixed(0)}k×`
            : `${(autoZoom ? zoomRef.current : zoom).toFixed(0)}×`}
        </span>
      </div>
    </>
  );
};

export default HeroInteractive;
