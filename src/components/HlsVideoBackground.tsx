import { useEffect, useRef } from "react";

const HLS_URL = "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8";

interface Props {
  overlay?: string;
  className?: string;
}

export default function HlsVideoBackground({ overlay = "bg-[#003A70]/90", className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    import("hls.js").then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: false });
        hls.loadSource(HLS_URL);
        hls.attachMedia(el);
        hlsRef.current = hls;
      } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
        el.src = HLS_URL;
      }
    });

    return () => {
      hlsRef.current?.destroy();
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
