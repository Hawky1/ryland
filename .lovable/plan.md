

# Rebrand Homepage Content to Ryland Partners

## Overview
Update all text content across every section of the homepage to match the Ryland Partners business funding, credit repair, and digital economy brand -- while keeping the exact same visual design, layout, animations, and component structure.

## Section-by-Section Changes

### 1. Navbar (lines 416-454)
- Update nav links: "Features" stays, "Templates" becomes "Services", "Showcase" becomes "Results", "Pricing" stays
- "Open App" button becomes "Get Started"
- Mobile drawer: same link text updates, "Canvas" label becomes "Ryland Partners"

### 2. Hero Section (lines 456-500)
- **Headline:** Change to "Fund and build your dream business."
- **Subheadline:** "Get $150K+ in business funding, fix your credit, and master the digital economy -- all in one place."
- **Primary CTA:** Keep shiny-cta button, text becomes "Get Started"
- **Add secondary CTA:** outline-style "Watch Success Stories" button
- **Remove** the trust signals line (Results in 2 minutes / No hard credit pull / 100% Secure) since the new copy doesn't include it
- Portrait stays exactly as-is

### 3. Social Proof Bar (lines 689-718)
- Change "Empowering design teams at" to "EMPOWERING ENTREPRENEURS AT"
- Logo images stay (placeholder -- user can replace later with financial/business logos)

### 4. UI Mockup Section (lines 502-687) -- REMOVE
- This is a fake "website builder" UI mockup that doesn't fit a funding/credit business
- Remove this entire section to keep the page focused

### 5. Feature Grid "Ship sites with speed" (lines 720-823) -- Rebrand to "Capital on your terms"
- Section header: "Capital on your terms"
- **Card 1 (Editor/Blue):** Badge "Funding", Title "Business Funding", Body "Secure $50k-$250k in 0% interest credit lines. No tax returns or revenue history required for startups."
- **Card 2 (Motion/Indigo):** Badge "Credit", Title "Credit Restoration", Body "Our 'Done-For-You' credit sweeps remove negatives and boost scores by 100+ points in record time."
- **Card 3 (Speed/Emerald):** Badge "Growth", Title "Rapid Execution", Body "Move from 'Denied' to 'Funded' in as little as 30 days with our proprietary lender matching system."
- Keep all card visuals, glows, and mini-illustrations

### 6. Features Grid "A complete visual workspace" (lines 825-878) -- Rebrand to "A complete wealth ecosystem"
- Section header: "A complete wealth ecosystem"
- **Top row (3 cols):**
  - Icon 1: "The Vault" / "Personal & Business Credit Optimization"
  - Icon 2: "The Network" / "Direct access to alternative high-limit lenders"
  - Icon 3: "The Academy" / "Exclusive Skool community for digital entrepreneurs"
- **Bottom row (2 cols):**
  - Icon 4: "Digital Assets" / "DIY kits, automation tools, and scaling blueprints"
  - Icon 5: "Expert Support" / "1-on-1 guidance from funding strategists"

### 7. Showcase / Portfolio Section (lines 880-944) -- Rebrand to "Success Stories"
- Section header: "Success Stories"
- Info card: Change "Featured" badge to "Results", title to "Real Entrepreneur Wins", description updated
- Tags: "Startup Launch", "Credit Pivot", "Digital Empire"
- **Card 1:** Title "The Startup Launch", subtitle "New LLC secured $50k at 0% interest"
- **Card 2:** Title "The Credit Pivot", subtitle "From 580 to 740 score"
- **Card 3:** Title "The Digital Empire", subtitle "$10k/mo Shopify store scaled with business credit"
- Keep existing images as placeholders

### 8. Pricing Section (lines 946-1084)
- Header stays "Simple, transparent pricing"
- Subtext: "Start for free, upgrade when you need more power. No hidden fees."
- Toggle stays Monthly/Yearly with Save 20%
- **Column 1 -- Starter (The DIYer):** $0/mo, includes: Funding Assessment, Weekly Newsletter, Community Access. CTA: "Join for Free"
- **Column 2 -- Pro (The Scaler) POPULAR:** $97/mo (yearly: $78), includes: Full Skool Academy, Credit Repair Blueprints, Digital Product Library, Group Coaching. CTA: "Join the Academy"
- **Column 3 -- Business (The Elite):** "Custom" pricing (no /mo), includes: Done-For-You Funding ($150k+ Goal), 1-on-1 Credit Concierge, Priority Lender Access. CTA: "Speak to a Specialist"

### 9. Testimonials Section (lines 1086-1185)
- Change "Loved by designers" to "Trusted by entrepreneurs"
- Change "Testimonials" header stays
- **Testimonial 1:** Name "Bradley A.", handle "@bradley_a", quote: "The funding process was seamless. I got $24k at 0% interest for 12 months."
- **Testimonial 2:** Name "Michael G.", handle "@michael_g", quote: "Ryland Partners fixed my credit when no one else could. My score is up 115 points."
- **Testimonial 3:** Name "Ethan G.", handle "@ethan_g", quote: "The Skool community alone is worth 10x the price. The digital products are pure gold."
- Duplicate set for seamless marquee loop updated to match

### 10. FAQ Section (lines 1187-1265)
- Header: "Ryland Partners -- Help & FAQs"
- Subtext: "Common questions about funding, credit, and our services."
- **Q1:** "Do I need revenue to get funded?" / "No. We specialize in startup funding based on credit strength, not just history."
- **Q2:** "How long does credit repair take?" / "Most clients see significant removals and score jumps within 35-90 days."
- **Q3:** "What is the Skool community?" / "It is our private network where we teach you how to invest your funding into high-ROI digital businesses."
- **Q4:** "Is the assessment really free?" / "Yes. It is a soft-pull only and will not impact your credit score."
- Bottom bar: "Start Building" becomes "Get Started"

### 11. Final CTA Section (lines 1267-1284)
- Headline: "Ready to scale?"
- Body: "Join thousands of entrepreneurs building their future with Ryland Partners."
- Buttons: "Get Funded" (primary) + "View Products" (outline)

### 12. Footer (lines 1286-1346)
- Replace Canvas logo/branding with Ryland Partners logo (already imported as `logoWhite`)
- Tagline: "Empowering entrepreneurs with capital, credit, and community."
- **Product column:** Funding, Credit, Academy, Store
- **Company column:** About, Blog, Results, Partners
- **Resources column:** Documentation, Support, Community
- Copyright: "(c) 2026 Ryland Partners. All rights reserved."

## Technical Details

### Files Modified
- `src/pages/Index.tsx` -- All content text replacements + removal of UI mockup section

### What stays unchanged
- All CSS animations (shiny-cta, marquee, gradient-blur, etc.)
- Animated background orbs
- Portrait image and its mask/glow treatment
- Card visual effects (glows, hover states, mini-illustrations)
- Pricing toggle JavaScript logic
- FAQ accordion JavaScript logic
- Mobile menu JavaScript logic
- All fonts, colors, and spacing

### Key Implementation Notes
- The UI mockup section (~185 lines) will be fully removed as it represents a website builder interface irrelevant to the Ryland Partners brand
- Pricing data attributes will be updated: Pro plan `data-monthly="97"` `data-yearly="78"`, Business plan text changed to "Custom" with no toggle behavior
- The footer logo will switch from the inline Canvas SVG to the existing `logoWhite` import

