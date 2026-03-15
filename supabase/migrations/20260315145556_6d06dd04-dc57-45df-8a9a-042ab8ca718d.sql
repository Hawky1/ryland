CREATE TABLE public.sms_opt_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  consent_text text NOT NULL,
  ip_address text,
  user_agent text
);

ALTER TABLE public.sms_opt_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on sms_opt_ins"
  ON public.sms_opt_ins
  FOR INSERT
  TO public
  WITH CHECK (true);