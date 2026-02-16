import { useEffect } from "react";
import { Shield, DollarSign, Users } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import heroPortrait from "@/assets/hero-portrait.png";
import asSeenOn from "@/assets/as-seen-on.png";
import geneRylandAbout from "@/assets/gene-ryland-about.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import Counter from "@/components/funding-visuals/Counter";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import Footer from "@/components/Footer";

const About = () => {
  useEffect(() => {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => mobileMenu?.classList.add('open');
    const closeMenu = () => mobileMenu?.classList.remove('open');

    menuBtn?.addEventListener('click', openMenu);
    closeMenuBtn?.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

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
        .nav-link::after { content: ''; position: absolute; left: 0; top: 100%; width: 0; height: 2px; background: #3b82f6; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-out, visibility 0s 0.3s; visibility: hidden; }
        .mobile-menu.open { transform: translateX(0); visibility: visible; transition: transform 0.3s ease-out, visibility 0s 0s; }

        .gradient-blur {
          position: fixed; z-index: 5; inset: 0 0 auto 0; height: 12%; pointer-events: none;
        }
        .gradient-blur>, .gradient-blur::before, .gradient-blur::after { position: absolute; inset: 0; }
        .gradient-blur::before { content: ""; z-index: 1; backdrop-filter: blur(0.5px); mask: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%); }
        .gradient-blur>div:nth-of-type(1) { z-index: 2; backdrop-filter: blur(1px); mask: linear-gradient(to top, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%); }
        .gradient-blur>div:nth-of-type(2) { z-index: 3; backdrop-filter: blur(2px); mask: linear-gradient(to top, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%); }
        .gradient-blur>div:nth-of-type(3) { z-index: 4; backdrop-filter: blur(4px); mask: linear-gradient(to top, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%); }
        .gradient-blur>div:nth-of-type(4) { z-index: 5; backdrop-filter: blur(8px); mask: linear-gradient(to top, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%); }
        .gradient-blur>div:nth-of-type(5) { z-index: 6; backdrop-filter: blur(16px); mask: linear-gradient(to top, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%); }
        .gradient-blur>div:nth-of-type(6) { z-index: 7; backdrop-filter: blur(32px); mask: linear-gradient(to top, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%); }
        .gradient-blur::after { content: ""; z-index: 8; backdrop-filter: blur(64px); mask: linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%); }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
        @property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-percent { syntax: "<percentage>"; initial-value: 20%; inherits: false; }
        @property --gradient-shine { syntax: "<color>"; initial-value: #8484ff; inherits: false; }

        .shiny-cta {
          --gradient-angle: 0deg; --gradient-angle-offset: 0deg; --gradient-percent: 20%; --gradient-shine: #8484ff; --shadow-size: 2px;
          position: relative; overflow: hidden; border-radius: 9999px; padding: 1.25rem 2.5rem; font-size: 1.125rem; line-height: 1.2; font-weight: 500; color: #ffffff;
          background: linear-gradient(#003A70, #0060A9) padding-box, conic-gradient(from calc(var(--gradient-angle) - var(--gradient-angle-offset)), transparent 0%, #3b82f6 5%, var(--gradient-shine) 15%, #3b82f6 30%, transparent 40%, transparent 100%) border-box;
          border: 2px solid transparent; box-shadow: inset 0 0 0 1px #1e293b; outline: none;
          transition: --gradient-angle-offset 800ms cubic-bezier(0.25,1,0.5,1), --gradient-percent 800ms cubic-bezier(0.25,1,0.5,1), --gradient-shine 800ms cubic-bezier(0.25,1,0.5,1), box-shadow 0.3s;
          cursor: pointer; isolation: isolate; outline-offset: 4px; font-family: 'Inter','Helvetica Neue',sans-serif; z-index: 0; animation: border-spin 2.5s linear infinite;
        }
        @keyframes border-spin { to { --gradient-angle: 360deg; } }
        .shiny-cta:active { transform: translateY(1px); }
        .shiny-cta::before { content: ''; pointer-events: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); z-index: 0; --size: calc(100% - 6px); --position: 2px; --space: 4px; width: var(--size); height: var(--size); background: radial-gradient(circle at var(--position) var(--position), white 0.5px, transparent 0) padding-box; background-size: var(--space) var(--space); background-repeat: space; mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black); border-radius: inherit; opacity: 0.4; }
        .shiny-cta::after { content: ''; pointer-events: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); z-index: 1; width: 100%; aspect-ratio: 1; background: linear-gradient(-50deg, transparent, #3b82f6, transparent); mask-image: radial-gradient(circle at bottom, transparent 40%, black); opacity: 0.6; animation: shimmer 4s linear infinite; }
        @keyframes shimmer { to { transform: translate(-50%,-50%) rotate(360deg); } }
        .shiny-cta span { position: relative; z-index: 2; display: inline-block; }

        .font-geist { font-family: 'Geist', sans-serif !important; }
        .font-manrope { font-family: 'Manrope', sans-serif !important; }
      `}} />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#ffffff' }}>
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.5)" activeGridColor="rgba(59, 130, 246, 0.8)" />
      </div>

      {/* Gradient blur */}
      <div className="gradient-blur pointer-events-none">
        <div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      {/* NAVBAR */}
      <header className="sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex max-w-7xl mr-auto ml-auto pt-4 pr-4 sm:pr-6 pb-4 pl-4 sm:pl-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/">
              <img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" />
            </a>
          </div>
          <nav className="hidden gap-8 md:flex items-center">
            <a href="/" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</a>
            <a href="/about" className="nav-link relative text-sm text-slate-900 font-medium">About</a>
            <a href="/#services" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Services</a>
            <a href="/#features" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Community</a>
            <a href="/store" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Store</a>
            <a href="/#cta" className="shiny-cta !py-2 !px-5 !text-sm whitespace-nowrap focus:outline-none">
              <span>Contact</span>
            </a>
          </nav>
          <button id="menuBtn" className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
          </button>
        </div>
        <aside className="mobile-menu fixed z-50 bg-white/95 w-[80%] max-w-sm border-slate-200 border-l pt-6 pr-6 pb-6 pl-6 top-0 right-0 bottom-0 backdrop-blur" aria-label="Mobile menu" id="mobileMenu">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Ryland Partners</span>
            <button id="closeMenuBtn" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            <li><a href="/" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Home</a></li>
            <li><a href="/about" className="mobile-link block rounded-lg px-2 py-2 text-slate-900 font-medium hover:bg-slate-100 transition-colors">About</a></li>
            <li><a href="/#services" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Services</a></li>
            <li><a href="/#features" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Community</a></li>
            <li><a href="/store" className="mobile-link block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Store</a></li>
          </ul>
          <a href="/#cta" className="mobile-link mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm ring-1 ring-slate-200 hover:bg-slate-200 text-slate-900 transition-colors">
            Contact <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </aside>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-4 sm:mx-6 lg:mx-auto mt-4 sm:mt-8 pt-10 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-8 lg:px-20 overflow-hidden rounded-2xl border border-[#004E8C]">
        <HlsVideoBackground overlay="bg-[#003A70]/90" />
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          {/* Left */}
          <div className="text-center lg:text-left lg:flex-1 max-w-3xl">
            <h1 className="text-[28px] leading-[0.95] sm:text-[42px] md:text-[52px] lg:text-[64px] font-medium tracking-tighter font-geist text-center lg:text-left mt-4 sm:mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              The Architect of Capital: Bridging the Gap Between Banks and Visionaries
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 mt-4 sm:mt-6 max-w-xl text-center lg:text-left leading-relaxed mx-auto lg:mx-0">
              Helping entrepreneurs unlock capital to build, scale, and grow their businesses.
            </p>
            <div className="flex flex-col mt-6 sm:mt-8 gap-4 items-center lg:items-start">
              <img
                src={asSeenOn}
                alt="As seen on FOX, USA Today, Digital Journal, MarketWatch"
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md brightness-0 invert opacity-60"
              />
            </div>
          </div>
          {/* Right */}
          <div className="relative lg:flex-1 flex justify-center mt-4 lg:mt-0 w-full">
            <div className="relative flex flex-col items-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-md lg:max-w-xl">
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
              <img
                src={geneRylandAbout}
                alt="Gene Ryland — Founder of Ryland Partners"
                className="relative z-10 w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] object-cover drop-shadow-2xl"
              />
              <div className="relative z-10 flex flex-col items-center mt-1 sm:mt-2">
                <h3 className="text-base sm:text-lg font-semibold text-white/90" style={{ fontVariant: 'small-caps', letterSpacing: '0.15em' }}>Gene Ryland</h3>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-blue-300/60 font-medium mt-0.5">CEO &amp; Founder <span className="text-white/25 mx-1">|</span> Business Funding Expert</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-7xl mx-4 sm:mx-6 lg:mx-auto mt-8 sm:mt-12">
        <div className="relative overflow-hidden border border-[#004E8C] rounded-3xl p-6 sm:p-8 md:p-10">
          <HlsVideoBackground overlay="bg-[#003A70]/90" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight">$<Counter target={150} />M+</p>
              <p className="text-xs sm:text-sm text-white/60 mt-1">Funding Secured</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight"><Counter target={10000} prefix="" />+</p>
              <p className="text-xs sm:text-sm text-white/60 mt-1">Entrepreneurs Helped</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight"><Counter target={8} />+</p>
              <p className="text-xs sm:text-sm text-white/60 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight"><Counter target={0} />%</p>
              <p className="text-xs sm:text-sm text-white/60 mt-1">APR Introductory Rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUNDER'S JOURNEY */}
      <section className="max-w-4xl mx-auto px-6 mt-20 sm:mt-32 mb-20 sm:mb-32">
        <p className="text-xs sm:text-sm text-slate-500 mb-4 text-center">The Story</p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-slate-900 mb-8 text-center" style={{ maskImage: 'linear-gradient(to bottom, black 40%, rgba(0,0,0,0.5))', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, rgba(0,0,0,0.5))' }}>
          The Founder's Journey
        </h2>
        <div className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
          <p>
            Gene Ryland is a serial entrepreneur and business funding strategist who has dedicated his career to helping founders unlock the capital they need to scale. With deep expertise in credit optimization, alternative lending, and strategic financial positioning, Gene has built Ryland Partners into a trusted name in the funding space.
          </p>
          <p>
            After experiencing firsthand how traditional banks overlook ambitious entrepreneurs, Gene created a system that bridges the gap — connecting business owners with high-limit lenders, credit-building strategies, and the education needed to secure six- and seven-figure funding packages.
          </p>
          <p>
            Featured in <span className="font-semibold text-slate-900">FOX</span>, <span className="font-semibold text-slate-900">USA Today</span>, <span className="font-semibold text-slate-900">Digital Journal</span>, and <span className="font-semibold text-slate-900">MarketWatch</span>, Gene's methods have helped over 10,000 entrepreneurs secure more than $150 million in business funding — with no tax returns or revenue required.
          </p>
          <p>
            Today, Gene leads a growing community of funded founders through the Ryland Partners ecosystem — offering done-for-you services, a private academy, and direct lender access that most entrepreneurs never knew existed.
          </p>
        </div>
      </section>

      {/* THE RYLAND PILLARS */}
      <section className="max-w-7xl mx-auto px-6 mb-20 sm:mb-32">
        <p className="text-xs sm:text-sm text-slate-500 mb-4 text-center">Our Approach</p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-slate-900 mb-12 text-center" style={{ maskImage: 'linear-gradient(to bottom, black 40%, rgba(0,0,0,0.5))', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, rgba(0,0,0,0.5))' }}>
          The Ryland Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden border border-[#004E8C] rounded-3xl p-6 sm:p-8 text-white group hover:translate-y-[-2px] transition-transform">
            <HlsVideoBackground overlay="bg-[#003A70]/90" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 mb-6">
                <Shield className="w-6 h-6 text-sky-300" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 font-manrope">Strategic Restoration</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                CROA-compliant credit optimization that removes negative items, disputes inaccuracies, and rebuilds your credit profile. Most clients see significant results within 35–90 days — with no advance fees charged until work is completed.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative overflow-hidden border border-[#004E8C] rounded-3xl p-6 sm:p-8 text-white group hover:translate-y-[-2px] transition-transform">
            <HlsVideoBackground overlay="bg-[#003A70]/90" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 mb-6">
                <DollarSign className="w-6 h-6 text-sky-300" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 font-manrope">Business Funding</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Secure $50K–$250K in business credit lines at 0% introductory APR. No tax returns, no revenue documentation required. Our proprietary lender matching system connects you with Chase, Bank of America, US Bank, Navy Federal, and Truist.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative overflow-hidden border border-[#004E8C] rounded-3xl p-6 sm:p-8 text-white group hover:translate-y-[-2px] transition-transform">
            <HlsVideoBackground overlay="bg-[#003A70]/90" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 mb-6">
                <Users className="w-6 h-6 text-sky-300" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 font-manrope">Private Community</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Join our exclusive Skool platform where funded entrepreneurs learn to invest their capital into high-ROI digital businesses. Includes live training sessions, networking with like-minded founders, and ongoing mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden my-10 relative">
        <div className="max-w-7xl mr-auto ml-auto pr-0 pb-24 pl-0">
            <div className="relative overflow-hidden md:p-10 max-w-7xl border border-[#004E8C] rounded-3xl mr-auto ml-auto pt-6 pr-6 pb-6 pl-6 shadow-2xl text-white">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
            <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_1fr] md:p-12 pt-8 pr-8 pb-8 pl-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">Ready to Scale?</h3>
                <p className="mt-2 max-w-prose text-slate-200">Join thousands of entrepreneurs building their future with Ryland Partners.</p>
                <div className="mt-5 flex gap-3 flex-wrap">
                  <a href="/" className="hover:shadow-lg transition-shadow text-sm font-medium text-slate-900 bg-white rounded-full pt-3 pr-5 pb-3 pl-5 shadow">Get Funded</a>
                  <a href="/partners" className="hover:bg-white/5 transition-colors text-sm text-white border-white/20 border rounded-full pt-3 pr-5 pb-3 pl-5">Become A Partner</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
