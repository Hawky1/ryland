import { motion } from "framer-motion";
import { ShoppingBag, ArrowDown } from "lucide-react";
import bundleUltimate from "@/assets/bundle-ultimate-credit-stack.png";
import HlsVideoBackground from "@/components/HlsVideoBackground";

interface StoreHeroProps {
  onBrowse: () => void;
}

const StoreHero = ({ onBrowse }: StoreHeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <HlsVideoBackground overlay="bg-[#003A70]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-full px-5 py-2 text-sm font-medium mb-8">
              <ShoppingBag className="w-4 h-4" />
              Premium Digital Resources
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.08]">
              Your Blueprint to
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mt-1">
                Financial Freedom
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed mb-8">
              Actionable playbooks and proven strategies from industry experts. Build credit, secure funding, and scale your business — starting today.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
              {[
                { value: "40+", label: "Expert Guides" },
                { value: "10K+", label: "Entrepreneurs Served" },
                { value: "Instant", label: "Digital Delivery" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                  <span className="text-sm text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onBrowse}
                className="shiny-cta !py-3.5 !px-8 !text-base whitespace-nowrap focus:outline-none"
              >
                <span>Browse Collections</span>
              </button>
              <button
                onClick={onBrowse}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <ArrowDown className="w-4 h-4 animate-bounce" />
                See All Products
              </button>
            </div>
          </motion.div>

          {/* Right — Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-3xl blur-2xl" />
              <img
                src={bundleUltimate}
                alt="Premium ebook bundle collection"
                className="relative w-full max-w-md rounded-2xl shadow-2xl shadow-blue-900/30"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoreHero;
