import { motion } from "framer-motion";
import { CheckCircle2, DollarSign, Clock, Shield, TrendingUp, Building2, CreditCard, FileText } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoWhite from "@/assets/logo-white.png";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import Footer from "@/components/Footer";
import InfiniteGrid from "@/components/ui/infinite-grid";

const FUNDING_TIERS = [
  { range: "$50K – $100K", label: "Starter", desc: "Perfect for launching or expanding marketing efforts", color: "from-blue-400 to-cyan-400" },
  { range: "$100K – $150K", label: "Growth", desc: "Scale operations, hire, and invest in inventory", color: "from-cyan-400 to-blue-500" },
  { range: "$150K – $250K+", label: "Enterprise", desc: "Major expansion, acquisitions, and multi-channel scaling", color: "from-blue-500 to-indigo-500" },
];

const PROCESS_STEPS = [
  { icon: FileText, title: "Free Assessment", desc: "Take our 2-minute quiz to determine your funding eligibility — no hard credit pull." },
  { icon: CreditCard, title: "Credit Optimization", desc: "We analyze your profile and optimize your credit positioning for maximum approval odds." },
  { icon: Building2, title: "Lender Matching", desc: "Our proprietary system matches you with the right lenders offering the best terms." },
  { icon: DollarSign, title: "Get Funded", desc: "Receive your funding in as little as 30 days — deposited directly into your business account." },
];

const BENEFITS = [
  "0% APR introductory periods (12–21 months)",
  "No revenue or tax returns required",
  "No personal collateral needed",
  "Builds your business credit profile simultaneously",
  "Funding available for startups and new LLCs",
  "Dedicated funding advisor throughout the process",
];

export default function Funding() {
  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: `
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
          border-radius: inherit;
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
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.20); }
        }
      `}} />

      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-white pointer-events-none">
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.5)" activeGridColor="rgba(59, 130, 246, 0.8)" />
      </div>

      {/* Nav */}
      <header className="sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex max-w-7xl mx-auto py-4 px-4 sm:px-6 items-center justify-between">
          <a href="/" className="flex items-center gap-2"><img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" /></a>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="/" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</a>
            <a href="/about" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="/store" className="nav-link relative text-sm text-slate-600 hover:text-slate-900 transition-colors">Store</a>
            <a href="/contact" className="shiny-cta !py-2 !px-5 !text-sm whitespace-nowrap focus:outline-none"><span>Contact</span></a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-4 sm:mx-6 lg:mx-auto mt-4 sm:mt-8 pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-20 overflow-hidden rounded-2xl border border-[#004E8C]">
        <HlsVideoBackground overlay="bg-gradient-to-r from-[#003A70]/95 via-[#003A70]/85 to-[#004E8C]/60" className="rounded-2xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs sm:text-sm text-blue-300 uppercase tracking-widest mb-4 font-[Inter,sans-serif]">Business Funding</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tighter text-white font-[Geist,sans-serif] leading-[0.95]">
              Secure <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">$50K – $250K+</span> in Business Credit
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              0% APR business credit lines with no revenue requirements, no tax returns, and no personal collateral. Funding in as little as 30 days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/assessment" className="shiny-cta !py-4 !px-10 !text-base"><span>Take the Free Assessment</span></a>
              <a href="/funnel/consultation" className="hover:bg-white/10 transition-colors text-sm font-medium text-white border border-white/20 rounded-full py-3.5 px-8 inline-flex items-center justify-center">Book a Strategy Call</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Funding Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest mb-3">Funding Packages</p>
          <h2 className="text-2xl sm:text-5xl font-medium text-slate-900 tracking-tighter font-[Manrope,sans-serif]">Capital for Every Stage</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FUNDING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-[#004E8C] p-8 text-white"
            >
              <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-2xl" />
              <div className="relative z-10">
                <p className={`text-sm font-semibold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${tier.color} mb-2`}>{tier.label}</p>
                <h3 className="text-3xl font-bold tracking-tight mb-3 font-[Geist,sans-serif]">{tier.range}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{tier.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-4 sm:mx-6 lg:mx-auto rounded-2xl border border-[#004E8C] overflow-hidden relative py-16 sm:py-24 px-4 sm:px-8 lg:px-20">
        <HlsVideoBackground overlay="bg-[#003A70]/92" className="rounded-2xl" />
        <div className="relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs sm:text-sm text-blue-300 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-5xl font-medium text-white tracking-tighter font-[Manrope,sans-serif]">Four Steps to Funded</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-blue-400 bg-blue-400/10 rounded-full w-7 h-7 flex items-center justify-center">{i + 1}</span>
                  <step.icon className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Geist,sans-serif]">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest mb-3">Why Ryland Partners</p>
            <h2 className="text-2xl sm:text-4xl font-medium text-slate-900 tracking-tighter font-[Manrope,sans-serif] mb-6">Built for Entrepreneurs Who Move Fast</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Traditional banks say no. We say yes. Our funding model is built around your credit strength — not your revenue history. Whether you're pre-revenue or scaling to 7 figures, we match you with lenders who want to fund ambitious founders.
            </p>
            <a href="/assessment" className="inline-flex items-center justify-center rounded-full py-3.5 px-8 text-sm font-medium text-white bg-gradient-to-r from-[#003A70] to-[#0060A9] hover:opacity-90 transition-opacity">Get Started</a>
          </div>
          <div className="space-y-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-4 sm:mx-6 lg:mx-auto mb-10 rounded-3xl border border-[#004E8C] overflow-hidden relative">
        <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-3xl" />
        <div className="relative z-10 text-center max-w-3xl mx-auto py-16 px-6 md:py-24 md:px-16">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent font-[Geist,sans-serif]">
            Ready to Get Funded?
          </h3>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Take our free 2-minute assessment and discover how much business credit you qualify for — no hard pull, no obligation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/assessment" className="shiny-cta !py-4 !px-10 !text-lg"><span>Take the Free Assessment</span></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
