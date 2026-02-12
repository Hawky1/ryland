
# Redesign Partners Page to Match Homepage Styling

## Problem
The Partners page has a different visual language from the homepage:
- **Navbar**: No `bg-white/70 backdrop-blur-xl border-b` styling; uses `logoWhite` instead of `logoDark`
- **Background grid**: Lower opacity (`0.12` / `0.3`) vs homepage (`0.20` / `0.45`)
- **Gradient blur**: Still present (removed from homepage)
- **Cards**: Use `bg-slate-900` with `border-white/10` instead of `HlsVideoBackground` with `border-[#004E8C]`
- **Hero**: Uses a raw `<video>` tag with black gradient overlay instead of `HlsVideoBackground` with the Chase blue overlay
- **Section headings**: Dark text on white (`text-slate-900`) -- this is fine and matches homepage sections
- **"Perfect For" persona grid**: White cards with `border-slate-200` instead of dark video cards
- **FAQ**: White cards with slate borders instead of dark video cards
- **Final CTA**: Simple `bg-slate-900` box instead of the homepage's large hero-style CTA with `HlsVideoBackground`, gradient text, shiny-cta button, and trust signals
- **Footer**: Missing `bg-white/70 backdrop-blur` treatment; has mask gradients

## Changes

### File: `src/pages/Partners.tsx`

**1. Navbar -- match homepage exactly**
- Import `logoDark` and use it instead of `logoWhite`
- Add `bg-white/70 backdrop-blur-xl border-b border-slate-100` to the `<header>` tag
- Add `Partners` link to nav alongside Home, About, Services, Community, Store

**2. Background grid -- match homepage opacity**
- Change `baseGridColor` to `rgba(148, 163, 184, 0.20)`
- Change `activeGridColor` to `rgba(59, 130, 246, 0.45)`

**3. Remove gradient-blur div**
- Delete the gradient-blur overlay (already removed from homepage)

**4. Hero section -- use HlsVideoBackground**
- Replace the raw `<video>` tag + black gradient overlay with the `HlsVideoBackground` component using the same `bg-[#003A70]/90` overlay
- Change the card border to `border-[#004E8C]` to match homepage hero
- Keep the gradient text and content the same
- Replace the blue gradient CTA button with the `shiny-cta` animated button

**5. Value Pillars (3 cards) -- add video backgrounds**
- Replace `bg-slate-900` with `HlsVideoBackground` + `border-[#004E8C]` + `overflow-hidden`
- Wrap content in `relative z-10`

**6. Copy Block ("Here's How...") -- add video background**
- Same treatment: `HlsVideoBackground` + `border-[#004E8C]`

**7. 3-Step Process cards -- add video backgrounds**
- Same treatment as homepage service cards

**8. "Perfect For" persona grid -- add video backgrounds**
- Replace `bg-white border-slate-200` with dark video cards (`HlsVideoBackground` + `border-[#004E8C]`)
- Update text colors from `text-slate-700` to `text-white`
- Replace the blue gradient CTA button with `shiny-cta`

**9. Support & Resources cards -- add video backgrounds**
- Same dark video card treatment

**10. "Easiest Money" CTA block -- add video background**
- Replace `bg-slate-900` with `HlsVideoBackground`
- Replace blue gradient button with `shiny-cta`

**11. "How We Service Referrals" cards -- add video backgrounds**
- Same dark video card treatment
- Keep the blue info banner below as-is (it's a light accent)

**12. FAQ section -- add video backgrounds to each item**
- Replace `bg-white border-slate-200` with dark video cards
- Update text colors: questions to `text-white`, answers to `text-zinc-300`
- Update chevron color to `text-zinc-400`

**13. Final CTA section -- match homepage CTA redesign**
- Replace the simple `bg-slate-900` box with `HlsVideoBackground` + `border-[#004E8C]`
- Use large gradient text (`text-4xl md:text-5xl lg:text-6xl bg-gradient-to-b from-white via-white to-zinc-400`)
- Replace the blue gradient button with `shiny-cta` animated button
- Add trust signals row (matching homepage: "No credit check required", "48-hour approval", "10,000+ entrepreneurs funded")
- Increase padding to `md:py-24`

**14. Footer -- keep as-is**
- The footer styling is consistent across pages and works fine

## Technical Notes
- Import `HlsVideoBackground` and `logoDark` at the top of the file
- Import `motion` from framer-motion if needed for card animations
- The `shiny-cta` CSS is already included in the page's `<style>` block -- just needs to be added since Partners currently lacks it
- Copy the `shiny-cta` CSS from `Index.tsx` into the Partners `<style>` block
- Each dark card gets its own `HlsVideoBackground` instance with `overflow-hidden` on the parent and `relative z-10` on the content
