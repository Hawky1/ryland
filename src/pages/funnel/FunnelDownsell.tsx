import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import bundleImage from "@/assets/bundle-starter.png";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { useEffect, useState } from "react";


export default function FunnelDownsell() {
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);
  const [bundleProduct, setBundleProduct] = useState<ShopifyProduct | null>(null);

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 250 });
        const products: ShopifyProduct[] = data?.data?.products?.edges || [];
        // Look for a founders/downsell variant or fallback to the ultimate bundle
        const bundle = products.find(
          (p) => p.node.title.toLowerCase().includes("founder") || p.node.title.toLowerCase().includes("starter")
        ) || products.find(
          (p) => p.node.title.toLowerCase().includes("ultimate") && p.node.title.toLowerCase().includes("bundle")
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
      toast.error("Product not found. Please try again.");
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
    <FunnelLayout step={3} label="Founder Discount">
      <section className="relative min-h-[80vh] flex items-center">
        <HlsVideoBackground overlay="bg-[#001F3F]/94" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/20 rounded-full px-4 py-1.5 text-xs font-bold text-orange-300 uppercase tracking-wider mb-6 font-[Inter,sans-serif]">
              <AlertTriangle className="w-3.5 h-3.5" /> Last Chance — Founders Only
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-[Geist,sans-serif]">
              I get it — you're just starting.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                How about this?
              </span>
            </h1>
            <p className="text-blue-100/60 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              I'd rather you have the information than stay stuck. This is the{" "}
              <strong className="text-white">last time you'll see this price.</strong>{" "}
              No fluff, just the roadmap to $250K.
            </p>

            {/* Value breakdown */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xl text-red-400/50 line-through">$447</span>
              <span className="text-xl text-red-400/50 line-through">$47</span>
              <span className="text-5xl sm:text-6xl font-black text-white font-[Geist,sans-serif]">$27</span>
            </div>
            <p className="text-blue-200/40 text-sm mb-10">One-time payment • Same 18 resources • Instant access</p>

            {/* Bundle Image */}
            <div className="mb-12">
              <img
                src={bundleImage}
                alt="Starter Bundle — 9 Ebooks"
                className="max-w-md sm:max-w-lg mx-auto w-full rounded-xl"
              />
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="shiny-cta !text-base sm:!text-lg !py-4 !px-10 disabled:opacity-50"
              >
                <span>{isLoading ? "Adding..." : "Yes, I Want the $27 Founder Discount"}</span>
              </button>
              <div>
                <Link
                  to="/funnel/consultation"
                  className="text-blue-300/40 hover:text-blue-300/60 text-sm underline underline-offset-4 transition-colors font-[Inter,sans-serif]"
                >
                  No thanks, take me to the free consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </FunnelLayout>
  );
}
