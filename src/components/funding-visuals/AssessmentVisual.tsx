import { motion } from "framer-motion";
import { Briefcase, Target, Clock } from "lucide-react";
import Counter from "./Counter";

const statCards = [
  { icon: Briefcase, label: "Business Type", value: "LLC", color: "from-cyan-500/20 to-cyan-500/5" },
  { icon: Target, label: "Funding Goal", counter: true, value: 250000, color: "from-blue-500/20 to-blue-500/5" },
  { icon: Clock, label: "Timeline", value: "30-60 Days", color: "from-violet-500/20 to-violet-500/5" },
];

const fields = ["Business Name", "Industry", "Monthly Revenue", "Years in Business"];

export default function AssessmentVisual() {
  return (
    <div className="w-full space-y-4">
      {/* Stat cards row */}
      <div className="grid grid-cols-3 gap-3">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
            className={`rounded-xl bg-gradient-to-br ${card.color} border border-white/10 p-3 text-center`}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
              className="mx-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2"
            >
              <card.icon className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-[10px] text-neutral-400 block">{card.label}</span>
            <span className="text-sm font-bold text-white mt-0.5 block">
              {card.counter ? <>${""}< Counter target={card.value as number} /></> : card.value as string}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Form fields with typing cursor */}
      <div className="grid grid-cols-2 gap-2">
        {fields.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
            className="space-y-1"
          >
            <span className="text-[10px] text-neutral-500 font-medium">{f}</span>
            <div className="h-7 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden flex items-center px-2">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500/15 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
              />
              <motion.div
                className="w-[1px] h-3.5 bg-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.8 + i * 0.12 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="rounded-xl bg-white/5 border border-white/10 p-3"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-neutral-400">Assessment Progress</span>
          <span className="text-[10px] text-cyan-400 font-bold">75%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {["Info", "Goals", "Finance", "Review"].map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <motion.div
                className={`w-2 h-2 rounded-full ${i < 3 ? "bg-cyan-500" : "bg-white/10"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1, type: "spring" }}
              />
              <span className="text-[8px] text-neutral-500">{s}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
