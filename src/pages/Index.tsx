import { useEffect, useState, useRef } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import heroPortrait from "@/assets/hero-portrait.png";
import asSeenOn from "@/assets/as-seen-on.png";
import geneRylandAbout from "@/assets/gene-ryland-about.png";
import logoUsBank from "@/assets/logo-usbank.png";
import logoBoa from "@/assets/logo-boa.png";
import logoNavyFed from "@/assets/logo-navyfed.png";
import logoChase from "@/assets/logo-chase.png";
import logoTruist from "@/assets/logo-truist.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import successFunding from "@/assets/success-funding.jpg";
import successCredit from "@/assets/success-credit.webp";
import successEmpire from "@/assets/success-empire.webp";

const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const openMenu = () => mobileMenu?.classList.add('open');
    const closeMenu = () => mobileMenu?.classList.remove('open');
    
    menuBtn?.addEventListener('click', openMenu);
    closeMenuBtn?.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));



    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content') as HTMLElement;
      const icon = item.querySelector('.faq-icon');
      
      trigger?.addEventListener('click', () => {
        const isOpen = content?.style.display === 'block';
        
        if (isOpen) {
          if (content) content.style.display = 'none';
          if (icon) icon.innerHTML = '<path d="M5 12h14"></path><path d="M12 5v14"></path>';
          trigger?.setAttribute('aria-expanded', 'false');
        } else {
          if (content) content.style.display = 'block';
          if (icon) icon.innerHTML = '<path d="M5 12h14"></path>';
          trigger?.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

    // Load UnicornStudio for background
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.31/dist/unicornStudio.umd.js";
      script.onload = function() {
        if (!(window as any).UnicornStudio.isInitialized) {
          (window as any).UnicornStudio.init();
          (window as any).UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }

    return () => {
      menuBtn?.removeEventListener('click', openMenu);
      closeMenuBtn?.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .hover-blur:hover img { filter: blur(4px); }
        .hover-blur figcaption { opacity: 0; transition: opacity 0.3s; }
        .hover-blur:hover figcaption { opacity: 1; }
        .nav-link::after { content: ''; position: absolute; left: 0; top: 100%; width: 0; height: 2px; background: #3b82f6; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .card-glow { transition: all 0.3s; }
        .card-glow:hover { transform: translateY(-2px); }
        .card-glow:hover .glow-bg { opacity: 1; }
        .glow-bg { opacity: 0; transition: opacity 0.3s; }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
        .accordion-content.open { max-height: 500px; }
        .accordion-icon { transition: transform 0.3s; }
        .accordion-icon.open { transform: rotate(90deg); }
        .review-active { transform: scale(1.02); transition: transform 0.3s; }
        .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-out; }
        .mobile-menu.open { transform: translateX(0); }

        .rotate-x-5 { --tw-rotate-x: 5deg; transform: translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0)) rotateX(var(--tw-rotate-x, 0)) rotateY(var(--tw-rotate-y, 0)) rotateZ(var(--tw-rotate-z, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)) !important; }
        .perspective-none { perspective: none !important; }
        .perspective-dramatic { perspective: 100px !important; }
        .perspective-near { perspective: 300px !important; }
        .perspective-normal { perspective: 500px !important; }
        .perspective-midrange { perspective: 800px !important; }
        .perspective-distant { perspective: 1200px !important; }
        .transform-style-preserve-3d { transform-style: preserve-3d !important; }
        .transform-style-flat { transform-style: flat !important; }

        .gradient-blur {
          position: fixed;
          z-index: 5;
          inset: 0 0 auto 0;
          height: 12%;
          pointer-events: none;
        }

        .gradient-blur>div,
        .gradient-blur::before,
        .gradient-blur::after {
          position: absolute;
          inset: 0;
        }

        .gradient-blur::before {
          content: "";
          z-index: 1;
          backdrop-filter: blur(0.5px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 12.5%,
              rgba(0, 0, 0, 1) 25%,
              rgba(0, 0, 0, 0) 37.5%);
        }

        .gradient-blur>div:nth-of-type(1) {
          z-index: 2;
          backdrop-filter: blur(1px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 12.5%,
              rgba(0, 0, 0, 1) 25%,
              rgba(0, 0, 0, 1) 37.5%,
              rgba(0, 0, 0, 0) 50%);
        }

        .gradient-blur>div:nth-of-type(2) {
          z-index: 3;
          backdrop-filter: blur(2px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 25%,
              rgba(0, 0, 0, 1) 37.5%,
              rgba(0, 0, 0, 1) 50%,
              rgba(0, 0, 0, 0) 62.5%);
        }

        .gradient-blur>div:nth-of-type(3) {
          z-index: 4;
          backdrop-filter: blur(4px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 37.5%,
              rgba(0, 0, 0, 1) 50%,
              rgba(0, 0, 0, 1) 62.5%,
              rgba(0, 0, 0, 0) 75%);
        }

        .gradient-blur>div:nth-of-type(4) {
          z-index: 5;
          backdrop-filter: blur(8px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 50%,
              rgba(0, 0, 0, 1) 62.5%,
              rgba(0, 0, 0, 1) 75%,
              rgba(0, 0, 0, 0) 87.5%);
        }

        .gradient-blur>div:nth-of-type(5) {
          z-index: 6;
          backdrop-filter: blur(16px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 62.5%,
              rgba(0, 0, 0, 1) 75%,
              rgba(0, 0, 0, 1) 87.5%,
              rgba(0, 0, 0, 0) 100%);
        }

        .gradient-blur>div:nth-of-type(6) {
          z-index: 7;
          backdrop-filter: blur(32px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 75%,
              rgba(0, 0, 0, 1) 87.5%,
              rgba(0, 0, 0, 1) 100%);
        }

        .gradient-blur::after {
          content: "";
          z-index: 8;
          backdrop-filter: blur(64px);
          mask: linear-gradient(to top,
              rgba(0, 0, 0, 0) 87.5%,
              rgba(0, 0, 0, 1) 100%);
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
        @property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-percent { syntax: "<percentage>"; initial-value: 20%; inherits: false; }
        @property --gradient-shine { syntax: "<color>"; initial-value: #8484ff; inherits: false; }

        .shiny-cta {
          --gradient-angle: 0deg;
          --gradient-angle-offset: 0deg;
          --gradient-percent: 20%;
          --gradient-shine: #8484ff;
          --shadow-size: 2px;
          position: relative;
          overflow: hidden;
          border-radius: 9999px;
          padding: 1.25rem 2.5rem;
          font-size: 1.125rem;
          line-height: 1.2;
          font-weight: 500;
          color: #ffffff;
          background: linear-gradient(#000000, #000000) padding-box, conic-gradient(
            from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
            transparent 0%,
            #3b82f6 5%,
            var(--gradient-shine) 15%,
            #3b82f6 30%,
            transparent 40%,
            transparent 100%
          ) border-box;
          border: 2px solid transparent;
          box-shadow: inset 0 0 0 1px #1a1818;
          outline: none;
          transition: --gradient-angle-offset 800ms cubic-bezier(0.25, 1, 0.5, 1), --gradient-percent 800ms cubic-bezier(0.25, 1, 0.5, 1), --gradient-shine 800ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s;
          cursor: pointer;
          isolation: isolate;
          outline-offset: 4px;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
          z-index: 0;
          animation: border-spin 2.5s linear infinite;
        }

        @keyframes border-spin {
          to { --gradient-angle: 360deg; }
        }

        .shiny-cta:active { transform: translateY(1px); }

        .shiny-cta::before {
          content: '';
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          --size: calc(100% - 6px);
          --position: 2px;
          --space: 4px;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle at var(--position) var(--position), white 0.5px, transparent 0) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          pointer-events: none;
        }

        .shiny-cta::after {
          content: '';
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(-50deg, transparent, #3b82f6, transparent);
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
          animation: shimmer 4s linear infinite;
          animation-play-state: running;
        }

        .shiny-cta span {
          position: relative;
          z-index: 2;
          display: inline-block;
        }

        .shiny-cta span::before {
          content: '';
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px #3b82f6;
          opacity: 0;
          border-radius: inherit;
          transition: opacity 800ms cubic-bezier(0.25, 1, 0.5, 1);
          animation: breathe 4.5s linear infinite;
        }

        @keyframes shimmer {
          to { transform: translate(-50%, -50%) rotate(360deg);}
        }

        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1);}
          50% { transform: translate(-50%, -50%) scale(1.20);}
        }

        @keyframes smoothCarousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-wrapper {
          animation: smoothCarousel 40s linear infinite;
        }
        .carousel-wrapper:hover {
          animation-play-state: paused;
        }

        @keyframes radar81 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee-rtl_45s_linear_infinite\\],
          .animate-\\[marquee-ltr_45s_linear_infinite\\] {
            animation: none !important;
          }
        }

        .font-geist { font-family: 'Geist', sans-serif !important; }
        .font-manrope { font-family: 'Manrope', sans-serif !important; }
      `}} />

      {/* Google Fonts */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />

      {/* Animated Background - InfiniteGrid */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)' }}>
        <InfiniteGrid
          baseGridColor="rgba(148, 163, 184, 0.08)"
          activeGridColor="rgba(6, 182, 212, 0.6)"
        />
      </div>

      {/* Gradient blur - top navigation fade */}
      <div className="gradient-blur pointer-events-none">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* NAVBAR */}
      <header className="sticky z-20 top-0">
        <div className="flex max-w-7xl mr-auto ml-auto pt-4 pr-6 pb-4 pl-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
          </div>
          <nav className="hidden gap-10 md:flex items-center">
            <a href="#features" className="nav-link hover:text-white text-sm text-slate-300 relative">Features</a>
            <a href="#services" className="nav-link relative text-sm text-slate-300 hover:text-white">Services</a>
            <a href="#showcase" className="nav-link relative text-sm text-slate-300 hover:text-white">Results</a>
            <a href="#about" className="nav-link relative text-sm text-slate-300 hover:text-white">About</a>
            <a href="#cta" className="shiny-cta !py-2 !px-5 !text-sm whitespace-nowrap focus:outline-none">
              <span>Get Started</span>
            </a>
          </nav>
          <button id="menuBtn" className="md:hidden rounded-lg p-2 text-slate-200 hover:bg-white/5 transition-colors" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <aside className="mobile-menu fixed z-50 bg-slate-950/95 w-[80%] max-w-sm border-white/10 border-l pt-6 pr-6 pb-6 pl-6 top-0 right-0 bottom-0 backdrop-blur" aria-label="Mobile menu" id="mobileMenu">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Ryland Partners</span>
            <button id="closeMenuBtn" className="rounded-lg p-2 text-slate-200 hover:bg-white/5 transition-colors" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            <li><a href="#features" className="mobile-link block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Features</a></li>
            <li><a href="#services" className="mobile-link block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Services</a></li>
            <li><a href="#showcase" className="mobile-link block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Results</a></li>
            <li><a href="#about" className="mobile-link block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">About</a></li>
          </ul>
          <a href="#cta" className="mobile-link mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/10 transition-colors">
            Get Started <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </aside>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto pt-16 pb-36 px-8 lg:px-20 overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://storage.googleapis.com/msgsndr/FuOewPgnMEW1CaeIftBR/media/698a6cea7f6dcf137c9c099c.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-2xl" />

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          {/* Left - text + CTAs */}
          <div className="text-center lg:text-left lg:flex-1 max-w-3xl">
            <h1 className="text-[38px] leading-[0.95] sm:text-[52px] lg:text-[64px] font-medium tracking-tighter font-geist text-left mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              Unlock the Capital, Credit, and Community to Build Your Empire
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-400 mt-6 max-w-xl text-left leading-relaxed">
              We help entrepreneurs secure <span className="text-white font-semibold">$150K+</span> in business funding, repair their credit, and master the digital economy.
            </p>

            <div className="flex flex-col xl:mt-10 mt-8 gap-4 items-start">
              <div className="inline-block bg-transparent">
                <button className="shiny-cta focus:outline-none">
                  <span>Take the Free Funding Assessment</span>
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-500">
                <span>Results in 2 minutes</span>
                <span className="text-zinc-600">•</span>
                <span>No hard credit pull</span>
                <span className="text-zinc-600">•</span>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
          {/* Right - video showcase */}
          <div className="relative lg:flex-1 flex justify-center lg:mt-16">
            <div className="relative flex flex-col items-center gap-6">
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
              <div className="relative z-10 w-full max-w-xl">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full rounded-2xl border border-white/10 ring-1 ring-white/5 shadow-2xl shadow-blue-500/10 object-cover"
                >
                  <source src="https://storage.googleapis.com/msgsndr/msQ0v10anK0T3yUDTS7C/media/68d7d698897fc0e97958fac9.mp4" type="video/mp4" />
                </video>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`absolute bottom-4 right-4 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-colors ${isMuted ? 'animate-pulse' : ''}`}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
              <div className="relative z-10 flex flex-col items-center mt-2">
                <h3 className="text-lg font-semibold text-white/90" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Gene Ryland</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-300/60 font-medium mt-0.5">CEO &amp; Founder <span className="text-white/25 mx-1">|</span> Business Funding Expert</p>
              </div>
              <img
                src={asSeenOn}
                alt="As seen on FOX, USA Today, Digital Journal, MarketWatch"
                className="relative z-10 w-full max-w-xl brightness-0 invert opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="sm:px-6 lg:px-8 lg:pt-6 max-w-7xl z-10 mt-8 mr-auto mb-16 ml-auto pt-16 pr-4 pb-6 pl-4 relative">
        <div className="text-center">
          <p className="uppercase text-sm font-medium text-slate-400 tracking-wide">
            TRUSTED BANKING PARTNERS
          </p>
        </div>
        <div className="overflow-hidden mt-6 relative">
          <div style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <div className="flex carousel-wrapper gap-x-10 lg:gap-x-20">
              <div className="flex gap-10 shrink-0 lg:gap-x-20 items-center">
                <img src={logoChase} alt="Chase" className="h-[32px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoBoa} alt="Bank of America" className="h-[40px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoUsBank} alt="US Bank" className="h-[36px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoNavyFed} alt="Navy Federal Credit Union" className="h-[40px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoTruist} alt="Truist" className="h-[32px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex shrink-0 gap-10 lg:gap-x-20 items-center">
                <img src={logoChase} alt="Chase" className="h-[32px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoBoa} alt="Bank of America" className="h-[40px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoUsBank} alt="US Bank" className="h-[36px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoNavyFed} alt="Navy Federal Credit Union" className="h-[40px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoTruist} alt="Truist" className="h-[32px] w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital on your terms section */}
      <section className="sm:pt-24 md:pt-10 max-w-7xl mr-auto ml-auto pt-24 pb-20 relative" id="services">
        <div className="max-w-7xl mr-auto ml-auto pr-6 pl-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-white tracking-tighter text-left pt-6 pb-6 sm:text-5xl" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)' }}>Capital On Your Terms</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Card 1: Business Funding */}
            <div className="group relative overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:ring-blue-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-110"></div>
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-blue-500/25 via-cyan-500/15 to-transparent w-40 h-40 rounded-full blur-2xl"></div>

              <div className="pt-6 pr-6 pb-6 pl-6 relative z-10">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg pt-1 pr-2.5 pb-1 pl-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-blue-400 rounded-full"></div>
                    Funding
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Business Funding</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6">Secure $50k–$250k in 0% interest credit lines. No tax returns or revenue history required for startups.</p>

                <div className="relative overflow-hidden bg-gradient-to-b from-white/5 via-white/5 to-transparent h-44 ring-white/5 ring-1 rounded-xl flex items-center justify-center">
                  <div className="relative w-32 h-24 border border-dashed border-neutral-700 rounded bg-neutral-900/50 flex flex-col p-2 gap-2 shadow-2xl backdrop-blur-sm">
                    <div className="w-full h-2 bg-neutral-800 rounded-full"></div>
                    <div className="flex gap-2 h-full">
                      <div className="w-1/3 h-full bg-neutral-800/50 rounded"></div>
                      <div className="w-2/3 h-full bg-neutral-800/50 rounded border border-blue-500/50 relative">
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4"><span className="inline-flex items-center ring-1 ring-white/10 text-[10px] font-medium text-neutral-300 bg-neutral-900/80 rounded-full py-0.5 px-2 backdrop-blur-sm">0% APR</span></div>
                  <div className="absolute bottom-4 left-4"><span className="inline-flex items-center ring-1 ring-white/10 text-[10px] font-medium text-neutral-300 bg-neutral-900/80 rounded-full py-0.5 px-2 backdrop-blur-sm">$250k Max</span></div>
                </div>
              </div>
            </div>

            {/* Card 2: Credit Restoration */}
            <div className="group relative overflow-hidden transition-all duration-500 hover:border-indigo-500/30 hover:ring-indigo-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-tr from-indigo-500/30 via-violet-500/20 to-blue-500/10 blur-3xl transition-all duration-700 group-hover:scale-110"></div>
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-indigo-500/25 via-blue-500/15 to-transparent w-40 h-40 rounded-full blur-2xl"></div>

              <div className="pt-6 pr-6 pb-6 pl-6 relative z-10">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg pt-1 pr-2.5 pb-1 pl-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-indigo-400 rounded-full"></div>
                    Credit
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Credit Restoration</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6">Our "Done-For-You" credit sweeps remove negatives and boost scores by 100+ points in record time.</p>

                <div className="relative overflow-hidden bg-gradient-to-b from-white/5 via-white/5 to-transparent h-44 ring-white/5 ring-1 rounded-xl flex items-center justify-center">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/40 to-indigo-600/10 border border-indigo-500/50 animate-bounce shadow-lg shadow-indigo-500/20"></div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/40 to-indigo-600/10 border border-indigo-500/50 animate-bounce shadow-lg shadow-indigo-500/20" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/40 to-indigo-600/10 border border-indigo-500/50 animate-bounce shadow-lg shadow-indigo-500/20" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  
                  <div className="absolute top-3 left-4"><span className="inline-flex items-center ring-1 ring-white/10 text-[10px] font-medium text-neutral-300 bg-neutral-900/80 rounded-full py-0.5 px-2 backdrop-blur-sm">Score +100</span></div>
                  <div className="absolute bottom-3 right-4"><span className="inline-flex items-center ring-1 ring-white/10 text-[10px] font-medium text-neutral-300 bg-neutral-900/80 rounded-full py-0.5 px-2 backdrop-blur-sm">Done-For-You</span></div>
                </div>
              </div>
            </div>

            {/* Card 3: Rapid Execution */}
            <div className="group relative overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:ring-emerald-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-110"></div>
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-transparent w-40 h-40 rounded-full blur-2xl"></div>

              <div className="pt-6 pr-6 pb-6 pl-6 relative z-10">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg pt-1 pr-2.5 pb-1 pl-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-emerald-400 rounded-full"></div>
                    Growth
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Rapid Execution</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6">Move from "Denied" to "Funded" in as little as 30 days with our proprietary lender matching system.</p>

                <div className="relative overflow-hidden bg-gradient-to-b from-white/5 via-white/5 to-transparent h-44 ring-white/5 ring-1 rounded-xl flex items-center justify-center">
                  <div className="relative w-[150px] h-[150px] rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/10"></div>
                    <div className="absolute inset-8 rounded-full border border-dashed border-white/10"></div>
                    
                    <span className="absolute top-1/2 left-1/2 origin-top-left border-dashed w-1/2 h-full bg-gradient-to-r from-emerald-500/20 to-transparent border-t border-emerald-500/50" style={{ marginTop: '-1px', maskImage: 'linear-gradient(to right, black, transparent)', animation: 'radar81 4s linear infinite' }}></span>
                  </div>
                  
                  <div className="absolute top-4 left-4"><span className="inline-flex items-center ring-1 ring-white/10 text-[10px] font-medium text-neutral-300 bg-neutral-900/80 rounded-full py-0.5 px-2 backdrop-blur-sm">30 Days</span></div>
                  <div className="absolute bottom-4 right-4"><span className="inline-flex items-center ring-1 ring-white/10 text-[10px] font-medium text-neutral-300 bg-neutral-900/80 rounded-full py-0.5 px-2 backdrop-blur-sm">Lender Match</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Wealth ecosystem section */}
      <section className="mt-10 mb-0 pt-0 pb-0 relative" id="features">
        <div className="sm:px-6 lg:px-8 lg:pb-0 max-w-7xl mr-auto ml-auto pt-16 pr-4 pb-16 pl-4">
          <h2 className="text-2xl font-medium text-white tracking-tighter text-left mb-0 sm:text-5xl" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)' }}>A Complete Wealth Ecosystem</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

            {/* Card 1: Get Business Funding */}
            <div className="group relative overflow-hidden transition-all duration-500 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"><source src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8" type="application/x-mpegURL" /></video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg py-1 px-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-white/80 rounded-full"></div>
                    Funding
                  </span>
                </div>
                <div className="inline-flex text-slate-200 bg-white/5 w-12 h-12 ring-white/10 ring-1 rounded-xl mb-4 items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Get Business Funding</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6 flex-1">Access capital for your business through our network of alternative lenders — funding solutions tailored to entrepreneurs at every stage.</p>
                <a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Get Business Funding
                </a>
              </div>
            </div>

            {/* Card 2: Repair My Credit */}
            <div className="group relative overflow-hidden transition-all duration-500 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"><source src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8" type="application/x-mpegURL" /></video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg py-1 px-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-white/80 rounded-full"></div>
                    Credit
                  </span>
                </div>
                <div className="inline-flex text-slate-200 bg-white/5 w-12 h-12 ring-white/10 ring-1 rounded-xl mb-4 items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Repair My Credit</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6 flex-1">Restore and optimize your personal and business credit profile to unlock better rates, higher limits, and more funding power.</p>
                <a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Repair My Credit
                </a>
              </div>
            </div>

            {/* Card 3: Join The Community */}
            <div className="group relative overflow-hidden transition-all duration-500 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"><source src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8" type="application/x-mpegURL" /></video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg py-1 px-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-white/80 rounded-full"></div>
                    Community
                  </span>
                </div>
                <div className="inline-flex text-slate-200 bg-white/5 w-12 h-12 ring-white/10 ring-1 rounded-xl mb-4 items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Join The Community</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6 flex-1">Connect with funded founders, attend live trainings, and tap into deal flow inside our exclusive entrepreneur community.</p>
                <a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Join The Community
                </a>
              </div>
            </div>

            {/* Card 4: Shop Digital Products */}
            <div className="group relative overflow-hidden transition-all duration-500 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"><source src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8" type="application/x-mpegURL" /></video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg py-1 px-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-white/80 rounded-full"></div>
                    Products
                  </span>
                </div>
                <div className="inline-flex text-slate-200 bg-white/5 w-12 h-12 ring-white/10 ring-1 rounded-xl mb-4 items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Shop Digital Products</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6 flex-1">Browse DIY kits, automation tools, and scaling blueprints designed to help you build and grow your digital empire.</p>
                <a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Shop Digital Products
                </a>
              </div>
            </div>

            {/* Card 5: Become A Partner */}
            <div className="group relative overflow-hidden transition-all duration-500 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"><source src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8" type="application/x-mpegURL" /></video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg py-1 px-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-white/80 rounded-full"></div>
                    Partner
                  </span>
                </div>
                <div className="inline-flex text-slate-200 bg-white/5 w-12 h-12 ring-white/10 ring-1 rounded-xl mb-4 items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Become A Partner</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6 flex-1">Earn by referring others to Ryland Partners — join our partner program and build a revenue stream alongside your business.</p>
                <a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Become A Partner
                </a>
              </div>
            </div>

            {/* Card 6: Schedule A Consultation */}
            <div className="group relative overflow-hidden transition-all duration-500 border-white/10 border ring-white/5 ring-1 rounded-2xl">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40"><source src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8" type="application/x-mpegURL" /></video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex mb-4 items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/5 ring-white/20 ring-1 rounded-lg py-1 px-2.5">
                    <div className="h-1.5 w-1.5 animate-pulse bg-white/80 rounded-full"></div>
                    Strategy
                  </span>
                </div>
                <div className="inline-flex text-slate-200 bg-white/5 w-12 h-12 ring-white/10 ring-1 rounded-xl mb-4 items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-100 mb-2">Schedule A Consultation</h3>
                <p className="leading-relaxed text-sm text-neutral-400 mb-6 flex-1">Book a 1-on-1 session with a funding strategist to map out your personalized path to capital and growth.</p>
                <a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Schedule A Consultation
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Success Stories section */}
      <section className="sm:pt-24 md:pt-20 pt-24 pb-20 relative" id="showcase">
        <div className="max-w-7xl mr-auto ml-auto pr-6 pl-6">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-white tracking-tighter text-left pt-6 pb-6 sm:text-5xl" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 0%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 0%, transparent)' }}>Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 mt-10 pt-0 pr-0 pb-0 pl-0 space-x-5">
            {/* Info card */}
            <div className="group overflow-hidden hover:bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] hover:from-blue-400/30 hover:to-blue-400/0 hover:border-slate-50/20 transition-all duration-300 sm:p-6 bg-gradient-to-b from-[#ffffff]/10 to-[#000000]/10 ring-[#ffffff]/10 ring-1 rounded-2xl pt-5 pr-5 pb-5 pl-5 relative">
              <div className="opacity-[0.07] absolute top-0 right-0 bottom-0 left-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '14px 14px' }}></div>
              <div className="flex gap-3 gap-x-3 gap-y-3 items-center">
                <span className="inline-flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15 px-2.5 py-1 text-xs text-white/80">Results</span>
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight font-manrope">Real Entrepreneur Wins</h3>
              <p className="text-sm text-neutral-400 mt-2">See how real entrepreneurs have used Ryland Partners to secure funding, fix their credit, and build digital empires.</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10">Startup Launch</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10">Credit Pivot</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10">Digital Empire</span>
              </div>
            </div>
            
            {/* Gallery */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
              <div className="group overflow-hidden hover:ring-white/20 hover:shadow-xl transition ring-white/10 ring-1 rounded-2xl bg-zinc-900">
                <div className="relative">
                  <img src={successFunding} alt="The Startup Launch" className="transition-all duration-300 w-full h-[224px] object-cover" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <button className="px-3.5 py-1.5 rounded-full text-black text-xs bg-white hover:bg-slate-200" style={{ fontFamily: "'Inter',sans-serif" }}>View</button>
                  </div>
                </div>
                <div className="pt-4 pr-4 pb-4 pl-4">
                  <h4 className="text-sm font-medium text-slate-100" style={{ fontFamily: "'Inter',sans-serif" }}>The Startup Launch</h4>
                  <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "'Inter',sans-serif" }}>New LLC secured $50k at 0% interest</p>
                </div>
              </div>
              <div className="group overflow-hidden hover:ring-white/20 hover:shadow-xl transition ring-white/10 ring-1 rounded-2xl bg-zinc-900">
                <div className="relative">
                  <img src={successCredit} alt="The Credit Pivot" className="w-full h-[224px] object-cover transition-all duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <button className="px-3.5 py-1.5 rounded-full text-black text-xs bg-white hover:bg-slate-200" style={{ fontFamily: "'Inter',sans-serif" }}>View</button>
                  </div>
                </div>
                <div className="pt-4 pr-4 pb-4 pl-4">
                  <h4 className="text-sm font-medium text-slate-100" style={{ fontFamily: "'Inter',sans-serif" }}>The Credit Pivot</h4>
                  <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "'Inter',sans-serif" }}>From 580 to 740 score</p>
                </div>
              </div>
              <div className="group overflow-hidden hover:ring-white/20 hover:shadow-xl transition ring-white/10 ring-1 rounded-2xl bg-zinc-900">
                <div className="relative">
                  <img src={successEmpire} alt="The Digital Empire" className="w-full h-[224px] object-cover transition-all duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <button className="px-3.5 py-1.5 rounded-full text-black text-xs bg-white hover:bg-slate-200" style={{ fontFamily: "'Inter',sans-serif" }}>View</button>
                  </div>
                </div>
                <div className="pt-4 pr-4 pb-4 pl-4">
                  <h4 className="text-sm font-medium text-slate-100" style={{ fontFamily: "'Inter',sans-serif" }}>The Digital Empire</h4>
                  <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "'Inter',sans-serif" }}>$10k/mo Shopify store scaled with business credit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="overflow-hidden mt-40 mb-40 pt-24 pb-24 relative" id="about">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs sm:text-sm text-zinc-400 mb-4">Meet The Founder</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6" style={{ maskImage: 'linear-gradient(to bottom, white 40%, rgba(255,255,255,0.5))', WebkitMaskImage: 'linear-gradient(to bottom, white 40%, rgba(255,255,255,0.5))' }}>
              Gene Ryland
            </h2>
            <p className="text-lg text-slate-400">
              CEO &amp; Founder, Ryland Partners
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative group flex justify-center">
              <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full transition-all duration-700 group-hover:bg-blue-500/15"></div>
              <img
                src={geneRylandAbout}
                alt="Gene Ryland — Founder of Ryland Partners"
                className="relative z-10 rounded-2xl border border-white/10 ring-1 ring-white/5 w-full max-w-md object-cover shadow-2xl"
              />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed text-base">
                Gene Ryland is a serial entrepreneur and business funding strategist who has dedicated his career to helping founders unlock the capital they need to scale. With deep expertise in credit optimization, alternative lending, and strategic financial positioning, Gene has built Ryland Partners into a trusted name in the funding space.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                After experiencing firsthand how traditional banks overlook ambitious entrepreneurs, Gene created a system that bridges the gap — connecting business owners with high-limit lenders, credit-building strategies, and the education needed to secure six- and seven-figure funding packages.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                Today, Gene leads a growing community of funded founders through the Ryland Partners ecosystem — offering done-for-you services, a private academy, and direct lender access that most entrepreneurs never knew existed.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">$150M+</p>
                  <p className="text-xs text-slate-500 mt-1">Funding Secured</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">10K+</p>
                  <p className="text-xs text-slate-500 mt-1">Entrepreneurs Helped</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">8+</p>
                  <p className="text-xs text-slate-500 mt-1">Years of Experience</p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a href="#cta" className="inline-flex transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                  Work With Gene
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sm:px-6 sm:py-10 md:py-12 lg:pl-8 lg:pr-8 max-w-7xl mt-20 mr-auto ml-auto pt-8 pr-4 pb-8 pl-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-zinc-400">Trusted by entrepreneurs</p>
            <h2 className="text-2xl font-medium text-white tracking-tighter text-left pt-6 pb-6 sm:text-5xl" style={{ maskImage: 'linear-gradient(250deg, transparent, black 25%, black 70%, transparent)', WebkitMaskImage: 'linear-gradient(250deg, transparent, black 25%, black 70%, transparent)' }}>Testimonials</h2>
          </div>
        </div>

        <div className="sm:mt-8 overflow-hidden sm:rounded-3xl mt-6 relative" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

          {/* Row 1 — left to right */}
          <div className="sm:py-8 pt-6 pb-6 relative">
            <div className="flex gap-4 sm:gap-5 will-change-transform" style={{ animation: 'marquee-ltr 45s linear infinite' }}>
              <article className="shrink-0 w-[280px] sm:w-[360px] md:w-[420px] rounded-2xl border border-zinc-900 bg-zinc-900/40 p-5">
                <div className="flex items-center gap-3">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e0bbf4a4-5f58-4644-bea6-85d2fef73d4a_320w.jpg" alt="Avatar" className="size-9 object-cover rounded-full" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-zinc-100">Bradley A.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-400"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <p className="text-xs text-zinc-400">@bradley_a</p>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-zinc-300">
                  The funding process was seamless. I got $24k at 0% interest for 12 months.
                </p>
              </article>

              <article className="shrink-0 w-[280px] sm:w-[360px] md:w-[420px] rounded-2xl border border-zinc-900 bg-zinc-900/40 p-5">
                <div className="flex items-center gap-3">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/27a2c31e-38f3-479f-a831-858e91b9bd84_320w.jpg" alt="Avatar" className="size-9 object-cover rounded-full" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-zinc-100">Michael G.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-400"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <p className="text-xs text-zinc-400">@michael_g</p>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-zinc-300">
                  Ryland Partners fixed my credit when no one else could. My score is up 115 points.
                </p>
              </article>
              
              <article className="shrink-0 w-[280px] sm:w-[360px] md:w-[420px] rounded-2xl border border-zinc-900 bg-zinc-900/40 p-5">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=120&h=120&fit=crop&crop=faces" alt="Avatar" className="size-9 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-zinc-100">Ethan G.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-400"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <p className="text-xs text-zinc-400">@ethan_g</p>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-zinc-300">
                  The Skool community alone is worth 10x the price. The digital products are pure gold.
                </p>
              </article>

              {/* Duplicate for seamless loop */}
              <article className="shrink-0 w-[280px] sm:w-[360px] md:w-[420px] rounded-2xl border border-zinc-900 bg-zinc-900/40 p-5">
                <div className="flex items-center gap-3">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e0bbf4a4-5f58-4644-bea6-85d2fef73d4a_320w.jpg" alt="Avatar" className="size-9 object-cover rounded-full" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-zinc-100">Bradley A.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-400"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <p className="text-xs text-zinc-400">@bradley_a</p>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-zinc-300">
                  The funding process was seamless. I got $24k at 0% interest for 12 months.
                </p>
              </article>

              <article className="shrink-0 w-[280px] sm:w-[360px] md:w-[420px] rounded-2xl border border-zinc-900 bg-zinc-900/40 p-5">
                <div className="flex items-center gap-3">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/27a2c31e-38f3-479f-a831-858e91b9bd84_320w.jpg" alt="Avatar" className="size-9 object-cover rounded-full" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-zinc-100">Michael G.</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-400"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <p className="text-xs text-zinc-400">@michael_g</p>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base text-zinc-300">
                  Ryland Partners fixed my credit when no one else could. My score is up 115 points.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="md:p-10 bg-zinc-500/5 max-w-7xl border-white/10 border rounded-3xl ring-white/10 ring-1 mt-40 mr-auto ml-auto pt-6 pr-6 pb-6 pl-6 shadow-2xl backdrop-blur-xl" style={{ maskImage: 'linear-gradient(200deg, transparent, black 25%, black 65%, transparent)', WebkitMaskImage: 'linear-gradient(200deg, transparent, black 25%, black 65%, transparent)' }}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="sm:text-5xl text-2xl font-medium text-white tracking-tighter text-left pt-6 pb-6" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 45%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 45%, transparent)' }}>Ryland Partners — Help &amp; FAQs</h1>
              <p className="mt-1 text-sm text-slate-400">Common questions about funding, credit, and our services.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="faq-item rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <button type="button" className="faq-trigger flex text-left w-full gap-x-4 gap-y-4 items-center justify-between">
              <span className="text-base md:text-lg font-semibold leading-6 tracking-tight text-slate-100">Do I need revenue to get funded?</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-icon"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              </span>
            </button>
            <div className="faq-content mt-3 text-sm leading-6 text-slate-300" style={{ display: 'none' }}>
              No. We specialize in startup funding based on credit strength, not just history.
            </div>
          </div>

          <div className="faq-item rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <button type="button" className="faq-trigger flex w-full items-center justify-between gap-4 text-left">
              <span className="text-base md:text-lg font-semibold leading-6 tracking-tight text-slate-100">How long does credit repair take?</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-icon"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              </span>
            </button>
            <div className="faq-content mt-3 text-sm leading-6 text-slate-300" style={{ display: 'none' }}>
              Most clients see significant removals and score jumps within 35–90 days.
            </div>
          </div>

          <div className="faq-item rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <button type="button" className="faq-trigger flex w-full items-center justify-between gap-4 text-left">
              <span className="text-base md:text-lg font-semibold leading-6 tracking-tight text-slate-100">What is the Skool community?</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-icon"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              </span>
            </button>
            <div className="faq-content mt-3 text-sm leading-6 text-slate-300" style={{ display: 'none' }}>
              It is our private network where we teach you how to invest your funding into high-ROI digital businesses.
            </div>
          </div>

          <div className="faq-item rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <button type="button" className="faq-trigger flex w-full items-center justify-between gap-4 text-left">
              <span className="text-base md:text-lg font-semibold leading-6 tracking-tight text-slate-100">Is the assessment really free?</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-icon"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              </span>
            </button>
            <div className="faq-content mt-3 text-sm leading-6 text-slate-300" style={{ display: 'none' }}>
              Yes. It is a soft-pull only and will not impact your credit score.
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-sky-300"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
            </span>
            <p className="text-sm text-slate-300">Still have questions? We're here to help.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex hover:bg-white/10 text-sm font-medium text-slate-200 bg-white/5 border-white/10 border rounded-full pt-3 pr-4 pb-3 pl-4 gap-x-2 gap-y-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path></svg>
              Contact Support
            </button>
            <a href="#" className="hover:shadow-lg transition-shadow text-sm font-medium text-slate-900 bg-white rounded-full pt-3 pr-5 pb-3 pl-5 shadow">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden my-10 relative" id="cta">
        <div className="text-white max-w-7xl mr-auto ml-auto pr-0 pb-24 pl-0">
          <div className="md:p-10 bg-zinc-500/5 max-w-7xl border-white/10 border rounded-3xl ring-white/10 ring-1 mr-auto ml-auto pt-6 pr-6 pb-6 pl-6 shadow-2xl backdrop-blur-xl" style={{ maskImage: 'linear-gradient(150deg, transparent, black 0%, black 60%, transparent)', WebkitMaskImage: 'linear-gradient(150deg, transparent, black 0%, black 60%, transparent)' }}>
            
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:p-12 pt-8 pr-8 pb-8 pl-8 gap-x-6 gap-y-6 items-center">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Ready to scale?</h3>
                <p className="mt-2 max-w-prose text-slate-200">Join thousands of entrepreneurs building their future with Ryland Partners.</p>
                <div className="mt-5 flex gap-3 flex-wrap">
                  <a href="#" className="hover:shadow-lg transition-shadow text-sm font-medium text-slate-900 bg-white rounded-full pt-3 pr-5 pb-3 pl-5 shadow">Get Funded</a>
                  <a href="#features" className="hover:bg-white/5 transition-colors text-sm text-white border-white/20 border rounded-full pt-3 pr-5 pb-3 pl-5">View Products</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-white/10 border-t pt-16 pb-10" style={{ maskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-slate-400 max-w-xs">Empowering entrepreneurs with capital, credit, and community.</p>
              <div className="flex items-center gap-3">
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </a>
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">Funding</a></li>
                <li><a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">Credit</a></li>
                <li><a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Academy</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Store</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#showcase" className="text-sm text-slate-400 hover:text-white transition-colors">Results</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © <span id="year">2026</span> Ryland Partners. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
