

# Partner Portal — Full Diagnostic Report & Fix Plan

## How to Test

**Login URL:** `/portal/login`

You can log in with any of these existing test accounts (all status `approved`):
- `geno.ryland@outlook.com` — has no leads attached to their affiliate record
- `testpartner@rylandpartners.com` — has 6 leads and commission data (best for testing)
- `geenoo007@gmail.com` / `testportal2@mailinator.com` — no leads

All accounts were created via the `create-partner-account` edge function with a recovery email. If you don't know the password, use "Forgot password?" on the login page to trigger a reset link.

---

## Architecture Summary

```text
/partners (signup form) 
  → create-partner-account edge function
    → creates auth user (no password)
    → creates affiliates row (status: approved)
    → fires recovery email → /reset-password
    → syncs to GHL

/portal/login → AuthGuard (checks useAuth session)
  → /portal (PortalLayout wraps all child routes)
    ├── Dashboard (KPI cards, referral link)
    ├── Lead Tracker (table + submit drawer + detail drawer)
    ├── Commissions (earnings table)
    ├── Calculator (placeholder)
    ├── Resources (from resources table)
    ├── Events (from partner_events table)
    ├── Speaking (submit form)
    └── Settings (profile, payment email, W-9, password)
```

---

## Bugs Found

### BUG 1: `ghl-affiliate-webhook` duplicates the `create-partner-account` flow (Critical)

The `ghl-affiliate-webhook` has its own affiliate creation path (type `ContactTagAdded` / `affiliate_approve`) that generates random `AFF12345`-style IDs and creates users **with a temp password** instead of using the recovery email flow. This conflicts with the `create-partner-account` function which uses name-based IDs (`GRyland1`) and the passwordless recovery pattern. If both fire for the same partner, the second will fail or create a duplicate.

**Fix:** Remove the affiliate creation logic from `ghl-affiliate-webhook` (or guard it so it only runs when the partner was NOT created via the signup form). The webhook should only handle `lead_referred` and `OpportunityStageChanged`.

### BUG 2: `affiliate_leads` UPDATE policy missing (High)

The `affiliate_leads` table has no UPDATE RLS policy. The `ghl-affiliate-webhook` uses the service role key so it bypasses RLS, but:
- The admin "Approve" button in `LeadsTable.tsx` does nothing — it renders but has no `onClick` handler
- If you add an approve handler that updates `commission_status` via the client, it will fail because there's no UPDATE policy

**Fix:** Add an UPDATE RLS policy for `affiliate_leads` scoped to `affiliate_id = get_my_affiliate_id()` and wire the Approve button to actually call `supabase.from('affiliate_leads').update(...)`.

### BUG 3: `PortalSettings` uses `as any` casts for `payment_email` / `w9_file_url` (Medium)

The auto-generated types may not include the new columns yet, forcing `as any` casts at lines 39-40 and 73/105. This won't cause runtime errors but hides type-safety issues.

**Fix:** The types file should auto-regenerate after the migration. No code change needed unless it hasn't synced — verify the types include the new columns.

### BUG 4: Password reset page spinner issue (Medium)

The `ResetPassword.tsx` was previously fixed, but the recovery email `redirectTo` in `create-partner-account` points to `https://rylandpartners.com/reset-password`. In the preview/dev environment, the domain mismatch means the recovery link won't work at the preview URL. This is expected for production but will block testing in the preview.

**Fix:** For testing, you can trigger a password reset from the login page's "Forgot password?" button, which uses `window.location.origin` and will work in any environment.

### BUG 5: `PortalSpeaking` initializes form with potentially null affiliate values (Low)

The `useState` initializer for `full_name` and `email` runs once on mount. If `affiliate` is still `null` at mount (loading state), the form fields will be empty and won't update when affiliate data loads.

**Fix:** Add a `useEffect` that updates form fields when `affiliate` becomes available, or use controlled defaults from the affiliate object.

### BUG 6: Admin Approve button is non-functional (Medium)

In `LeadsTable.tsx` line 101-104, the Approve button renders but has no `onClick` handler — clicking it does nothing.

**Fix:** Add an onClick that updates `commission_status` to `'approved'` on the `affiliate_leads` table (requires the UPDATE RLS policy from Bug 2).

---

## What's Working Well

- **Signup flow**: Form validation, edge function, affiliate record creation, GHL sync, recovery email trigger — all correct
- **Auth system**: `AuthProvider` with `onAuthStateChange` + `getSession` fallback is solid
- **AuthGuard**: Correctly redirects unauthenticated users to `/portal/login`
- **Dashboard KPIs**: Queries commissions, leads, payouts correctly with proper RLS
- **Lead Tracker**: Pulls from `affiliate_leads` scoped by `get_my_affiliate_id()`, renders table with color-coded badges
- **Submit Lead Drawer**: Inserts into `affiliate_leads` with correct `affiliate_id` — INSERT RLS policy exists
- **Lead Detail Drawer**: Shows all fields with proper formatting
- **Commissions page**: Joins commissions with lead names, displays summary cards
- **Resources / Events / Speaking**: All query correctly with appropriate RLS
- **Settings page**: Profile display, payment email save, W-9 upload, password change all functional
- **Sidebar navigation**: Dark theme, collapsible, proper active states

---

## Implementation Plan

### Step 1: Fix `ghl-affiliate-webhook` — remove duplicate signup path
Strip the `ContactTagAdded` / `affiliate_approve` handler or convert it to a simple lookup-and-return. Partners are only created via the signup form.

### Step 2: Add UPDATE RLS policy for `affiliate_leads`
```sql
CREATE POLICY "Affiliates can update own leads"
ON public.affiliate_leads FOR UPDATE
TO authenticated
USING (affiliate_id = get_my_affiliate_id());
```

### Step 3: Wire Admin Approve button
Add `onClick` to the Approve button in `LeadsTable.tsx` that calls `supabase.from('affiliate_leads').update({ commission_status: 'approved' }).eq('id', lead.id)` with a confirmation toast.

### Step 4: Fix PortalSpeaking form initialization
Add `useEffect` to sync `full_name` and `email` from `affiliate` when it loads.

### Step 5: Clean up `as any` casts in PortalSettings
Once the Supabase types regenerate with the new columns, remove the `as any` casts.

