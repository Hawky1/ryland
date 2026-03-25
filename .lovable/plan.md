

# Comprehensive QA Audit Report — Ryland Partners

## SECURITY

### CRITICAL — Any authenticated user can self-escalate to admin
- **Severity**: CRITICAL
- **Location**: `user_roles` table (database)
- **Issue**: The `user_roles` table has RLS enabled but **no INSERT policy**. Any authenticated user can insert a row granting themselves the `admin` role. Since `has_role()` reads from this table, they would bypass all admin-only checks.
- **Fix**: Add a restrictive INSERT policy on `user_roles` that permits only the service role:
```sql
CREATE POLICY "Only service role can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (false);
```

### CRITICAL — Client-side admin role check in PortalLogin is bypassable
- **Severity**: CRITICAL
- **Location**: `src/pages/portal/PortalLogin.tsx` lines 36-37
- **Issue**: After login, admin routing is determined by checking `user_metadata.role` or `app_metadata.role`. User metadata can be set by the client. This is a privilege escalation vector — a user could manipulate their metadata to route to `/admin`. The `AdminGuard` does check `has_role()` server-side, so the actual admin pages are protected, but the routing logic is misleading and a defense-in-depth failure.
- **Fix**: Remove the metadata-based admin check from PortalLogin. Instead, always navigate to `/portal` and let the admin dashboard be accessed separately, or use the `has_role` RPC to determine the redirect.

### CRITICAL — `useAdminRole` also checks client-side metadata first
- **Severity**: CRITICAL
- **Location**: `src/hooks/useAdminRole.ts` lines 26-31
- **Issue**: The hook short-circuits the server-side `has_role()` RPC if `user_metadata.role === 'admin'`. Since users can modify their own `user_metadata`, this bypasses the secure `user_roles` table check entirely. An attacker could call `supabase.auth.updateUser({ data: { role: 'admin' } })` from the browser console to gain admin access.
- **Fix**: Remove the `user_metadata`/`app_metadata` shortcut entirely. Always rely on the `has_role` RPC.

### MEDIUM — Weak OTP generation in lookup-orders
- **Severity**: MEDIUM
- **Location**: `supabase/functions/lookup-orders/index.ts` line 38
- **Issue**: Uses `Math.random()` for generating verification codes, which is not cryptographically secure.
- **Fix**: Use `crypto.getRandomValues()`:
```typescript
const array = new Uint32Array(1);
crypto.getRandomValues(array);
const verificationCode = String(100000 + (array[0] % 900000));
```

### MEDIUM — Leaked password protection disabled
- **Severity**: MEDIUM
- **Issue**: The authentication system does not check passwords against known breach databases.
- **Fix**: Enable leaked password protection via auth configuration.

### MEDIUM — 5 overly permissive RLS policies (`USING(true)` on INSERT/UPDATE/DELETE)
- **Severity**: MEDIUM
- **Issue**: Multiple tables have `WITH CHECK (true)` policies allowing unrestricted writes.
- **Fix**: Audit each policy and restrict to the appropriate user scope (e.g., `auth.uid() = user_id`).

### LOW — 4 database functions missing `search_path` setting
- **Severity**: LOW
- **Location**: `enqueue_email`, `read_email_batch`, `delete_email`, `move_to_dlq`
- **Fix**: Add `SET search_path = public` to each function definition.

---

## SEO & META

### MEDIUM — Missing PageMeta on 4 high-traffic pages
- **Severity**: MEDIUM
- **Pages affected**:
  - `src/pages/About.tsx` — No `<PageMeta>`, so page title stays as whatever was set by the previous page
  - `src/pages/Funding.tsx` — Same issue
  - `src/pages/CreditRepair.tsx` — Same issue
  - `src/pages/Community.tsx` — Same issue
- **Fix**: Add `<PageMeta title="..." description="..." />` to each page component.

### LOW — Footer link points to `/#services` (non-existent anchor)
- **Severity**: LOW
- **Location**: `src/components/Footer.tsx` line 38
- **Issue**: "1-on-1 Consultation" links to `/#services` but the homepage has no element with `id="services"`. The closest is `id="features"`.
- **Fix**: Change to `/consultation` for a direct link, or update to `/#features`.

