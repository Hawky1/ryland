
# Revert White Cards to Blue Theme + Mobile Optimize Step Navigation

## Overview
Two main changes: (1) Convert the white-background cards in GetFundedVisual and LenderMatchVisual back to the translucent blue style matching the dark video background, and (2) make the 1-2-3-4-5 step navigation mobile-friendly so it never causes a horizontal scrollbar.

## 1. GetFundedVisual.tsx - Revert White Cards to Blue Theme

### Total Funded hero card (line 35)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- Text: `text-slate-500` --> `text-neutral-400`
- The gradient text on the dollar amount stays as-is (already cyan-to-blue gradient)

### Funding Highlights card (line 146)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- `text-slate-500` --> `text-neutral-400`
- `text-cyan-600` icon --> `text-cyan-400`
- Badge items: `bg-cyan-50 border border-cyan-200` --> `bg-cyan-500/10 border border-cyan-500/30`
- Badge text: `text-cyan-700` --> `text-cyan-300`
- Badge icon: `text-cyan-600` --> `text-cyan-400`

## 2. LenderMatchVisual.tsx - Revert White Cards to Blue Theme

### Credit Lines card (line 28)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- `text-slate-500` --> `text-neutral-400`
- `text-slate-900` --> `text-white`

### Total Available card (line 37)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- `text-slate-500` --> `text-neutral-400`
- `text-cyan-600` --> `text-cyan-400`

## 3. Also revert AssessmentVisual.tsx and RestorationVisual.tsx white cards

### AssessmentVisual - 3 stat cards (line 24)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- `text-slate-500` --> `text-neutral-400`
- `text-slate-900` --> `text-white`
- Icon bg: `bg-cyan-50` --> `bg-cyan-500/10`
- Icon: `text-cyan-600` --> `text-cyan-400`

### RestorationVisual - Progress ring card (line 34)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- SVG stroke bg: `rgba(0,0,0,0.06)` --> `rgba(255,255,255,0.1)`
- `text-slate-900` --> `text-white`
- `text-slate-500` --> `text-neutral-400`

### RestorationVisual - 2 summary badges (lines 69, 79)
- `bg-white border border-slate-200 shadow-sm` --> `bg-white/5 border border-white/10`
- `text-slate-900` --> `text-white`
- `text-slate-500` --> `text-neutral-400`

## 4. FundingJourney.tsx - Mobile-Optimize Step Navigation

### Step bar (lines 99-132)
- Remove `overflow-x-auto` to prevent scrollbar
- On mobile, hide the step title text labels (show only the numbered circles)
- Use responsive classes: `hidden sm:block` on the `<span>` with the step title
- Reduce circle size on mobile: `w-7 h-7 sm:w-9 sm:h-9`
- Reduce connector width on mobile: `w-4 sm:w-8` for the line between circles
- Reduce horizontal padding: `px-3 sm:px-6`

This ensures the 5 numbered circles fit comfortably on any screen width without scrolling, while the full labels still appear on tablet/desktop.

## Files Changed
- `src/components/funding-visuals/GetFundedVisual.tsx`
- `src/components/funding-visuals/LenderMatchVisual.tsx`
- `src/components/funding-visuals/AssessmentVisual.tsx`
- `src/components/funding-visuals/RestorationVisual.tsx`
- `src/components/FundingJourney.tsx`
