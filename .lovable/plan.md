

## Chase Blue About Card with Oversized Portrait

Transform the "Meet The Founder" section into a Chase blue card with Gene's portrait enlarged so his head extends above the card boundary for a premium, editorial look.

---

### 1. Wrap the About content in a Chase blue card

Currently the About section sits on a plain white background. Wrap the two-column grid (image + bio) inside a Chase blue card container matching the rest of the site.

**Line ~566 area**: Wrap the grid in a new container div with:
- `bg-gradient-to-br from-[#0060A9] to-[#003A70] border border-[#004E8C] rounded-3xl p-8 md:p-12 shadow-2xl`
- Update all text colors inside from slate (dark text on white) to white/light equivalents:
  - `text-slate-600` / `text-slate-500` paragraphs become `text-white/80`
  - `text-slate-900` stats become `text-white`
  - `text-xs text-slate-500` stat labels become `text-white/60`
  - Border divider `border-slate-200` becomes `border-white/20`

### 2. Enlarge Gene's portrait to extend above the card

- Remove the current `max-w-md` constraint on the image
- Add negative top margin (`-mt-24 md:-mt-32`) so the image rises above the card boundary
- Add `overflow-visible` to the card container so the image isn't clipped
- Make the image larger: `w-full max-w-sm md:max-w-md lg:max-w-lg`
- Remove the light border (`border-slate-200 ring-1 ring-slate-200/50`) and replace with a Chase blue border or remove entirely for a cleaner floating look
- Remove the blue blur glow behind the image (it won't read well on a blue card)

### 3. Update section header text

The "Meet The Founder" heading area (lines 557-563) sits above the card on white background -- these stay as-is (dark text on white). Only the content inside the card changes color.

---

### Technical Summary

| Element | Current | New |
|---|---|---|
| Card background | none (white page) | `bg-gradient-to-br from-[#0060A9] to-[#003A70]` |
| Card border | none | `border border-[#004E8C] rounded-3xl` |
| Card overflow | default | `overflow-visible` (allows portrait to extend out) |
| Portrait size | `max-w-md` | `max-w-lg` with `-mt-24 md:-mt-32` |
| Portrait border | `border-slate-200` | removed or `border-[#004E8C]` |
| Bio text | `text-slate-600` | `text-white/80` |
| Stat numbers | `text-slate-900` | `text-white` |
| Stat labels | `text-slate-500` | `text-white/60` |
| Stat divider | `border-slate-200` | `border-white/20` |

