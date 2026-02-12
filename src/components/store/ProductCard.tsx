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
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <Link to={`/product/${product.node.handle}`}>
          <div className="aspect-[4/5] bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center p-5">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || product.node.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <BookOpen className="w-16 h-16 text-slate-300" />
            )}
          </div>
        </Link>

        <div className="p-5">
          <Link to={`/product/${product.node.handle}`}>
            <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.node.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xl font-extrabold text-slate-900">
              ${parseFloat(price.amount).toFixed(0)}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 disabled:opacity-50 shadow-sm shadow-blue-500/20"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
