import { useRef, useEffect, useState } from "react";

interface Props {
  overlay?: string;
  className?: string;
  /** When true, skip loading the video and use CSS gradient only. Default: false */
  staticOnly?: boolean;
}

export default function HlsVideoBackground({ className = "", staticOnly = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (staticOnly) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staticOnly]);

  useEffect(() => {
    if (staticOnly) return;
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, staticOnly]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {!staticOnly && (
        <video
          ref={videoRef}
          src="/videos/card-bg.mp4"
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      )}
      {/* Dark-to-light blue gradient shading */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001228]/95 via-[#002952]/90 to-[#003A70]/85" />
      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,18,40,0.45)_100%)]" />
    </div>
  );
}
