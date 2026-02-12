import { motion } from "framer-motion";
import Counter from "./Counter";
import logoTransunion from "@/assets/logo-transunion.png";
import logoEquifax from "@/assets/logo-equifax.png";
import logoExperian from "@/assets/logo-experian.png";

const bureaus = [
  { name: "TransUnion", score: 718, change: +42, logo: logoTransunion },
  { name: "Equifax", score: 724, change: +38, logo: logoEquifax },
  { name: "Experian", score: 712, change: +45, logo: logoExperian },
];

const barHeights = [30, 38, 28, 48, 45, 58, 68, 78, 82, 88, 95];

const negativeItems = [
  { item: "Late Payment – Chase", status: "Disputed", resolved: true },
  { item: "Collection – Medical", status: "Removed", resolved: true },
  { item: "Hard Inquiry – Cap One", status: "Removed", resolved: true },
  { item: "Charge-Off – Sync", status: "In Progress", resolved: false },
  { item: "Late Payment – Amex", status: "Disputed", resolved: false },
];

function ScoreGauge({ score }: { score: number }) {
  const min = 300;
  const max = 850;
  const pct = (score - min) / (max - min);
  // Semi-circle: radius 45, center 60,55, arc from left to right
  const r = 45;
  const cx = 60;
  const cy = 58;
  const startAngle = Math.PI; // left
  const endAngle = 0; // right
  const arcLength = Math.PI * r; // half circumference
  const dashOffset = arcLength * (1 - pct);

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg viewBox="0 0 120 70" className="w-full max-w-[180px]">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Fill */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <span className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Counter target={score} />
        </span>
        <span className="text-[10px] text-neutral-500 mt-0.5">+42 pts improvement</span>
      </div>
    </div>
  );
}

function BureauProgressBar({ score }: { score: number }) {
  const pct = ((score - 300) / 550) * 100;
  return (
    <div className="w-full h-1 rounded-full bg-white/5 mt-1.5 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)" }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      />
    </div>
  );
}

export default function CreditAnalysisVisual() {
  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "16px 16px"
      }} />

      {/* App bar */}
      <motion.div
        className="flex items-center justify-between px-3 py-2 border-b border-white/10 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">Credit Dashboard</span>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span className="text-[10px] text-emerald-400/70 font-medium">Live</span>
        </div>
      </motion.div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-30">
        <motion.div
          className="absolute left-0 right-0 h-12 bg-gradient-to-b from-cyan-500/5 via-cyan-500/8 to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 p-3 relative z-10">
        {/* LEFT: Score Gauge + Bureau Breakdown */}
        <div className="flex flex-col gap-3">
          {/* Gauge card */}
          <motion.div
            className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col items-center justify-center flex-1 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-1">Current Score</span>
            <ScoreGauge score={720} />
            <span className="text-[10px] text-neutral-600 mt-1">Last updated: Just now</span>
          </motion.div>

          {/* Bureau scores */}
          <div className="flex flex-col gap-2">
            {bureaus.map((b, i) => (
              <motion.div
                key={b.name}
                className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, type: "spring" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={b.logo} alt={b.name} className="h-4 object-contain opacity-70" />
                    <span className="text-sm font-bold text-white">
                      <Counter target={b.score} />
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">+{b.change}</span>
                </div>
                <BureauProgressBar score={b.score} />
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
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }} />

            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-2 relative z-10">Score History</span>

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
                <span className="text-[10px] text-neutral-500 block">{s.label}</span>
                <span className={`text-sm font-bold ${s.color}`}>
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
            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-3">Negative Items</span>

            <div className="flex items-center gap-2 mb-3">
              <motion.span
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                3<span className="text-neutral-500 text-xs font-normal">/5</span>
              </motion.span>
              <span className="text-[10px] text-neutral-500">Resolved</span>
              <motion.div
                className="ml-auto w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>

            <div className="space-y-1.5 flex-1">
              {negativeItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-xs"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12, type: "spring" }}
                >
                  <motion.div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
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
                        width="8" height="8" viewBox="0 0 12 12"
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
                  <span className={`flex-1 truncate ${item.resolved ? "text-neutral-500 line-through" : "text-neutral-300"}`}>
                    {item.item}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap ${
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
            <span className="text-[10px] text-neutral-500">Avg. Improvement</span>
            <span className="text-sm font-bold text-emerald-400">+<Counter target={138} /> pts</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
