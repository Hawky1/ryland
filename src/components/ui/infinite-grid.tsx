import React, { useRef, useState } from 'react';
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

interface InfiniteGridProps {
  className?: string;
  gridSize?: number;
  speedX?: number;
  speedY?: number;
  revealSize?: number;
  baseGridColor?: string;
  activeGridColor?: string;
}

const InfiniteGrid = ({ 
  className,
  gridSize = 40,
  speedX = 0.3,
  speedY = 0.3,
  revealSize = 350,
  baseGridColor = "rgba(161, 161, 170, 0.15)",
  activeGridColor = "rgba(6, 182, 212, 0.5)"
}: InfiniteGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useAnimationFrame(() => {
    setOffset(prev => ({
      x: (prev.x + speedX) % gridSize,
      y: (prev.y + speedY) % gridSize
    }));
  });

  const maskImage = useMotionTemplate`radial-gradient(${revealSize}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: '100%', height: '100%' }}
    >
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern
            id="base-grid-pattern"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${offset.x} ${offset.y})`}
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={baseGridColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#base-grid-pattern)" />
      </svg>

      <motion.div 
        style={{ 
          position: 'absolute', inset: 0, pointerEvents: 'none',
          WebkitMaskImage: maskImage,
          maskImage: maskImage
        }}
      >
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <pattern
              id="active-grid-pattern"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(${offset.x} ${offset.y})`}
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={activeGridColor}
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#active-grid-pattern)" />
        </svg>
      </motion.div>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10rem', left: '-10rem', width: '20rem', height: '20rem', background: 'rgba(59,130,246,0.08)', borderRadius: '9999px', filter: 'blur(48px)', animation: 'pulse 2s infinite' }} />
        <div style={{ position: 'absolute', top: '50%', right: '-5rem', width: '15rem', height: '15rem', background: 'rgba(99,102,241,0.08)', borderRadius: '9999px', filter: 'blur(48px)', animation: 'pulse 2s infinite', animationDelay: '1s' }} />
        <div style={{ position: 'absolute', bottom: '-5rem', left: '33%', width: '18rem', height: '18rem', background: 'rgba(148,163,184,0.06)', borderRadius: '9999px', filter: 'blur(48px)', animation: 'pulse 2s infinite', animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default InfiniteGrid;
