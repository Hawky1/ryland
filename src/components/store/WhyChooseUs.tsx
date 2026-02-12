import { motion } from "framer-motion";
import { Target, Users, TrendingUp } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";

const REASONS = [
  {
    icon: Target,
    title: "Actionable Strategies",
    desc: "Step-by-step blueprints you can implement immediately — no fluff, just results.",
  },
  {
    icon: Users,
    title: "Expert Authors",
    desc: "Created by professionals with decades of experience in credit, lending, and business funding.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    desc: "Thousands of entrepreneurs have used these guides to build credit, secure funding, and grow.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <HlsVideoBackground overlay="bg-[#003A70]/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Why Our Guides?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Every resource is designed with one goal: helping you take control of your financial future.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-5">
                <reason.icon className="w-7 h-7 text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
