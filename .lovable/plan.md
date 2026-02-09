

## Consolidate Gene Ryland Title to 1-2 Lines

### What changes
Collapse the three-line block (Gene Ryland / CEO & Founder / Business Funding Expert) into a compact two-line layout:

- **Line 1:** Gene Ryland
- **Line 2:** CEO & Founder | Business Funding Expert

### Technical details

**File:** `src/pages/Index.tsx`, lines 519-530

Replace the current `flex-col` block (with the divider line and three separate elements) with:

```
Line 1: "Gene Ryland" — white, slightly larger, with elegant letter-spacing
Line 2: "CEO & Founder  |  Business Funding Expert" — smaller, subtle blue/white tone, separated by a thin pipe character
```

- Remove the gradient divider `div` entirely
- Merge the two `<p>` tags into one line with a styled separator
- Keep `mt-2` spacing below the video unchanged

