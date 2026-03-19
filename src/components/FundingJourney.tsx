import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CreditCard, TrendingUp, Shield, Building2, PartyPopper } from "lucide-react";
import AssessmentVisual from "./funding-visuals/AssessmentVisual";
import CreditAnalysisVisual from "./funding-visuals/CreditAnalysisVisual";
import RestorationVisual from "./funding-visuals/RestorationVisual";
import LenderMatchVisual from "./funding-visuals/LenderMatchVisual";
import GetFundedVisual from "./funding-visuals/GetFundedVisual";
import HlsVideoBackground from "./HlsVideoBackground";

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
    title: "Strategy Execution",
    description: "Execute your personalized business credit strategy — learn what options may work for your situation.",
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
    <section className="pt-12 pb-20 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* header */}
        <div className="text-center mb-14">
          <h2
            className="text-2xl font-medium text-slate-900 tracking-tighter sm:text-5xl"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 0%, black 10%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 0%, black 10%, transparent)",
            }}
          >
            Your Path To Funding
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-lg mx-auto">
            From assessment to execution — see what business credit options could look like for your situation.
          </p>
        </div>

        {/* Device frame */}
        <div
          className="relative w-full mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-2xl border border-[#004E8C] overflow-hidden relative">
            {/* Background video matching hero */}
            <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-2xl" staticOnly />
            {/* notch */}
            <div className="flex justify-center pt-3 pb-1 relative z-10">
              <div className="w-24 h-1 rounded-full bg-white/10" />
            </div>

            {/* Step bar inside card */}
            <div className="flex items-center justify-center gap-0 px-3 sm:px-6 pt-4 pb-2 relative z-10">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => go(i)}
                    className="flex flex-col items-center gap-1.5 group relative"
                  >
                    <motion.div
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-colors duration-300 ${
                        i <= active
                          ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400/50 text-white shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                          : "bg-white/5 border-white/10 text-neutral-500"
                      }`}
                      animate={i === active ? { scale: 1.15 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {i + 1}
                    </motion.div>
                    <span className={`hidden sm:block text-sm font-medium whitespace-nowrap transition-colors ${i === active ? "text-cyan-400" : "text-neutral-500"}`}>
                      {s.title}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="w-4 sm:w-14 h-0.5 mx-0.5 sm:mx-1 rounded-full bg-white/5 relative overflow-hidden self-start mt-[14px] sm:mt-[18px]">
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

            <div className="px-4 sm:px-10 pb-6 pt-2 min-h-[400px] sm:h-[480px] flex flex-col relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex-1 flex items-center justify-center"
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* nav arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              aria-label="Previous step"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Previous
            </button>
            </button>

            {/* progress dots */}
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => go(i)} className="p-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === active ? "bg-cyan-400 w-4" : "bg-slate-300"}`} />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next step"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors group"
            >
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
