

# Add Video Background to Wealth Ecosystem Service Cards

## Why
The service cards currently use white backgrounds with slate borders, which blend into the white page and feel flat compared to the bold dark blue cards used throughout the rest of the site (Hero, Funding Journey, FAQ, CTA, About page). Switching them to the dark video background creates visual consistency and makes this key conversion section more impactful.

## Changes

### File: `src/pages/Index.tsx`

1. **Add `HlsVideoBackground` to each service card**
   - Wrap each card's content in a `relative z-10` container
   - Add the `HlsVideoBackground` component with the standard `bg-[#003A70]/90` overlay inside each card
   - Add `overflow-hidden` to the card container so the video stays clipped to the rounded corners

2. **Update card styling**
   - Replace `bg-white border-slate-200` with `border-[#004E8C]` to match other dark cards
   - Change text colors from `text-slate-900` / `text-slate-500` to `text-white` / `text-zinc-300` for readability

3. **Update CTA button styling**
   - Change button background from the blue gradient to white (`bg-white text-[#003A70]`) so it stands out against the dark card -- or keep the gradient with a lighter border accent

## Technical Notes
- The `HlsVideoBackground` component is already imported in `Index.tsx`
- Each card gets its own video instance; since these are lightweight HLS streams with `enableWorker: false`, performance should remain smooth
- The `relative` + `z-10` pattern on content is already established throughout the codebase

