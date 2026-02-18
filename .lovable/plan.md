
# Auto-Fill Lead Data + Unify Funnel Accent Colors

## Overview
Two changes: (1) Auto-populate the consultation calendar's name and email fields from what the user already entered in the lead magnet form, and (2) Replace all emerald/green accent colors across the funnel with the cyan-to-blue palette used on the homepage and the other funnel pages.

---

## 1. Auto-Fill Name & Email from Lead Magnet

The lead magnet page (`/funnel`) collects name, email, and phone. Currently this data is only saved to the database -- there's no way for downstream funnel pages to access it.

**How it works:**
- When the lead magnet form submits successfully, save `{ name, email, phone }` to `sessionStorage` under a key like `funnel_lead`.
- On the consultation calendar component, read `funnel_lead` from `sessionStorage` on mount and pre-fill the name, email, and phone fields.
- The fields remain editable in case the user wants to change them.

**Files changed:**
- `src/pages/funnel/FunnelLeadMagnet.tsx` -- After successful submit, write to `sessionStorage`.
- `src/components/funnel/ConsultationCalendar.tsx` -- On mount, read from `sessionStorage` and set initial state.

---

## 2. Unify Accent Colors to Cyan/Blue

The homepage and first two funnel pages consistently use `cyan-400` / `blue-400` as the accent palette. The consultation page and its calendar incorrectly use `emerald` (green) accents. The downsell page uses orange/yellow which is intentional for urgency and will remain as-is.

**Color replacements on the Consultation page (`FunnelConsultation.tsx`):**
- Badge: `bg-emerald-500/10 border-emerald-400/20 text-emerald-300` becomes `bg-cyan-500/10 border-cyan-400/20 text-cyan-300`
- Headline gradient: `from-emerald-400 to-cyan-400` becomes `from-cyan-400 to-blue-400` (matches all other funnel pages)

**Color replacements in the Calendar component (`ConsultationCalendar.tsx`):**
- Step indicator active: `bg-emerald-500/20 text-emerald-300 border-emerald-400/30` becomes `bg-cyan-500/20 text-cyan-300 border-cyan-400/30`
- Step indicator done: `bg-emerald-500/10 text-emerald-400` becomes `bg-cyan-500/10 text-cyan-400`
- Step connector done: `bg-emerald-400` becomes `bg-cyan-400`
- Calendar selected day: `bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30 hover:text-emerald-200` becomes `bg-cyan-500/20 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/30 hover:text-cyan-200`
- Selected time slot: `bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30` becomes `bg-cyan-500/20 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/30`
- Continue/Book buttons: `from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400` becomes `from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400`
- Input focus rings: `focus-visible:ring-emerald-400/40` becomes `focus-visible:ring-cyan-400/40`
- Confirmation checkmark: `text-emerald-400` becomes `text-cyan-400`

**Files changed:**
- `src/pages/funnel/FunnelConsultation.tsx` -- Badge and headline gradient colors.
- `src/components/funnel/ConsultationCalendar.tsx` -- All emerald references replaced with cyan/blue.

---

## Technical Summary

| File | Change |
|------|--------|
| `src/pages/funnel/FunnelLeadMagnet.tsx` | Save lead data to `sessionStorage` after successful submit |
| `src/pages/funnel/FunnelConsultation.tsx` | Replace emerald badge/gradient with cyan/blue |
| `src/components/funnel/ConsultationCalendar.tsx` | Read lead data from `sessionStorage` for auto-fill; replace all emerald colors with cyan/blue |
