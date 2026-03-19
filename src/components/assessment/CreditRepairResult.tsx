import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ConsultationCalendar from "@/components/funnel/ConsultationCalendar";

const ROADMAP_STEPS = [
  {
    num: 1,
    title: "Pull your full credit report",
    desc: "We review all three bureaus together and identify exactly what's holding your score — and your funding — back. No surprises, no guesswork.",
  },
  {
    num: 2,
    title: "Get your done-for-you restoration plan",
    desc: "Our team disputes and repairs on your behalf. Most clients see meaningful gains in 35–90 days — without lifting a finger.",
  },
  {
    num: 3,
    title: "Unlock your full funding approval",
    desc: "With your profile optimized, you qualify for better terms, higher limits, and faster approvals. 48-hour turnaround once you're ready.",
  },
];

export default function CreditRepairResult() {
  const [showCalendar, setShowCalendar] = useState(false);

  if (showCalendar) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setShowCalendar(false)}
          className="mb-4 text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
        >
          ← Back to results
        </button>
        <ConsultationCalendar />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      {/* Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Assessment complete
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-[32px] leading-tight font-bold text-slate-900 font-[Geist,sans-serif] tracking-tight mb-4">
        Your funding plan is ready — let's build your foundation.
      </h2>

      <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
        You're closer than you think. We've reviewed your profile and mapped out the exact steps to get you funded. The thing most people have been putting off? It's the one thing that changes everything.
      </p>

      <hr className="border-slate-100 mb-8" />

      {/* Roadmap */}
      <div className="border border-slate-200 rounded-xl p-6 sm:p-8 mb-8">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-6">
          Your Personalized Funding Roadmap
        </p>

        <div className="space-y-6">
          {ROADMAP_STEPS.map((s) => (
            <div key={s.num} className="flex gap-4">
              <span className="text-sm font-semibold text-blue-500 mt-0.5 w-5 flex-shrink-0">
                {s.num}
              </span>
              <div>
                <p className="font-semibold text-slate-900 text-[15px] mb-1">{s.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 CTA */}
      <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-4">
        Step 1 — Get Your Credit Report
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Recommended: $1 report */}
        <div className="border-2 border-blue-200 rounded-xl p-5 relative bg-white">
          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 mb-3">
            Recommended
          </span>
          <h3 className="font-bold text-slate-900 text-lg mb-1.5">Full 3-bureau report</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            All three bureaus in one place. We use this to build your complete restoration plan before your advisor call.
          </p>
          <p className="mb-4">
            <span className="text-2xl font-bold text-slate-900">$1</span>
            <span className="text-sm text-slate-400 ml-2">on us — we cover the rest</span>
          </p>
          <a
            href="http://report.rylandpartners.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 rounded-lg border border-slate-200 text-slate-800 font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            Get my report for $1 →
          </a>
        </div>

        {/* Skip ahead */}
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 mb-3">
            Already have it?
          </span>
          <h3 className="font-bold text-slate-900 text-lg mb-1.5">Skip ahead</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            If you've pulled your report in the last 30 days, bring it to your advisor call and we'll review it together.
          </p>
          <p className="font-semibold text-slate-800 text-sm mb-4">No report needed right now</p>
          <button
            onClick={() => setShowCalendar(true)}
            className="block w-full text-center py-2.5 rounded-lg border border-slate-200 text-slate-800 font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            Speak with an advisor →
          </button>
        </div>
      </div>

      {/* Divider with text */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-xs text-slate-400">or talk to an advisor now</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Advisor bar */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
            FA
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Funding advisor</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Available now — under 2 min wait
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 rounded-lg border border-slate-200 text-slate-800 font-medium text-sm hover:bg-white transition-colors"
        >
          Talk now →
        </button>
      </div>

      {/* Urgency note */}
      <p className="text-xs text-slate-400 text-center mt-6">
        Your results are saved for 24 hours — don't let this plan sit on the shelf.
      </p>

      {/* Trust strip */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-4 flex-wrap">
        <span>200+ businesses funded</span>
        <span>•</span>
        <span>48-hr turnaround</span>
        <span>•</span>
        <span>0% interest available</span>
      </div>
    </motion.div>
  );
}
