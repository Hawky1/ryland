
CREATE TABLE public.partner_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  referral_source TEXT,
  message TEXT
);

ALTER TABLE public.partner_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on partner_submissions"
ON public.partner_submissions
FOR INSERT
WITH CHECK (true);
