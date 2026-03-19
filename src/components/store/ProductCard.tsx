import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, BookOpen } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
  onAddToCart: (product: ShopifyProduct) => void;
  isLoading: boolean;
}

const ProductCard = ({ product, index, onAddToCart, isLoading }: ProductCardProps) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-500/15 bg-gradient-to-br from-[#003A70] to-[#0060A9]">
        <Link to={`/product/${product.node.handle}`}>
          <div className="aspect-[4/5] bg-white/10 overflow-hidden flex items-center justify-center p-5">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || product.node.title}
                width={400}
                height={500}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <BookOpen className="w-16 h-16 text-white/30" />
            )}
          </div>
        </Link>

        <div className="p-5">
          <Link to={`/product/${product.node.handle}`}>
            <h3 className="font-bold text-white text-sm leading-snug mb-3 group-hover:text-blue-200 transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.node.title}
            </h3>
          </Link>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xl font-extrabold text-white">
                  ${parseFloat(price.amount).toFixed(0)}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-300/80 text-[10px] font-semibold uppercase tracking-wider">Instant Download</span>
                </div>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 disabled:opacity-50 backdrop-blur-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {isLoading ? "Adding..." : "Get Instant Access"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
