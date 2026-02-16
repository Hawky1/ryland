

## Funnel Page Redesign

### Problems Identified

1. **Red urgency header** -- Clashes with the premium dark-blue brand. Red feels cheap and alarmist for a financial services brand.
2. **"As Seen On" is buried at the very bottom** -- It should appear near the top as a trust signal, right after the hero, not as a footer afterthought.
3. **Book mockup still constrained** -- The single book variant caps at `max-w-xl` which doesn't fill the right column to match the left side's height.
4. **Shiny-cta button** still has rotating shimmer pseudo-elements that have caused visual artifacts before.

### What Will Change

**1. Urgency Header -- Replace Red with Dark Navy/Gold**

Swap the `from-red-600 via-red-500 to-orange-500` gradient to a dark navy bar (`bg-[#001228]/95 backdrop-blur-lg border-b border-white/10`) with a subtle gold accent for the countdown timer and "Offer expires in" text. This matches the brand's premium feel while still conveying urgency.

**2. Move "As Seen On" from Bottom to Directly Below the Hero**

In `FunnelLayout.tsx`, remove the `AsSeenOnMarquee` from below `main` and instead render it between the progress bar and the main content. This places the trust signal right after the hero on every funnel page, boosting credibility before the visitor scrolls further.

**3. Make the Book Fill the Right Column**

In `BookMockup3D.tsx`, remove the `max-w-lg xl:max-w-xl` constraints on the single variant. Set the image to `w-full h-full object-contain` so it stretches to match the full height of its grid column, creating visual balance with the left-side copy.

**4. Clean Up Button Styles**

Remove the `::before` and `::after` pseudo-elements from the `.shiny-cta` class entirely. Replace with a clean gradient + subtle hover glow. No more rotating shimmer animations that cause visual artifacts.

### Technical Details

**File: `src/components/funnel/FunnelLayout.tsx`**
- Change header background from red gradient to `bg-[#001228]/95 backdrop-blur-lg border-b border-white/10`
- Change timer label color from `text-red-100/80` to `text-amber-300/80`
- Change countdown pill background to `bg-amber-500/15 border border-amber-400/20`
- Move `<AsSeenOnMarquee />` from after `<main>` to between `<FunnelProgressBar>` and `<main>`
- Replace the entire `.shiny-cta` inline style block: remove `::before`, `::after`, `@keyframes border-spin`, `@keyframes shimmer`. Replace with a simple class that uses `background: linear-gradient(180deg, #1e40af, #1e3a8a)` and a hover state with `box-shadow: 0 0 30px rgba(59,130,246,0.3)`. No pseudo-elements.

**File: `src/components/funnel/BookMockup3D.tsx`**
- Single variant: change container to `flex items-center justify-center h-full`
- Change image class from `w-full max-w-lg xl:max-w-xl rounded-xl` to `w-full h-auto max-h-[600px] object-contain rounded-xl` so it can grow taller to match the left column

**File: `src/components/funnel/AsSeenOnMarquee.tsx`**
- Remove `border-t` since it will no longer be at the page bottom
- Reduce vertical padding from `py-8` to `py-6` for tighter integration

