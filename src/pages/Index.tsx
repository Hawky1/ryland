import { useEffect, useState, useRef } from "react";
import { VolumeX, Volume2, Rocket, LayoutDashboard, ShieldCheck, Handshake } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoDark from "@/assets/logo-dark.png";
import heroPortrait from "@/assets/hero-portrait.png";
import asSeenOn from "@/assets/as-seen-on.png";
import geneRylandAbout from "@/assets/gene-ryland-about.png";
import logoUsBank from "@/assets/logo-usbank.png";
import logoBoa from "@/assets/logo-boa.png";
import logoNavyFed from "@/assets/logo-navyfed.png";
import logoChase from "@/assets/logo-chase.png";
import logoTruist from "@/assets/logo-truist.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import FundingJourney from "@/components/FundingJourney";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import iconFunding from "@/assets/icon-funding.png";
import iconCredit from "@/assets/icon-credit.png";
import iconCommunity from "@/assets/icon-community.png";
import iconProducts from "@/assets/icon-products.png";
import iconPartner from "@/assets/icon-partner.png";
import iconConsultation from "@/assets/icon-consultation.png";
import { motion } from "framer-motion";
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
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
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

        .gradient-blur>,
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
          background: linear-gradient(#003A70, #0060A9) padding-box, conic-gradient(
            from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
            transparent 0%,
            #3b82f6 5%,
            var(--gradient-shine) 15%,
            #3b82f6 30%,
            transparent 40%,
            transparent 100%
          ) border-box;
          border: 2px solid transparent;
          box-shadow: inset 0 0 0 1px #1e293b;
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
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#ffffff' }}>
        <InfiniteGrid
          baseGridColor="rgba(148, 163, 184, 0.12)"
          activeGridColor="rgba(59, 130, 246, 0.3)"
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
      <header className="sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex max-w-7xl mr-auto ml-auto pt-4 pr-4 sm:pr-6 pb-4 pl-4 sm:pl-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" />
          </div>
          <nav className="hidden gap-8 md:flex items-center">
            <a href="/" className="nav-link relative text-sm text-slate-900 font-medium">Home</a>
            <a href="/about" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="#services" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Services</a>
            <a href="#features" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Community</a>
            <a href="/store" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Store</a>
            <a href="#cta" className="shiny-cta !py-2 !px-5 !text-sm whitespace-nowrap focus:outline-none">
              <span>Contact</span>
            </a>
          </nav>
          <button id="menuBtn" className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <aside className="mobile-menu fixed z-50 bg-white/95 w-[80%] max-w-sm border-slate-200 border-l pt-6 pr-6 pb-6 pl-6 top-0 right-0 bottom-0 backdrop-blur" aria-label="Mobile menu" id="mobileMenu">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Ryland Partners</span>
            <button id="closeMenuBtn" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            <li><a href="/" className="mobile-link block rounded-lg px-2 py-2 text-slate-900 font-medium hover:bg-slate-100 transition-colors">Home</a></li>
            <li><a href="/about" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">About</a></li>
            <li><a href="#services" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Services</a></li>
            <li><a href="#features" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Community</a></li>
            <li><a href="/store" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Store</a></li>
          </ul>
          <a href="#cta" className="mobile-link mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm ring-1 ring-slate-200 hover:bg-slate-200 text-slate-900 transition-colors">
            Contact <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </aside>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-4 sm:mx-6 lg:mx-auto mt-4 sm:mt-8 pt-10 sm:pt-16 pb-12 sm:pb-36 px-4 sm:px-8 lg:px-20 overflow-hidden rounded-2xl border border-[#004E8C]">
        {/* Background Video */}
        <HlsVideoBackground overlay="bg-gradient-to-r from-[#003A70]/95 via-[#003A70]/75 to-[#004E8C]/50" className="rounded-2xl" />

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          {/* Left - text + CTAs */}
          <div className="text-center lg:text-left lg:flex-1 max-w-3xl">
            <h1 className="text-[28px] leading-[0.95] sm:text-[42px] md:text-[52px] lg:text-[64px] font-medium tracking-tighter font-geist text-center lg:text-left mt-4 sm:mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              Unlock the Capital, Credit, and Community to Build Your Empire
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 mt-4 sm:mt-6 max-w-xl text-center lg:text-left leading-relaxed mx-auto lg:mx-0">
              We help entrepreneurs secure <span className="text-white font-semibold">$150K+</span> in business funding, repair their credit, and master the digital economy.
            </p>

            <div className="flex flex-col mt-6 sm:mt-8 xl:mt-10 gap-4 items-center lg:items-start">
              <div className="inline-block bg-transparent">
                <button className="shiny-cta !py-3 !px-6 sm:!py-5 sm:!px-10 !text-sm sm:!text-lg focus:outline-none">
                  <span>Take the Free Funding Assessment</span>
                </button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-zinc-500">
                <span>Results in 2 minutes</span>
                <span className="text-zinc-600">•</span>
                <span>No hard credit pull</span>
                <span className="text-zinc-600">•</span>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
          {/* Right - video showcase */}
          <div className="relative lg:flex-1 flex justify-center mt-4 lg:mt-16 w-full">
            <div className="relative flex flex-col items-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-md lg:max-w-xl">
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
              <div className="relative z-10 w-full">
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
                  className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 sm:p-3 shadow-lg transition-colors ${isMuted ? 'animate-pulse' : ''}`}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
              <div className="relative z-10 flex flex-col items-center mt-1 sm:mt-2">
                <h3 className="text-base sm:text-lg font-semibold text-white/90" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Gene Ryland</h3>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-blue-300/60 font-medium mt-0.5">CEO &amp; Founder <span className="text-white/25 mx-1">|</span> Business Funding Expert</p>
              </div>
              <img
                src={asSeenOn}
                alt="As seen on FOX, USA Today, Digital Journal, MarketWatch"
                className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-xl brightness-0 invert opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="sm:px-6 lg:px-8 lg:pt-6 max-w-7xl z-10 mt-8 mr-auto mb-16 ml-auto pt-16 pr-4 pb-6 pl-4 relative">
        <div className="text-center">
          <p className="uppercase text-sm font-medium text-slate-500 tracking-wide">
            TRUSTED BANKING PARTNERS
          </p>
        </div>
        <div className="overflow-hidden mt-6 relative">
          <div style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <div className="flex carousel-wrapper gap-x-10 lg:gap-x-20">
              <div className="flex gap-10 shrink-0 lg:gap-x-20 items-center">
                <img src={logoChase} alt="Chase" className="h-[32px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoBoa} alt="Bank of America" className="h-[40px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoUsBank} alt="US Bank" className="h-[36px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoNavyFed} alt="Navy Federal Credit Union" className="h-[40px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoTruist} alt="Truist" className="h-[32px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex shrink-0 gap-10 lg:gap-x-20 items-center">
                <img src={logoChase} alt="Chase" className="h-[32px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoBoa} alt="Bank of America" className="h-[40px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoUsBank} alt="US Bank" className="h-[36px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoNavyFed} alt="Navy Federal Credit Union" className="h-[40px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <img src={logoTruist} alt="Truist" className="h-[32px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About section — moved up for authority */}
      <section className="overflow-hidden mt-4 sm:mt-8 mb-8 sm:mb-12 pt-16 sm:pt-24 pb-16 sm:pb-24 relative" id="about">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs sm:text-sm text-slate-500 mb-4">Meet The Founder</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-slate-900 mb-6" style={{ maskImage: 'linear-gradient(to bottom, black 40%, rgba(0,0,0,0.5))', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, rgba(0,0,0,0.5))' }}>
              Gene Ryland
            </h2>
            <p className="text-lg text-slate-500">
              CEO &amp; Founder, Ryland Partners
            </p>
          </div>

          <div className="border border-[#004E8C] rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl overflow-visible relative">
            <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center relative z-10">
              <div className="relative flex justify-center -mt-20 sm:-mt-32 md:-mt-56 lg:-mt-64">
                <img
                  src={geneRylandAbout}
                  alt="Gene Ryland — Founder of Ryland Partners"
                  className="relative z-10 w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[26rem] lg:max-w-[30rem] object-cover drop-shadow-2xl"
                />
              </div>

              <div className="space-y-6">
                <p className="text-white/80 leading-relaxed text-base">
                  Gene Ryland is a serial entrepreneur and business funding strategist who has dedicated his career to helping founders unlock the capital they need to scale. With deep expertise in credit optimization, alternative lending, and strategic financial positioning, Gene has built Ryland Partners into a trusted name in the funding space.
                </p>
                <p className="text-white/80 leading-relaxed text-base">
                  After experiencing firsthand how traditional banks overlook ambitious entrepreneurs, Gene created a system that bridges the gap — connecting business owners with high-limit lenders, credit-building strategies, and the education needed to secure six- and seven-figure funding packages.
                </p>
                <p className="text-white/80 leading-relaxed text-base">
                  Today, Gene leads a growing community of funded founders through the Ryland Partners ecosystem — offering done-for-you services, a private academy, and direct lender access that most entrepreneurs never knew existed.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
                  <div>
                    <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">$150M+</p>
                    <p className="text-xs text-white/60 mt-1">Funding Secured</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">10K+</p>
                    <p className="text-xs text-white/60 mt-1">Entrepreneurs Helped</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-semibold text-white tracking-tight">8+</p>
                    <p className="text-xs text-white/60 mt-1">Years of Experience</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a href="#cta" className="inline-flex transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
                    Work With Gene
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Journey */}
      <FundingJourney />

      {/* Who This Is For */}
      <section className="sm:pt-24 md:pt-20 pt-24 pb-20 relative" id="showcase">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest mb-3">Who This Is For</p>
            <h2 className="text-2xl sm:text-5xl font-medium text-slate-900 tracking-tighter">Designed for the Ambitious</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "Rocket",
                title: "The Scale-Up",
                desc: "Entrepreneurs ready to inject $100K+ into marketing or inventory.",
              },
              {
                icon: "LayoutDashboard",
                title: "The Digital Architect",
                desc: "Founders building high-ROI Shopify or digital service businesses.",
              },
              {
                icon: "ShieldCheck",
                title: "The Credit Restarter",
                desc: "Visionaries who need to clear the path to capital through CROA-compliant restoration.",
              },
              {
                icon: "Handshake",
                title: "The Strategic Partner",
                desc: "Professionals (CPAs, Coaches, Agencies) looking to offer funding to their own clients.",
              },
            ].map((card, i) => {
              const IconComp = { Rocket, LayoutDashboard, ShieldCheck, Handshake }[card.icon]!;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-[#004E8C] p-6 sm:p-8 text-white min-h-[200px]"
                >
                  <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-2xl" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/20 mb-5">
                      <IconComp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">{card.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wealth ecosystem section */}
      <section className="mt-10 mb-0 pt-0 pb-0 relative" id="features">
        <div className="sm:px-6 lg:px-8 lg:pb-0 max-w-7xl mr-auto ml-auto pt-16 pr-4 pb-16 pl-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tighter text-slate-900 font-manrope">The Wealth Ecosystem</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">Everything you need to build, fund, and scale your business</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: iconFunding, title: "Get Business Funding", desc: "Secure $50K–$250K in 0% APR business credit lines with no revenue or tax returns required.", cta: "Get Funded", href: "#cta" },
              { icon: iconCredit, title: "Repair My Credit", desc: "Done-for-you credit restoration with negative item removals and dispute management in 35–90 days.", cta: "Repair Credit", href: "#cta" },
              { icon: iconCommunity, title: "Join The Community", desc: "Access our private Skool network and learn to invest your funding into high-ROI digital businesses.", cta: "Join Now", href: "#cta" },
              { icon: iconProducts, title: "Shop Digital Products", desc: "Browse our curated collection of eBooks and digital resources to accelerate your business growth.", cta: "Shop Now", href: "/store" },
              { icon: iconPartner, title: "Become A Partner", desc: "Earn uncapped commissions by referring entrepreneurs to our funding programs. Free to join.", cta: "Partner Up", href: "/partners" },
              { icon: iconConsultation, title: "Schedule A Consultation", desc: "Book a 1-on-1 strategy session with our funding experts to map your personalized capital plan.", cta: "Book Now", href: "#cta" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <img src={card.icon} alt={card.title} className="w-28 h-28 mx-auto mb-6 object-contain" />
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-manrope">{card.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{card.desc}</p>
                <a
                  href={card.href}
                  className="mt-auto inline-flex transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] active:duration-75 text-sm font-semibold text-white rounded-full py-3 px-8 items-center justify-center"
                  style={{ background: 'linear-gradient(to bottom, #003A70, #0060A9)' }}
                >
                  {card.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        [data-scroll-column="1"] { animation: scrollUp 25s linear infinite; }
        [data-scroll-column="2"] { animation: scrollDown 25s linear infinite; }
        [data-scroll-column="3"] { animation: scrollUp 25s linear infinite; }
        [data-scroll-column]:hover { animation-play-state: paused; }
      `}</style>
      <section className="sm:px-6 sm:py-10 md:py-12 lg:px-8 max-w-7xl mt-20 mx-auto pt-8 px-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-slate-500">Trusted by entrepreneurs</p>
            <h2 className="text-2xl sm:text-5xl font-medium text-slate-900 tracking-tighter pt-4 pb-4" style={{ maskImage: 'linear-gradient(250deg, transparent, black 25%, black 70%, transparent)', WebkitMaskImage: 'linear-gradient(250deg, transparent, black 25%, black 70%, transparent)' }}>Testimonials</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F59E0B" className="w-4 h-4 sm:w-5 sm:h-5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">4.9/5 · 2,431 reviews</span>
          </div>
        </div>

        <div className="relative overflow-hidden h-[420px] md:h-[600px] rounded-2xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {/* Column 1 */}
            <div data-scroll-column="1" className="flex flex-col gap-4">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex flex-col gap-4">
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e0bbf4a4-5f58-4644-bea6-85d2fef73d4a_320w.jpg" alt="Bradley A." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Bradley A.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Business Owner</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"The funding process was seamless. I got $24k at 0% interest for 12 months. Changed my entire business trajectory."</p>
                  </article>
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=faces" alt="Aisha G." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Aisha G.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Head of Business Intelligence</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"Within 60 days my business credit was established and I had three Net-30 vendor accounts reporting. The roadmap they gave me was flawless."</p>
                  </article>
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop&crop=faces" alt="Ethan G." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Ethan G.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">E-Commerce Founder</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"The Skool community alone is worth 10x the price. The digital products are pure gold for anyone serious about credit."</p>
                  </article>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div data-scroll-column="2" className="hidden md:flex flex-col gap-4">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex flex-col gap-4">
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/27a2c31e-38f3-479f-a831-858e91b9bd84_320w.jpg" alt="Michael G." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Michael G.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Real Estate Investor</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"Ryland Partners fixed my credit when no one else could. My score is up 115 points and I just closed on my first investment property."</p>
                  </article>
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces" alt="Rachel A." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Rachel A.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Product Manager</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"I was skeptical at first, but the team walked me through every step. $150K in business funding secured in under 45 days."</p>
                  </article>
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces" alt="Liam O." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Liam O.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Agency Owner</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"Support is outstanding. Every question had a thoughtful answer within minutes. I now refer all my clients here."</p>
                  </article>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div data-scroll-column="3" className="hidden md:flex flex-col gap-4">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex flex-col gap-4">
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces" alt="Carlos R." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Carlos R.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">CEO, Rivera Ventures</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"Switching to Ryland was the best decision this year. Intuitive process, fully transparent, and measurable results from day one."</p>
                  </article>
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=faces" alt="Sofia M." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Sofia M.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Analytics Lead</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"Total transparency removed all doubt. I always knew exactly where my credit stood and what the next move was."</p>
                  </article>
                  <article className="rounded-2xl border border-[#004E8C] bg-gradient-to-br from-[#0060A9] to-[#003A70] p-6 text-white">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces" alt="Noah B." className="size-9 object-cover rounded-full" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-zinc-100">Noah B.</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <p className="text-sm text-zinc-400">Strategy Director</p>
                      </div>
                    </div>
                    <p className="mt-4 text-base text-zinc-300 leading-relaxed">"The predictive funding models helped us spot opportunities early and act faster. It's like a compass for business growth."</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="md:p-10 max-w-7xl border border-[#004E8C] rounded-3xl mt-20 sm:mt-40 mx-4 sm:mx-auto pt-6 px-4 sm:px-6 pb-6 shadow-2xl text-white relative overflow-hidden">
        <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-3xl" />
        <div className="mb-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="sm:text-5xl text-2xl font-medium text-white tracking-tighter text-left pt-6 pb-6" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 45%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 45%, transparent)' }}>Ryland Partners — Help &amp; FAQs</h1>
              <p className="mt-1 text-sm text-slate-400">Common questions about funding, credit, and our services.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 relative z-10">
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

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row relative z-10">
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
        <div className="max-w-7xl mr-auto ml-auto pr-0 pb-24 pl-0">
            <div className="md:p-10 max-w-7xl border border-[#004E8C] rounded-3xl mr-auto ml-auto pt-6 pr-6 pb-6 pl-6 shadow-2xl text-white relative overflow-hidden">
              <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-3xl" />
            
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:p-12 pt-8 pr-8 pb-8 pl-8 gap-x-6 gap-y-6 items-center relative z-10">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">Ready to scale?</h3>
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
      <footer className="border-slate-200 border-t pt-16 pb-10" style={{ maskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-slate-500 max-w-xs">Empowering entrepreneurs with capital, credit, and community.</p>
              <div className="flex items-center gap-3">
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </a>
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#services" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Funding</a></li>
                <li><a href="#services" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Credit</a></li>
                <li><a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Academy</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Store</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Blog</a></li>
                <li><a href="#showcase" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Results</a></li>
                <li><a href="/partners" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Partners</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a></li>
                <li><a href="/ccpa" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">CCPA Notice</a></li>
                <li><a href="/tsr-compliance" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">TSR Compliance</a></li>
                <li><a href="/disclaimers" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Disclaimers</a></li>
                <li><a href="/cookie-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © <span id="year">2026</span> Ryland Partners. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Consumer Disclosure */}
          <div className="border-t border-slate-200 mt-8 pt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <h4 className="text-sm font-semibold text-slate-900">Consumer Disclosure</h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                CROA Compliant
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                TSR Compliant
              </span>
            </div>
            <div className="space-y-3 text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
              <p><span className="font-semibold text-slate-700">Credit Repair Organizations Act (CROA) Notice:</span> You have a right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any credit repair company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report.</p>
              <p>You have a right to cancel this contract within 3 business days from the date you signed it. If you cancel, we cannot charge you any fees or collect any money for the services that have not yet been performed.</p>
              <p><span className="font-semibold text-slate-700">No Guarantee:</span> We cannot guarantee specific results. Improvement in credit scores depends on the unique circumstances of each individual.</p>
              <p><span className="font-semibold text-slate-700">FTC Telemarketing Sales Rule (TSR) Compliance:</span> In accordance with the TSR, no fees are charged or collected until services are fully performed.</p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-slate-400">All systems normal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
