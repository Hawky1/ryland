interface Props {
  overlay?: string;
  className?: string;
}

export default function HlsVideoBackground({ className = "" }: Props) {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <video
        src="/videos/card-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Dark-to-light blue gradient shading */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001228]/95 via-[#002952]/90 to-[#003A70]/85" />
      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,18,40,0.45)_100%)]" />
    </div>
  );
}