### LOW — Sitemap missing newer pages
- **Severity**: LOW
- **Location**: `public/sitemap.xml`
- **Issue**: Missing `/consultation`, `/community` (wait — community IS there), `/opt-in`, `/thank-you`, `/my-orders`, `/credit-intake`.
- **Fix**: Add key public pages to the sitemap. Portal/admin pages should remain excluded.

---

## CODE QUALITY

### MEDIUM — Production console.log statements
- **Severity**: MEDIUM
- **Locations**:
  - `src/hooks/useAuth.tsx` — 5 console.log calls leaking user IDs and auth state to browser console
  - `src/components/funnel/ConsultationCalendar.tsx` — 5 debug console.log calls with `[GHL Debug]` prefix
- **Fix**: Remove or gate behind `import.meta.env.DEV`.

### LOW — `dangerouslySetInnerHTML` for CSS styles
- **Severity**: LOW
- **Locations**: `Index.tsx`, `About.tsx`, `Partners.tsx`, `FunnelLayout.tsx`
- **Issue**: Used for injecting CSS animations/keyframes. While these are static strings (not user input), it bypasses React's XSS protections. Not a live vulnerability since the content is hardcoded.
- **Recommendation**: Move these styles to `src/index.css` or a dedicated CSS module for cleanliness.

---

## FUNCTIONAL

### MEDIUM — Admin commission approval bypasses RLS
- **Severity**: MEDIUM
- **Location**: `src/components/portal/LeadsTable.tsx` lines 39-51
- **Issue**: The "Approve" button in admin mode calls `supabase.from("affiliate_leads").update(...)` directly from the client using the user's session. If the `affiliate_leads` table has an overly permissive UPDATE policy (which the security scan suggests), any authenticated user with the admin toggle could approve commissions. The admin toggle is client-side only (a single `useState` in `PortalLeads.tsx`).
- **Fix**: Move commission approval to a server-side edge function that validates the caller has the admin role via `has_role()`.

### LOW — SubmitLeadDrawer doesn't validate email format
- **Severity**: LOW
- **Location**: `src/components/portal/SubmitLeadDrawer.tsx`
- **Issue**: Only checks if name and email are non-empty strings, but doesn't validate email format. Uses `type="email"` on the input (browser-level validation) but no zod/programmatic validation.
- **Fix**: Add zod validation matching the pattern used in Contact and Assessment forms.

---

## ACCESSIBILITY

### MEDIUM — Assessment page H1 is `sr-only`
- **Severity**: MEDIUM  
- **Location**: `src/pages/Assessment.tsx` line 264
- **Issue**: The visible heading hierarchy starts at H2. While there's an `sr-only` H1 for screen readers, the visual page has no visible H1. This is acceptable per WCAG but inconsistent with the project's stated heading hierarchy standard.

### LOW — FAQ accordion buttons missing `aria-controls`
- **Severity**: LOW
- **Location**: `src/pages/Index.tsx` lines 388-399
- **Issue**: FAQ toggle buttons have `aria-expanded` but no `aria-controls` pointing to the expandable content's ID.

---

## PERFORMANCE

### LOW — InfiniteGrid rendered on every page with Navbar
- **Severity**: LOW
- **Issue**: Multiple pages (Index, About, Funding, CreditRepair, Store, Contact, etc.) each render their own `<InfiniteGrid>` background. This is a canvas-based animation running continuously.
- **Note**: Already mitigated by direct DOM manipulation (per project memory), but worth verifying on lower-end devices.

---

## SUMMARY BY SEVERITY

| Severity | Count | Key Items |
|----------|-------|-----------|
| CRITICAL | 3 | user_roles INSERT escalation, useAdminRole metadata bypass, PortalLogin metadata routing |
| MEDIUM | 7 | Weak OTP, permissive RLS, missing PageMeta (x4), console.log in prod, commission approval bypass, leaked password protection |
| LOW | 6 | search_path on functions, footer broken link, sitemap gaps, dangerouslySetInnerHTML, email validation, FAQ aria |

---

## RECOMMENDED FIX PRIORITY

1. **Immediately**: Lock down `user_roles` INSERT policy and remove `user_metadata` admin shortcut from `useAdminRole.ts` and `PortalLogin.tsx`
2. **Before launch**: Fix weak OTP, add PageMeta to 4 pages, remove console.log statements, audit permissive RLS policies
3. **Post-launch polish**: Sitemap updates, footer link fix, aria improvements, move inline CSS to stylesheets

Shall I proceed with implementing the critical and medium fixes?

