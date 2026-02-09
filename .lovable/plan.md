

## Revamp Hero Section Copy and Enlarge Video

### Overview
Replace the existing hero text, subheadline, and CTA buttons with the new copy provided, and increase the video size for a more impactful, balanced hero section.

### Changes (single file: `src/pages/Index.tsx`)

**1. Replace the headline (line 481)**
- Remove the current "Fund your dream business." text and its mask gradient style
- Replace with new headline: "Unlock the Capital, Credit, and Community to Build Your Empire."
- Adjust font size slightly (e.g. `text-[44px] sm:text-6xl lg:text-[72px]`) so it fits well in ~3 lines without overwhelming the layout
- Keep the tight leading and tracking for the premium look

**2. Update the subheadline (lines 483-485)**
- Replace current text with: "We help entrepreneurs secure $150K+ in business funding, repair their credit, and master the digital economy."
- Keep the `$150K+` styled with `text-white font-semibold` for emphasis

**3. Replace the CTA buttons (lines 487-496)**
- Replace "Get Started" with "Take the Free Funding Assessment" -- keep the existing `shiny-cta` style
- Replace "Watch Success Stories" with a trust line underneath: "Results in 2 minutes - No hard credit pull - 100% Secure" as small muted text with checkmark or dot separators
- This creates a single strong CTA with trust signals below it, which is a proven high-conversion pattern

**4. Enlarge the video (line 507)**
- Increase from `max-w-lg` to `max-w-xl` on the video element
- Also increase the "As Seen On" image width to `max-w-xl` to match (line 514)

### Technical Details

- **File:** `src/pages/Index.tsx`, lines 478-517
- Headline class adjusted to `text-[44px] sm:text-6xl lg:text-[72px]` to fit the longer copy in a balanced way
- The mask gradient on the headline will be removed for cleaner readability with the new longer text
- Trust signals rendered as a flex row of small items with dot separators and a subtle shield/check icon
- No new files or dependencies needed

