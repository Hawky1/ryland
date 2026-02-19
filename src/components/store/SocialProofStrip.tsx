import { motion } from "framer-motion";
import proofAmex from "@/assets/proof-amex.webp";
import proofBoa from "@/assets/proof-boa.webp";
import proofIbc from "@/assets/proof-ibc.webp";
import proofSouthstate from "@/assets/proof-southstate.webp";
import proofTruist from "@/assets/proof-truist.webp";
import proofUsbank from "@/assets/proof-usbank.webp";

const PROOFS = [
  { src: proofAmex, alt: "Amex Approval" },
  { src: proofBoa, alt: "Bank of America Approval" },
  { src: proofIbc, alt: "IBC Approval" },
  { src: proofSouthstate, alt: "SouthState Approval" },
  { src: proofTruist, alt: "Truist Approval" },
  { src: proofUsbank, alt: "US Bank Approval" },
];

const SocialProofStrip = () => {
  // Double the items for infinite marquee effect
  const items = [...PROOFS, ...PROOFS];

  return (
    <section className="w-full bg-[#001228] py-8 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-5"
      >
        Real Results From Real Clients
      </motion.p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#001228] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#001228] to-transparent z-10" />

        <div className="flex gap-6 animate-marquee-slow">
          {items.map((proof, i) => (
            <img
              key={i}
              src={proof.src}
              alt={proof.alt}
              className="h-28 sm:h-36 w-auto rounded-xl border border-white/10 flex-shrink-0 object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofStrip;
