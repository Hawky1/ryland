

# Add White Background Cards to Funding Journey Visuals

## Overview
Update select inner cards across the 5 funding journey visual components to use a solid white background with dark text, creating a professional contrast against the dark blue video background. Rather than making all cards white (which would look washed out), a mix of white and translucent cards will create visual depth and hierarchy.

## Design Approach
- **Primary stat cards and key data panels** will get white backgrounds with dark text
- **Secondary/supporting elements** (progress bars, small badges, status rows) will keep the current translucent dark style
- This creates a layered, professional look similar to modern fintech dashboards

## Changes by File

### 1. AssessmentVisual.tsx
- **3 stat cards** (Business Type, Funding Goal, Timeline): Change to white background with dark text, subtle border, and light shadow
- **Form fields and progress bar**: Keep dark/translucent (they look like form UI elements and work better dark)

### 2. CreditAnalysisVisual.tsx
- **Big "Current Score" card**: Change to white background with dark labels
- **3 bureau score cards** (TransUnion, Equifax, Experian): Change to white background
- **Bar chart panel and Starting/Current/Target row**: Keep dark (chart visuals read better on dark)
- **Negative items panel**: Keep dark

### 3. RestorationVisual.tsx
- **Progress ring card** (Items Resolved): Change to white background
- **2 summary badges** (Negatives Removed, Disputes Won): Change to white background
- **Dispute Results list and Bureau Score panels**: Keep dark

### 4. LenderMatchVisual.tsx
- **2 stat cards** (Credit Lines, Total Available): Change to white background with dark text
- **Bar chart panel and deposit badge**: Keep dark

### 5. GetFundedVisual.tsx
- **Total Funded hero card**: Change to white background
- **Funding Highlights badges panel**: Change to white background
- **Checklist and breakdown items**: Keep dark

## Technical Details
For each white card:
- Background: `bg-white` replacing `bg-white/5`
- Border: `border-slate-200` replacing `border-white/10`
- Shadow: Add `shadow-sm` for depth
- Text colors: Labels become `text-slate-500`, values become `text-slate-900`
- Icons: Adjust from `text-cyan-400` to brand-appropriate colors that work on white (keep cyan/blue tones)
- Inner gradient overlays (`bg-gradient-to-br from-cyan-500/5`) will be adjusted or removed as they won't be visible on white

This selective approach gives the section a polished, high-contrast look while maintaining visual variety and depth.
