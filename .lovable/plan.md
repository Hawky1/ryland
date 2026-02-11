

## Remove Transparency and Make Dark Sections Fully Opaque

Replace all semi-transparent borders, rings, overlays, and backgrounds with solid opaque equivalents so the dark cards and hero section stand out crisply against the white page background.

---

### Changes Overview

Every dark card/section currently uses `border-white/10`, `ring-white/5`, `bg-black/60`, and `opacity-40` patterns that create a washed-out, see-through look on the white background. This plan replaces them all with solid values.

---

### File 1: `src/pages/Index.tsx`

**Hero section (line ~444):**
- Change `border border-white/10 ring-1 ring-white/5` to `border border-slate-800`
- Change video `opacity-40` to `opacity-100` (full visibility)
- Change gradient overlay `from-black/70 via-black/40 to-transparent` to `from-black/80 via-black/50 to-black/20` (solid dark overlay, no fully transparent edge)

**Success Stories cards (lines ~623-674):**
- Change all `ring-white/10 ring-1` to solid `border border-slate-700`
- Keep `bg-slate-900` (already solid)

**Testimonial cards (lines ~696-775):**
- Change `border border-white/10` to `border border-slate-700`

**Services/Wealth Ecosystem cards (line ~794):**
- Change `border border-white/10 ring-1 ring-white/5` to `border border-slate-700`

**FAQ section (line ~820):**
- Change `border-white/10 border` and `ring-white/10 ring-1` to `border border-slate-700`
- Change inner FAQ items `border border-white/10 bg-white/5` to `border border-white/10 bg-white/5` (these are INSIDE the dark card so they stay as-is -- they look correct on dark bg)

**CTA section (line ~902):**
- Change `border-white/10 border` and `ring-white/10 ring-1` to `border border-slate-700`

### File 2: `src/components/FundingJourney.tsx`

**Card container (line ~89):**
- Change `border border-white/10 ring-1 ring-white/5` to `border border-slate-700`
- Change video overlay `bg-black/60` to `bg-black/80` (darker, more opaque)

---

### Technical Summary

| Element | Current (Transparent) | New (Solid) |
|---|---|---|
| Dark card borders | `border-white/10` | `border-slate-700` |
| Card rings | `ring-1 ring-white/5` | removed |
| Hero video | `opacity-40` | `opacity-100` |
| Hero overlay | `from-black/70 via-black/40 to-transparent` | `from-black/80 via-black/50 to-black/20` |
| Funding Journey overlay | `bg-black/60` | `bg-black/80` |

Elements INSIDE dark cards (FAQ items, step indicators) keep their existing `border-white/10` and `bg-white/5` since those are designed for dark-on-dark contrast and look correct.
