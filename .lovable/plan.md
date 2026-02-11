

# Increase Text Sizes Across Funding Journey Visuals

## Problem
The text in the "Your Path To Funding" dashboard visuals is far too small. Most labels use `text-[8px]` to `text-[11px]`, making them nearly unreadable.

## Size Bump Strategy
Every text element across all 5 visual components will be bumped up by roughly 2 steps:

| Current Size | New Size |
|---|---|
| `text-[8px]` | `text-xs` (12px) |
| `text-[9px]` | `text-xs` (12px) |
| `text-[10px]` | `text-sm` (14px) |
| `text-[11px]` | `text-sm` (14px) |
| `text-xs` | `text-sm` (14px) |
| `text-sm` | `text-base` (16px) |
| `text-base` | `text-lg` (18px) |
| `text-lg` | `text-xl` (20px) |
| `text-2xl` | `text-3xl` (30px) |
| `text-3xl` | `text-4xl` (36px) |
| `text-4xl` | `text-5xl` (48px) |
| `text-5xl` | `text-6xl` (60px) |

Icons will also be bumped slightly (e.g., `w-3.5 h-3.5` to `w-5 h-5`).

## Files Changed

### 1. AssessmentVisual.tsx
- Stat card labels: `text-[10px]` to `text-sm`
- Stat card values: `text-sm` to `text-base`
- Icon containers: slightly larger
- Form field labels: `text-[10px]` to `text-sm`
- Progress bar labels: `text-[10px]` to `text-sm`
- Step dots labels: `text-[8px]` to `text-xs`

### 2. CreditAnalysisVisual.tsx
- "Current Score" label: `text-[10px]` to `text-sm`
- Score number: `text-5xl` to `text-6xl`
- "+42 pts" text: `text-[10px]` to `text-sm`
- Bureau name labels: `text-[10px]` to `text-sm`
- Bureau score values: `text-sm` to `text-base`
- Change values: `text-xs` to `text-sm`
- "Score History" label: `text-[10px]` to `text-sm`
- Starting/Current/Target labels: `text-[9px]` to `text-xs`
- Starting/Current/Target values: `text-sm` to `text-base`
- "Negative Items" label: `text-[10px]` to `text-sm`
- Counter "3/5": `text-2xl` to `text-3xl`
- Resolved label: `text-[10px]` to `text-sm`
- Negative item text: `text-[11px]` to `text-sm`
- Status badges: `text-[9px]` to `text-xs`
- "Avg. Improvement" label: `text-[10px]` to `text-sm`

### 3. RestorationVisual.tsx
- "Items Resolved" counter: `text-2xl` to `text-3xl`
- "Items Resolved" label: `text-[10px]` to `text-sm`
- Summary badge numbers: `text-sm` to `text-base`
- Summary badge labels: `text-[8px]` to `text-xs`
- Icons in badges: `w-3.5 h-3.5` to `w-5 h-5`
- "Dispute Results" label: `text-[10px]` to `text-sm`
- Dispute item text: `text-[11px]` to `text-sm`
- Dispute result text: `text-[10px]` to `text-xs`
- Bureau tags: `text-[8px]` to `text-xs`
- Footer text: `text-[9px]` to `text-xs`
- Bureau score names: `text-[10px]` to `text-sm`
- Before/After labels: `text-[9px]` to `text-xs`
- Before/After values: `text-lg` to `text-xl`
- Change values: `text-xs` to `text-sm`

### 4. LenderMatchVisual.tsx
- "Credit Lines" label: `text-[10px]` to `text-sm`
- "7 Approved" value: `text-3xl` to `text-4xl`
- "Total Available" label: `text-[10px]` to `text-sm`
- Dollar amount: `text-3xl` to `text-4xl`
- "Latest deposit" text: `text-xs` to `text-sm`
- "Funding By Lender" label: `text-[10px]` to `text-sm`
- Lender names: `text-sm` to `text-base`
- Dollar amounts: `text-base` to `text-lg`

### 5. GetFundedVisual.tsx
- "Total Funded" label: `text-[10px]` to `text-sm`
- Total amount: `text-4xl` to `text-5xl`
- Breakdown labels: `text-[10px]` to `text-sm`
- Breakdown values: `text-sm` to `text-base`
- "Milestones Complete" label: `text-[10px]` to `text-sm`
- Counter "5/5": `text-2xl` to `text-3xl`, sub-text `text-sm` to `text-base`
- "All Complete" text: `text-[10px]` to `text-sm`
- Checklist item labels: `text-xs` to `text-sm`
- Checklist status: `text-[9px]` to `text-xs`
- "Funding Highlights" label: `text-[10px]` to `text-sm`
- Badge text: `text-[11px]` to `text-sm`
- Icons in badges: `w-3.5 h-3.5` to `w-4 h-4`
- "Funding Complete" text: `text-xs` to `text-sm`
- "Average timeline" text: `text-[9px]` to `text-xs`

### 6. FundingJourney.tsx (step labels inside the card)
- "Step X" label: `text-[11px]` to `text-sm`
- Step nav labels: `text-[10px]` to `text-xs` (already `sm:text-xs`, bump to `text-xs sm:text-sm`)

## No layout changes
The grid layouts, padding, and overall card structure remain the same. Only font sizes and icon sizes are being increased for readability.

