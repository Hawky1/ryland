import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import FunnelProgressBar from "./FunnelProgressBar";
import AsSeenOnMarquee from "./AsSeenOnMarquee";
import { CartDrawer } from "@/components/CartDrawer";

interface Props {
  step: number;
  label: string;
  children: React.ReactNode;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = sessionStorage.getItem("funnel_countdown");
    if (saved) return Math.max(0, parseInt(saved, 10));
    return 15 * 60; // 15 minutes
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 1);
        sessionStorage.setItem("funnel_countdown", String(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <span className="font-mono font-bold text-white tabular-nums">
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  );
}

export default function FunnelLayout({ step, label, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-[#001228] font-[Manrope,sans-serif]">
      {/* Shiny CTA styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-percent { syntax: "<percentage>"; initial-value: 20%; inherits: false; }
        @property --gradient-shine { syntax: "<color>"; initial-value: #8484ff; inherits: false; }
        .shiny-cta {
          --gradient-angle: 0deg; --gradient-angle-offset: 0deg; --gradient-percent: 20%; --gradient-shine: #8484ff; --shadow-size: 2px;
          position: relative; overflow: hidden; border-radius: 9999px; padding: 1.25rem 2.5rem; font-size: 1.125rem; line-height: 1.2; font-weight: 600; color: #ffffff;
          background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
          box-shadow: inset 0 var(--shadow-size) 0 0 rgba(96,165,250,0.4), inset 0 calc(var(--shadow-size)*-1) 0 0 rgba(30,58,138,0.6), 0 8px 30px -6px rgba(30,64,175,0.5);
          animation: border-spin 2.5s linear infinite; cursor: pointer; border: none;
        }
        @keyframes border-spin { to { --gradient-angle: 360deg; } }
        .shiny-cta:active { transform: translateY(1px); }
        .shiny-cta::before {
          content:''; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:0;
          --size:calc(100% - 6px); width:var(--size); height:var(--size);
          background:conic-gradient(from calc(var(--gradient-angle) + var(--gradient-angle-offset)),transparent,var(--gradient-shine),transparent);
          mask-image:conic-gradient(from calc(var(--gradient-angle) + 45deg),black,transparent 10% 90%,black); border-radius:inherit; opacity:0.4;
        }
        .shiny-cta::after {
          content:''; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:1;
          width:100%; aspect-ratio:1; background:linear-gradient(-50deg,transparent,#3b82f6,transparent);
          mask-image:radial-gradient(circle at bottom,transparent 40%,black); border-radius:inherit; opacity:0.6; animation:shimmer 4s linear infinite;
        }
        .shiny-cta span { position:relative; z-index:2; display:inline-block; }
        @keyframes shimmer { to { transform:translate(-50%,-50%) rotate(360deg); } }
      `}} />

      {/* Urgency sticky header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 border-b border-red-700/50">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <Link to="/">
            <img src={logoWhite} alt="Ryland Partners" className="h-6 w-auto opacity-90" />
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-red-100/80 text-xs uppercase tracking-wider font-semibold">Offer expires in</span>
              <div className="bg-black/30 rounded-md px-2.5 py-1">
                <CountdownTimer />
              </div>
            </div>
            <div className="sm:hidden flex items-center gap-1.5">
              <span className="text-red-100/80 text-[10px] uppercase tracking-wider font-semibold">Ends</span>
              <div className="bg-black/30 rounded px-2 py-0.5">
                <CountdownTimer />
              </div>
            </div>
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <FunnelProgressBar currentStep={step} label={label} />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* As Seen On */}
      <AsSeenOnMarquee />
    </div>
  );
}
