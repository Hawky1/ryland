import { motion } from "framer-motion";
import Counter from "./Counter";
import logoChase from "@/assets/logo-chase.png";
import logoBoa from "@/assets/logo-boa.png";
import logoNavyFed from "@/assets/logo-navyfed.png";
import logoTruist from "@/assets/logo-truist.png";
import logoUsBank from "@/assets/logo-usbank.png";

const lenders = [
  { name: "Chase", amount: 35000, logo: logoChase },
  { name: "Bank of America", amount: 25000, logo: logoBoa },
  { name: "Navy Federal", amount: 20000, logo: logoNavyFed },
  { name: "Truist", amount: 25000, logo: logoTruist },
  { name: "US Bank", amount: 20000, logo: logoUsBank },
];

export default function LenderMatchVisual() {
  const maxAmount = 35000;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* LEFT: Stat cards stacked */}
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
           className="rounded-xl bg-white/5 border border-white/10 p-5 text-center flex-1 flex flex-col justify-center"
        >
          <span className="text-sm text-neutral-400 block">Credit Lines</span>
          <span className="text-4xl font-black text-white"><Counter target={7} /> Approved</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="rounded-xl bg-white/5 border border-white/10 p-5 text-center flex-1 flex flex-col justify-center"
        >
          <span className="text-sm text-neutral-400 block">Total Available</span>
          <span className="text-4xl font-black text-cyan-400">$<Counter target={125000} /></span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-sm text-neutral-300">Latest deposit: <span className="text-cyan-400 font-bold">$15,000</span></span>
        </motion.div>
      </div>

      {/* CENTER + RIGHT: Bar chart spanning 2 cols */}
      <div className="md:col-span-2 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col justify-center relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        <span className="text-sm uppercase tracking-widest text-neutral-500 mb-5 relative z-10">Funding By Lender</span>

        <div className="space-y-4 relative z-10">
          {lenders.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3 w-44 flex-shrink-0">
                <img src={l.logo} alt={l.name} className="w-8 h-8 object-contain brightness-0 invert opacity-70 flex-shrink-0" />
                <span className="text-base text-neutral-200 font-semibold">{l.name}</span>
              </div>
              <div className="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(l.amount / maxAmount) * 100}%` }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.7, type: "spring", stiffness: 60 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                  />
                </motion.div>
              </div>
              <span className="text-lg font-bold text-cyan-400 w-16 text-right">${(l.amount / 1000)}k</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
