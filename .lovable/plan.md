
# Update Header Navigation Links

## Overview
Replace the current nav links (Features, Services, Results, About, Get Started) with the new set: **Home, About, Services, Community, Store, Contact**. This applies to both the desktop nav and mobile drawer on the Index page, About page, and any other pages with the same header pattern.

## Link Mapping

| Nav Item | Target | Notes |
|----------|--------|-------|
| Home | `/` | Links to homepage |
| About | `/about` | Existing About page |
| Services | `#services` (or `/#services` on non-index pages) | Scrolls to Funding Journey section |
| Community | `#features` (or `/#features` on non-index pages) | Scrolls to Wealth Ecosystem section (the community/partner features area) |
| Store | `/store` | Existing Store page |
| Contact | `#cta` (or `/#cta` on non-index pages) | Scrolls to CTA/contact section |

## Changes

### 1. Index.tsx -- Desktop Nav (line 411-418)
- Replace the 4 anchor links + "Get Started" shiny button with 6 clean nav links
- Style: same `text-sm text-slate-600 hover:text-slate-900` pattern, with `gap-8` spacing
- "Contact" becomes the CTA button using the existing `shiny-cta` style (replaces "Get Started")

### 2. Index.tsx -- Mobile Drawer (lines 433-441)
- Replace the 4 list items + "Get Started" link with the 6 new nav items
- "Contact" gets the CTA styling at the bottom

### 3. About.tsx -- Desktop Nav (lines 108-115) and Mobile Drawer (lines 128-136)
- Same link changes, but prefixed with `/#` for anchor links since we're on a different page
- "About" link gets active/bold styling since we're on the About page

### 4. Store.tsx -- Check and update header if it has nav links
- Will update to match the same pattern

### 5. Partners.tsx -- Update header nav (lines 88-120)
- Same link changes with `/#` prefixes

## Visual Polish
- Keep the existing glassmorphism header style (`bg-white/70 backdrop-blur-xl border-b border-slate-100`)
- Maintain `gap-8` between links for comfortable spacing
- "Contact" button uses the `shiny-cta` styling as the primary CTA
- Active page link gets `text-slate-900 font-medium` styling
- All other links use `text-slate-600 hover:text-slate-900` with smooth transitions

## Technical Details

### Files Modified
- `src/pages/Index.tsx` -- lines 411-441 (desktop nav + mobile drawer)
- `src/pages/About.tsx` -- lines 108-136 (desktop nav + mobile drawer)
- `src/pages/Partners.tsx` -- lines 88-120 (header area)
- `src/pages/Store.tsx` -- header section if applicable

### React Router Integration
- Page links (`/`, `/about`, `/store`) will use standard `<a>` tags (consistent with existing pattern)
- Anchor links (`#services`, `#features`, `#cta`) remain as hash anchors for smooth scroll
- Cross-page anchors use `/#services` format
