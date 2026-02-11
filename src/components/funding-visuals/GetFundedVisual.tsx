import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Counter from "./Counter";

const checklist = [
  { label: "LLC Formation", status: "Completed" },
  { label: "EIN Obtained", status: "IRS Approved" },
  { label: "Operating Agreement", status: "Filed" },
  { label: "Business Bank Account", status: "Active" },
];

const badges = ["0% APR", "No Revenue Required", "No Tax Returns"];

export default function GetFundedVisual() {
  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {/* Funding counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-white/10 p-4 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <span className="text-[10px] text-neutral-400 mb-1">Total Funded</span>
        <motion.span
          className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          $<Counter target={250000} />
        </motion.span>

        {/* Confetti particles */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: "60%",
              background: ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"][i % 6],
            }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
              y: -60 - Math.random() * 40,
              x: (Math.random() - 0.5) * 60,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            transition={{ delay: 0.5 + i * 0.06, duration: 1, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Completion checklist */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2">
        <span className="text-[10px] text-neutral-400 font-medium block mb-1">Milestones</span>
        {checklist.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.2 }}
            className="flex items-center gap-1.5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.2 + 0.15, type: "spring", stiffness: 400 }}
              className="flex-shrink-0 w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 text-cyan-400" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-200 font-medium leading-tight">{item.label}</span>
              <span className="text-[8px] text-emerald-400">{item.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col items-center justify-center gap-2"
      >
        <span className="text-[10px] text-neutral-400 mb-1">Highlights</span>
        {badges.map((b, i) => (
          <motion.div
            key={b}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.15, type: "spring" }}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 text-[10px] text-cyan-300 font-semibold whitespace-nowrap"
          >
            {b}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
