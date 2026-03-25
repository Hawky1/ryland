import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface OrderItem {
  id: string;
  product_title: string;
  download_token: string;
  downloaded_at: string | null;
}

interface Order {
  id: string;
  shopify_order_number: string;
  customer_name: string;
  created_at: string;
  order_items: OrderItem[];
}

const MAX_POLL_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 3000;

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollCount = useRef(0);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data, error: fetchErr } = await supabase.functions.invoke(
          "fetch-order",
          { body: { shopify_order_id: orderId } }
        );

        if (fetchErr) throw fetchErr;

        if (data?.found && data.order) {
          setOrder(data.order as Order);
          setLoading(false);
          return;
        }

        // Order not found yet — webhook may still be processing
        pollCount.current += 1;
        if (pollCount.current < MAX_POLL_ATTEMPTS) {
          pollTimer.current = setTimeout(fetchOrder, POLL_INTERVAL_MS);
        } else {
          setError(
            "Your order is still being processed. Check your email shortly for download links."
          );
          setLoading(false);
        }
      } catch {
        setError("Something went wrong. Check your email for download links.");
        setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    };
  }, [orderId]);

  const downloadUrl = (token: string) =>
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/download-ebook?token=${token}`;

  return (
    <>
      <PageMeta
        title="Thank You for Your Purchase | Ryland"
        description="Download your purchased e-books immediately."
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Thank You for Your Purchase!
            </h1>
            <p className="text-muted-foreground text-lg">
              {loading
                ? "Loading your downloads…"
                : "Your e-books are ready to download. We've also sent download links to your email."}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Preparing your downloads…
              </p>
            </div>
          ) : error ? (
            <div className="bg-muted rounded-xl p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">{error}</p>
              <Link to="/my-orders">
                <Button variant="outline">Go to My Downloads</Button>
              </Link>
            </div>
          ) : order ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  Order #{order.shopify_order_number}
                </p>
                <p className="font-medium text-foreground">
                  Hi {order.customer_name}, here are your downloads:
                </p>
              </div>
              <div className="divide-y divide-border">
                {order.order_items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-foreground truncate">
                        {item.product_title}
                      </span>
                    </div>
                    <a
                      href={downloadUrl(item.download_token)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="gap-2 flex-shrink-0">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="bg-muted rounded-xl p-8 text-center">
              <p className="text-muted-foreground mb-4">
                No order ID provided. Check your email for download links.
              </p>
              <Link to="/my-orders">
                <Button variant="outline">Go to My Downloads</Button>
              </Link>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/my-orders"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Access your download library anytime →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou;
