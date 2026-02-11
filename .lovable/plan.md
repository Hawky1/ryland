

## Convert Site to White Background with Dark Blue Cards

Transform the entire site from a dark theme to a clean, bright white background -- giving it a professional, finance-industry feel -- while keeping the cards and interactive sections in dark blue/navy tones.

---

### Design Direction

- **Page backgrounds**: Clean white with a subtle light gray grid (instead of dark slate)
- **Text on white areas**: Dark navy/slate text instead of white
- **Cards and feature sections**: Keep their current dark blue/navy aesthetic (the Funding Journey card, FAQ card, CTA card, testimonial cards, success story cards)
- **Navbar**: White/light backdrop with dark text and dark logo (will need a dark version of the logo, or we remove the brightness-invert filter)
- **Bank logos**: Remove the `brightness-0 invert` filter so they show in their natural colors on white
- **Footer**: Light background with dark text

This creates a "light page, dark cards" contrast that looks premium and financial.

---

### Files to Modify

**1. `src/pages/Index.tsx` (main homepage)**
- Change the outer wrapper from `text-white` to `text-slate-900`
- Change the fixed background from dark slate gradient to white/light gray
- Update `InfiniteGrid` colors to use subtle gray lines on white (e.g., `rgba(148, 163, 184, 0.12)` base, `rgba(59, 130, 246, 0.3)` active)
- Navbar: Change nav link colors from `text-slate-300` to `text-slate-600`, hover to `text-slate-900`
- Mobile menu: Change from `bg-slate-950/95` to `bg-white/95` with dark text
- Bank logos section: Remove `brightness-0 invert` so logos appear in natural colors; update label text to `text-slate-500`
- Section headings (Success Stories, Testimonials, FAQ titles): Change from `text-white` to `text-slate-900`
- Section descriptions: Change from `text-slate-400`/`text-zinc-400` to `text-slate-500`/`text-slate-600`
- The gradient blur at the top: Adjust from dark tones to white-based blur
- Footer: Change border and text colors to dark-on-light variants
- The `shiny-cta` button: Update the `background` from `#000000` to dark navy (`#0f172a`) so it still pops on white
- Hero section card: Keeps its dark video background and white text (no change needed -- it's self-contained)
- Funding Journey card: Keeps dark background (already has its own video bg)
- FAQ and CTA cards: Keep their dark `bg-zinc-500/5` but change border styling to work on white (use `border-slate-200` and `bg-slate-900` for a dark card look)
- Testimonial cards: Switch from `bg-zinc-900/40` to dark navy (`bg-slate-900`) so they pop on white
- Success story cards: Switch from `bg-zinc-900` to `bg-slate-900`

**2. `src/components/FundingJourney.tsx`**
- Section heading text: Change from `text-white` to `text-slate-900`
- Description text: Change from `text-neutral-400` to `text-slate-500`
- The card itself stays dark (it has its own video background) -- no changes inside the card
- Nav arrows below: Change from `text-neutral-400 hover:text-white` to `text-slate-400 hover:text-slate-900`

**3. `src/components/ui/infinite-grid.tsx`**
- Update the ambient glow orbs from cyan/blue on dark to softer blue/indigo on light (lower opacity)

**4. `src/index.css`**
- No major changes needed since the site uses inline Tailwind classes rather than CSS variables for most styling

**5. Legal/compliance pages** (`TSRCompliance.tsx`, `PrivacyPolicy.tsx`, `TermsOfService.tsx`, `CCPA.tsx`, `CookiePolicy.tsx`, `Disclaimers.tsx`, `Partners.tsx`)
- Same pattern: white background, dark text, dark cards where applicable
- Change fixed background gradient from dark slate to white
- Update `InfiniteGrid` colors to light variant
- Change header from dark to light
- Update all text colors from light-on-dark to dark-on-light

---

### Technical Details

**Color mapping (dark to light):**

| Element | Current (Dark) | New (Light) |
|---|---|---|
| Page background | `#0f172a` slate gradient | `#ffffff` white |
| Body text | `text-white` | `text-slate-900` |
| Secondary text | `text-slate-300/400` | `text-slate-500/600` |
| Nav links | `text-slate-300` | `text-slate-600` |
| Section titles | `text-white` | `text-slate-900` |
| Card backgrounds | `bg-zinc-900` | `bg-slate-900` (stays dark) |
| Card borders | `border-white/10` | `border-slate-200` (on page) / `border-white/10` (inside dark cards) |
| Footer border | `border-white/10` | `border-slate-200` |
| Testimonial fade edges | `from-zinc-950` | `from-white` |

**What stays dark (unchanged):**
- Hero section (self-contained with video bg)
- Funding Journey card (self-contained with video bg)
- FAQ section card (will become a dark navy card on white)
- CTA section card (will become a dark navy card on white)
- All funding visual components (they live inside the dark card)

This approach creates a high-contrast, professional financial look where the white page feels clean and trustworthy, while the dark cards feel premium and high-tech.

