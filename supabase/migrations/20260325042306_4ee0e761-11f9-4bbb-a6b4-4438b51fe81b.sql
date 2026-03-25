
-- Block authenticated users from updating/deleting user_roles
CREATE POLICY "Block authenticated updates on user_roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Block authenticated deletes on user_roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (false);

-- Trigger to prevent non-admin users from changing commission_status on affiliate_leads
CREATE OR REPLACE FUNCTION public.protect_commission_status()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
AS $$
BEGIN
  -- If commission_status is being changed, only allow admins
  IF OLD.commission_status IS DISTINCT FROM NEW.commission_status THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Only admins can change commission_status';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_commission_status_admin
  BEFORE UPDATE ON public.affiliate_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_commission_status();
