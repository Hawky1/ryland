import { useEffect } from "react";
import logoWhite from "@/assets/logo-white.png";
import heroPortrait from "@/assets/hero-portrait.png";

const Index = () => {
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

    // Billing toggle
    const toggleContainer = document.getElementById('billing-toggle-container');
    const indicator = document.getElementById('toggle-indicator');
    const monthlyBtn = toggleContainer?.querySelector('[data-plan="monthly"]');
    const yearlyBtn = toggleContainer?.querySelector('[data-plan="yearly"]');
    const amounts = document.querySelectorAll('.pricing-amount');
    
    let isYearly = false;

    toggleContainer?.addEventListener('click', () => {
      isYearly = !isYearly;
      
      if (isYearly) {
        if (indicator) indicator.style.transform = 'translateX(100%)';
        yearlyBtn?.classList.replace('text-slate-400', 'text-white');
        monthlyBtn?.classList.replace('text-white', 'text-slate-400');
      } else {
        if (indicator) indicator.style.transform = 'translateX(0)';
        monthlyBtn?.classList.replace('text-slate-400', 'text-white');
        yearlyBtn?.classList.replace('text-white', 'text-slate-400');
      }

      amounts.forEach(el => {
        (el as HTMLElement).style.opacity = '0';
        setTimeout(() => {
          if (isYearly) {
            el.textContent = '$' + (el as HTMLElement).dataset.yearly;
          } else {
            el.textContent = '$' + (el as HTMLElement).dataset.monthly;
          }
          (el as HTMLElement).style.opacity = '1';
        }, 150);
      });
    });

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
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-white bg-slate-950">
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

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <nav className="hidden gap-6 md:flex gap-x-6 gap-y-6 items-center">
            <a href="#features" className="nav-link hover:text-white text-sm text-slate-300 relative">Features</a>
            <a href="#services" className="nav-link relative text-sm text-slate-300 hover:text-white">Services</a>
            <a href="#showcase" className="nav-link relative text-sm text-slate-300 hover:text-white">Results</a>
            <a href="#pricing" className="nav-link relative text-sm text-slate-300 hover:text-white">Pricing</a>
            <a href="#cta" className="inline-flex items-center gap-2 hover:bg-white/10 transition-colors text-sm text-white bg-white/5 ring-white/10 ring-1 rounded-full pt-2 pr-4 pb-2 pl-4">
              Get Started <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
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
            <li><a href="#pricing" className="mobile-link block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Pricing</a></li>
          </ul>
          <a href="#cta" className="mobile-link mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/10 transition-colors">
            Get Started <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </aside>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto pt-16 pb-36 px-8 lg:px-20 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/60 via-transparent to-[hsl(var(--background))]" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          {/* Left - text + CTAs */}
          <div className="text-center lg:text-left lg:flex-1 max-w-3xl">
            <h1 className="text-[52px] leading-[0.95] sm:text-7xl lg:text-[90px] font-medium text-zinc-100 tracking-tighter font-geist text-left mt-20" style={{ maskImage: 'linear-gradient(290deg, transparent, black 0%, black 40%, transparent)', WebkitMaskImage: 'linear-gradient(290deg, transparent, black 0%, black 40%, transparent)' }}>Fund and build your dream business.</h1>
            
            <p className="text-lg sm:text-xl text-zinc-400 mt-6 max-w-xl text-left leading-relaxed">
              Get <span className="text-white font-semibold">$150K+</span> in business funding, fix your credit, and master the digital economy—all in one place.
            </p>

            <div className="flex flex-wrap xl:mt-10 mt-8 gap-x-3 gap-y-3 justify-start">
              <div className="inline-block bg-transparent">
                <button className="shiny-cta focus:outline-none">
                  <span>Get Started</span>
                </button>
              </div>
              <a href="#showcase" className="inline-flex items-center gap-2 hover:bg-white/10 transition-colors text-sm text-white bg-white/5 ring-white/10 ring-1 rounded-full px-6 py-4 font-medium">
                Watch Success Stories
              </a>
            </div>
          </div>
          {/* Right - portrait */}
          <div className="relative lg:flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
              <img
                src={heroPortrait}
                alt="Portrait"
                className="relative z-10 w-full max-w-md object-contain"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="sm:px-6 lg:px-8 lg:pt-6 max-w-7xl z-10 mt-8 mr-auto mb-16 ml-auto pt-16 pr-4 pb-6 pl-4 relative">
        <div className="text-center">
          <p className="uppercase text-sm font-medium text-slate-400 tracking-wide">
            EMPOWERING ENTREPRENEURS AT
          </p>
        </div>
        <div className="overflow-hidden mt-6 relative">
          <div style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <div className="flex carousel-wrapper gap-x-6 lg:gap-x-20">
              <div className="flex gap-6 shrink-0 gap-x-6 lg:gap-x-20">
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e5f2922d-4fb6-4f7c-8795-cd9ba63105a4_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/92287bc0-bc70-4864-bf05-a89c1b99a218_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8284c62f-bfed-4d35-aaa2-956d0a8969b3_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[120px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3764a6eb-78e1-495f-9143-c85a648446c4_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[120px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dea31d52-7076-423f-bace-53eeec3014d3_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b16a9cf6-6be1-4d0d-bc63-07a471092998_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
              </div>
              <div className="flex shrink-0 gap-x-6 lg:gap-x-20">
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e5f2922d-4fb6-4f7c-8795-cd9ba63105a4_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/92287bc0-bc70-4864-bf05-a89c1b99a218_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8284c62f-bfed-4d35-aaa2-956d0a8969b3_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[100px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3764a6eb-78e1-495f-9143-c85a648446c4_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[100px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dea31d52-7076-423f-bace-53eeec3014d3_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
                <a href="#" className="inline-flex items-center justify-center bg-center mix-blend-screen w-[150px] h-[40px] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b16a9cf6-6be1-4d0d-bc63-07a471092998_1600w.png)] bg-cover rounded-lg transition-transform hover:scale-110"></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital on your terms section */}
      <section className="sm:pt-24 md:pt-10 max-w-7xl mr-auto ml-auto pt-24 pb-20 relative" id="services">
        <div className="max-w-7xl mr-auto ml-auto pr-6 pl-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-white tracking-tighter text-left pt-6 pb-6 sm:text-5xl" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)' }}>Capital on your terms</h2>
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
          <h2 className="text-2xl font-medium text-white tracking-tighter text-left mb-0 sm:text-5xl" style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)' }}>A complete wealth ecosystem</h2>

          <section className="mt-10 mb-20 pt-0 pb-0 relative">
            <div className="sm:px-6 lg:px-8 lg:pt-8 max-w-full pt-16 pr-4 pb-16 pl-4">
              
              <div className="rounded-2xl mt-10 backdrop-blur" style={{ maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 border-white/10 border-b" style={{ maskImage: 'linear-gradient(0deg, transparent, black 0%, black 100%, transparent)', WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 100%, transparent)' }}>
                  <div className="hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" style={{ maskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)' }}>
                    <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
                    </div>
                    <h3 className="text-lg text-white">The Vault</h3>
                    <p className="text-sm text-zinc-400 mt-1">Personal & Business Credit Optimization</p>
                  </div>
                  <div className="md:border-l md:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" style={{ maskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)' }}>
                    <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">The Network</h3>
                    <p className="text-sm text-zinc-400 mt-1">Direct access to alternative high-limit lenders</p>
                  </div>
                  <div className="md:border-l md:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" style={{ maskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)', WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)' }}>
                    <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 3v18h18"></path><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">The Academy</h3>
                    <p className="text-sm text-zinc-400 mt-1">Exclusive Skool community for digital entrepreneurs</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="md:border-r md:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" style={{ maskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)' }}>
                    <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Digital Assets</h3>
                    <p className="text-sm text-zinc-400 mt-1">DIY kits, automation tools, and scaling blueprints</p>
                  </div>
                  <div className="hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" style={{ maskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)' }}>
                    <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Expert Support</h3>
                    <p className="text-sm text-zinc-400 mt-1">1-on-1 guidance from funding strategists</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/286dcc4a-3b11-43d3-af80-a7b1c3aaaad1_800w.webp" alt="The Startup Launch" className="group-hover:grayscale-0 transition-all duration-300 w-full h-[224px] object-cover grayscale" />
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
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/bb9b217e-05c2-4e6e-8f35-3fcb7f5b5e0c_800w.webp" alt="The Credit Pivot" className="w-full h-[224px] object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
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
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a59cef23-182d-4015-9d64-9748fcf818c3_800w.webp" alt="The Digital Empire" className="w-full h-[224px] object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
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

      {/* Pricing section */}
      <section className="overflow-hidden mt-40 mb-40 pt-24 pb-24 relative" id="pricing">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

        <div className="max-w-7xl mr-auto ml-auto pr-6 pl-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6" style={{ maskImage: 'linear-gradient(to bottom, white 40%, rgba(255,255,255,0.5))', WebkitMaskImage: 'linear-gradient(to bottom, white 40%, rgba(255,255,255,0.5))' }}>
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-400">
              Start for free, upgrade when you need more power. No hidden fees.
            </p>

            <div className="mt-10 flex items-center justify-center">
              <div className="flex cursor-pointer bg-white/5 border-white/10 border rounded-full pt-1 pr-1 pb-1 pl-1 relative items-center hover:bg-white/10 transition-colors" id="billing-toggle-container">
                <span className="px-4 py-1 rounded-full text-sm font-medium text-white transition-colors" data-plan="monthly">Monthly</span>
                <span className="px-4 py-1 rounded-full text-sm font-medium text-slate-400 transition-colors" data-plan="yearly">Yearly</span>
                <div className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full -z-10 transition-transform duration-300 ease-out bg-indigo-500" id="toggle-indicator" style={{ transform: 'translateX(0)' }}></div>
              </div>
              <span className="ml-4 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                Save 20%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Starter Plan */}
            <div className="group transition-all duration-500 hover:border-white/20 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 border-white/10 border ring-white/5 ring-1 rounded-2xl pt-8 pr-8 pb-8 pl-8 relative">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white">Starter</h3>
                <p className="text-sm text-slate-400 mt-2">The DIYer — perfect for getting started.</p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-medium text-white tracking-tight">$0</span>
                <span className="text-slate-500">/mo</span>
              </div>
              
              <div className="mt-8 mb-8 space-y-4">
                <div className="flex gap-3 text-sm text-slate-300 gap-x-3 gap-y-3 items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Funding Assessment</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Weekly Newsletter</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Community Access</span>
                </div>
              </div>
              <a href="#" className="flex items-center justify-center hover:bg-white/10 transition-colors text-sm font-medium text-white bg-white/5 w-full border-white/10 border rounded-full pt-3 pb-3">
                Join for Free
              </a>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="group relative overflow-hidden transition-all duration-500 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 border-white/10 border ring-white/5 ring-1 rounded-2xl p-8 shadow-2xl hover:border-indigo-500/30 hover:ring-indigo-500/20 shadow-indigo-900/10">
              
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-tr from-violet-500/30 to-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-110 via-indigo-500/20"></div>
              <div className="absolute -top-8 -left-8 bg-gradient-to-br via-violet-500/15 to-transparent w-40 h-40 rounded-full blur-2xl from-indigo-500/25"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">Pro</h3>
                    <p className="text-sm mt-2 text-indigo-200/70">The Scaler — for serious entrepreneurs.</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white shadow-lg bg-indigo-600 shadow-indigo-500/30">
                    Popular
                  </span>
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-medium text-white tracking-tight pricing-amount" data-monthly="97" data-yearly="78">$97</span>
                  <span className="text-slate-400 pricing-period">/mo</span>
                </div>
                
                <div className="mt-8 mb-8 space-y-4">
                  <div className="flex gap-3 text-sm text-white gap-x-3 gap-y-3 items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-indigo-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Full Skool Academy</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-indigo-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Credit Repair Blueprints</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-indigo-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Digital Product Library</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-indigo-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Group Coaching</span>
                  </div>
                </div>
                <a href="#" className="flex items-center justify-center hover:bg-slate-200 transition-colors shadow-white/10 text-sm font-medium text-black bg-white w-full rounded-full pt-3 pb-3 shadow-lg">
                  Join the Academy
                </a>
              </div>
            </div>

            {/* Business Plan */}
            <div className="relative group rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 ring-1 ring-white/5 p-8 transition-all duration-500 hover:border-white/20">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white">Business</h3>
                <p className="text-sm text-slate-400 mt-2">The Elite — done-for-you funding.</p>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-medium text-white tracking-tight">Custom</span>
              </div>
              
              <div className="mt-8 mb-8 space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Done-For-You Funding ($150k+ Goal)</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>1-on-1 Credit Concierge</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Priority Lender Access</span>
                </div>
              </div>
              <a href="#" className="flex items-center justify-center hover:bg-white/10 transition-colors text-sm font-medium text-white bg-white/5 w-full border-white/10 border rounded-full pt-3 pb-3">
                Speak to a Specialist
              </a>
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
