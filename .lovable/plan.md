

## Logo Swap, Glassmorphism Navbar, and Spacing Update

Three focused changes to polish the header area and branding.

---

### 1. Replace Chase Bank Logo with Ryland Partners Logo

Copy the uploaded `black_logo-2.png` into the project and use it in place of the Chase Bank logo in the "Trusted Banking Partners" carousel.

- Copy `user-uploads://black_logo-2.png` to `src/assets/logo-chase.png` (overwrite the existing Chase logo file)
- No import changes needed since the file path stays the same
- Both instances of the Chase logo in the carousel (lines 533 and 540) will automatically pick up the new image

### 2. Glassmorphism Sticky Navbar

The navbar is already `sticky top-0`, but it has no background -- content scrolls behind it visibly. Add a frosted glass effect:

- Update the `<header>` className from `sticky z-20 top-0` to `sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100`
- This gives a semi-transparent white background with a strong blur, plus a subtle bottom border separator

### 3. Add Space Between Navbar and Hero Card

Currently the hero section starts immediately after the header with `pt-16` internal padding but no top margin separating it from the nav.

- Add `mt-8` (32px gap) to the hero `<section>` element on line 444, creating breathing room between the navbar and the hero card

---

### File: `src/pages/Index.tsx`

**Line 404 (header):**
- Change: `sticky z-20 top-0`
- To: `sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100`

**Line 444 (hero section):**
- Add `mt-8` to the existing className

**Logo file replacement:**
- Overwrite `src/assets/logo-chase.png` with the uploaded Ryland Partners logo

