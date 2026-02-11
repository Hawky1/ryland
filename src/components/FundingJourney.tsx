import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CreditCard, TrendingUp, Shield, Building2, PartyPopper } from "lucide-react";
import AssessmentVisual from "./funding-visuals/AssessmentVisual";
import CreditAnalysisVisual from "./funding-visuals/CreditAnalysisVisual";
import RestorationVisual from "./funding-visuals/RestorationVisual";
import LenderMatchVisual from "./funding-visuals/LenderMatchVisual";
import GetFundedVisual from "./funding-visuals/GetFundedVisual";

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

const VISUALS = [AssessmentVisual, CreditAnalysisVisual, RestorationVisual, LenderMatchVisual, GetFundedVisual];

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

            {/* Step bar inside card */}
            <div className="flex items-center justify-center gap-0 overflow-x-auto px-6 pt-4 pb-2">
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

            <div className="px-6 sm:px-10 pb-8 pt-4 h-[580px] flex flex-col">
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
