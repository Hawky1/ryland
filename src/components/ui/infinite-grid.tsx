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

    </div>
  );
};

export default InfiniteGrid;
