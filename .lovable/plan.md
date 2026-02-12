
# Make the Infinite Grid Background More Visible

## Problem
The InfiniteGrid is set as a fixed background but its grid lines are very faint (12% opacity), and the white gradient overlays on the testimonials section further obscure it. The grid is barely noticeable while scrolling.

## Changes

### File: `src/pages/Index.tsx`

1. **Increase InfiniteGrid opacity** (line ~390-391)
   - Change `baseGridColor` from `rgba(148, 163, 184, 0.12)` to `rgba(148, 163, 184, 0.20)` -- nearly double the visibility
   - Change `activeGridColor` from `rgba(59, 130, 246, 0.3)` to `rgba(59, 130, 246, 0.45)` -- brighter mouse-follow glow

2. **Reduce testimonials white fade overlays** (lines ~740-741)
   - Change `from-white/60` to `from-white/30` on both top and bottom gradient divs so the grid shows through better at the edges of the testimonials section

3. **Remove the gradient-blur div** (lines ~396-403)
   - This stacked blur overlay at the top of the page creates a heavy white wash that hides the grid behind the navbar area -- remove it entirely since the navbar already has its own `bg-white/70 backdrop-blur-xl`

### File: `src/components/ui/infinite-grid.tsx`

4. **Remove the ambient glow blobs** (lines ~96-102)
   - The three large blurred circles (`rgba(59,130,246,0.08)` etc.) add a subtle white/blue haze that competes with the grid lines -- removing them will make the grid itself more prominent

## Result
The subtle moving grid pattern will be noticeably more visible across all sections of the homepage while still maintaining a clean, professional look. The mouse-follow reveal effect will also be more pronounced.
