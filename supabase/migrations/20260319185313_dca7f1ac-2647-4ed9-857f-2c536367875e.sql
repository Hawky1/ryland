
-- Add payment email and W-9 fields to affiliates
ALTER TABLE public.affiliates ADD COLUMN IF NOT EXISTS payment_email text;
ALTER TABLE public.affiliates ADD COLUMN IF NOT EXISTS w9_file_url text;

-- Create W-9 storage bucket (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('w9-uploads', 'w9-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- RLS: affiliates can upload their own W-9
CREATE POLICY "Affiliates can upload own w9"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'w9-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- RLS: affiliates can view their own W-9
CREATE POLICY "Affiliates can view own w9"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'w9-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- RLS: affiliates can update their own W-9
CREATE POLICY "Affiliates can update own w9"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'w9-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
