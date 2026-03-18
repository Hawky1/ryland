
-- Create orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_order_id text UNIQUE NOT NULL,
  shopify_order_number text,
  email text NOT NULL,
  customer_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public can't read orders directly (edge functions use service role)
CREATE POLICY "No public access on orders" ON public.orders FOR SELECT TO public USING (false);

-- Create order_items table
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  shopify_product_handle text NOT NULL,
  product_title text NOT NULL,
  download_token uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  downloaded_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access on order_items" ON public.order_items FOR SELECT TO public USING (false);

-- Create ebooks storage bucket (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('ebooks', 'ebooks', false);

-- No public RLS policies on ebooks bucket - only service role access
