

# Ryland Partners — Affiliate Portal System Architecture & Implementation Plan

## Overview

Transform the existing `/partners` signup page into a full-featured affiliate portal system with authentication, referral tracking, lead management, commissions, resources, events, and GHL integration.

---

## System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    PUBLIC PAGES                          │
│  /partners (signup) → /apply?ref=AFF12345 (tracked)     │
└────────────────────────┬────────────────────────────────┘
                         │ signup → GHL + DB
                         ▼
┌─────────────────────────────────────────────────────────┐
│              ADMIN (manual in GHL)                       │
│  Tag "Affiliate Approved" → GHL Workflow triggers        │
│  webhook to edge function → creates Supabase auth user   │
│  + affiliate record + sends credentials email            │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              AUTHENTICATED PORTAL (/portal)              │
│  Sidebar: Dashboard │ Leads │ Commissions │ Resources   │
│           Events │ Speaking Request │ Settings           │
│                                                          │
│  Auth: Supabase email/password, RLS on all tables        │
│  Data: affiliate sees ONLY their own records             │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              GHL ↔ SUPABASE SYNC                         │
│  Webhooks from GHL → edge function → update leads,      │
│  pipeline stages, commissions, deal status               │
│                                                          │
│  Referral tracking: ?ref=AFF12345 captured in cookie,    │
│  attached to lead forms, passed to GHL as custom field   │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema (7 new tables)

**affiliates** — core affiliate records linked to auth.users
- `id` (uuid, PK), `user_id` (uuid, FK auth.users), `affiliate_id` (text, unique, e.g. "AFF12345"), `full_name`, `email`, `phone`, `company_name`, `website`, `ghl_contact_id`, `status` (enum: pending/approved/suspended), `created_at`, `updated_at`

**affiliate_leads** — referred leads synced from GHL
- `id`, `affiliate_id` (FK), `ghl_contact_id`, `ghl_opportunity_id`, `full_name`, `email`, `phone`, `status`, `pipeline_stage`, `deal_amount`, `notes`, `referred_at`, `created_at`, `updated_at`

**commissions** — earnings per lead
- `id`, `affiliate_id` (FK), `lead_id` (FK), `commission_type`, `commission_amount`, `commission_status` (enum: pending/approved/paid), `payout_date`, `created_at`, `updated_at`

**payouts** — payout batches
- `id`, `affiliate_id` (FK), `amount`, `status`, `payment_method`, `payout_period`, `created_at`, `updated_at`

**resources** — marketing materials, scripts, assets
- `id`, `title`, `category`, `description`, `resource_type`, `file_url`, `external_url`, `is_placeholder`, `sort_order`, `created_at`, `updated_at`

**partner_events** — monthly calls, webinars, trainings
- `id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `location`, `event_link`, `created_at`, `updated_at`

**speaker_requests** — affiliate requests for Ryland to speak
- `id`, `affiliate_id` (FK), `full_name`, `email`, `organization_name`, `event_name`, `requested_date`, `event_location`, `audience_description`, `notes`, `status`, `created_at`, `updated_at`

**RLS**: All affiliate-scoped tables use `WHERE affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid())`. Resources and events are read-only for all authenticated users. Speaker requests scoped to own affiliate.

---

## Authentication Model

- Supabase email/password auth
- Affiliate accounts created server-side when GHL triggers "Affiliate Approved" webhook
- Edge function generates random password, creates auth user, inserts affiliate record with unique `AFF{5-digit}` ID, then triggers GHL email with login credentials
- Portal routes protected by auth guard component
- Login page at `/portal/login`, authenticated portal at `/portal/*`

---

## Referral Tracking

1. Affiliate shares link: `rylandpartners.com/apply?ref=AFF12345`
2. `/apply` route (or assessment/consultation pages) reads `ref` param, stores in `localStorage` with 30-day expiry
3. When lead submits any intake form, `affiliate_id` is attached
4. Edge function passes `affiliate_id` to GHL as custom field + tag `Affiliate - {AFF12345}`
5. Attribution persists across sessions until expiry or new ref overwrites

---

## GHL Integration (3 Edge Functions)

1. **`ghl-create-contact`** (existing, enhanced) — add affiliate attribution fields
2. **`ghl-affiliate-webhook`** (new) — receives GHL webhook for:
   - Affiliate approval (tag added) → create auth user + affiliate record
   - Opportunity stage changes → update `affiliate_leads` table
   - Deal funded/closed → create commission record
3. **`ghl-affiliate-approve`** (new) — called by approval webhook to create Supabase auth user, generate affiliate_id, and trigger welcome email via GHL

---

## Portal Pages & Navigation

Sidebar navigation with these sections:

| Route | Section | Description |
|-------|---------|-------------|
| `/portal` | Dashboard | KPI cards (leads, opportunities, funded, commissions, pending payouts) |
| `/portal/leads` | My Leads | Filterable table with status, stage, deal amount, commission |
| `/portal/commissions` | Commissions | Breakdown by lead, pending vs paid, payout history |
| `/portal/calculator` | Waterfall Calculator | Placeholder module ready for calculator integration |
| `/portal/resources` | Resources | Categorized cards with download/link CTAs |
| `/portal/events` | Events | Monthly event list with details and join links |
| `/portal/speaking` | Speaking Request | Form to request Ryland at their event |
| `/portal/settings` | Account | Profile info, password change |
| `/portal/login` | Login | Public auth page |

Dashboard includes referral link display with copy-to-clipboard button.

---

## Implementation Steps (15 phases)

1. **Database migration** — Create all 7 tables with RLS policies and enums
2. **Auth setup** — Configure Supabase auth, create auth guard component, login page
3. **Affiliate approval edge function** — `ghl-affiliate-webhook` that creates auth users on approval
4. **Referral tracking utility** — localStorage helper + ref param capture on intake pages
5. **Enhance `ghl-create-contact`** — Add affiliate attribution (custom fields, tags)
6. **Portal layout** — Sidebar navigation, responsive shell, auth guard wrapper
7. **Dashboard page** — KPI cards, referral link section with copy button
8. **Leads page** — Data table with filtering, status badges
9. **Commissions page** — Commission breakdown, payout status
10. **Calculator placeholder** — Polished placeholder module
11. **Resources page** — Category-filtered card grid with placeholder items
12. **Events page** — Event list with details
13. **Speaking request page** — Form with DB submission + optional GHL sync
14. **GHL webhook sync** — Edge function for pipeline/deal updates
15. **Polish** — Responsive styling, loading states, empty states, mobile sidebar

---

## Required Secrets (Already Configured)

All needed secrets exist: `GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_AFFILIATE_CAMPAIGN_ID`, `SUPABASE_SERVICE_ROLE_KEY`. No new secrets required.

---

## GHL Webhook Setup (Post-Build)

You will need to create two webhooks in GHL pointing to:
- `https://gkowxzoadsljkpdzrlue.supabase.co/functions/v1/ghl-affiliate-webhook`

Triggers:
1. **Contact Tag Added** = "Affiliate Approved" → creates portal account
2. **Opportunity Stage Changed** → updates lead status in portal
3. **Opportunity Status Changed** (won/lost) → updates commissions

---

## Design Direction

- Dark sidebar (slate-900) with white content area
- Clean card-based layouts with subtle shadows
- Blue accent color (#3b82f6) consistent with existing brand
- Manrope/Geist typography hierarchy
- Elegant empty states with illustrations
- Skeleton loading states
- Mobile: collapsible sidebar with hamburger trigger

