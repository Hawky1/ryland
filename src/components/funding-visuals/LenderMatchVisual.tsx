import { motion } from "framer-motion";
import Counter from "./Counter";
import logoChase from "@/assets/logo-chase.png";
import logoBoa from "@/assets/logo-boa.png";
import logoNavyFed from "@/assets/logo-navyfed.png";
import logoTruist from "@/assets/logo-truist.png";
import logoUsBank from "@/assets/logo-usbank.png";

const lenders = [
  { name: "Chase", amount: 35000, logo: logoChase },
  { name: "BOA", amount: 25000, logo: logoBoa },
  { name: "Navy Fed", amount: 20000, logo: logoNavyFed },
  { name: "Truist", amount: 25000, logo: logoTruist },
  { name: "US Bank", amount: 20000, logo: logoUsBank },
];

export default function LenderMatchVisual() {
  const maxAmount = 35000;

  return (
    <div className="w-full space-y-3">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-white/10 p-4 text-center"
        >
          <span className="text-[10px] text-neutral-400 block">Credit Lines</span>
          <span className="text-2xl font-black text-white"><Counter target={7} /> Approved</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-white/10 p-4 text-center"
        >
          <span className="text-[10px] text-neutral-400 block">Total Available</span>
          <span className="text-2xl font-black text-emerald-400">$<Counter target={125000} /></span>
        </motion.div>
      </div>

      {/* Bar chart by lender */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
        {lenders.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <img src={l.logo} alt={l.name} className="w-5 h-5 object-contain brightness-0 invert opacity-60 flex-shrink-0" />
            <div className="flex-1 h-5 rounded-md bg-white/5 overflow-hidden relative">
              <motion.div
                className="h-full rounded-md bg-gradient-to-r from-pink-500 to-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: `${(l.amount / maxAmount) * 100}%` }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.7, type: "spring", stiffness: 60 }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 w-12 text-right">${(l.amount / 1000)}k</span>
          </motion.div>
        ))}
      </div>

      {/* Latest deposit badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 mx-auto w-fit"
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span className="text-xs text-neutral-300">Latest deposit: <span className="text-emerald-400 font-bold">$15,000</span></span>
      </motion.div>
    </div>
  );
}
