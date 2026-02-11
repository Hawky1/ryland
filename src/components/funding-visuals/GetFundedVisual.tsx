import { motion } from "framer-motion";
import { Check, PartyPopper, DollarSign, BadgeCheck } from "lucide-react";
import Counter from "./Counter";

const checklist = [
  { label: "LLC Formation", status: "Completed" },
  { label: "EIN Obtained", status: "IRS Approved" },
  { label: "Operating Agreement", status: "Filed" },
  { label: "Business Bank Account", status: "Active" },
  { label: "Credit Lines Secured", status: "7 Approved" },
];

const badges = [
  { text: "0% APR", icon: BadgeCheck },
  { text: "No Revenue Required", icon: BadgeCheck },
  { text: "No Tax Returns", icon: BadgeCheck },
  { text: "No Collateral", icon: BadgeCheck },
];

const fundingBreakdown = [
  { label: "Credit Lines", amount: 125000 },
  { label: "Business LOC", amount: 75000 },
  { label: "Term Funding", amount: 50000 },
];

export default function GetFundedVisual() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* LEFT: Big funding counter + breakdown */}
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col items-center justify-center flex-1 relative overflow-hidden"
        >
          <PartyPopper className="w-7 h-7 text-cyan-400 mb-2 relative z-10" />
          <span className="text-sm text-neutral-400 mb-1 relative z-10">Total Funded</span>
          <motion.span
            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            $<Counter target={250000} />
          </motion.span>

          {/* Confetti particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: "55%",
                background: ["#06b6d4", "#3b82f6", "#10b981", "#06b6d4", "#2563eb"][i % 5],
              }}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{
                y: -80 - Math.random() * 50,
                x: (Math.random() - 0.5) * 80,
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 360,
              }}
              transition={{ delay: 0.5 + i * 0.05, duration: 1.2, ease: "easeOut" }}
            />
          ))}
        </motion.div>

        {/* Funding breakdown */}
        <div className="space-y-2">
          {fundingBreakdown.map((f, i) => (
            <motion.div
              key={f.label}
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 flex items-center justify-between"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, type: "spring" }}
            >
              <span className="text-sm text-neutral-400">{f.label}</span>
              <span className="text-base font-bold text-cyan-400">$<Counter target={f.amount} /></span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CENTER: Completion checklist */}
      <motion.div
        className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm uppercase tracking-widest text-neutral-500 mb-3">Milestones Complete</span>

        <div className="flex items-center gap-2 mb-4">
          <motion.span
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            5<span className="text-neutral-500 text-base font-normal">/5</span>
          </motion.span>
          <span className="text-sm text-emerald-400">All Complete</span>
          <motion.div
            className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>

        <div className="space-y-3 flex-1">
          {checklist.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.18, type: "spring" }}
              className="flex items-center gap-2.5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.18, type: "spring", stiffness: 400 }}
                className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-emerald-400" />
              </motion.div>
              <div className="flex-1">
                <span className="text-sm text-neutral-200 font-medium block">{item.label}</span>
                <span className="text-xs text-emerald-400">{item.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT: Badges + Summary */}
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col items-center justify-center flex-1"
        >
          <DollarSign className="w-6 h-6 text-cyan-400 mb-2" />
          <span className="text-sm text-neutral-400 mb-3">Funding Highlights</span>
          <div className="space-y-2 w-full">
            {badges.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.12, type: "spring" }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30"
              >
                <b.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-cyan-300 font-semibold">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA-like badge */}
        <motion.div
          className="rounded-lg bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 p-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <span className="text-sm font-bold text-white">🎉 Funding Complete</span>
          <span className="text-xs text-neutral-400 block mt-0.5">Average timeline: 45 days</span>
        </motion.div>
      </div>
    </div>
  );
}
