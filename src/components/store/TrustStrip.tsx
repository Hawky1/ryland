import { motion } from "framer-motion";
import { Download, ShieldCheck, BookOpen, BadgeCheck } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Download, label: "Instant Download", desc: "Get access immediately" },
  { icon: ShieldCheck, label: "Secure Checkout", desc: "100% encrypted payments" },
  { icon: BookOpen, label: "Expert-Crafted", desc: "Industry-proven strategies" },
  { icon: BadgeCheck, label: "Satisfaction Guaranteed", desc: "Results you can trust" },
];

const TrustStrip = () => {
  return (
    <section className="relative z-10 -mt-6 mb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 py-6 px-6 sm:px-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-tight">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
