

# Testimonials Upgrade and Site-Wide Font Change

## Overview
Three changes: (1) add Inter as the site-wide body font for a more professional look, (2) increase testimonial card font sizes, and (3) move the entire Testimonials section below the Wealth Ecosystem (services) section.

## Changes

### 1. Add Inter Font Site-Wide
- Add the Inter Google Font import to `index.html`
- Update `src/index.css` to set `font-family: 'Inter', sans-serif` on the body
- This gives all body text a clean, professional look while keeping Manrope for headings where already applied

### 2. Improve Testimonial Card Typography
- Increase quote text from `text-sm` to `text-base` for better readability
- Increase name text from `text-sm` to `text-base font-semibold`
- Increase role/title from `text-xs` to `text-sm`
- Add slightly more padding to cards (`p-6` instead of `p-5`)

### 3. Move Testimonials Under Services
Currently the section order is:
1. Who This Is For
2. Testimonials
3. Wealth Ecosystem (Services)
4. FAQ

New order:
1. Who This Is For
2. Wealth Ecosystem (Services)
3. Testimonials
4. FAQ

This means cutting the entire Testimonials block (style tag + section, roughly lines 665-844) and pasting it after the Wealth Ecosystem section (after line 885).

## Files Modified
- `index.html` -- add Inter font link
- `src/index.css` -- set Inter as default body font
- `src/pages/Index.tsx` -- reorder sections and increase testimonial font sizes
