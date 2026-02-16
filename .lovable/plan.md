

## Fix: Rotating Square Around "Get Started" Button

### Problem
The "Get Started" button in the Benefits section shows a visible rotating square artifact. This is caused by the `.shiny-cta::after` pseudo-element which has `aspect-ratio: 1` (making it square) and a rotating shimmer animation. The effect is designed to stay hidden inside the button via `overflow: hidden`, but it's visually leaking outside the button's rounded bounds.

### Solution
Add `overflow: hidden` explicitly to the `.shiny-cta` class definition in the inline styles of `src/pages/Funding.tsx`. The current CSS already sets `overflow: hidden` but it may be getting overridden. We will ensure it's properly enforced and also add `border-radius: inherit` to the `::after` pseudo-element to clip it to the button's pill shape.

### Technical Details

**File: `src/pages/Funding.tsx`**

1. In the `.shiny-cta::after` CSS block, add `border-radius: inherit;` so the rotating gradient is clipped to the pill shape of the button instead of remaining a visible square.

2. Verify `overflow: hidden` is present and not being overridden on the `.shiny-cta` class.

This is a single CSS property addition that will mask the rotating square to the button's rounded shape.

