
-- Enum types
CREATE TYPE public.affiliate_status AS ENUM ('pending', 'approved', 'suspended');
CREATE TYPE public.commission_status AS ENUM ('pending', 'approved', 'paid');
CREATE TYPE public.payout_status AS ENUM ('pending', 'processing', 'paid', 'failed');
CREATE TYPE public.speaker_request_status AS ENUM ('pending', 'reviewed', 'approved', 'declined');

-- 1. affiliates
CREATE TABLE public.affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  affiliate_id text UNIQUE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company_name text,
  website text,
  ghl_contact_id text,
  status affiliate_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. affiliate_leads
CREATE TABLE public.affiliate_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES public.affiliates(id) ON DELETE CASCADE NOT NULL,
  ghl_contact_id text,
  ghl_opportunity_id text,
  full_name text NOT NULL,
  email text,
  phone text,
  status text NOT NULL DEFAULT 'New Lead',
  pipeline_stage text NOT NULL DEFAULT 'New Lead',
  deal_amount numeric(12,2) DEFAULT 0,
  notes text,
  referred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. commissions
CREATE TABLE public.commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES public.affiliates(id) ON DELETE CASCADE NOT NULL,
  lead_id uuid REFERENCES public.affiliate_leads(id) ON DELETE SET NULL,
  commission_type text NOT NULL DEFAULT 'referral',
  commission_amount numeric(10,2) NOT NULL DEFAULT 0,
  commission_status commission_status NOT NULL DEFAULT 'pending',
  payout_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. payouts
CREATE TABLE public.payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES public.affiliates(id) ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL DEFAULT 0,
  status payout_status NOT NULL DEFAULT 'pending',
  payment_method text,
  payout_period text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. resources (not affiliate-scoped, read-only for all authenticated)
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  resource_type text NOT NULL DEFAULT 'link',
  file_url text,
  external_url text,
  is_placeholder boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 6. partner_events
CREATE TABLE public.partner_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  start_time time,
  end_time time,
  location text,
  event_link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 7. speaker_requests
CREATE TABLE public.speaker_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES public.affiliates(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  organization_name text,
  event_name text NOT NULL,
  requested_date date,
  event_location text,
  audience_description text,
  notes text,
  status speaker_request_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Security definer function to get affiliate id for current user (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.get_my_affiliate_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.affiliates WHERE user_id = auth.uid() LIMIT 1
$$;

-- Enable RLS on all tables
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaker_requests ENABLE ROW LEVEL SECURITY;

-- RLS: affiliates - own record only
CREATE POLICY "Affiliates can view own record" ON public.affiliates
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Affiliates can update own record" ON public.affiliates
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS: affiliate_leads - own affiliate's leads
CREATE POLICY "Affiliates can view own leads" ON public.affiliate_leads
  FOR SELECT TO authenticated
  USING (affiliate_id = public.get_my_affiliate_id());

-- RLS: commissions - own affiliate's commissions
CREATE POLICY "Affiliates can view own commissions" ON public.commissions
  FOR SELECT TO authenticated
  USING (affiliate_id = public.get_my_affiliate_id());

-- RLS: payouts - own affiliate's payouts
CREATE POLICY "Affiliates can view own payouts" ON public.payouts
  FOR SELECT TO authenticated
  USING (affiliate_id = public.get_my_affiliate_id());

-- RLS: resources - all authenticated can read
CREATE POLICY "Authenticated users can view resources" ON public.resources
  FOR SELECT TO authenticated
  USING (true);

-- RLS: partner_events - all authenticated can read
CREATE POLICY "Authenticated users can view events" ON public.partner_events
  FOR SELECT TO authenticated
  USING (true);

-- RLS: speaker_requests - own affiliate's requests + insert
CREATE POLICY "Affiliates can view own speaker requests" ON public.speaker_requests
  FOR SELECT TO authenticated
  USING (affiliate_id = public.get_my_affiliate_id());

CREATE POLICY "Affiliates can insert speaker requests" ON public.speaker_requests
  FOR INSERT TO authenticated
  WITH CHECK (affiliate_id = public.get_my_affiliate_id());

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON public.affiliates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_affiliate_leads_updated_at BEFORE UPDATE ON public.affiliate_leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON public.commissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON public.payouts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partner_events_updated_at BEFORE UPDATE ON public.partner_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_speaker_requests_updated_at BEFORE UPDATE ON public.speaker_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
