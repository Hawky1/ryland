

# Add Infinite Scrolling Grid Background to Entire Site

## Overview
Add the InfiniteGrid component as a fixed, full-screen background behind the entire site, creating an animated grid effect with a mouse-tracking reveal. The hero video will layer on top of this grid within its section.

## Steps

### 1. Install framer-motion
The InfiniteGrid component requires `framer-motion` as a dependency.

### 2. Create the InfiniteGrid component
Create `src/components/ui/infinite-grid.tsx` with the provided component code (SVG pattern grid with mouse-tracking radial reveal and animated pulsing orbs).

### 3. Add InfiniteGrid as full-site background in Index.tsx
- Wrap the outermost `<div>` content with the grid behind everything
- Place `<InfiniteGrid />` as the first child of the root div, with dark-tuned props:
  - `baseGridColor="rgba(148, 163, 184, 0.08)"` (subtle slate lines)
  - `activeGridColor="rgba(6, 182, 212, 0.6)"` (bright cyan on hover)
- The grid will sit at `z-0` with `position: fixed` so it stays visible as the user scrolls
- All existing page content remains at higher z-index layers

### 4. Layering order
- **Layer 0 (fixed):** InfiniteGrid -- always visible behind everything
- **Layer 1 (hero only):** Video background -- plays within the hero section
- **Layer 2+:** All page content (text, cards, sections)

## Technical Details

### Files created
- `src/components/ui/infinite-grid.tsx` -- the grid component exactly as provided

### Files modified
- `src/pages/Index.tsx` -- import InfiniteGrid and add it as a fixed background element inside the root div
- `package.json` -- framer-motion added as dependency

### What stays unchanged
- Hero video background (still plays in hero section on top of the grid)
- All existing animations, content, and styling
- All other sections and their backgrounds

