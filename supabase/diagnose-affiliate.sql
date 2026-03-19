-- Diagnostic script to check affiliate access issues
-- Run this in Supabase SQL Editor as a superuser
-- 1. Check if the user exists in auth.users
SELECT id,
  email,
  created_at
FROM auth.users
WHERE id = '9ccb61ca-3b8e-43cd-a749-e90212b4ef1b';
-- 2. Check if there's an affiliate record for this user
SELECT *
FROM public.affiliates
WHERE user_id = '9ccb61ca-3b8e-43cd-a749-e90212b4ef1b';
-- 3. Check RLS policies are enabled
SELECT schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'affiliates';
-- 4. List all policies on affiliates table
SELECT policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'affiliates';
-- 5. Check if the get_my_affiliate_id function exists and works
SELECT public.get_my_affiliate_id();
-- 6. Test the exact query the app is running (as authenticated user would)
-- This simulates what the app does:
SELECT id,
  affiliate_id,
  full_name,
  email,
  phone,
  company_name,
  website,
  status
FROM public.affiliates
WHERE user_id = '9ccb61ca-3b8e-43cd-a749-e90212b4ef1b';
-- 7. If no affiliate record exists, check all affiliates to see the data structure
-- (Remove the LIMIT if you want to see all)
SELECT id,
  user_id,
  affiliate_id,
  email,
  status,
  created_at
FROM public.affiliates
LIMIT 10;