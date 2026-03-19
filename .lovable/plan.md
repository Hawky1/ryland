

# Affiliate Portal Leads Section — Implementation Plan

## Summary

Create 5 new files to replace the existing monolithic `PortalLeads.tsx` with a modular, premium leads experience featuring a data table and slide-over detail drawer.

## Database Migration Required

The current `affiliate_leads` table is missing several columns requested in the type definition. A migration will add:

- `company_name` (text, nullable)
- `commission_amount` (numeric, nullable, default 0)
- `commission_status` (text, nullable)
- `assigned_rep` (text, nullable)
- `next_appointment_at` (timestamptz, nullable)
- `next_step` (text, nullable)
- `latest_update` (text, nullable)

These columns support the detail drawer fields and table display without breaking existing data.

## Files to Create/Modify

### 1. `src/types/leads.ts`
- Export the `Lead` type as specified with all fields
- Export `stageColors` and `statusColors` maps for badge styling

### 2. `src/utils/formatters.ts`
- `formatCurrency(amount)` — returns `$X,XXX.XX` or `"—"`
- `formatDateTime(dateStr)` — returns `"MMM d, yyyy"` or `"—"`
- `formatDateTimeWithTime(dateStr)` — returns `"MMM d, yyyy h:mm a"` or `"—"`
- `getStatusBadgeClass(status)` — returns Tailwind classes based on pipeline stage

### 3. `src/hooks/useAffiliateLeads.ts`
- Uses `useQuery` from TanStack Query (consistent with existing patterns)
- Fetches from `affiliate_leads` table filtered by `affiliate_id` from `useAuth()`
- Orders by `updated_at` desc
- Returns `{ leads, isLoading, error, refetch }`

### 4. `src/components/portal/LeadsTable.tsx`
- Receives `leads`, `isLoading` as props
- Renders the table with columns: full_name, referred_at, status, pipeline_stage, deal_amount, next_appointment_at, next_step, updated_at
- Each row is clickable → calls `onSelectLead(lead)` prop
- Loading state: 5 skeleton rows
- Empty state: icon + message + CTA to share referral link
- Status/stage badges using colors from `types/leads.ts`

### 5. `src/components/portal/LeadDetailDrawer.tsx`
- Uses shadcn `Sheet` component (right side)
- Receives `lead: Lead | null` and `open: boolean` and `onClose`
- 4 section cards:
  - **Contact Info**: full_name, email, phone, company_name
  - **Deal Status**: status, pipeline_stage, deal_amount, commission_amount, commission_status, assigned_rep
  - **Next Actions**: next_appointment_at, next_step
  - **Notes & Updates**: latest_update, notes, referred_at, updated_at
- Missing values show "—" fallback text

### 6. Update `src/pages/portal/PortalLeads.tsx`
- Refactored to compose `useAffiliateLeads`, `LeadsTable`, and `LeadDetailDrawer`
- Manages `selectedLead` state to toggle drawer
- Clean page header with lead count badge

## Technical Details

- **No fake data** — all queries go to Supabase `affiliate_leads` table via RLS
- **Existing RLS** already scopes reads to the logged-in affiliate via `get_my_affiliate_id()`
- **Sheet component** already exists at `src/components/ui/sheet.tsx`
- **date-fns** already in use for formatting
- **TanStack Query** already in use for data fetching
- Mobile responsive: table scrolls horizontally, drawer is full-width on small screens

