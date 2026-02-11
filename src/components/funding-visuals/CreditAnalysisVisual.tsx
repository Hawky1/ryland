import { motion } from "framer-motion";
import Counter from "./Counter";

const bureaus = [
  { name: "TransUnion", score: 718, change: +42 },
  { name: "Equifax", score: 724, change: +38 },
  { name: "Experian", score: 712, change: +45 },
];

const barHeights = [30, 38, 28, 48, 45, 58, 68, 78, 82, 88, 95];

const negativeItems = [
  { item: "Late Payment – Chase", status: "Disputed", resolved: true },
  { item: "Collection – Medical", status: "Removed", resolved: true },
  { item: "Hard Inquiry – Cap One", status: "Removed", resolved: true },
  { item: "Charge-Off – Sync", status: "In Progress", resolved: false },
  { item: "Late Payment – Amex", status: "Disputed", resolved: false },
];

export default function CreditAnalysisVisual() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3 relative">
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-30">
        <motion.div
          className="absolute left-0 right-0 h-12 bg-gradient-to-b from-cyan-500/5 via-cyan-500/8 to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </div>

      {/* LEFT: Current Score + Bureau Breakdown */}
      <div className="flex flex-col gap-3">
        {/* Big score */}
        <motion.div
          className="rounded-xl bg-white border border-slate-200 shadow-sm p-4 flex flex-col items-center justify-center flex-1 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <span className="text-sm uppercase tracking-widest text-slate-500 mb-1 relative z-10">Current Score</span>
          <span className="text-6xl font-black text-emerald-500 drop-shadow-[0_0_24px_rgba(16,185,129,0.3)] relative z-10">
            <Counter target={720} />
          </span>
          <span className="text-sm text-slate-500 mt-1 relative z-10">+42 pts improvement</span>

          {/* Animated ring behind score */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
            <motion.circle
              cx="60" cy="60" r="50"
              fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="2"
              strokeDasharray="314"
              initial={{ strokeDashoffset: 314 }}
              animate={{ strokeDashoffset: 60 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
        </motion.div>

        {/* Bureau scores */}
        <div className="flex flex-col gap-2">
          {bureaus.map((b, i) => (
            <motion.div
              key={b.name}
              className="rounded-lg bg-white border border-slate-200 shadow-sm px-3 py-2 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12, type: "spring" }}
            >
              <div>
                <span className="text-sm text-slate-500 block">{b.name}</span>
                <span className="text-base font-bold text-slate-900">
                  <Counter target={b.score} />
                </span>
              </div>
              <span className="text-sm font-semibold text-emerald-400">+{b.change}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CENTER: Bar Chart */}
      <div className="flex flex-col gap-3">
        <motion.div
          className="rounded-xl bg-white/5 border border-white/10 p-4 flex-1 relative overflow-hidden flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />

          <span className="text-sm uppercase tracking-widest text-neutral-500 mb-2 relative z-10">Score History</span>

          <div className="flex items-end justify-center gap-1 flex-1 relative z-10">
            {barHeights.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <motion.div
                  className="w-full rounded-t-md bg-gradient-to-t from-cyan-500 to-blue-400 relative"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.6, type: "spring", stiffness: 80 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-t-md"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Starting / Current / Target */}
        <div className="grid grid-cols-3 gap-2">
          {([
            { label: "Starting", value: 582, suffix: "", color: "text-red-400" },
            { label: "Current", value: 720, suffix: "", color: "text-emerald-400" },
            { label: "Target", value: 750, suffix: "+", color: "text-cyan-400" },
          ]).map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
              className="rounded-lg bg-white/5 border border-white/10 py-2 text-center"
            >
              <span className="text-xs text-neutral-500 block">{s.label}</span>
              <span className={`text-base font-bold ${s.color}`}>
                <Counter target={s.value} />{s.suffix}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Negative Items */}
      <div className="flex flex-col gap-3">
        <motion.div
          className="rounded-xl bg-white/5 border border-white/10 p-4 flex-1 flex flex-col relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-sm uppercase tracking-widest text-neutral-500 mb-3">Negative Items</span>

          <div className="flex items-center gap-2 mb-3">
            <motion.span
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              3<span className="text-neutral-500 text-base font-normal">/5</span>
            </motion.span>
            <span className="text-sm text-neutral-500">Resolved</span>
            <motion.div
              className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>

          <div className="space-y-2 flex-1">
            {negativeItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.12, type: "spring" }}
              >
                <motion.div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    item.resolved
                      ? "bg-emerald-500/20 border-emerald-500/50"
                      : "bg-white/5 border-white/15"
                  }`}
                  initial={item.resolved ? { scale: 0 } : {}}
                  animate={item.resolved ? { scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 300 }}
                >
                  {item.resolved && (
                    <motion.svg
                      width="10" height="10" viewBox="0 0 12 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1 + i * 0.12, duration: 0.3 }}
                    >
                      <motion.path
                        d="M2 6 L5 9 L10 3"
                        fill="none"
                        stroke="rgb(16,185,129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1 + i * 0.12, duration: 0.3 }}
                      />
                    </motion.svg>
                  )}
                </motion.div>
                <span className={`flex-1 ${item.resolved ? "text-neutral-500 line-through" : "text-neutral-300"}`}>
                  {item.item}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  item.resolved
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary stat */}
        <motion.div
          className="rounded-lg bg-white/5 border border-white/10 p-3 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <span className="text-sm text-neutral-500">Avg. Improvement</span>
          <span className="text-base font-bold text-emerald-400">+<Counter target={138} /> pts</span>
        </motion.div>
      </div>
    </div>
  );
}
