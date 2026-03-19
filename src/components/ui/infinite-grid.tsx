import React, { useRef, useCallback } from 'react';
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
  baseGridColor = "rgba(148, 163, 184, 0.5)",
  activeGridColor = "rgba(59, 130, 246, 0.8)"
}: InfiniteGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const patternRef = useRef<SVGPatternElement>(null);
  const activePatternRef = useRef<SVGPatternElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    offsetRef.current.x = (offsetRef.current.x + speedX) % gridSize;
    offsetRef.current.y = (offsetRef.current.y + speedY) % gridSize;
    const transform = `translate(${offsetRef.current.x} ${offsetRef.current.y})`;
    patternRef.current?.setAttribute('patternTransform', transform);
    activePatternRef.current?.setAttribute('patternTransform', transform);
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
            ref={patternRef}
            id="base-grid-pattern"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
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
              ref={activePatternRef}
              id="active-grid-pattern"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
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
