
ALTER TABLE public.partner_submissions
  ADD COLUMN IF NOT EXISTS ghl_contact_id TEXT,
  ADD COLUMN IF NOT EXISTS affiliate_link TEXT;
