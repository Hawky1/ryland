

## Move Step Content Inside the Card and Fix Card Height

Make the step bar (1-5 navigation) part of the card itself and enforce a consistent fixed height across all steps so the card never resizes.

---

### What Changes

**1. Move the step bar inside the device frame card**

The numbered step indicators (1 through 5 with connecting lines) currently sit above the card. They will be moved inside the card, just below the "notch", so the entire interactive UI lives within one cohesive panel.

**2. Set a fixed height for the card content area**

Replace `min-h-[420px]` with a taller fixed height (`h-[580px]`) so all 5 steps render in the exact same space. This prevents the card from jumping in size between steps.

**3. Ensure visuals fill the space consistently**

Each visual component will be centered within the fixed-height content area using flex layout, so shorter visuals are vertically centered and taller ones fit without overflow.

---

### Technical Details

**File modified:** `src/components/FundingJourney.tsx`

**Changes:**

1. Move the step bar `<div>` (currently lines 84-117) from outside the device frame to inside it, positioned between the notch and the content area. Remove its `mb-10` margin and add `px-6 pt-4 pb-2` padding to fit inside the card.

2. Change the content container from `min-h-[420px]` to `h-[580px]` for a fixed, taller height that accommodates all visuals comfortably.

3. The visual area uses `flex-1 overflow-hidden` to keep content within bounds regardless of which step is active.

4. The nav arrows (Previous/Next) remain outside the card below it -- they are not affected.

