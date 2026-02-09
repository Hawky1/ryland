

# Add Portrait Image to Hero Section

## Overview
Place the uploaded professional portrait on the right-hand side of the hero section, creating a split layout with the existing headline and CTAs on the left and the portrait on the right.

## Changes

### 1. Copy the uploaded image to project assets
- Copy `user-uploads://365a554d-94ea-4ff5-9c1a-10a4275e3cc2.png` to `src/assets/hero-portrait.png`

### 2. Update `src/pages/Index.tsx`

**Import the image:**
```tsx
import heroPortrait from "@/assets/hero-portrait.png";
```

**Restructure the hero section (lines 455-471):**

Current: Single column, text aligned left with `max-w-3xl`.

Proposed: Two-column flex layout:
- **Left column (~55%):** Keep existing headline + CTA buttons exactly as they are.
- **Right column (~45%):** The portrait image with a subtle gradient mask at the bottom to blend into the dark background, plus a soft glow effect behind the subject for depth.

```tsx
<section className="max-w-7xl mx-auto pt-16 pb-36 px-8 lg:px-20 relative">
  <div className="flex flex-col lg:flex-row items-center gap-12">
    {/* Left - existing text + CTAs */}
    <div className="text-center max-w-3xl lg:text-left lg:flex-1">
      <h1 ...>Design and publish your dream site.</h1>
      <div className="flex flex-wrap ...">
        {/* existing buttons */}
      </div>
    </div>
    {/* Right - portrait */}
    <div className="relative lg:flex-1 flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
        <img
          src={heroPortrait}
          alt="Portrait"
          className="relative z-10 w-full max-w-md object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)'
          }}
        />
      </div>
    </div>
  </div>
</section>
```

Key visual details:
- Bottom gradient mask on the image fades the figure naturally into the dark background
- A soft blue glow behind the portrait adds depth and ties into the animated background orbs
- Responsive: stacks vertically on mobile, side-by-side on `lg` breakpoint
- The white-background portrait blends seamlessly since the mask fades it out before the edges

