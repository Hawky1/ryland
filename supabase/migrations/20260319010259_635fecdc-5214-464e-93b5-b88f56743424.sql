ALTER TABLE public.affiliate_leads
  ADD COLUMN IF NOT EXISTS company_name text,
  ADD COLUMN IF NOT EXISTS commission_amount numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS commission_status text,
  ADD COLUMN IF NOT EXISTS assigned_rep text,
  ADD COLUMN IF NOT EXISTS next_appointment_at timestamptz,
  ADD COLUMN IF NOT EXISTS next_step text,
  ADD COLUMN IF NOT EXISTS latest_update text;