

## Logo Swap + Homepage Section Reorder

Two changes in one update: replace the navbar/footer logo with the uploaded black Ryland Partners logo (tinted dark navy blue to match the "Get Started" button), and reorder the homepage sections to the conversion-optimized flow discussed earlier.

---

### 1. New Logo Integration

- Copy the uploaded `black_logo.png` to `src/assets/logo-dark.png`
- Import it in `Index.tsx` as the primary header logo (replacing `logo-white.png` for the navbar)
- Apply a CSS filter to tint it dark navy blue to match the button color (`#0f172a`): use `brightness-0` combined with a `sepia`, `saturate`, and `hue-rotate` filter chain, or simply use a CSS `filter: brightness(0) saturate(100%)` approach that produces a near-black/dark navy tone
- The footer can keep the white logo (it sits on a light background with dark text, but the black logo would also work there) -- or we swap both to the dark logo for consistency
- The hero section retains the white logo inside its dark video card (no change needed there)

### 2. Homepage Section Reorder

Rearrange sections from the current order to the recommended conversion flow:

**Current order:**
1. Hero
2. Trusted Banking Partners
3. Funding Journey
4. Wealth Ecosystem (Services)
5. Success Stories
6. About Gene Ryland
7. Testimonials
8. FAQ
9. CTA
10. Footer

**New order:**
1. Hero
2. Trusted Banking Partners
3. About Gene Ryland (moved up -- builds authority early)
4. Funding Journey
5. Success Stories
6. Testimonials (right after success stories for back-to-back proof)
7. Wealth Ecosystem / Services (broader offerings after trust is built)
8. FAQ
9. CTA
10. Footer

---

### Files to Modify

**`src/pages/Index.tsx`**
- Add import for new dark logo asset (`logo-dark.png`)
- Replace the navbar `<img>` src from `logoWhite` to `logoDark`
- Apply a CSS filter to make it dark navy blue (e.g., `style={{ filter: 'brightness(0) saturate(100%)' }}` for pure black, or a custom filter for dark navy)
- Replace the footer logo similarly
- Cut the About Gene Ryland section (lines ~660-723) and paste it after the Banking Partners section (after line ~550)
- Move the Wealth Ecosystem / Services section (lines ~555-591) to after Testimonials (after line ~823)

### Technical Details

**Logo color filter** to match the dark navy button (`#0f172a`):
- A simple `brightness(0)` filter will render the logo pure black, which is close to the button color and looks clean on white
- For an exact navy tint, a filter like `brightness(0) saturate(100%) invert(8%) sepia(20%) saturate(3000%) hue-rotate(200deg)` can approximate `#0f172a`

**Section reorder** is purely a cut-and-paste of JSX blocks within `Index.tsx` -- no logic or prop changes needed, just repositioning the section blocks.

