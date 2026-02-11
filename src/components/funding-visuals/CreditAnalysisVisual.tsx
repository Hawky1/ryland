import { motion } from "framer-motion";
import Counter from "./Counter";

const barHeights = [35, 45, 30, 55, 50, 65, 75, 85, 90];

const stats = [
  { label: "Starting", value: 582, color: "text-red-400" },
  { label: "Current", value: 720, color: "text-emerald-400" },
  { label: "Target", value: 750, suffix: "+", color: "text-cyan-400" },
];

export default function CreditAnalysisVisual() {
  return (
    <div className="w-full space-y-4 relative">
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-8 bg-gradient-to-b from-cyan-500/5 via-cyan-500/10 to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>

      {/* Bar chart panel */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }} />

        <div className="flex items-end justify-center gap-1.5 h-32 relative z-10">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <motion.div
                className="w-full rounded-t-md bg-gradient-to-t from-cyan-500 to-blue-500 relative"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6, type: "spring", stiffness: 80 }}
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

        {/* Score overlay */}
        <motion.div
          className="absolute top-3 right-4 z-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <span className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Counter target={720} />
          </span>
          <span className="text-[10px] text-neutral-400 block text-right">Credit Score</span>
        </motion.div>
      </div>

      {/* Stat boxes */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.15, type: "spring" }}
            className="rounded-xl bg-white/5 border border-white/10 p-3 text-center"
          >
            <span className="text-[10px] text-neutral-500 block">{s.label}</span>
            <span className={`text-lg font-bold ${s.color} block`}>
              <Counter target={s.value} />{s.suffix || ""}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
