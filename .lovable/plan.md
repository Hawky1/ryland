

# Multi-Page Sales Funnel for Ryland Partners

## Overview

Build a 4-page high-conversion sales funnel with Hormozi-style direct-response copywriting, using the existing brand design system (navy/slate palette, cyan accents, Manrope/Geist typography, HLS video backgrounds, shiny-cta buttons).

---

## Architecture

Four new route pages, plus a shared layout component and a database table for email capture:

```text
/funnel                --> Page 1: Lead Magnet (email capture)
/funnel/offer          --> Page 2: Core Offer ($47 upsell)
/funnel/founders       --> Page 3: Downsell ($27 founder discount)
/funnel/consultation   --> Page 4: Bridge/Booking page
```

A shared `FunnelLayout` component wraps all pages with:
- Progress bar at top ("Step X of 4: [label]")
- Minimal navbar (logo + cart only, no distracting nav links)
- "As Seen On" logo marquee at the bottom of every page
- Consistent shiny-cta CSS injection
- Google Fonts (Manrope, Geist, Inter)

---

## Page-by-Page Breakdown

### Page 1: Lead Magnet (`/funnel`)

- **Hero section** with HLS video background + navy overlay
- **Headline**: "GET THE BLUEPRINT: How to Build a $250,000 Business Credit Profile from Scratch."
- **Sub-headline**: "Stop using your personal social security number to fund your business..."
- **What's Inside** section: 3 bullet cards with icons (The 'Lender-Ready' Checklist, Net-30 Vendor List, 0% APR Bank Sequence)
- **Email capture form**: Name + Email fields, validated with Zod
- **CTA**: "Download For Free" shiny-cta button
- **3D book mockup** using the existing `ultimate-business-credit-blueprint.png` cover with CSS perspective transforms
- On submit: saves lead to a `funnel_leads` database table, then redirects to `/funnel/offer`

### Page 2: Core Offer (`/funnel/offer`)

- **Hook banner**: "WAIT! Your Blueprint is on the way... but do you want the unfair advantage?"
- **Product showcase**: 3D stacked ebook covers grid using existing `/public/covers/` assets (show ~6-8 representative covers in a fanned/stacked layout)
- **Value Stack**: Show "Total Value: ~~$447~~" crossed out, replaced with large "$47"
- **18-resource list**: Two-column checklist of all included ebooks with checkmark icons
- **Authority copy**: "I'm giving you my entire library of playbooks..."
- **CTA**: "Add to My Order for $47" shiny-cta -- links to Shopify checkout for the Ultimate Bundle
- **Skip link**: "No thanks, I'll pass" text link redirecting to `/funnel/founders` (downsell)
- **Social proof strip**: 10K+ entrepreneurs, 8+ years, $150M+ funded

### Page 3: Downsell (`/funnel/founders`)

- **Hook**: "I get it -- you're just starting. How about this?"
- **Same 18-book bundle** but at "Founders Discount" of $27
- **Scarcity/urgency copy**: "This is the last time you'll see this price."
- **Value comparison**: ~~$447~~ -> ~~$47~~ -> $27
- **CTA**: "Yes, I Want the $27 Founder Discount" shiny-cta
- **Skip link**: "No thanks, take me to the free consultation" -> `/funnel/consultation`

### Page 4: Bridge/Booking (`/funnel/consultation`)

- **Hook**: "You have the tools. Now, let us do the heavy lifting."
- **Headline**: "Speak with a Funding Specialist"
- **Copy**: personalized strategy session, $50K-$250K in 30 days
- **Trust badges**: No Hard Credit Pull, 0% APR Focus, Trusted Banking Partners, TSR Compliant
- **Booking calendar**: Embedded Calendly-style component (iframe placeholder with professional styling, pointing to a configurable URL)
- **Gene Ryland portrait** for authority

---

## Shared Components

### `FunnelLayout.tsx`
- Progress bar component at top (colored segments, "Step X of 4" label)
- Minimal header with logo only
- "As Seen On" marquee at bottom (reuse existing `as-seen-on.png` asset)
- Injects all shared CSS (shiny-cta, fonts, animations)

### `FunnelProgressBar.tsx`
- Accepts `currentStep` (1-4) and `label` string
- Visual segmented bar with brand blue fill
- Shows "Step X of 4: [label]" text

### `BookMockup3D.tsx`
- CSS 3D perspective transform on ebook cover images
- Stacked/fanned layout variant for the 18-book display

---

## Backend (Database)

### New table: `funnel_leads`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| name | text | required |
| email | text | required |
| created_at | timestamptz | default now() |
| source | text | default 'blueprint' |

- RLS: insert-only for anonymous users (public funnel, no auth required)
- No select/update/delete for anon -- admin only via service role

---

## Routing

Add 4 new routes to `App.tsx`:
```text
/funnel              -> FunnelLeadMagnet
/funnel/offer        -> FunnelCoreOffer
/funnel/founders     -> FunnelDownsell
/funnel/consultation -> FunnelConsultation
```

---

## Files to Create

1. `src/components/funnel/FunnelLayout.tsx` -- shared wrapper
2. `src/components/funnel/FunnelProgressBar.tsx` -- step progress bar
3. `src/components/funnel/BookMockup3D.tsx` -- 3D book cover component
4. `src/components/funnel/AsSeenOnMarquee.tsx` -- logo marquee strip
5. `src/pages/funnel/FunnelLeadMagnet.tsx` -- Page 1
6. `src/pages/funnel/FunnelCoreOffer.tsx` -- Page 2
7. `src/pages/funnel/FunnelDownsell.tsx` -- Page 3
8. `src/pages/funnel/FunnelConsultation.tsx` -- Page 4

## Files to Modify

1. `src/App.tsx` -- add 4 new routes

## Database Migration

1. Create `funnel_leads` table with RLS (anon insert-only policy)

---

## Technical Details

- All pages use existing `HlsVideoBackground` for dark hero sections
- `InfiniteGrid` for light-background areas
- `framer-motion` for scroll animations and entrance effects
- Zod for email form validation
- Shopify integration for $47/$27 CTAs (link to checkout URL for the Ultimate Bundle product)
- Calendly embed via iframe on the consultation page (URL configurable)
- All typography follows brand system: Geist for headlines, Manrope for body, Inter for buttons
- Mobile-responsive throughout with existing Tailwind patterns

