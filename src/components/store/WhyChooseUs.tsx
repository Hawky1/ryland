import { motion } from "framer-motion";
import { ShieldCheck, Clock, Zap } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What format are the guides in?",
    a: "All guides are delivered as high-quality PDF documents that you can read on any device — phone, tablet, or computer. No special software required.",
  },
  {
    q: "Will this work for my situation?",
    a: "Our guides cover a wide range of credit scores and business stages. Whether you're starting from scratch or optimizing existing credit, there's a playbook designed for you.",
  },
  {
    q: "How quickly will I see results?",
    a: "Many clients report improvements within 30–60 days of implementing the strategies. Results vary based on your starting point and how consistently you apply the steps.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes — if you're not satisfied with your purchase, contact us within 30 days for a full refund. No questions asked.",
  },
  {
    q: "Do I get lifetime access?",
    a: "Absolutely. Once you purchase a guide, it's yours forever. Download it, save it, and reference it anytime you need.",
  },
];

interface WhyChooseUsProps {
  onBrowse?: () => void;
}

const WhyChooseUs = ({ onBrowse }: WhyChooseUsProps) => {
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
            Got Questions? We've Got Answers.
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left — FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm px-5 overflow-hidden"
                >
                  <AccordionTrigger className="text-white text-sm sm:text-base font-semibold hover:no-underline py-5 [&>svg]:text-blue-300">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Right — Guarantee Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 w-full text-center lg:text-left">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                30-Day Satisfaction Guarantee
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Every guide comes with a no-questions-asked refund policy. If it doesn't deliver value, you get your money back. Period.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">Start reading in 2 minutes</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">Lifetime access — no expiration</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">30-day money-back guarantee</span>
                </div>
              </div>

              {onBrowse && (
                <button
                  onClick={onBrowse}
                  className="shiny-cta !py-3 !px-8 !text-sm whitespace-nowrap focus:outline-none"
                >
                  <span>Browse All Guides</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
