-- BUG 2: Add UPDATE RLS policy for affiliate_leads
CREATE POLICY "Affiliates can update own leads"
ON public.affiliate_leads FOR UPDATE
TO authenticated
USING (affiliate_id = get_my_affiliate_id());