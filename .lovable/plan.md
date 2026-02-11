

# Create the About Gene Ryland Page (`/about`)

## Overview
A new dedicated About page at `/about` that mirrors the homepage's exact design system -- same navbar, footer, InfiniteGrid background, typography, color palette, and motion language -- populated with Gene Ryland's authority-building content.

## Page Sections

### 1. Hero Section
- Same split-layout card container as the homepage hero (rounded-2xl, Chase blue gradient overlay, border-[#004E8C])
- Left side: Headline "The Architect of Capital: Bridging the Gap Between Banks and Visionaries" in the luxury gradient typography (white-to-zinc-500)
- Sub-headline: "Helping entrepreneurs unlock capital to build, scale, and grow their businesses"
- "As Seen On" media logos (FOX, USA Today, etc.) below the sub-headline
- Right side: Gene Ryland's portrait image with the signature name block underneath

### 2. Stats Bar
- 4-column grid of animated counters (reusing the existing Counter component)
- Metrics: $150M+ Funding Secured | 10,000+ Entrepreneurs Helped | 8+ Years Experience | 0% APR Introductory Rates
- Styled in the Chase blue gradient card with white text, matching the homepage about section's stat row

### 3. The Founder's Journey
- Clean, wide-column text section on the white background
- Detailed narrative about Gene's background as a serial entrepreneur and funding strategist
- Mentions media features (FOX, USA Today, Digital Journal, MarketWatch)
- Uses the same text styling and spacing patterns from the homepage

### 4. The Ryland Pillars (3-Card Grid)
- Three cards in the same Chase blue gradient style (from-[#0060A9] to-[#003A70], border-[#004E8C])
- Card 1: "Strategic Restoration" -- TSR-compliant credit optimization, 35-90 day results
- Card 2: "Business Funding" -- $50K-$250K in business credit lines, no tax returns required
- Card 3: "Private Community" -- Skool platform for high-ROI business training
- Each card has an icon, title, and description

### 5. CTA Footer Section
- Same Chase blue gradient card as the homepage CTA
- Two primary buttons: "Get Funded" (links to /) and "Become A Partner" (links to /partners)
- Tagline: "Join thousands of entrepreneurs building their future with Ryland Partners"

## Global Elements (Copied from Homepage)
- Identical sticky navbar with nav links and shiny-cta button
- InfiniteGrid animated background
- Gradient-blur top fade effect
- Full footer with social links, product/company/legal columns, and copyright
- Same Google Fonts (Geist, Manrope, Inter)
- Same inline CSS keyframes and utility classes

## Technical Details

### Files to Create
- `src/pages/About.tsx` -- The full About page component, structured identically to `Index.tsx` (navbar + content + footer in one file to match the existing pattern)

### Files to Modify
- `src/App.tsx` -- Add `Route path="/about"` pointing to the new About page

### Dependencies
- Reuses the existing `Counter` component from `src/components/funding-visuals/Counter.tsx`
- Reuses the existing `InfiniteGrid` component
- Imports the same asset images (logoDark, heroPortrait, geneRylandAbout, asSeenOn, etc.)
- No new dependencies required

### Design Tokens (Matching Homepage Exactly)
- Primary blue: #0060A9
- Deep navy: #003A70
- Mid-tone border: #004E8C
- Card style: `bg-gradient-to-br from-[#0060A9] to-[#003A70] border border-[#004E8C] rounded-3xl`
- Headline gradient: `bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent`
- CTA button: `bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full`
