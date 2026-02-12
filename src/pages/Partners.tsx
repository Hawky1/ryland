import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import Footer from "@/components/Footer";
import {
  DollarSign, ShieldCheck, Users, Handshake, Calendar,
  Link2, Share2, Wallet, Megaphone, GraduationCap, Clock,
  HeartHandshake, Briefcase, Calculator, LineChart, UserCheck,
  Building2, Home, ChevronDown, Menu, X, CheckCircle2, FileText,
  Video, CreditCard, MessagesSquare
} from "lucide-react";

const Partners = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { q: "Do I get paid even if the business owner doesn't take the funding?", a: "Yes! As long as the business owner you refer qualifies for our funding, you get paid — even if they decide not to take the funding. You're rewarded for the introduction, not the close." },
    { q: "How much can I earn per qualified referral?", a: "Earnings vary based on the funding amount and product type. Our partner team will walk you through the commission structure during onboarding. There's no cap on what you can earn." },
    { q: "How do I know if someone qualifies?", a: "Generally, a business owner qualifies if they have an active business with consistent revenue. Once they complete a short questionnaire, we handle the rest and let you know." },
    { q: "Is this program only for professional affiliates?", a: "Not at all. Whether you're a credit repair business owner, consultant, coach, or just someone who knows business owners — you're welcome to apply." },
    { q: "What tools and support do I get?", a: "You'll receive done-for-you marketing assets, email templates, ad creatives, live monthly trainings, and access to our private partner community." },
    { q: "How and when do I get paid?", a: "Commissions are paid on a regular schedule. Most partners see their first commission within days of their referral qualifying." },
    { q: "Is there any cost to join?", a: "No. The Ryland Partners program is completely free to join. There are no hidden fees or upfront costs." },
    { q: "How do I contact the partner team?", a: "Once you're approved, you'll have direct access to our partner support team. You can also reach us through the partner portal or community." },
  ];

  const personas = [
    { icon: ShieldCheck, label: "Credit Repair Business Owners" },
    { icon: Megaphone, label: "Marketing Agency Owners" },
    { icon: Calculator, label: "Accountants" },
    { icon: Briefcase, label: "Consultants" },
    { icon: LineChart, label: "Financial Advisors" },
    { icon: GraduationCap, label: "Business Coaches" },
    { icon: Users, label: "Community Builders" },
    { icon: Building2, label: "Real Estate Agents" },
  ];

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; opacity: 0; }

        .font-geist { font-family: 'Geist', sans-serif !important; }
        .font-manrope { font-family: 'Manrope', sans-serif !important; }

        .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-out, visibility 0s 0.3s; visibility: hidden; }
        .mobile-menu.open { transform: translateX(0); visibility: visible; transition: transform 0.3s ease-out, visibility 0s 0s; }

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
      `}} />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#ffffff' }}>
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.20)" activeGridColor="rgba(59, 130, 246, 0.45)" />
      </div>

      {/* NAVBAR */}
      <header className="sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex max-w-7xl mx-auto pt-4 px-4 sm:px-6 pb-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <a href="/#services" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Services</a>
            <a href="/#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Community</a>
            <Link to="/store" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Store</Link>
            <Link to="/partners" className="text-sm text-slate-900 font-medium">Partners</Link>
            <a href="#cta" className="shiny-cta !py-2 !px-5 !text-sm whitespace-nowrap focus:outline-none">
              <span>Contact</span>
            </a>
          </nav>
          <button onClick={() => setMobileOpen(true)} className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* Mobile drawer */}
        <aside className={`mobile-menu fixed z-50 bg-white/95 w-[80%] max-w-sm border-slate-200 border-l p-6 top-0 right-0 bottom-0 backdrop-blur ${mobileOpen ? 'open' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Ryland Partners</span>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            <li><Link to="/" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Home</Link></li>
            <li><Link to="/about" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">About</Link></li>
            <li><a href="/#services" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Services</a></li>
            <li><a href="/#features" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Community</a></li>
            <li><Link to="/store" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Store</Link></li>
            <li><Link to="/partners" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-900 font-medium hover:bg-slate-100 transition-colors">Partners</Link></li>
          </ul>
          <a href="#cta" onClick={() => setMobileOpen(false)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm ring-1 ring-slate-200 hover:bg-slate-200 text-slate-900 transition-colors">
            Contact <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </aside>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative max-w-7xl mx-4 sm:mx-6 lg:mx-auto pt-12 sm:pt-16 pb-20 sm:pb-36 px-4 sm:px-8 lg:px-20 overflow-hidden rounded-2xl border border-[#004E8C]">
        <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-2xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-[38px] leading-[0.95] sm:text-[52px] lg:text-[64px] font-medium tracking-tighter font-geist mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 animate-fade-in-up">
            Get Paid To Help Business Owners Access The Capital They Need To Scale
          </h1>
          <p className="mt-5 text-lg md:text-xl text-blue-300/90 font-medium italic animate-fade-in-up animate-delay-200">
            even if they don't take the funding
          </p>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Welcome to the Ryland Partners Program. Ready to start earning?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up animate-delay-300">
            <a href="#cta" className="shiny-cta !py-4 !px-10 !text-lg">
              <span>Become A Partner Now</span>
            </a>
            <a href="#" className="inline-flex items-center justify-center border border-white/20 hover:bg-white/5 text-white text-base font-medium rounded-full py-4 px-10 transition-all">
              Partner Login
            </a>
          </div>
        </div>
      </section>

      {/* ===================== VALUE PILLARS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: DollarSign, title: "Get Paid For Introductions", desc: "You don't need to close the deal. Just refer a business that qualifies for funding — and you get paid. It's fast, easy, and completely hands-off." },
            { icon: LineChart, title: "$10M+ Funded And Counting", desc: "Backed by real results and proven infrastructure. You'll get full support, access to our marketing system, and earn unlimited commissions." },
            { icon: Handshake, title: "Strengthen Your Network", desc: "Help people in your network get the capital they need — and profit while doing it. Position yourself as the go-to person for business funding." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-8 text-center text-white">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
              <div className="relative z-10">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <item.icon className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS / COPY BLOCK ===================== */}
      <section className="max-w-4xl mx-auto px-6 pb-24" id="how-it-works">
        <div className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-8 md:p-12 text-white">
          <HlsVideoBackground overlay="bg-[#003A70]/90" />
          <div className="relative z-10">
            <h2 className="font-manrope text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Here's How Ryland Partners Is Going To Turn Your Connections Into Commissions
            </h2>
            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>Most affiliate programs only pay you if someone buys. If a deal closes. If they say yes.</p>
              <p className="text-white font-medium">Not us.</p>
              <p>We'll put money in your pocket as soon as your referral qualifies — not when they fund.</p>
              <p>If you want to bring in extra cash without:</p>
              <ul className="space-y-2 pl-1">
                {["Hard selling anyone", "Spending time on funnels, sales, or tech", "Chasing commissions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold text-lg pt-2">The Ryland Partners Program Is Perfect For You…</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 3-STEP PROCESS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">
          Monetize Your Network In 3 Simple Steps
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">Follow our proven system and start earning commissions with zero selling.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", icon: Link2, title: "Get Your Partner Link", desc: "Apply and get approved. You'll receive your unique referral link — the engine of your money-making machine." },
            { step: "02", icon: Share2, title: "Refer Business Owners", desc: "Follow our proven step-by-step strategy. Our trainings, live calls, and done-for-you marketing assets guide you to maximize profits." },
            { step: "03", icon: Wallet, title: "Get Paid", desc: "You get paid for every client you refer who qualifies. Even if they don't take the funding — you still keep your share." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-8 text-white">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
              <div className="relative z-10">
                <span className="absolute top-4 right-5 text-4xl font-bold text-white/5 font-manrope">{item.step}</span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <item.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== PERFECT FOR GRID ===================== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">
          The Ryland Partners Program Is Perfect For
        </h2>
        <p className="text-center text-slate-500 mb-12">Professionals who already have a network of business owners.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {personas.map((p, i) => (
            <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-5 flex flex-col items-center text-center gap-3">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <p.icon className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-white">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-8 text-sm font-medium">OR anyone who knows business owners!</p>
        <div className="text-center mt-8">
          <a href="#cta" className="shiny-cta !py-4 !px-10 !text-lg">
            <span>Become A Partner Now</span>
          </a>
        </div>
      </section>

      {/* ===================== SUPPORT & RESOURCES ===================== */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">
            We Provide All The Direction, Guidance & Support You Need
          </h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">Everything you need to succeed as a Ryland Partner.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Done-For-You Marketing Assets", desc: "We hand you ad creatives, email swipes, templates, and PDFs. Just plug, play, and start earning." },
              { icon: Video, title: "Live Monthly Trainings", desc: "Join monthly trainings with ongoing support. Never feel stuck — we'll guide you step-by-step." },
              { icon: CreditCard, title: "Get Paid Fast & On Time", desc: "Most partners start seeing commissions within just a few days — not weeks. Quick results keep your momentum going." },
              { icon: MessagesSquare, title: "Community Support", desc: "Join our members-only community where you can share wins, ask questions, and stay connected." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-6 text-white">
                <HlsVideoBackground overlay="bg-[#003A70]/90" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                    <item.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EASIEST MONEY CTA ===================== */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-8 md:p-12 text-center text-white">
          <HlsVideoBackground overlay="bg-[#003A70]/90" />
          <div className="relative z-10">
            <h2 className="font-manrope text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              This Is The Easiest Money You've Never Made
            </h2>
            <div className="space-y-3 text-slate-300 text-base max-w-lg mx-auto mb-8">
              <p>And the business owners you know? <span className="text-white font-medium">They already need this!</span></p>
              <p>You already know the business owners.</p>
              <p>They already trust you.</p>
              <p>You just need a partner link to send over to them.</p>
            </div>
            <a href="#cta" className="shiny-cta !py-4 !px-10 !text-lg">
              <span>Become A Partner Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===================== HOW WE SERVICE REFERRALS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 text-slate-900">
          Here Is How We Service The Business Owners You Refer
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">A seamless experience for your referrals — from application to funded.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", icon: UserCheck, title: "Get Approved", desc: "The businesses you refer fill out a quick questionnaire and get approved in less than 2 minutes." },
            { step: "02", icon: LineChart, title: "Find The Best Terms", desc: "They choose terms tailored to their budget so they can comfortably manage their funding." },
            { step: "03", icon: DollarSign, title: "Ready To Scale", desc: "They can immediately access funds up to $250,000 after linking their business checking account." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-8 text-white">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
              <div className="relative z-10">
                <span className="absolute top-4 right-5 text-4xl font-bold text-white/5 font-manrope">{item.step}</span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <item.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-50 p-5 text-center">
          <p className="text-blue-700 font-medium">And remember, as long as they qualify (even if they don't take the funding), <span className="text-blue-900 font-semibold">you get paid!</span></p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="max-w-3xl mx-auto px-6 pb-24" id="faq">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="relative z-10 w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-zinc-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="relative z-10 px-5 pb-5">
                  <p className="text-sm text-zinc-300 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="overflow-hidden my-10 relative" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="border border-[#004E8C] rounded-3xl shadow-2xl text-white relative overflow-hidden">
            <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-3xl" />

            <div className="relative z-10 text-center mx-auto max-w-3xl py-16 px-6 md:py-24 md:px-16">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
                Click Below. Become A Partner. Get Paid To Be A Connector.
              </h3>
              <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Join thousands of partners already earning commissions with Ryland Partners. No cost to join. No selling required.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#" className="shiny-cta !py-4 !px-10 !text-lg">
                  <span>Start Earning Now</span>
                </a>
                <a href="#faq" className="hover:bg-white/10 transition-colors text-base text-white border-white/20 border rounded-full py-3 px-6">
                  Read FAQs
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M20 6 9 17l-5-5"/></svg>
                  100% free to join
                </span>
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M20 6 9 17l-5-5"/></svg>
                  Get paid even if they don't fund
                </span>
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M20 6 9 17l-5-5"/></svg>
                  No cap on earnings
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
