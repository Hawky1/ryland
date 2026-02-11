

# Redesign the Wealth Ecosystem Service Cards

## Overview
Replace the current full-bleed background image cards with a modern, clean card design featuring the uploaded isometric 3D illustrations, bold titles, and brief service descriptions.

## Current State
The six service cards currently use full-background photos (service-funding.png, etc.) in aspect-square containers with overlaid text and a blue gradient CTA button. The user wants to move away from this image-heavy approach.

## New Card Design

Each card will feature:
- A clean white/light background with a subtle border and soft shadow
- The isometric 3D illustration centered at the top (sized ~120px)
- A bold, dark title below the illustration
- A 1-2 sentence description in muted text
- A blue gradient CTA button at the bottom
- Smooth hover animation (slight lift + shadow increase via Framer Motion)
- Rounded-2xl corners to match the site's existing card language

### Icon-to-Service Mapping
| Service | Icon File | Description |
|---------|-----------|-------------|
| Get Business Funding | Bank building (row-1-column-1) | Secure $50K-$250K in 0% APR business credit lines with no revenue or tax returns required. |
| Repair My Credit | Target (row-2-column-3) | Done-for-you credit restoration with negative item removals and dispute management in 35-90 days. |
| Join The Community | Trophy (row-1-column-3) | Access our private Skool network and learn to invest your funding into high-ROI digital businesses. |
| Shop Digital Products | Wallet (row-2-column-1) | Browse our curated collection of eBooks and digital resources to accelerate your business growth. |
| Become A Partner | Briefcase (row-1-column-2) | Earn uncapped commissions by referring entrepreneurs to our funding programs. Free to join. |
| Schedule A Consultation | Office buildings (row-2-column-2) | Book a 1-on-1 strategy session with our funding experts to map your personalized capital plan. |

Note: The safe icon (row-3-column-3) will not be used in this initial redesign but will be saved as an asset for future use.

## Layout
- Same 3-column grid on desktop (lg:grid-cols-3), 2 columns on tablet (sm:grid-cols-2), 1 column on mobile
- Cards will no longer be aspect-square -- they'll use natural content height for a cleaner look
- Consistent padding and spacing across all cards

## Technical Details

### Files to Create (Assets)
Copy uploaded icons into `src/assets/`:
- `src/assets/icon-funding.png` (bank building)
- `src/assets/icon-credit.png` (target)
- `src/assets/icon-community.png` (trophy)
- `src/assets/icon-products.png` (wallet)
- `src/assets/icon-partner.png` (briefcase)
- `src/assets/icon-consultation.png` (office buildings)
- `src/assets/icon-vault.png` (safe -- saved for future use)

### Files to Modify
- `src/pages/Index.tsx` -- Replace the Wealth Ecosystem section (lines ~782-818) with the new card design. Remove old service image imports (service-funding, service-credit, etc.) and add new icon imports.

### Card Styling
- Container: `bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300`
- On hover: translateY(-4px) lift effect via Framer Motion
- Icon: `w-28 h-28 mx-auto mb-6 object-contain`
- Title: `text-xl font-bold text-slate-900 text-center mb-3`
- Description: `text-sm text-slate-500 text-center mb-6 leading-relaxed`
- CTA Button: Same blue gradient rounded-full button already used across the site

### Section Header (New Addition)
A section heading will be added above the grid:
- "The Wealth Ecosystem" in the site's standard h2 style (text-3xl sm:text-5xl, font-medium, tracking-tighter)
- Subtitle: "Everything you need to build, fund, and scale your business" in muted slate text

