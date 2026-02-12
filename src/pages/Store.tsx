import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Loader2, BookOpen, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import logoDark from "@/assets/logo-dark.png";
import logoWhite from "@/assets/logo-white.png";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import InfiniteGrid from "@/components/ui/infinite-grid";
import { motion } from "framer-motion";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/Footer";

const BUNDLES = [
  { id: "credit-authority", tag: "Credit Authority Bundle", name: "Credit Authority Bundle", tagline: "Premium blueprints and lender lists to dominate business credit" },
  { id: "credit-accelerator", tag: "Credit Business Accelerator", name: "Credit Business Accelerator", tagline: "Essential DIY guides and workbooks for credit mastery" },
  { id: "credit-funding", tag: "Credit Business Funding", name: "Credit Business Funding", tagline: "Advanced strategies to secure $50K–$250K+ in business capital" },
  { id: "credit-quickstart", tag: "Credit Business Quickstart", name: "Credit Business Quickstart", tagline: "Get started with business credit in days, not months" },
  { id: "ultimate-bundle", tag: "Ultimate Credit Business Bundle", name: "Ultimate Credit Business Bundle", tagline: "The complete 16-resource library for total credit transformation" },
  { id: "standalone", tag: "Standalone", name: "Standalone Guides", tagline: "Specialized guides for homebuying and credit optimization" },
];

const Store = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBundle, setActiveBundle] = useState(BUNDLES[0].id);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 250 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title });
  };

  const scrollToBundle = (bundleId: string) => {
    setActiveBundle(bundleId);
    sectionRefs.current[bundleId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getProductsForBundle = (tag: string) =>
    products.filter(p => p.node.tags.includes(tag));

  return (
    <div className="min-h-screen bg-slate-50 font-[Manrope,sans-serif]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <a href="/#services" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Services</a>
            <a href="/#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Community</a>
            <Link to="/store" className="text-sm text-slate-900 font-medium">Store</Link>
            <a href="/#cta" className="shiny-cta !py-2 !px-5 !text-sm whitespace-nowrap focus:outline-none">
              <span>Contact</span>
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <InfiniteGrid />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-full px-5 py-2 text-sm font-medium mb-8">
              <ShoppingBag className="w-4 h-4" />
              Digital Products & Resources
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Expert Guides to Master
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Credit, Funding & Growth
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Actionable playbooks and proven strategies from industry experts. Build credit, secure funding, and scale your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bundle Navigation */}
      <div className="sticky top-[65px] z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {BUNDLES.map(bundle => (
              <button
                key={bundle.id}
                onClick={() => scrollToBundle(bundle.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  activeBundle === bundle.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {bundle.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Bundles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 mb-2">No products found</h2>
            <p className="text-slate-500">Check back soon for new ebooks and guides.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {BUNDLES.map((bundle) => {
              const bundleProducts = getProductsForBundle(bundle.tag);
              if (bundleProducts.length === 0) return null;
              return (
                <section
                  key={bundle.id}
                  ref={(el) => { sectionRefs.current[bundle.id] = el; }}
                  className="scroll-mt-36"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-3">
                      {bundleProducts.length} {bundleProducts.length === 1 ? "Product" : "Products"}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                      {bundle.name}
                    </h2>
                    <p className="text-slate-500 text-base sm:text-lg max-w-2xl">
                      {bundle.tagline}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bundleProducts.map((product, idx) => {
                      const image = product.node.images.edges[0]?.node;
                      const price = product.node.priceRange.minVariantPrice;
                      return (
                        <motion.div
                          key={product.node.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: idx * 0.06 }}
                          whileHover={{ y: -4 }}
                          className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                          <Link to={`/product/${product.node.handle}`}>
                            <div className="aspect-[3/4] bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
                              {image ? (
                                <img
                                  src={image.url}
                                  alt={image.altText || product.node.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <BookOpen className="w-16 h-16 text-slate-300" />
                                </div>
                              )}
                            </div>
                          </Link>
                          <div className="p-5">
                            <Link to={`/product/${product.node.handle}`}>
                              <h3 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {product.node.title}
                              </h3>
                            </Link>
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center bg-blue-50 text-blue-700 font-bold text-lg px-3 py-1 rounded-lg">
                                ${parseFloat(price.amount).toFixed(0)}
                              </span>
                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 shadow-sm shadow-blue-500/20"
                              >
                                {isLoading ? "Adding..." : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;
