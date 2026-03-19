import { motion } from "framer-motion";
import proofAmex from "@/assets/proof-amex.webp";
import proofBoa from "@/assets/proof-boa.webp";
import proofIbc from "@/assets/proof-ibc.webp";
import proofSouthstate from "@/assets/proof-southstate.webp";
import proofTruist from "@/assets/proof-truist.webp";
import proofUsbank from "@/assets/proof-usbank.webp";
import proofBoa12k from "@/assets/proof-boa-12k.webp";
import proofBoa24k from "@/assets/proof-boa-24k.webp";
import proofCitizens7k from "@/assets/proof-citizens-7k.webp";
import proofBankUnited16k from "@/assets/proof-bankunited-16k.webp";
import proofNihfcu38k from "@/assets/proof-nihfcu-38k.webp";
import proofFnbo15k from "@/assets/proof-fnbo-15k.webp";
import proofFnbo45k from "@/assets/proof-fnbo-45k.webp";
import proofAmexBbc from "@/assets/proof-amex-bbc.webp";

const PROOFS = [
  { src: proofAmex, alt: "Amex Approval" },
  { src: proofBoa, alt: "Bank of America Approval" },
  { src: proofIbc, alt: "IBC Approval" },
  { src: proofSouthstate, alt: "SouthState Approval" },
  { src: proofTruist, alt: "Truist Approval" },
  { src: proofUsbank, alt: "US Bank Approval" },
  { src: proofBoa12k, alt: "BOA $12K Approval" },
  { src: proofBoa24k, alt: "Bank of America $12K Business Credit Approval" },
  { src: proofCitizens7k, alt: "Citizens Bank $7K Business Card Approval" },
  { src: proofBankUnited16k, alt: "BankUnited $16K Visa Business Card Approval" },
  { src: proofNihfcu38k, alt: "NIHFCU $5K — $38K Total CC Funding" },
  { src: proofFnbo15k, alt: "FNBO $15K 0% Business Credit Approval" },
  { src: proofFnbo45k, alt: "FNBO $45K 0% Business Credit in 3 Days" },
  { src: proofAmexBbc, alt: "American Express Blue Business Cash Card Approval" },
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
              width={200}
              height={144}
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
