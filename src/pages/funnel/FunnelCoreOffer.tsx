import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Users, Clock, DollarSign } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import BookMockup3D from "@/components/funnel/BookMockup3D";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const EBOOKS = [
  "100 Dispute Letters That Work",
  "13 Ways to Pay Off Debt Fast",
  "How to Get $150K+ Funding for a New LLC",
  "23 Money-Wasting Habits to Break",
  "AI Credit Dispute Prompts",
  "Bankruptcy Removal Blueprint",
  "Business Credit Basics 101",
  "Business Funding Checklist",
  "Credit Building Resource Library",
  "Credit Inquiry Phone Script",
  "Credit Repair ChatGPT Prompts",
  "Credit Repair Legal Rights Guide",
  "DIY Credit Master Guide",
  "DIY Credit Repair Workbook",
  "Essential Business Credit Checklist",
  "Fast-Track Vendor Accounts",
  "Inquiry Removal Guide",
  "Late Payment Removal Guide",
];

const COVERS = [
  "/covers/ultimate-business-credit-blueprint.png",
  "/covers/100-dispute-letters.png",
  "/covers/150k-funding-new-llc.png",
  "/covers/credit-score-accelerator.png",
  "/covers/secret-lenders-database.png",
  "/covers/diy-credit-master-guide.png",
  "/covers/financial-playbook.png",
  "/covers/master-your-credit.png",
];

const STATS = [
  { icon: Users, value: "10,000+", label: "Entrepreneurs Served" },
  { icon: Clock, value: "8+", label: "Years of Expertise" },
  { icon: DollarSign, value: "$150M+", label: "Capital Funded" },
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

  return (
    <FunnelLayout step={2} label="Special Offer">
      {/* Hook Banner */}
      <section className="relative overflow-hidden">
        <HlsVideoBackground overlay="bg-[#001F3F]/94" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-400/20 rounded-full px-4 py-1.5 text-xs font-bold text-yellow-300 uppercase tracking-wider mb-6 font-[Inter,sans-serif]">
              ⚡ One-Time Offer — Don't Miss This
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-[Geist,sans-serif]">
              WAIT! Your Blueprint is on the way...
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                but do you want the unfair advantage?
              </span>
            </h1>
            <p className="text-blue-100/60 text-base sm:text-lg max-w-2xl mx-auto mb-10">
              I'm giving you my entire library of playbooks. This is every secret, every bank hack, and every dispute template we've refined over 8 years.
            </p>
          </motion.div>

          {/* 3D Stacked Covers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <BookMockup3D variant="stacked" covers={COVERS} />
          </motion.div>
        </div>
      </section>

      {/* Value Stack + Checklist */}
      <section className="bg-[#00152B] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Value Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-blue-300/50 text-sm uppercase tracking-wider mb-2 font-[Inter,sans-serif]">
              The Ultimate Business Credit Bundle
            </p>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-2xl text-red-400/60 line-through font-bold">$447</span>
              <span className="text-5xl sm:text-6xl font-black text-white font-[Geist,sans-serif]">$47</span>
            </div>
            <p className="text-blue-200/40 text-sm">One-time payment • Instant access • 18 resources</p>
          </motion.div>

          {/* 18-resource checklist */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-12">
            {EBOOKS.map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 py-2"
              >
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100/80 text-sm">{title}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="shiny-cta !text-base sm:!text-lg !py-4 !px-10 disabled:opacity-50"
            >
              <span>{isLoading ? "Adding..." : "Add to My Order for $47"}</span>
            </button>
            <div>
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

      {/* Social Proof */}
      <section className="bg-[#001228] border-t border-white/5 py-12">
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
    </FunnelLayout>
  );
}
