import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
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
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; opacity: 0; }

        .gradient-blur {
          position: fixed; z-index: 5; inset: 0 0 auto 0; height: 12%; pointer-events: none;
        }
        .gradient-blur>div, .gradient-blur::before, .gradient-blur::after { position: absolute; inset: 0; }
        .gradient-blur::before { content: ""; z-index: 1; backdrop-filter: blur(0.5px); mask: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%); }
        .gradient-blur>div:nth-of-type(1) { z-index: 2; backdrop-filter: blur(1px); mask: linear-gradient(to top, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%); }
        .gradient-blur>div:nth-of-type(2) { z-index: 3; backdrop-filter: blur(2px); mask: linear-gradient(to top, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%); }
        .gradient-blur>div:nth-of-type(3) { z-index: 4; backdrop-filter: blur(4px); mask: linear-gradient(to top, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%); }
        .gradient-blur>div:nth-of-type(4) { z-index: 5; backdrop-filter: blur(8px); mask: linear-gradient(to top, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%); }
        .gradient-blur>div:nth-of-type(5) { z-index: 6; backdrop-filter: blur(16px); mask: linear-gradient(to top, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%); }
        .gradient-blur>div:nth-of-type(6) { z-index: 7; backdrop-filter: blur(32px); mask: linear-gradient(to top, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%); }
        .gradient-blur::after { content: ""; z-index: 8; backdrop-filter: blur(64px); mask: linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%); }

        .font-geist { font-family: 'Geist', sans-serif !important; }
        .font-manrope { font-family: 'Manrope', sans-serif !important; }

        .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-out; }
        .mobile-menu.open { transform: translateX(0); }
      `}} />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)' }}>
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.08)" activeGridColor="rgba(6, 182, 212, 0.6)" />
      </div>

      {/* Gradient blur */}
      <div className="gradient-blur pointer-events-none">
        <div /><div /><div /><div /><div /><div />
      </div>

      {/* NAVBAR */}
      <header className="sticky z-20 top-0">
        <div className="flex max-w-7xl mx-auto pt-4 px-6 pb-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-sm text-slate-300 hover:text-white transition-colors">Home</Link>
            <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">FAQ</a>
            <a href="#cta" className="inline-flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white text-sm font-medium rounded-full py-2.5 px-6 transition-all shadow-lg shadow-blue-500/25">
              Become A Partner
            </a>
          </nav>
          <button onClick={() => setMobileOpen(true)} className="md:hidden rounded-lg p-2 text-slate-200 hover:bg-white/5 transition-colors" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* Mobile drawer */}
        <aside className={`mobile-menu fixed z-50 bg-slate-950/95 w-[80%] max-w-sm border-white/10 border-l p-6 top-0 right-0 bottom-0 backdrop-blur ${mobileOpen ? 'open' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Ryland Partners</span>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-200 hover:bg-white/5 transition-colors" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            <li><Link to="/" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Home</Link></li>
            <li><a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#faq" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#cta" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 text-white text-center font-medium transition-colors">Become A Partner</a></li>
          </ul>
        </aside>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative max-w-7xl mx-auto pt-16 pb-36 px-8 lg:px-20 overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
            <source src="https://storage.googleapis.com/msgsndr/FuOewPgnMEW1CaeIftBR/media/698a6cea7f6dcf137c9c099c.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-2xl" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-[38px] leading-[0.95] sm:text-[52px] lg:text-[64px] font-medium tracking-tighter font-geist text-left mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 animate-fade-in-up">
            Get Paid To Help Business Owners Access The Capital They Need To Scale
          </h1>
          <p className="mt-5 text-lg md:text-xl text-blue-300/90 font-medium italic text-left animate-fade-in-up animate-delay-200">
            even if they don't take the funding
          </p>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-xl text-left leading-relaxed animate-fade-in-up animate-delay-200">
            Welcome to the Ryland Partners Program. Ready to start earning?
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10 animate-fade-in-up animate-delay-300">
            <a href="#cta" className="inline-flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white text-base font-semibold rounded-full py-4 px-10 transition-all shadow-lg shadow-blue-500/25">
              Become A Partner Now
            </a>
            <a href="#" className="inline-flex items-center justify-center border border-white/20 hover:bg-white/5 text-white text-base font-medium rounded-full py-4 px-10 transition-all">
              Partner Login
            </a>
          </div>
        </div>
      </section>

      {/* ===================== VALUE PILLARS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: DollarSign, title: "Get Paid For Introductions", desc: "You don't need to close the deal. Just refer a business that qualifies for funding — and you get paid. It's fast, easy, and completely hands-off." },
            { icon: LineChart, title: "$10M+ Funded And Counting", desc: "Backed by real results and proven infrastructure. You'll get full support, access to our marketing system, and earn unlimited commissions." },
            { icon: Handshake, title: "Strengthen Your Network", desc: "Help people in your network get the capital they need — and profit while doing it. Position yourself as the go-to person for business funding." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                <item.icon className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS / COPY BLOCK ===================== */}
      <section className="max-w-4xl mx-auto px-6 pb-24" id="how-it-works">
        <div className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-8 md:p-12">
          <h2 className="font-manrope text-2xl md:text-3xl font-bold text-white mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
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
      </section>

      {/* ===================== 3-STEP PROCESS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
          Monetize Your Network In 3 Simple Steps
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">Follow our proven system and start earning commissions with zero selling.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", icon: Link2, title: "Get Your Partner Link", desc: "Apply and get approved. You'll receive your unique referral link — the engine of your money-making machine." },
            { step: "02", icon: Share2, title: "Refer Business Owners", desc: "Follow our proven step-by-step strategy. Our trainings, live calls, and done-for-you marketing assets guide you to maximize profits." },
            { step: "03", icon: Wallet, title: "Get Paid", desc: "You get paid for every client you refer who qualifies. Even if they don't take the funding — you still keep your share." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-8 relative">
              <span className="absolute top-4 right-5 text-4xl font-bold text-white/5 font-manrope">{item.step}</span>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                <item.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== PERFECT FOR GRID ===================== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
          The Ryland Partners Program Is Perfect For
        </h2>
        <p className="text-center text-slate-400 mb-12">Professionals who already have a network of business owners.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {personas.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-5 flex flex-col items-center text-center gap-3 hover:bg-white/[0.06] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                <p.icon className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-slate-200">{p.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-400 mt-8 text-sm font-medium">OR anyone who knows business owners!</p>
        <div className="text-center mt-8">
          <a href="#cta" className="inline-flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white text-base font-semibold rounded-full py-4 px-10 transition-all shadow-lg shadow-blue-500/25">
            Become A Partner Now
          </a>
        </div>
      </section>

      {/* ===================== SUPPORT & RESOURCES ===================== */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            We Provide All The Direction, Guidance & Support You Need
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">Everything you need to succeed as a Ryland Partner.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Done-For-You Marketing Assets", desc: "We hand you ad creatives, email swipes, templates, and PDFs. Just plug, play, and start earning." },
              { icon: Video, title: "Live Monthly Trainings", desc: "Join monthly trainings with ongoing support. Never feel stuck — we'll guide you step-by-step." },
              { icon: CreditCard, title: "Get Paid Fast & On Time", desc: "Most partners start seeing commissions within just a few days — not weeks. Quick results keep your momentum going." },
              { icon: MessagesSquare, title: "Community Support", desc: "Join our members-only community where you can share wins, ask questions, and stay connected." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EASIEST MONEY CTA ===================== */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-8 md:p-12 text-center">
          <h2 className="font-manrope text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            This Is The Easiest Money You've Never Made
          </h2>
          <div className="space-y-3 text-slate-300 text-base max-w-lg mx-auto mb-8">
            <p>And the business owners you know? <span className="text-white font-medium">They already need this!</span></p>
            <p>You already know the business owners.</p>
            <p>They already trust you.</p>
            <p>You just need a partner link to send over to them.</p>
          </div>
          <a href="#cta" className="inline-flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white text-base font-semibold rounded-full py-4 px-10 transition-all shadow-lg shadow-blue-500/25">
            Become A Partner Now
          </a>
        </div>
      </section>

      {/* ===================== HOW WE SERVICE REFERRALS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
          Here Is How We Service The Business Owners You Refer
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">A seamless experience for your referrals — from application to funded.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", icon: UserCheck, title: "Get Approved", desc: "The businesses you refer fill out a quick questionnaire and get approved in less than 2 minutes." },
            { step: "02", icon: LineChart, title: "Find The Best Terms", desc: "They choose terms tailored to their budget so they can comfortably manage their funding." },
            { step: "03", icon: DollarSign, title: "Ready To Scale", desc: "They can immediately access funds up to $250,000 after linking their business checking account." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm p-8 relative">
              <span className="absolute top-4 right-5 text-4xl font-bold text-white/5 font-manrope">{item.step}</span>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                <item.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-5 text-center">
          <p className="text-blue-300 font-medium">And remember, as long as they qualify (even if they don't take the funding), <span className="text-white font-semibold">you get paid!</span></p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="max-w-3xl mx-auto px-6 pb-24" id="faq">
        <h2 className="font-manrope text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-white/10 ring-1 ring-white/5 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="overflow-hidden my-10 relative" id="cta">
        <div className="text-white max-w-7xl mx-auto px-0 pb-24">
          <div className="md:p-10 bg-zinc-500/5 max-w-7xl border-white/10 border rounded-3xl ring-white/10 ring-1 mx-auto p-6 shadow-2xl backdrop-blur-xl" style={{ maskImage: 'linear-gradient(150deg, transparent, black 0%, black 60%, transparent)', WebkitMaskImage: 'linear-gradient(150deg, transparent, black 0%, black 60%, transparent)' }}>
            <div className="md:p-12 p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Click Below. Become A Partner. Get Paid To Be A Connector.</h3>
              <p className="mt-2 max-w-prose text-slate-300 mx-auto mb-8">Join thousands of partners already earning commissions with Ryland Partners.</p>
              <a href="#" className="inline-flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white text-lg font-semibold rounded-full py-4 px-12 transition-all shadow-lg shadow-blue-500/25">
                Start Earning Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-white/10 border-t pt-16 pb-10" style={{ maskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
              </Link>
              <p className="text-sm text-slate-400 max-w-xs">Empowering entrepreneurs with capital, credit, and community.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Funding</Link></li>
                <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Credit</Link></li>
                <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Academy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Results</Link></li>
                <li><Link to="/partners" className="text-sm text-slate-400 hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Ryland Partners. All rights reserved.</p>
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

export default Partners;
