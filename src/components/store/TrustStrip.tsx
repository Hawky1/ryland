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
    <section className="w-full bg-[#001228] py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/10">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-3 sm:px-8 first:sm:pl-0 last:sm:pr-0"
            >
              <item.icon className="w-4 h-4 text-blue-400/70 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90 leading-tight">
                  {item.label}
                </p>
                <p className="text-[10px] text-white/40 leading-tight mt-0.5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
