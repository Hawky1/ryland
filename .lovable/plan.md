
# Store Page Redesign — Premium E-Commerce Homepage

## Overview

Transform the current store page from a simple product listing into a high-converting e-commerce homepage that feels like a professional digital storefront. The redesign will match the premium aesthetic of the main site (dark blue cards, motion animations, gradient typography) while following proven e-commerce conversion patterns.

## Current Problems
- The store feels like a "product listing page," not a storefront homepage
- The hero is generic — no urgency, no social proof, no value proposition
- No trust signals, testimonials, or conversion triggers
- The bundle navigation bar and flat product grid lack visual hierarchy
- Missing key e-commerce patterns: urgency, benefits strip, value stacking

## New Page Architecture

The redesigned page will flow through these sections (top to bottom):

1. **Sticky Navbar** — Keep current, add mobile hamburger menu
2. **Hero Section** — Full-width dark gradient with bold headline, stats bar, and primary CTA
3. **Trust/Benefits Strip** — Horizontal bar with key value props (Instant Download, Secure Checkout, etc.)
4. **Featured Bundles Showcase** — Keep the existing FeaturedBundles component (already premium)
5. **Sticky Category Navigation** — Redesigned as a sleeker tab bar
6. **Product Grid Sections** — Redesigned product cards with better visual hierarchy
7. **Value Proposition / Why Choose Us** — Mid-page conversion section
8. **Footer** — Existing shared footer

## Detailed Design

### 1. Hero Section (Complete Redesign)
- Full-width dark gradient background (from-slate-950 via-blue-950 to-slate-900) with InfiniteGrid overlay
- Split layout: left side with headline + stats, right side with a floating bundle mockup image
- Headline: "Your Blueprint to Financial Freedom" with gradient text accent
- Stats bar below headline: "40+ Expert Guides | 10,000+ Entrepreneurs Served | Instant Digital Delivery"
- Primary CTA button using the shiny-cta style: "Browse Collections"
- Secondary text: "Trusted by entrepreneurs nationwide"

### 2. Trust/Benefits Strip
- Slim horizontal section with 4 value propositions in a row
- Icons + text: "Instant Download" / "Secure Checkout" / "Expert-Crafted" / "Money-Back Guarantee"
- Light background with subtle border, clean professional feel

### 3. Featured Bundles
- Keep the existing FeaturedBundles component as-is (already well-designed)

### 4. Category Navigation (Refined)
- Sticky below navbar, cleaner pill-style tabs
- Active state with gradient fill, smooth scroll behavior preserved

### 5. Product Cards (Redesign)
- Slightly smaller aspect ratio (4:5 instead of 3:4) for tighter grid
- Hover: subtle lift + shadow expansion (no image clipping)
- Quick "Add to Cart" button with shopping bag icon
- Price displayed more prominently with a "was/now" style if applicable
- Product title limited to 2 lines with line-clamp

### 6. Mid-Page Conversion Section ("Why Our Guides?")
- Dark blue card section (matching site's card strategy)
- 3-column grid with icons: "Actionable Strategies" / "Expert Authors" / "Proven Results"
- Reinforces value before user continues scrolling through products

## Technical Details

### Files Modified
- **src/pages/Store.tsx** — Complete rewrite of the page layout and sections
- **src/components/FeaturedBundles.tsx** — No changes (keep as-is)

### Files Created
- **src/components/store/StoreHero.tsx** — New hero section component
- **src/components/store/TrustStrip.tsx** — Benefits/trust bar component
- **src/components/store/WhyChooseUs.tsx** — Mid-page conversion section
- **src/components/store/ProductCard.tsx** — Reusable product card component

### Dependencies
- No new dependencies needed
- Uses existing: framer-motion, lucide-react, react-router-dom, Shopify integration

### Key Patterns Followed
- Dark blue card sections for high-impact areas (matching homepage strategy)
- framer-motion for scroll-triggered animations
- Manrope font family consistency
- Mobile-first responsive grid (1 col -> 2 col -> 3 col)
- All Shopify cart/checkout logic preserved exactly as-is
- Existing FeaturedBundles component reused without modification

### Mobile Considerations
- Hero becomes single-column stacked layout
- Trust strip wraps to 2x2 grid on mobile
- Product grid goes to single column on small screens
- Sticky nav remains horizontally scrollable with hidden scrollbar
