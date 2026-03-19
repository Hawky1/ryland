

## Plan: Auto-Create Partner Account on Signup with Password Reset Email

### What Happens Today
Partner fills out signup form → record saved to `partner_submissions` + GHL contact created → nothing else. No auth account, no portal access.

### New Flow
1. Partner fills out signup form
2. New edge function `create-partner-account` runs server-side:
   - Generates affiliate ID (`JSmith1` format, increments if duplicate)
   - Creates auth user with no password (`email_confirm: true`)
   - Inserts `affiliates` record (status: approved)
   - Inserts `partner_submissions` record
   - Sends password recovery email via `admin.generateLink({ type: 'recovery' })` — this is the built-in "Set Your Password" email
   - Syncs to GHL (non-critical)
3. Success screen tells partner: "Check your email to set your password"
4. Partner clicks email link → lands on `/reset-password` → sets password
5. Partner logs in at `/portal/login`

### Changes

**1. New edge function: `supabase/functions/create-partner-account/index.ts`**
- Public endpoint (no JWT required)
- Accepts: name, email, phone, business_name, referral_source, message
- Generates affiliate ID: first initial + last name + "1" (queries `affiliates` table, increments number if duplicate exists)
- Creates auth user via `admin.createUser()` — no password, `email_confirm: true`
- Inserts into `affiliates` (status: approved) and `partner_submissions`
- Calls `admin.generateLink({ type: 'recovery', email, options: { redirectTo: 'https://ryland.lovable.app/reset-password' } })` to trigger the password-set email
- Calls GHL create-contact inline (non-critical, wrapped in try/catch)
- Returns `{ success: true }` on success

**2. Update `supabase/config.toml`**
- Add `[functions.create-partner-account]` with `verify_jwt = false`

**3. New page: `src/pages/ResetPassword.tsx`**
- Simple branded form: "Create Your Password" with password + confirm fields
- Detects `type=recovery` token from URL hash (Supabase appends this)
- Calls `supabase.auth.updateUser({ password })` to set the password
- On success, redirects to `/portal/login` with a toast message

**4. Update `src/App.tsx`**
- Add `/reset-password` route pointing to the new ResetPassword page

**5. Update `src/components/PartnerSignupForm.tsx`**
- Replace current direct insert + GHL call with single call to `create-partner-account` edge function
- Success screen shows: "Check your email for a link to set your portal password" with check-spam note
- Remove the redirect to `/partner-onboarding` (partner needs to set password first)

**6. Update `src/pages/portal/PortalLogin.tsx`**
- Add a "Forgot password?" link that calls `supabase.auth.resetPasswordForEmail()` with redirect to `/reset-password`

### What the Partner Experiences
1. Fills out partner signup form on `/partners`
2. Sees success message: "Check your email to set your portal password"
3. Opens email, clicks "Reset Password" link (default Supabase email)
4. Lands on `/reset-password`, creates their password
5. Redirected to `/portal/login`, logs in
6. Full portal access

