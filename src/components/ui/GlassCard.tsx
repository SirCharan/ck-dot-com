"use client";

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  enableTilt?: boolean;
}

const HUD_CORNER = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const base = 'absolute w-4 h-4 border-[var(--neon-purple)] opacity-60';
  const positions = {
    tl: 'top-0 left-0 border-t-2 border-l-2',
    tr: 'top-0 right-0 border-t-2 border-r-2',
    bl: 'bottom-0 left-0 border-b-2 border-l-2',
    br: 'bottom-0 right-0 border-b-2 border-r-2',
  };
  return <div className={cn(base, positions[position])} aria-hidden />;
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, enableTilt = false, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform({ rotateX: -y * 6, rotateY: x * 6 });
    };

    const handleMouseLeave = () => setTransform({ rotateX: 0, rotateY: 0 });

    return (
      <div
        ref={(el) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={cn(
          'relative bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-lg overflow-hidden',
          'transition-all duration-300 ease-out',
          'shadow-[0_4px_24px_rgba(0,0,0,0.2),0_0_30px_rgba(168,85,247,0.06),inset_0_1px_0_rgba(255,255,255,0.03)]',
          'hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_50px_rgba(168,85,247,0.15),0_0_80px_rgba(124,58,237,0.08),inset_0_0_30px_rgba(168,85,247,0.06)]',
          'hover:border-[rgba(168,85,247,0.5)]',
          enableTilt && 'transform-gpu',
          className
        )}
        style={
          enableTilt
            ? {
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
              }
            : undefined
        }
        onMouseMove={enableTilt ? handleMouseMove : undefined}
        onMouseLeave={enableTilt ? handleMouseLeave : undefined}
        {...props}
      >
        {/* Inner blurred blob background */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          aria-hidden
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168, 85, 247, 0.15), transparent 60%)`,
          }}
        />
        {/* HUD corners */}
        <HUD_CORNER position="tl" />
        <HUD_CORNER position="tr" />
        <HUD_CORNER position="bl" />
        <HUD_CORNER position="br" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
