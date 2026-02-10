import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, CreditCard, TrendingUp, Shield, Building2, PartyPopper } from "lucide-react";
import logoChase from "@/assets/logo-chase.png";
import logoBoa from "@/assets/logo-boa.png";
import logoNavyFed from "@/assets/logo-navyfed.png";
import logoTruist from "@/assets/logo-truist.png";
import logoUsBank from "@/assets/logo-usbank.png";

const STEPS = [
  {
    title: "Take Your Assessment",
    description: "Answer a few quick questions about your business goals and current financial standing.",
    icon: CreditCard,
  },
  {
    title: "Credit Analysis",
    description: "We pull and analyze your credit profile to build a custom strategy tailored to your goals.",
    icon: TrendingUp,
  },
  {
    title: "Credit Restoration",
    description: "Our team removes negatives, disputes inaccuracies, and boosts your score — done for you.",
    icon: Shield,
  },
  {
    title: "Lender Matching",
    description: "Our proprietary system matches you with the best 0% APR credit lines from top-tier lenders.",
    icon: Building2,
  },
  {
    title: "Get Funded",
    description: "Receive $50k–$250k in business funding. No tax returns or revenue history required.",
    icon: PartyPopper,
  },
];

/* ── Step Visuals ── */

function AssessmentVisual() {
  const fields = ["Business Name", "Industry", "Monthly Revenue", "Funding Goal"];
  return (
    <div className="space-y-3 w-full max-w-xs mx-auto">
      {fields.map((f, i) => (
        <motion.div
          key={f}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          className="space-y-1"
        >
          <span className="text-[11px] text-neutral-400 font-medium">{f}</span>
          <div className="h-8 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500/20 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
            />
          </div>
        </motion.div>
      ))}
      {/* progress bar */}
      <div className="pt-2">
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </div>
        <span className="text-[10px] text-neutral-500 mt-1 block text-right">75% complete</span>
      </div>
    </div>
  );
}

function CreditGaugeVisual() {
  const score = 742;
  const circumference = 2 * Math.PI * 54;
  const pct = (score - 300) / 550; // 300-850 range

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="90" viewBox="0 0 140 90" className="overflow-visible">
        {/* background arc */}
        <path
          d="M 10 80 A 54 54 0 0 1 130 80"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* animated arc */}
        <motion.path
          d="M 10 80 A 54 54 0 0 1 130 80"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference / 2}
          initial={{ strokeDashoffset: circumference / 2 }}
          animate={{ strokeDashoffset: (circumference / 2) * (1 - pct) }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <motion.span
        className="text-3xl font-bold text-white -mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Counter target={score} />
      </motion.span>
      <span className="text-[11px] text-neutral-400">Credit Score</span>
    </div>
  );
}

function RestorationVisual() {
  const items = [
    "Late payment – Experian",
    "Collection account – TransUnion",
    "Hard inquiry – Equifax",
    "Charge-off – Experian",
  ];
  return (
    <div className="space-y-2.5 w-full max-w-xs mx-auto">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.3 }}
          className="flex items-center gap-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.3 + 0.4, type: "spring", stiffness: 300 }}
            className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-emerald-400" />
          </motion.div>
          <motion.span
            className="text-sm text-neutral-300"
            initial={{ textDecoration: "none" }}
            animate={{ textDecoration: "line-through", color: "rgba(163,163,163,0.5)" }}
            transition={{ delay: i * 0.3 + 0.5, duration: 0.3 }}
          >
            {item}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

function LenderMatchVisual() {
  const logos = [
    { src: logoChase, name: "Chase" },
    { src: logoBoa, name: "Bank of America" },
    { src: logoNavyFed, name: "Navy Federal" },
    { src: logoUsBank, name: "US Bank" },
    { src: logoTruist, name: "Truist" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {logos.map((l, i) => (
        <motion.div
          key={l.name}
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
          className="w-20 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 backdrop-blur-sm"
        >
          <img src={l.src} alt={l.name} className="h-5 w-auto object-contain brightness-0 invert opacity-80" />
        </motion.div>
      ))}
    </div>
  );
}

function GetFundedVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        $<Counter target={250000} prefix="" />
      </motion.div>
      <span className="text-sm text-neutral-400">in Available Funding</span>
      {/* particles */}
      <div className="relative w-full h-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              background: ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981"][i % 4],
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -40 - Math.random() * 30, opacity: 0, x: (Math.random() - 0.5) * 40 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}

const VISUALS = [AssessmentVisual, CreditGaugeVisual, RestorationVisual, LenderMatchVisual, GetFundedVisual];

/* ── Animated Counter ── */
function Counter({ target, prefix }: { target: number; prefix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target]);
  return <>{prefix !== undefined ? prefix : ""}{val.toLocaleString()}</>;
}

/* ── Main Component ── */
export default function FundingJourney() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const next = useCallback(() => go(active < STEPS.length - 1 ? active + 1 : 0), [active, go]);
  const prev = useCallback(() => go(active > 0 ? active - 1 : STEPS.length - 1), [active, go]);

  // auto-play
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, paused, next]);

  const Visual = VISUALS[active];

  return (
    <section className="sm:pt-24 md:pt-10 max-w-7xl mx-auto pt-24 pb-20 relative" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* header */}
        <div className="text-center mb-14">
          <h2
            className="text-2xl font-medium text-white tracking-tighter sm:text-5xl"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 0%, black 10%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 0%, black 10%, transparent)",
            }}
          >
            Your Path To Funding
          </h2>
          <p className="text-neutral-400 mt-3 text-sm max-w-lg mx-auto">
            From assessment to funded — see exactly how we get you $50k–$250k in business credit.
          </p>
        </div>

        {/* Step bar */}
        <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => go(i)}
                className="flex flex-col items-center gap-1.5 group relative"
              >
                <motion.div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-colors duration-300 ${
                    i <= active
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400/50 text-white shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                      : "bg-white/5 border-white/10 text-neutral-500"
                  }`}
                  animate={i === active ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {i + 1}
                </motion.div>
                <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${i === active ? "text-cyan-400" : "text-neutral-500"}`}>
                  {s.title}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="w-8 sm:w-14 h-0.5 mx-1 rounded-full bg-white/5 relative overflow-hidden self-start mt-[18px]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    animate={{ width: i < active ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Device frame */}
        <div
          className="relative w-full mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950 backdrop-blur-xl shadow-2xl ring-1 ring-white/5 overflow-hidden">
            {/* notch */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-24 h-1 rounded-full bg-white/10" />
            </div>

            <div className="px-6 sm:px-10 pb-8 pt-4 min-h-[340px] flex flex-col">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex-1 flex flex-col"
                >
                  {/* step content */}
                  <div className="text-center mb-6">
                    <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-semibold">
                      Step {active + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{STEPS[active].title}</h3>
                    <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">{STEPS[active].description}</p>
                  </div>

                  {/* animated visual */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <Visual />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* nav arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Previous
            </button>

            {/* progress dots */}
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => go(i)} className="p-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === active ? "bg-cyan-400 w-4" : "bg-white/20"}`} />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors group"
            >
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
