

# Update Text Content on Funnel Lead Magnet Page

This plan updates **only the text strings** on the `/funnel` page. No layout, styling, colors, fonts, spacing, animations, or component structure will be changed.

## File to modify

`src/pages/funnel/FunnelLeadMagnet.tsx`

## Changes

### Hero Section
- Eyebrow tag: "Free Download — Limited Time" → "Free Download — Available for a Limited Time"
- Headline: "GET THE BLUEPRINT: How to Build a $250,000 Business Credit Profile from Scratch." → "The $250K Business Credit Blueprint: Fund Your Business Without Risking Your Personal Credit Score."
- Subheadline: updated to the new copy about SSN and bankable business credit profile
- CTA button: "Download For Free" → "Send Me the Free Blueprint"
- Privacy microcopy: "We respect your privacy. Unsubscribe anytime." → "No spam. No credit card. Unsubscribe anytime."

### What's Inside Section
- Section headline: "What's Inside Your Free Blueprint" → "Here's Exactly What You'll Get Inside"
- Card 1 title stays the same; description updated to the "9 things banks quietly check" copy
- Card 2 title: "The Net-30 Vendor List" → "The Net-30 Vendor Starter Kit"; description updated
- Card 3 title stays the same; description updated to the "sequence matters" copy

### Bottom CTA Section
- Headline: "Ready to Build Your $250K Credit Profile?" → "Your Business Deserves Its Own Credit Profile. Build It Today."
- Supporting text updated to the "stop mixing personal and business finances" copy
- CTA button: "Get Your Free Blueprint Now" → "Get the Free Blueprint Now"
- Trust badge: "No Credit Card" → "No Credit Card Required"

## Technical Details

All changes are simple string replacements in `src/pages/funnel/FunnelLeadMagnet.tsx`. The FEATURES array constants and the JSX template text will be updated. No other files are affected.

