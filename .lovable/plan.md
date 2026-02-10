

## Change Partners Page Background to White Infinite Grid

A simple styling update to switch the Partners page background from the current dark slate gradient to a white/light theme, while keeping the same InfiniteGrid animation.

### Changes

**File: `src/pages/Partners.tsx`**

1. **Background container (line 78):** Change the gradient from dark slate (`#0f172a, #1e293b`) to white/light gray (`#ffffff, #f8fafc, #ffffff`).

2. **InfiniteGrid props (line 79):** Update the grid colors to work on a white background:
   - `baseGridColor` from `"rgba(148, 163, 184, 0.08)"` to `"rgba(148, 163, 184, 0.15)"` (subtle gray grid lines)
   - `activeGridColor` from `"rgba(6, 182, 212, 0.6)"` to `"rgba(6, 182, 212, 0.5)"` (cyan reveal stays similar)

This is a 2-line change. No other files are affected.

Note: Since the rest of the page (text, cards, buttons) uses white/light text on dark backgrounds, those sections may need follow-up adjustments if the white background clashes. We will make this change first so you can see how it looks and decide from there.

