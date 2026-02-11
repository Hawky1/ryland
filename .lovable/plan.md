

## Upgrade Funding Journey Visuals to Dashboard-Style Graphics

Redesign the animated visuals inside the device frame card to be rich, dashboard-style panels with more graphics, data visualizations, and motion -- inspired by the reference images showing stat cards, bar charts, and completion checklists.

---

### What Changes

Each of the 5 step visuals will be replaced with a multi-panel dashboard layout inside the card, featuring animated charts, stat boxes, and progress indicators. The step header and navigation remain the same.

---

### Step-by-Step Visual Redesign

**Step 1 -- Take Your Assessment**
- 3-column layout with animated stat cards:
  - "Business Type" with a pulsing icon
  - "Funding Goal" with an animated counter ($50k-$250k)
  - "Timeline" showing "30-60 Days"
- Below: animated progress bar filling to 75% with step dots
- Form fields animate in sequentially with typing cursor effect

**Step 2 -- Credit Analysis**
- Left panel: Large animated bar chart (7+ bars) showing credit history rising, with the current score (720) displayed large over the bars in a glowing green/cyan color
- Bottom row: 3 stat boxes ("Starting: 582", "Current: 720", "Target: 750+") that count up with animated counters
- Subtle grid background with animated scan line effect

**Step 3 -- Credit Restoration**
- Left panel: Animated circular progress ring showing "12/15 Items Resolved"
- Center: List of dispute items with sequential check-mark animations and strikethrough
- Right: Before/After score comparison with animated arrow showing +138 pts improvement
- Each item fades in with a green checkmark bouncing into place

**Step 4 -- Lender Matching**
- Center: 2 large stat cards ("Credit Lines: 7 Approved" and "Total Available: $125,000") with counters
- Below: Animated bar chart showing funding amounts per lender (pink/magenta gradient bars that grow sequentially)
- Bottom badge: "Latest deposit: $15,000" with a pulsing green dot
- Bank logos float in around the edges

**Step 5 -- Get Funded**
- 3-column dashboard layout:
  - Left: Large funding counter ($250,000) with celebration particles
  - Center: Completion checklist ("LLC Formation - Completed", "EIN Obtained - IRS Approved", "Operating Agreement - Filed") with animated cyan checkmarks
  - Right: Summary card with "0% APR", "No Revenue Required", "No Tax Returns" badges
- Confetti burst animation on entry

---

### Technical Details

**File modified:** `src/components/FundingJourney.tsx`

**Key changes:**
- Replace each of the 5 visual functions (`AssessmentVisual`, `CreditGaugeVisual`, `RestorationVisual`, `LenderMatchVisual`, `GetFundedVisual`) with richer dashboard-style layouts
- Use CSS grid (`grid grid-cols-2 lg:grid-cols-3 gap-4`) inside each visual for multi-panel layouts
- Each sub-panel uses the existing card style: `rounded-xl bg-white/5 border border-white/10 p-4`
- Bar charts built with simple `div` elements + Framer Motion height animations (no external chart library needed)
- Animated counters reuse the existing `Counter` component
- Add staggered entrance animations using `motion` with increasing `delay` values
- Increase `min-h` of the content area from `340px` to `420px` to accommodate richer visuals
- Add subtle animated grid/scan-line background to the device frame using CSS gradients

**Animation additions:**
- Bar chart bars grow from bottom with spring physics and staggered delays
- Stat cards scale in with `type: "spring"` 
- Circular progress rings use `strokeDashoffset` animation (same technique as existing gauge)
- Pulsing green dots use `animate={{ scale: [1, 1.3, 1] }}` with `repeat: Infinity`
- Scan line effect via a CSS `@keyframes` moving a gradient bar top-to-bottom

**No new dependencies needed** -- all built with existing Framer Motion + Tailwind.

