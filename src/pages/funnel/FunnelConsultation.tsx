import { motion } from "framer-motion";
import { ShieldCheck, Percent, Building2, Scale } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import ConsultationCalendar from "@/components/funnel/ConsultationCalendar";
import geneRyland from "@/assets/gene-ryland-about.png";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "No Hard Credit Pull" },
  { icon: Percent, label: "0% APR Focus" },
  { icon: Building2, label: "Trusted Banking Partners" },
  { icon: Scale, label: "100% Transparent Pricing" },
];

export default function FunnelConsultation() {
  return (
    <FunnelLayout step={4} label="Free Consultation">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HlsVideoBackground overlay="bg-[#001F3F]/94" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-4 py-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-6 font-[Inter,sans-serif]">
              Final Step — Your Personalized Plan
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-[Geist,sans-serif]">
              You have the tools.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Now, let us do the heavy lifting.
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-white/90 mb-4 font-[Geist,sans-serif]">
              Speak with a Funding Specialist
            </h2>
            <p className="text-blue-100/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              If you have a 680+ score and want to skip the line and secure{" "}
              <strong className="text-white">$50K–$250K in the next 30 days</strong>, let's talk. This is a personalized strategy session to map your capital plan.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {TRUST_BADGES.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <badge.icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{badge.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Gene portrait */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <img
                src={geneRyland}
                alt="Gene Ryland"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-semibold text-sm">Gene Ryland</p>
                <p className="text-blue-200/50 text-xs">Founder & Funding Strategist • 8+ Years Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Custom Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <ConsultationCalendar />
          </motion.div>
        </div>
      </section>
    </FunnelLayout>
  );
}
