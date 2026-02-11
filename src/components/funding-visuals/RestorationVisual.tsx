import { motion } from "framer-motion";
import { Check, TrendingUp } from "lucide-react";
import Counter from "./Counter";

const disputes = [
  "Late payment – Experian",
  "Collection acct – TransUnion",
  "Hard inquiry – Equifax",
  "Charge-off – Experian",
  "Medical debt – TransUnion",
];

export default function RestorationVisual() {
  const resolved = 12;
  const total = 15;
  const circumference = 2 * Math.PI * 40;
  const pct = resolved / total;

  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {/* Circular progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col items-center justify-center"
      >
        <svg width="90" height="90" viewBox="0 0 100 100" className="overflow-visible">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="40" fill="none"
            stroke="url(#restoreGrad)"
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - pct) }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
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
          className="text-center -mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xl font-bold text-white"><Counter target={resolved} />/{total}</span>
          <span className="text-[9px] text-neutral-400 block">Items Resolved</span>
        </motion.div>
      </motion.div>

      {/* Dispute checklist */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2">
        <span className="text-[10px] text-neutral-400 font-medium block mb-1">Disputes</span>
        {disputes.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.25 }}
            className="flex items-center gap-1.5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.25 + 0.2, type: "spring", stiffness: 400 }}
              className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 text-emerald-400" />
            </motion.div>
            <motion.span
              className="text-[10px] text-neutral-300"
              animate={{ textDecoration: "line-through", color: "rgba(163,163,163,0.4)" }}
              transition={{ delay: 0.3 + i * 0.25 + 0.3, duration: 0.3 }}
            >
              {item}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Score improvement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col items-center justify-center gap-2"
      >
        <div className="text-center">
          <span className="text-[10px] text-neutral-500 block">Before</span>
          <span className="text-lg font-bold text-red-400"><Counter target={582} /></span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="flex items-center gap-1"
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-bold text-emerald-400">+<Counter target={138} /> pts</span>
        </motion.div>
        <div className="text-center">
          <span className="text-[10px] text-neutral-500 block">After</span>
          <span className="text-lg font-bold text-emerald-400"><Counter target={720} /></span>
        </div>
      </motion.div>
    </div>
  );
}
