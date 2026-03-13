import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Clock, DollarSign, Shield, Lock, Zap } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import bundleImage from "@/assets/bundle-offer-hero.webp";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EBOOKS = [
  { title: "100 Dispute Letters That Work", cover: "/covers/100-dispute-letters.png" },
  { title: "13 Ways to Pay Off Debt Fast", cover: "/covers/13-ways-pay-off-debt.png" },
  { title: "How to Get $150K+ Funding for a New LLC", cover: "/covers/150k-funding-new-llc.png" },
  { title: "23 Money-Wasting Habits to Break", cover: "/covers/23-money-wasting-habits.png" },
  { title: "AI Credit Dispute Prompts", cover: "/covers/ai-credit-dispute-prompts.png" },
  { title: "Bankruptcy Removal Blueprint", cover: "/covers/bankruptcy-removal-blueprint.png" },
  { title: "Business Credit Basics 101", cover: "/covers/business-credit-basics-101.png" },
  { title: "Business Funding Checklist", cover: "/covers/business-funding-checklist.png" },
  { title: "Credit Building Resource Library", cover: "/covers/credit-building-resource-library.png" },
  { title: "Credit Inquiry Phone Script", cover: "/covers/credit-inquiry-phone-script.png" },
  { title: "Credit Education ChatGPT Prompts", cover: "/covers/credit-repair-chatgpt-prompts.png" },
  { title: "Credit Legal Rights Guide", cover: "/covers/credit-repair-legal-rights.png" },
  { title: "DIY Credit Master Guide", cover: "/covers/diy-credit-master-guide.png" },
  { title: "DIY Credit Workbook", cover: "/covers/diy-credit-repair-workbook.png" },
  { title: "Essential Business Credit Checklist", cover: "/covers/essential-business-credit-checklist.png" },
  { title: "Fast-Track Vendor Accounts", cover: "/covers/fast-track-vendor-accounts.png" },
  { title: "Inquiry Removal Guide", cover: "/covers/inquiry-removal-guide.png" },
  { title: "Late Payment Removal Guide", cover: "/covers/late-payment-removal-guide.png" },
];

const STATS = [
  { icon: Users, value: "10,000+", label: "Entrepreneurs Served" },
  { icon: Clock, value: "8+", label: "Years of Expertise" },
  { icon: DollarSign, value: "$150M+", label: "Capital Funded" },
];

const FAQS = [
  {
    q: "Is this just generic advice I can find online?",
    a: "No. These are proprietary templates, scripts, and strategies refined over 8+ years working with real clients. You won't find our exact dispute letters, lender lists, or funding playbooks anywhere else.",
  },
  {
    q: "What if I have bad credit right now?",
    a: "That's exactly who this is for. The bundle includes step-by-step educational guides, financial strategies, and credit-building resources designed to help you improve from any starting point.",
  },
  {
    q: "Do I get instant access?",
    a: "Yes. The moment your order is confirmed, you'll receive immediate digital access to all 18 resources. No waiting, no shipping — start today.",
  },
  {
    q: "Is there a guarantee?",
    a: "Absolutely. We offer a 100% money-back guarantee. If you don't find massive value in these resources, we'll refund your $47 — no questions asked.",
  },
];

export default function FunnelCoreOffer() {
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);
  const [bundleProduct, setBundleProduct] = useState<ShopifyProduct | null>(null);

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 250 });
        const products: ShopifyProduct[] = data?.data?.products?.edges || [];
        const bundle = products.find((p) =>
          p.node.title.toLowerCase().includes("ultimate") && p.node.title.toLowerCase().includes("bundle")
        );
        if (bundle) setBundleProduct(bundle);
      } catch (e) {
        console.error("Failed to fetch bundle product", e);
      }
    };
    fetchBundle();
  }, []);

  const handleAddToCart = async () => {
    if (!bundleProduct) {
      toast.error("Bundle not found. Please try again.");
      return;
    }
    const variant = bundleProduct.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: bundleProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  };

  const CtaBlock = () => (
    <div className="text-center space-y-3">
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="shiny-cta !text-base sm:!text-lg !py-4 !px-10 disabled:opacity-50"
      >
        <span>{isLoading ? "Adding..." : "Add to My Order for $47"}</span>
      </button>
      <div className="flex items-center justify-center gap-4 text-blue-200/40 text-xs">
        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure checkout</span>
        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant delivery</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Money-back guarantee</span>
      </div>
    </div>
  );

  return (
    <FunnelLayout step={2} label="Special Offer">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HlsVideoBackground overlay="bg-[#001F3F]/94" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-[Geist,sans-serif]">
              WAIT! Your Blueprint is on the way...
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                but do you want the unfair advantage?
              </span>
            </h1>
            {/* Bundle Image — immediately after headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="my-8"
            >
              <img
                src={bundleImage}
                alt="Ultimate Business Credit Bundle — 18 Ebooks"
                className="max-w-2xl mx-auto w-full rounded-xl"
              />
            </motion.div>

            <p className="text-blue-100/60 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              I'm giving you my entire library of playbooks. This is every secret, every bank hack, and every dispute template we've refined over 8 years.
            </p>

            {/* Hero CTA */}
            <CtaBlock />
          </motion.div>
        </div>
      </section>

      {/* Social Proof Stats — moved above value stack */}
      <section className="bg-[#001228] border-y border-white/5 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-bold text-white font-[Geist,sans-serif]">{s.value}</p>
                <p className="text-blue-200/40 text-xs sm:text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Stack + Covers Grid */}
      <section className="bg-[#00152B] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Price anchor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-blue-300/50 text-sm uppercase tracking-wider mb-2 font-[Inter,sans-serif]">
              Everything Inside the Bundle
            </p>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-2xl text-red-400/60 line-through font-bold">$447</span>
              <span className="text-5xl sm:text-6xl font-black text-white font-[Geist,sans-serif]">$47</span>
            </div>
            <p className="text-blue-200/40 text-sm">One-time payment • Instant access • 18 resources</p>
          </motion.div>

          {/* Covers grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mb-14">
            {EBOOKS.map((ebook, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: (i % 6) * 0.04 }}
                className="rounded-lg overflow-hidden group hover:scale-[1.04] transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={ebook.cover}
                    alt={ebook.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-1.5 py-1.5">
                  <p className="text-[10px] sm:text-xs text-white/70 font-medium line-clamp-2 text-center leading-tight">{ebook.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA after covers */}
          <CtaBlock />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#001228] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-[Geist,sans-serif] mb-2">
              Got Questions?
            </h2>
            <p className="text-blue-200/40 text-sm">We've got answers.</p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white/5 border border-white/10 rounded-xl px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-white text-sm sm:text-base font-medium hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-blue-100/60 text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Final CTA */}
          <div className="mt-12">
            <CtaBlock />
            <div className="text-center mt-4">
              <Link
                to="/funnel/founders"
                className="text-blue-300/40 hover:text-blue-300/60 text-sm underline underline-offset-4 transition-colors font-[Inter,sans-serif]"
              >
                No thanks, I'll pass
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FunnelLayout>
  );
}
