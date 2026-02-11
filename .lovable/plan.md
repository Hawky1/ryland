

## Chase Bank Blue Theme for All Dark Sections

Transform all dark card sections from the current dark slate/black color scheme to Chase Bank's signature blue gradient -- starting from the uploaded blue (#0060A9) and transitioning to a deeper navy blue (#003A70).

---

### Color Palette (Chase Bank inspired)

- **Primary blue**: `#0060A9` (the uploaded swatch)
- **Deep navy**: `#003A70` (darker end of gradient)
- **Border**: `#004E8C` (mid-tone for solid borders)
- **Accent highlights**: keep existing cyan/blue-400 accents -- they complement Chase blue naturally

### Sections to Update

**File: `src/pages/Index.tsx`**

1. **Hero section (line 444)**: Change `border-slate-800` to a Chase blue border. Update the gradient overlay from black-based to a deep Chase blue overlay (`from-[#003A70]/90 via-[#003A70]/60 to-[#0060A9]/30`).

2. **Success Stories cards (lines 623-674)**: Replace `bg-slate-900` with `bg-gradient-to-br from-[#0060A9] to-[#003A70]`. Replace `border-slate-700` with `border-[#004E8C]`.

3. **Testimonial cards (lines 696-775)**: Replace `bg-slate-900 border-slate-700` with `bg-gradient-to-br from-[#0060A9] to-[#003A70] border-[#004E8C]`.

4. **FAQ section (line 820)**: Replace `bg-slate-900 border-slate-700` with `bg-gradient-to-br from-[#0060A9] to-[#003A70] border-[#004E8C]`.

5. **CTA section (line 902)**: Replace `bg-slate-900 border-slate-700` with `bg-gradient-to-br from-[#0060A9] to-[#003A70] border-[#004E8C]`.

**File: `src/components/FundingJourney.tsx`**

6. **Funding Journey card (line 89)**: Replace `border-slate-700` with `border-[#004E8C]`. Change the video overlay from `bg-black/80` to `bg-[#003A70]/90` so the card reads as deep Chase blue rather than black.

---

### Technical Summary

| Element | Current | New (Chase Blue) |
|---|---|---|
| Card backgrounds | `bg-slate-900` | `bg-gradient-to-br from-[#0060A9] to-[#003A70]` |
| Card borders | `border-slate-700` | `border-[#004E8C]` |
| Hero overlay | `from-black/80 via-black/50 to-black/20` | `from-[#003A70]/90 via-[#003A70]/60 to-[#0060A9]/30` |
| Hero border | `border-slate-800` | `border-[#004E8C]` |
| Funding Journey overlay | `bg-black/80` | `bg-[#003A70]/90` |
| Inner elements (FAQ items, badges) | Unchanged | Unchanged (white/10 stays for internal contrast) |

Text colors (white, zinc-100, zinc-300, zinc-400, slate-300, slate-400) remain the same -- they all have excellent contrast on the Chase blue backgrounds.

