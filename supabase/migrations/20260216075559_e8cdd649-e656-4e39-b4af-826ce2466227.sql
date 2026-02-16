
CREATE TABLE public.assessment_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  credit_score_range TEXT NOT NULL,
  primary_goal TEXT NOT NULL,
  business_status TEXT NOT NULL,
  funding_timeline TEXT NOT NULL,
  denied_recently BOOLEAN NOT NULL DEFAULT false,
  qualification TEXT NOT NULL DEFAULT 'credit_repair',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.assessment_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on assessment_leads"
ON public.assessment_leads
FOR INSERT
WITH CHECK (true);
