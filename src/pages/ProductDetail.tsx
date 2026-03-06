import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, BookOpen, ArrowLeft, CheckCircle2, FileText, Layers, Tag, ShoppingBag, Shield, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { productContentMap } from "@/data/productContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SharedHead from "@/components/SharedHead";

import listingUbcb1 from "@/assets/listing-ubcb-1.png";
import listingUbcb2 from "@/assets/listing-ubcb-2.png";
import listingFp1 from "@/assets/listing-fp-1.png";
import listingFp2 from "@/assets/listing-fp-2.png";
import listingCips1 from "@/assets/listing-cips-1.png";
import listingCips2 from "@/assets/listing-cips-2.png";
import listingSch1 from "@/assets/listing-sch-1.png";
import listingSch2 from "@/assets/listing-sch-2.png";
import listingAdlp1 from "@/assets/listing-adlp-1.png";
import listingAdlp2 from "@/assets/listing-adlp-2.png";
import listingUccll1 from "@/assets/listing-uccll-1.png";
import listingUccll2 from "@/assets/listing-uccll-2.png";
import listingUcp1 from "@/assets/listing-ucp-1.png";
import listingDcrw1 from "@/assets/listing-dcrw-1.png";
import listingMmw1 from "@/assets/listing-mmw-1.png";
import listingSlpp1 from "@/assets/listing-slpp-1.png";
import listingC100k1 from "@/assets/listing-c100k-1.png";
import listingFlsw1 from "@/assets/listing-flsw-1.png";
import listing13wpod1 from "@/assets/listing-13wpod-1.png";
import listing23mwh1 from "@/assets/listing-23mwh-1.png";
import listingDcmg1 from "@/assets/listing-dcmg-1.png";

