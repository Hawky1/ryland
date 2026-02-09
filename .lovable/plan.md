

## Balance Hero Section Heights

### Overview
Shorten the left-side headline so both columns are roughly the same height, creating a more balanced hero layout.

### Changes (single file: `src/pages/Index.tsx`)

**1. Shorten the headline (line 481)**
Change the current headline from:
> "Fund and build your dream business."

To a shorter, punchier three-line version:
> "Fund your dream business."

This reduces it from ~6 words across 4 lines to ~4 words across 3 lines at the current font size, bringing the left column height closer to the right column's video + social proof.

**2. Remove the top margin on the headline (line 481)**
Remove `mt-20` from the `<h1>` tag -- this large top margin pushes the left content down and adds unnecessary height. Replace with `mt-8` or remove entirely so both columns align at the top.

### Technical Details

- **File:** `src/pages/Index.tsx`, line 481
- **Current:** `className="... mt-20"` with text "Fund and build your dream business."
- **Updated:** `className="... mt-8"` with text "Fund your dream business."
- No other files are affected.

