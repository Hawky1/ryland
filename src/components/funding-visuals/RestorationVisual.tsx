import { motion } from "framer-motion";
import { Check, TrendingUp, ShieldCheck, Trash2, ArrowUpRight } from "lucide-react";
import Counter from "./Counter";

const disputes = [
  { item: "Late Payment – Experian", result: "Collection Removed", bureau: "EXP" },
  { item: "Collection Acct – TransUnion", result: "Account Deleted", bureau: "TU" },
  { item: "Hard Inquiry – Equifax", result: "Inquiry Removed", bureau: "EQ" },
  { item: "Charge-Off – Experian", result: "Credit Improved", bureau: "EXP" },
  { item: "Medical Debt – TransUnion", result: "Balance Cleared", bureau: "TU" },
  { item: "Late Payment – Equifax", result: "Collection Removed", bureau: "EQ" },
];

const bureauScores = [
  { name: "TransUnion", before: 578, after: 716, change: +138 },
  { name: "Equifax", before: 585, after: 722, change: +137 },
  { name: "Experian", before: 582, after: 718, change: +136 },
];

export default function RestorationVisual() {
  const resolved = 12;
  const total = 15;
  const circumference = 2 * Math.PI * 44;
  const pct = resolved / total;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* LEFT: Progress Ring + Stats */}
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col items-center justify-center flex-1 relative overflow-hidden"
        >
          <svg width="110" height="110" viewBox="0 0 100 100" className="overflow-visible relative z-10">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
            <motion.circle
              cx="50" cy="50" r="44" fill="none"
              stroke="url(#restoreGrad)"
              strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - pct) }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient id="restoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            className="text-center -mt-16 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-3xl font-black text-slate-900"><Counter target={resolved} />/{total}</span>
            <span className="text-sm text-slate-500 block">Items Resolved</span>
          </motion.div>
        </motion.div>

        {/* Summary badges */}
        <div className="grid grid-cols-2 gap-2">
          <motion.div
            className="rounded-lg bg-white border border-slate-200 shadow-sm p-2.5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            <Trash2 className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <span className="text-base font-bold text-slate-900 block"><Counter target={8} /></span>
            <span className="text-xs text-slate-500">Negatives Removed</span>
          </motion.div>
          <motion.div
            className="rounded-lg bg-white border border-slate-200 shadow-sm p-2.5 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, type: "spring" }}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <span className="text-base font-bold text-slate-900 block"><Counter target={4} /></span>
            <span className="text-xs text-slate-500">Disputes Won</span>
          </motion.div>
        </div>
      </div>

      {/* CENTER: Dispute List */}
      <motion.div
        className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm uppercase tracking-widest text-neutral-500 mb-3">Dispute Results</span>

        <div className="space-y-2.5 flex-1">
          {disputes.map((d, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.18, type: "spring" }}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-0.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.18, type: "spring", stiffness: 400 }}
              >
                <Check className="w-3 h-3 text-emerald-400" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.span
                  className="text-sm text-neutral-400 line-through block truncate"
                  initial={{ textDecorationColor: "transparent" }}
                  animate={{ textDecorationColor: "rgba(163,163,163,0.4)" }}
                  transition={{ delay: 0.6 + i * 0.18, duration: 0.4 }}
                >
                  {d.item}
                </motion.span>
                <motion.span
                  className="text-xs font-semibold text-emerald-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.18 }}
                >
                  ✓ {d.result}
                </motion.span>
              </div>
              <span className="text-xs bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-neutral-500 flex-shrink-0">
                {d.bureau}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span className="text-xs text-neutral-500">All disputes processed in 30 days</span>
        </motion.div>
      </motion.div>

      {/* RIGHT: Bureau Score Improvements */}
      <div className="flex flex-col gap-3">
        {bureauScores.map((b, i) => (
          <motion.div
            key={b.name}
            className="rounded-xl bg-white/5 border border-white/10 p-3 flex-1 flex flex-col justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
          >
            <span className="text-sm text-neutral-500 mb-1.5">{b.name}</span>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-neutral-600 block">Before</span>
                <span className="text-xl font-bold text-red-400"><Counter target={b.before} /></span>
              </div>
              <motion.div
                className="flex items-center gap-0.5 mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.15, type: "spring" }}
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">+{b.change}</span>
              </motion.div>
              <div className="text-right">
                <span className="text-xs text-neutral-600 block">After</span>
                <span className="text-xl font-bold text-emerald-400"><Counter target={b.after} /></span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400"
                initial={{ width: "30%" }}
                animate={{ width: "85%" }}
                transition={{ delay: 0.8 + i * 0.15, duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
