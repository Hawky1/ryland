import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import bundleUltimate from "@/assets/bundle-ultimate-credit-stack.png";
import bundleMaster from "@/assets/bundle-master-credit.png";
import bundleStarter from "@/assets/bundle-starter.png";
import bundleAccelerator from "@/assets/bundle-accelerator.png";
import bundleFunding from "@/assets/bundle-funding-mastery.png";

const FEATURED = [
  {
    id: "ultimate-bundle",
    handle: "ultimate-credit-business-vault",
    image: bundleUltimate,
    title: "Ultimate Business Education Vault",
    subtitle: "18 Resources — Total Business Transformation",
    price: "$147",
    originalPrice: "$347",
    highlight: true,
  },
  {
    id: "credit-funding",
    handle: "the-ultimate-business-funding-credit-bundle",
    image: bundleFunding,
    title: "The Ultimate Business Funding & Credit Bundle",
    subtitle: "6 Advanced Business Funding Guides",
    price: "$147",
    originalPrice: "$162",
  },
  {
    id: "credit-accelerator",
    handle: "credit-authority-bundle",
    image: bundleMaster,
    title: "Business Authority Bundle",
    subtitle: "6 Premium eBooks for Financial Mastery",
    price: "$97",
    originalPrice: "$132",
  },
  {
    id: "credit-authority",
    handle: "credit-business-accelerator-pack",
    image: bundleAccelerator,
    title: "Entrepreneur Accelerator Pack",
    subtitle: "9 eBooks & Workbooks to Transform Your Finances",
    price: "$67",
    originalPrice: "$153",
  },
  {
    id: "credit-quickstart",
    handle: "business-credit-quickstart-kit-bundle",
    image: bundleStarter,
    title: "Business Credit Quickstart Kit",
    subtitle: "3 eBooks to Kick-Start Your Business Credit",
    price: "$47",
    originalPrice: "$51",
  },
];

interface FeaturedBundlesProps {
  onScrollToBundle: (bundleId: string) => void;
}

const FeaturedBundles = ({ onScrollToBundle }: FeaturedBundlesProps) => {
  return (
    <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      <HlsVideoBackground overlay="bg-[#003A70]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-full px-5 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Featured Bundles — Save Up to 70%
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Premium Bundle Collections
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Curated resource packs designed to fast-track your credit, funding, and business growth journey.
          </p>
        </motion.div>

        {/* Top featured — large card */}
        <Link to={`/product/${FEATURED[0].handle}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cursor-pointer group mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-950/60 to-slate-900/80 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-500 shadow-2xl shadow-blue-900/20 hover:shadow-blue-800/30">
            <div className="flex flex-col lg:flex-row items-center gap-6 p-6 sm:p-10">
              <div className="lg:w-[55%] w-full">
                <img
                  src={FEATURED[0].image}
                  alt={FEATURED[0].title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full rounded-2xl group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="lg:w-[45%] w-full text-center lg:text-left py-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
                  ⭐ Most Popular — Chosen by 2,400+ entrepreneurs
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {FEATURED[0].title}
                </h3>
                <p className="text-slate-400 text-lg mb-6">
                  {FEATURED[0].subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-6">
                  <span className="text-3xl font-extrabold text-white">{FEATURED[0].price}</span>
                  <span className="text-lg text-slate-500 line-through">{FEATURED[0].originalPrice}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                  <span className="shiny-cta !py-3 !px-8 !text-sm whitespace-nowrap">
                    <span>Get This Bundle</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </Link>

        {/* Remaining bundles — 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURED.slice(1).map((bundle, idx) => (
            <Link key={bundle.id} to={`/product/${bundle.handle}`} className="group">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/15 bg-gradient-to-br from-slate-900/90 to-blue-950/50 hover:border-blue-400/35 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-blue-900/20 h-full">
                  <div className="p-5">
                    <img
                      src={bundle.image}
                      alt={bundle.title}
                      width={400}
                      height={267}
                      loading="lazy"
                      className="w-full rounded-xl mb-5 group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug">
                      {bundle.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">{bundle.subtitle}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-extrabold text-white">{bundle.price}</span>
                      <span className="text-sm text-slate-500 line-through">{bundle.originalPrice}</span>
                    </div>
                    <span className="w-full inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200">
                      Get This Bundle <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBundles;
