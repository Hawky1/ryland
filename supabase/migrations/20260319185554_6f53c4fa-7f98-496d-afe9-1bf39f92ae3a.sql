
-- Allow authenticated affiliates to insert leads linked to themselves
CREATE POLICY "Affiliates can insert own leads"
ON public.affiliate_leads FOR INSERT TO authenticated
WITH CHECK (affiliate_id = get_my_affiliate_id());
