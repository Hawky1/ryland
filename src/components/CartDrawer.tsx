import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, ShieldCheck, Zap, Lock } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = () => {
  const isOpen = useCartStore(state => state.isCartOpen);
  const setCartOpen = useCartStore(state => state.setCartOpen);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setCartOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open cart" className="relative border-slate-200 hover:bg-slate-50 transition-all duration-200">
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600 text-white border-0">
                  {totalItems}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0 border-l border-slate-200/60 bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 bg-white border-b border-slate-100">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
              Your Cart
            </SheetTitle>
          </SheetHeader>
          {totalItems > 0 && (
            <p className="text-sm text-slate-500 mt-1.5">
              {totalItems} item{totalItems !== 1 ? 's' : ''} · ${totalPrice.toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                  <ShoppingCart className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-1">Your cart is empty</h3>
                <p className="text-slate-500 text-sm max-w-[240px] mx-auto leading-relaxed">
                  Browse our collection and add items you'd like to purchase.
                </p>
              </motion.div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
                <AnimatePresence mode="popLayout">
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.variantId}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.25 }}
                        className="group flex gap-4 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="w-[72px] h-[72px] bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-slate-100">
                          {item.product.node.images?.edges?.[0]?.node ? (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={item.product.node.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="w-5 h-5 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="font-medium text-slate-900 truncate text-sm leading-tight">
                              {item.product.node.title}
                            </h4>
                            {item.selectedOptions.length > 0 && (
                              <p className="text-xs text-slate-500 mt-0.5">
                                {item.selectedOptions.map(o => o.value).join(' · ')}
                              </p>
                            )}
                          </div>
                          <p className="font-semibold text-slate-900 text-sm">
                            ${parseFloat(item.price.amount).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-between flex-shrink-0 py-0.5">
                          <button
                            onClick={() => removeItem(item.variantId)}
                            aria-label={`Remove ${item.product.node.title} from cart`}
                            className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex items-center gap-0.5 bg-slate-50 rounded-lg border border-slate-100">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-slate-700 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              {/* Checkout Footer */}
              <div className="flex-shrink-0 border-t border-slate-100 bg-white px-6 pb-6 pt-5">
                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-5 mb-4">
                  {[
                    { icon: Zap, label: "Instant Delivery" },
                    { icon: ShieldCheck, label: "Secure Checkout" },
                    { icon: Lock, label: "Encrypted" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-slate-500">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm font-medium text-slate-500">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">${totalPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 ml-1.5">USD</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleCheckout}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200"
                    size="lg"
                    disabled={items.length === 0 || isLoading || isSyncing}
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Proceed to Checkout
                        <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-[10px] text-slate-500 text-center mt-3 leading-relaxed">
                  You'll be redirected to Shopify's secure checkout
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
