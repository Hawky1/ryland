

# Credit Analysis Visual Redesign + Compact Funding Journey Layout

## Overview
Two changes: (1) Add the three bureau logos to the Credit Analysis visual, and (2) remove the "Step X" label, title, and description text block from the Funding Journey card to create a more compact, centered layout.

## Changes

### 1. Add Bureau Logos (CreditAnalysisVisual.tsx)
- Copy the 3 uploaded logo files into `src/assets/`:
  - `logo-transunion.png`
  - `logo-equifax.png`
  - `logo-experian.png`
- Import them in the component
- Add each logo as a small image (approx. `h-5`) next to or replacing the bureau name text in the bureau score cards
- The bureau name text stays as a fallback/alt but the logo becomes the primary visual identifier

### 2. Remove Step Header Block (FundingJourney.tsx)
- Remove the "Step X" label (`<span>Step {active + 1}</span>`)
- Remove the step title (`<h3>`)
- Remove the description (`<p>`)
- Remove the entire `<div className="text-center mb-6">` wrapper that contains these three elements
- This gives the visual more vertical space and pushes content toward the center
- Reduce top/bottom padding on the visual container (`mb-6` gone, adjust `pt-4` and `py-4` as needed) so everything sits more centrally in the card

### 3. Tighten Spacing
- With the header block removed, reduce the `min-h-[480px] sm:h-[580px]` to something shorter like `min-h-[400px] sm:h-[480px]` since the content area no longer needs space for the text block
- The visual will naturally center in the remaining space via the existing `flex items-center justify-center`

## Files Changed
- `src/assets/logo-transunion.png` (new - copied from upload)
- `src/assets/logo-equifax.png` (new - copied from upload)
- `src/assets/logo-experian.png` (new - copied from upload)
- `src/components/funding-visuals/CreditAnalysisVisual.tsx` (add logo imports + render logos in bureau cards)
- `src/components/FundingJourney.tsx` (remove step header block, tighten spacing)