const promoImageImports: Record<string, string> = {
  "/src/assets/listing-ubcb-1.png": listingUbcb1,
  "/src/assets/listing-ubcb-2.png": listingUbcb2,
  "/src/assets/listing-fp-1.png": listingFp1,
  "/src/assets/listing-fp-2.png": listingFp2,
  "/src/assets/listing-cips-1.png": listingCips1,
  "/src/assets/listing-cips-2.png": listingCips2,
  "/src/assets/listing-sch-1.png": listingSch1,
  "/src/assets/listing-sch-2.png": listingSch2,
  "/src/assets/listing-adlp-1.png": listingAdlp1,
  "/src/assets/listing-adlp-2.png": listingAdlp2,
  "/src/assets/listing-uccll-1.png": listingUccll1,
  "/src/assets/listing-uccll-2.png": listingUccll2,
  "/src/assets/listing-ucp-1.png": listingUcp1,
  "/src/assets/listing-dcrw-1.png": listingDcrw1,
  "/src/assets/listing-mmw-1.png": listingMmw1,
  "/src/assets/listing-slpp-1.png": listingSlpp1,
  "/src/assets/listing-c100k-1.png": listingC100k1,
  "/src/assets/listing-flsw-1.png": listingFlsw1,
  "/src/assets/listing-13wpod-1.png": listing13wpod1,
  "/src/assets/listing-23mwh-1.png": listing23mwh1,
  "/src/assets/listing-dcmg-1.png": listingDcmg1,
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIdx]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <BookOpen className="w-16 h-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Product not found</h2>
        <Link to="/store" className="text-primary hover:underline mt-4">Back to Store</Link>
      </div>
    );
  }

  const content = handle ? productContentMap[handle] : null;
  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const mainImage = product.images.edges[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(product.priceRange.minVariantPrice.amount);

  // Build gallery: main shopify image + promo images
  const galleryImages: { url: string; alt: string }[] = [];
  if (mainImage) galleryImages.push({ url: mainImage.url, alt: mainImage.altText || product.title });
  if (content?.promoImages) {
    content.promoImages.forEach((path, i) => {
      const resolved = promoImageImports[path] || path;
      galleryImages.push({ url: resolved, alt: `${product.title} - Image ${i + 2}` });
    });
  }

  const activeImage = galleryImages[selectedImageIdx] || galleryImages[0];

  return (
    <div className="min-h-screen bg-slate-50 font-[Manrope,sans-serif]">
      <PageMeta
        title={`${product.title} | Ryland Partners Store`}
        description={content?.headline || product.description?.slice(0, 160) || "Digital product from Ryland Partners."}
      />
      <SharedHead />
      <Navbar />

      {/* Cart bar + Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-1 flex items-center justify-between">
        <Link to="/store" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <CartDrawer />
      </div>

      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Product image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-[#003A70] to-[#0060A9] rounded-3xl overflow-hidden flex items-center justify-center p-4 lg:p-6 shadow-2xl shadow-blue-900/20">
              {activeImage ? (
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="w-full h-full object-contain drop-shadow-2xl rounded-2xl"
                />
              ) : (
                <BookOpen className="w-24 h-24 text-white/30" />
              )}
            </div>

            {/* Thumbnail strip */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 mt-4">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      i === selectedImageIdx
                        ? "border-blue-600 shadow-md"
                        : "border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {content && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
                <Tag className="w-3.5 h-3.5" />
                {content.details.category}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              {product.title}
            </h1>

            {content && (
              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-6">
                {content.headline}
              </p>
            )}

            <p className="text-slate-500 leading-relaxed mb-8">
              {content?.description || product.description}
            </p>

            {/* Price + CTA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
              <div className="flex items-end gap-3 mb-5">
                <span className="text-4xl font-black text-slate-900">${price.toFixed(0)}</span>
                <div className="flex items-center gap-1.5 pb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Instant Download</span>
                </div>
              </div>

              {/* Variant selection */}
              {product.variants.edges.length > 1 && (
                <div className="mb-5">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Format</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((v, i) => (
                      <button
                        key={v.node.id}
                        onClick={() => setSelectedVariantIdx(i)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          i === selectedVariantIdx
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isLoading || !variant?.availableForSale}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl text-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25"
              >
                <ShoppingBag className="w-5 h-5" />
                {isLoading ? "Adding..." : !variant?.availableForSale ? "Sold Out" : "Get Instant Access"}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Checkout</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Instant Delivery</span>
              </div>
            </div>

            {/* Compact Product Details - inline */}
            {content && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                  <FileText className="w-4 h-4 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Format</p>
                  <p className="text-sm font-bold text-slate-900">{content.details.format}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                  <Layers className="w-4 h-4 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Length</p>
                  <p className="text-sm font-bold text-slate-900">{content.details.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                  <Tag className="w-4 h-4 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Category</p>
                  <p className="text-sm font-bold text-slate-900 text-[11px]">{content.details.category}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Rich content sections — only if we have curated content */}
      {content && (
        <>
          {/* What You'll Get */}
          <section className="bg-white border-y border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 tracking-tight">
                  What You'll Get
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {content.benefits.map((benefit, i) => {
                    const [bold, ...rest] = benefit.split(" – ");
                    const desc = rest.join(" – ");
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="flex items-start gap-3 bg-slate-50 rounded-xl p-5 border border-slate-100"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900">{bold}</span>
                          {desc && <span className="text-slate-500"> – {desc}</span>}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          {/* What's Included — Bundle only */}
          {content.bundleIncludes && content.bundleIncludes.length > 0 && (
            <section className="bg-gradient-to-br from-blue-50 to-slate-50 border-y border-slate-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    What's Included
                  </h2>
                  <p className="text-slate-500 mb-8">
                    {content.bundleIncludes.length} premium guides — individually valued at {content.bundleValue}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.bundleIncludes.map((item, i) => (
                      <motion.div
                        key={item.handle}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                      >
                        <Link
                          to={`/product/${item.handle}`}
                          className="flex items-center gap-4 bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">Individual price: {item.price}</p>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-slate-300 rotate-180 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Why You Need This */}
          {content.whyYouNeedThis && content.whyYouNeedThis.length > 0 && (
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 tracking-tight">
                  Why You Need This
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {content.whyYouNeedThis.map((reason, i) => {
                    const [bold, ...rest] = reason.split(" – ");
                    const desc = rest.join(" – ");
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="flex items-start gap-3 bg-blue-50 rounded-xl p-5 border border-blue-100"
                      >
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900">{bold}</span>
                          {desc && <span className="text-slate-500"> – {desc}</span>}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="bg-gradient-to-br from-[#001228] to-[#003A70] py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-blue-200/80 mb-8 max-w-xl mx-auto">
                Get instant access to {product.title} and start transforming your financial future today.
              </p>
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !variant?.availableForSale}
                className="bg-white text-slate-900 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-bold transition-all disabled:opacity-50 inline-flex items-center gap-2.5 shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Get Instant Access — ${price.toFixed(0)}
              </button>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
