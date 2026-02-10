

## Update Wealth Ecosystem Service Cards

### What Changes
Replace the current 5 service cards in the "Complete Wealth Ecosystem" section with 6 new services. The grid layout already supports this perfectly (3 columns, now filling 2 full rows).

### The 6 New Services

| # | Badge | Title | Button Text | Description |
|---|-------|-------|-------------|-------------|
| 1 | Funding | Get Business Funding | Get Business Funding | Access capital for your business through our network of alternative lenders -- funding solutions tailored to entrepreneurs at every stage. |
| 2 | Credit | Repair My Credit | Repair My Credit | Restore and optimize your personal and business credit profile to unlock better rates, higher limits, and more funding power. |
| 3 | Community | Join The Community | Join The Community | Connect with funded founders, attend live trainings, and tap into deal flow inside our exclusive entrepreneur community. |
| 4 | Products | Shop Digital Products | Shop Digital Products | Browse DIY kits, automation tools, and scaling blueprints designed to help you build and grow your digital empire. |
| 5 | Partner | Become A Partner | Become A Partner | Earn by referring others to Ryland Partners -- join our partner program and build a revenue stream alongside your business. |
| 6 | Strategy | Schedule A Consultation | Schedule A Consultation | Book a 1-on-1 session with a funding strategist to map out your personalized path to capital and growth. |

### Technical Details

**File:** `src/pages/Index.tsx`

- Replace the 5 existing card blocks (lines 654-772) with 6 new cards following the exact same card template (video background, badge, icon, title, description, blue gradient CTA button)
- Each card keeps the same structure: video bg, gradient overlay, badge pill, icon box, heading, description, and the blue gradient button
- Appropriate `lucide-react` style SVG icons will be used for each card (DollarSign for funding, ShieldCheck for credit, Users for community, ShoppingBag for products, Handshake for partner, Calendar for consultation)
- All buttons link to `#cta` as before

No other sections are affected.

