

# Reduce White Fade on Testimonials Section

## Problem
The top and bottom white gradient overlays on the Testimonials section are too strong, washing out the blue testimonial cards and making them less visible.

## Changes

### File: `src/pages/Index.tsx`
- Change the top fade overlay from `from-white` to `from-white/60` (60% opacity white) so it fades more gently
- Change the bottom fade overlay from `from-white` to `from-white/60` (60% opacity white) to match
- This lets the blue cards show through more clearly at the edges while still providing a smooth scroll fade effect

