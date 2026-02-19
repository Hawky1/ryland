import { motion } from "framer-motion";
import HlsVideoBackground from "@/components/HlsVideoBackground";

interface PreFooterCTAProps {
  onBrowse: () => void;
}

const PreFooterCTA = ({ onBrowse }: PreFooterCTAProps) => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <HlsVideoBackground overlay="bg-[#001228]/95" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Join 10,000+ entrepreneurs who transformed their credit and funding with our proven blueprints.
          </p>
          <button
            onClick={onBrowse}
            className="shiny-cta !py-4 !px-10 !text-base sm:!text-lg whitespace-nowrap focus:outline-none"
          >
            <span>Start Your Journey</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
