-- Admin RLS Policies
-- These policies allow users with role='admin' in their app_metadata to access all records
-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
SELECT COALESCE(
    (auth.jwt()->'app_metadata'->>'role') = 'admin',
    (auth.jwt()->'user_metadata'->>'role') = 'admin',
    false
  );
$$;
-- Admin policies for affiliates table
CREATE POLICY "Admins can view all affiliates" ON public.affiliates FOR
SELECT TO authenticated USING (
    public.is_admin()
    OR user_id = auth.uid()
  );
CREATE POLICY "Admins can update all affiliates" ON public.affiliates FOR
UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Admin policies for affiliate_leads table
CREATE POLICY "Admins can view all leads" ON public.affiliate_leads FOR
SELECT TO authenticated USING (
    public.is_admin()
    OR affiliate_id = public.get_my_affiliate_id()
  );
CREATE POLICY "Admins can update all leads" ON public.affiliate_leads FOR
UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Admin policies for commissions table
CREATE POLICY "Admins can view all commissions" ON public.commissions FOR
SELECT TO authenticated USING (
    public.is_admin()
    OR affiliate_id = public.get_my_affiliate_id()
  );
CREATE POLICY "Admins can update all commissions" ON public.commissions FOR
UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can insert commissions" ON public.commissions FOR
INSERT TO authenticated WITH CHECK (public.is_admin());
-- Admin policies for payouts table
CREATE POLICY "Admins can view all payouts" ON public.payouts FOR
SELECT TO authenticated USING (
    public.is_admin()
    OR affiliate_id = public.get_my_affiliate_id()
  );
CREATE POLICY "Admins can manage payouts" ON public.payouts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Admin policies for resources table
CREATE POLICY "Admins can manage resources" ON public.resources FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Admin policies for partner_events table
CREATE POLICY "Admins can manage events" ON public.partner_events FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Admin policies for speaker_requests table
CREATE POLICY "Admins can view all speaker requests" ON public.speaker_requests FOR
SELECT TO authenticated USING (
    public.is_admin()
    OR affiliate_id = public.get_my_affiliate_id()
  );
CREATE POLICY "Admins can update speaker requests" ON public.speaker_requests FOR
UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Add commission_rate column to affiliates if not exists
ALTER TABLE public.affiliates
ADD COLUMN IF NOT EXISTS commission_rate numeric(5, 2) DEFAULT 10.00;
-- Create index for admin lookups
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON public.affiliates(status);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON public.commissions(commission_status);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON public.payouts(status);