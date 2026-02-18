import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, BookOpen, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import PageMeta from "@/components/PageMeta";
import SharedHead from "@/components/SharedHead";
const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700">Product not found</h2>
        <Link to="/store" className="text-blue-600 hover:underline mt-4">Back to Store</Link>
      </div>
    );
  }

  const images = product.images.edges;
  const variant = product.variants.edges[selectedVariantIdx]?.node;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta title={`${product.title} | Ryland Partners Store`} description={product.description?.slice(0, 160) || "Digital product from Ryland Partners."} />
      <SharedHead />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-end">
        <CartDrawer />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/store" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-slate-200 mb-4">
              {images[selectedImage] ? (
                <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-20 h-20 text-slate-300" /></div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-blue-600' : 'border-slate-200'}`}>
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.title}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              ${variant ? parseFloat(variant.price.amount).toFixed(2) : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>

            {/* Variant selection */}
            {product.variants.edges.length > 1 && (
              <div className="mb-6">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Format</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((v, i) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIdx(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${i === selectedVariantIdx ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

            <button
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? "Adding..." : !variant?.availableForSale ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
