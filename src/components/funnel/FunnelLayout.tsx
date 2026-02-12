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
          mask-image:radial-gradient(circle at bottom,transparent 40%,black); opacity:0.6; animation:shimmer 4s linear infinite;
        }
        .shiny-cta span { position:relative; z-index:2; display:inline-block; }
        @keyframes shimmer { to { transform:translate(-50%,-50%) rotate(360deg); } }
      `}} />

      {/* Minimal header */}
      <header className="bg-[#001228]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logoWhite} alt="Ryland Partners" className="h-7 w-auto" />
          </Link>
          <CartDrawer />
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
