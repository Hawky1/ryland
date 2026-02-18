

# Shorten Hero Copy and Match Column Heights

## Text Changes

**Headline** (shorter, punchier):
"Build a $250K Business Credit Profile —
**Without Touching Your Personal Score.**"

**Subheadline** (one line, high impact):
"The step-by-step blueprint 10,000+ entrepreneurs used to unlock 0% APR capital on their business's merit alone."

This cuts the headline nearly in half and compresses the subheadline from 3 lines to 1, making the left column significantly shorter so it aligns with the book mockup on the right.

## Height Alignment

The grid currently uses `items-stretch`, which stretches containers but doesn't vertically center their inner content. The fix:
- Change the grid from `items-stretch` to `items-center` so both columns vertically center their content at the same midpoint
- This ensures the book mockup and the text/form sit at the same visual height regardless of content length

## File Modified

`src/pages/funnel/FunnelLeadMagnet.tsx` — text replacements on lines 85-92 and a class change on line 75.

## Technical Details

1. Line 75: Change `items-stretch` to `items-center` on the grid container
2. Lines 85-89: Replace headline with shorter version, keeping the gradient span on "Without Touching Your Personal Score."
3. Lines 91-92: Replace subheadline with the single-line version

No layout, styling, color, font, or component structure changes beyond the grid alignment tweak.

