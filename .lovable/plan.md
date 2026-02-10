
## Add Video Background to Wealth Ecosystem Cards

### What changes
Replace the colored gradient backgrounds on all 5 ecosystem cards with the same video background used in the hero section. Remove the per-card color glow effects and unify the look.

### Technical details

**File:** `src/pages/Index.tsx`, lines 675-782 (all 5 cards)

For each of the 5 cards (The Vault, The Network, The Academy, Digital Assets, Expert Support):

1. **Remove** the colored gradient background classes (`bg-gradient-to-br from-neutral-900/80 to-neutral-950/90`) and color-specific hover borders (`hover:border-amber-500/30`, `hover:border-cyan-500/30`, etc.)
2. **Remove** the two colored glow `div` elements (the `-bottom-16 -right-16` and `-top-8 -left-8` blurred circles)
3. **Add** inside each card (before the content) a video background block matching the hero pattern:
   - An `absolute inset-0 z-0 overflow-hidden rounded-2xl` wrapper containing the same `<video>` element (autoPlay, loop, muted, playsInline, 40% opacity, same MP4 source)
   - A gradient overlay `div` (`bg-gradient-to-r from-black/70 via-black/40 to-transparent`) for text readability
4. **Keep** the existing card shell styling: `rounded-2xl border border-white/10 ring-1 ring-white/5 overflow-hidden`
5. **Keep** all badge pulse dots as a uniform white/neutral color instead of per-card colors (amber, cyan, violet, rose, emerald)
6. **Keep** all existing text content, icons, and shiny-cta buttons unchanged
