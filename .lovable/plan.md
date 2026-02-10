

## Transform "Capital On Your Terms" into an Interactive Funding Journey App

Replace the current 3-card layout with an immersive, app-style step-by-step process map that walks visitors through the entire funding journey -- from initial assessment to getting funded. This will use Framer Motion animations to create a polished, interactive experience.

---

### What It Will Look Like

The section becomes a simulated "app interface" with a dark glass-morphism phone/tablet mockup in the center, surrounded by a visual step timeline. Users scroll through the section and each step animates into view.

**Layout:**
- Left side: Vertical step indicator (numbered dots connected by an animated line)
- Right side: A "device frame" showing the current step's content with smooth transitions
- Each step slides/fades in as the user scrolls or clicks through

**The 5 Steps:**

| Step | Title | Description | Visual in "App" |
|------|-------|-------------|-----------------|
| 1 | Take Your Assessment | Answer a few quick questions about your business and goals | Animated form UI with progress bar |
| 2 | Credit Analysis | We pull and analyze your credit profile to build a strategy | Animated credit score gauge rising |
| 3 | Credit Restoration | Our team removes negatives and boosts your score | Checklist items checking off one by one |
| 4 | Lender Matching | Our system matches you with the best 0% APR credit lines | Cards fanning out with bank logos |
| 5 | Get Funded | Receive $50k-$250k in business funding | Celebration animation with funding amount counter |

**Interaction:** Users click step indicators or use prev/next arrows to navigate between steps. Each transition uses Framer Motion `AnimatePresence` for smooth crossfades.

---

### Technical Details

**File modified:** `src/pages/Index.tsx`

**New component:** `src/components/FundingJourney.tsx`
- Extracted into its own component to keep Index.tsx clean
- Uses Framer Motion (`motion`, `AnimatePresence`) for step transitions
- Self-contained state management with `useState` for active step

**Component structure:**

```text
+--------------------------------------------------+
|  Section Header: "Your Path To Funding"           |
+--------------------------------------------------+
|                                                    |
|  [1]----[2]----[3]----[4]----[5]  (step bar)      |
|                                                    |
|  +--------------------------------------------+   |
|  |  "Device Frame" (rounded, glass border)     |   |
|  |                                             |   |
|  |   Step Title                                |   |
|  |   Step Description                          |   |
|  |                                             |   |
|  |   +----------------------------------+      |   |
|  |   |  Animated Visual for this step   |      |   |
|  |   |  (gauge, checklist, cards, etc.) |      |   |
|  |   +----------------------------------+      |   |
|  |                                             |   |
|  +--------------------------------------------+   |
|                                                    |
|         [ <  Previous ]  [ Next  > ]               |
+--------------------------------------------------+
```

**Animations (Framer Motion):**
- Step bar: Active dot scales up + glows cyan; connecting line fills with gradient as you progress
- Content transitions: `AnimatePresence` with `mode="wait"`, slides in from right on next / left on previous
- Each step's visual has its own micro-animation (e.g., score gauge animating up, checkmarks appearing sequentially)
- Auto-play option: Steps advance every 4 seconds with a progress indicator, pauses on hover

**Step visuals (built with Tailwind + Framer Motion, no external images):**
1. Assessment: Animated form fields appearing one by one with a progress bar filling
2. Credit Analysis: A circular gauge that animates from 0 to a score with a glowing arc
3. Credit Restoration: A list of negative items with strikethrough animations + green checkmarks
4. Lender Matching: Cards with bank-style logos sliding in and stacking
5. Get Funded: A counter animating from $0 to $250,000 with confetti-style particles

**Styling:**
- Device frame: `rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950 backdrop-blur-xl shadow-2xl`
- Step indicator uses cyan/blue gradient for active state
- Consistent with the existing dark premium aesthetic
- Responsive: On mobile, the step bar becomes horizontal and scrollable; the device frame takes full width

**What gets removed:**
- The entire "Capital On Your Terms" section (lines 552-654) -- all 3 current cards (Business Funding, Credit Restoration, Rapid Execution)
- Replaced with a single `<FundingJourney />` component call

**Dependencies:** None new -- already has `framer-motion` installed.

