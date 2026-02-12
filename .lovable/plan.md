
# Redesign the CTA Section to Be Bigger and More Engaging

## Current State
The CTA section is relatively compact: a single card with a short headline ("Ready to scale?"), one line of body text, and two small pill buttons. It feels understated compared to the bold Hero and Funding Journey sections above it.

## Proposed Changes

### File: `src/pages/Index.tsx` (CTA section, lines ~957-976)

**1. Bigger layout with more vertical padding**
- Increase inner padding from `md:p-12` to `md:py-20 md:px-16` for a spacious, hero-like feel
- Remove the outer `pb-24` wrapper padding and let the card itself breathe

**2. Larger, bolder headline with gradient text**
- Change from `text-2xl` to `text-4xl md:text-5xl lg:text-6xl` with tight tracking
- Apply the same luxury gradient text style used in the Hero (`bg-gradient-to-b from-white via-white to-zinc-400`)

**3. Add a compelling subheadline**
- Replace the single sentence with a stronger value proposition, e.g. "Get $50K-$250K in business funding at 0% APR. No revenue required. No tax returns. Start in under 48 hours."
- Increase text size to `text-lg md:text-xl` with `text-slate-300`

**4. Centered, stacked layout instead of side-by-side grid**
- Switch from `md:grid-cols-[1.2fr_1fr]` to a single centered column (`text-center mx-auto max-w-3xl`)
- This creates a focused, impactful visual hierarchy

**5. Bigger, more prominent CTAs**
- Replace the small pill buttons with the `shiny-cta` animated button (matching the Hero) as the primary action
- Keep a secondary ghost button below it
- Add generous sizing: `!py-4 !px-10 !text-lg`

**6. Add trust signals beneath the buttons**
- A row of small trust indicators like "No credit check required", "48-hour approval", "10,000+ entrepreneurs funded"
- Styled as subtle `text-xs text-slate-400` with check icons

## Result
The CTA section will feel like a "second hero" -- large, centered, and visually commanding with the animated shiny button, gradient typography, and trust signals that drive conversions.
