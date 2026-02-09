

# Update Hero Section Copy and CTA

## Overview
Replace the generic "Design and publish your dream site" headline with the new Ryland Partners messaging, add a supporting subheadline, and update the CTA to a funding assessment button with trust signals beneath it.

## Changes

### Update `src/pages/Index.tsx` (lines 460-472)

**Current:**
- H1: "Design and publish your dream site."
- CTAs: "Start for free" + "Watch Video"

**Proposed:**

```tsx
{/* Left - text + CTAs */}
<div className="text-center lg:text-left lg:flex-1 max-w-3xl">
  <h1
    className="text-[44px] leading-[0.95] sm:text-6xl lg:text-[80px] font-medium text-zinc-100 tracking-tighter font-geist text-left mt-20"
    style={{
      maskImage: 'linear-gradient(290deg, transparent, black 0%, black 40%, transparent)',
      WebkitMaskImage: 'linear-gradient(290deg, transparent, black 0%, black 40%, transparent)'
    }}
  >
    Unlock the Capital, Credit, and Community to Build Your Empire.
  </h1>

  <p className="text-lg sm:text-xl text-zinc-400 mt-6 max-w-xl text-left leading-relaxed">
    We help entrepreneurs secure <span className="text-white font-semibold">$150K+</span> in
    business funding, repair their credit, and master the digital economy.
  </p>

  <div className="flex flex-wrap xl:mt-10 mt-8 gap-x-3 gap-y-3 justify-start">
    <div className="inline-block bg-transparent">
      <button className="shiny-cta focus:outline-none">
        <span>Take the Free Funding Assessment</span>
      </button>
    </div>
  </div>

  <p className="text-sm text-zinc-500 mt-4 flex items-center gap-2 text-left">
    <svg ...checkmark icon... />
    Results in 2 minutes
    <span className="text-zinc-700">·</span>
    No hard credit pull
    <span className="text-zinc-700">·</span>
    100% Secure
  </p>
</div>
```

### What changes and why

1. **Headline** -- Swapped to "Unlock the Capital, Credit, and Community to Build Your Empire." with the same typography classes and mask gradient. The `lg:text-[80px]` is slightly reduced from `lg:text-8xl` (96px) to accommodate the longer copy while maintaining visual weight.

2. **Subheadline** -- New `<p>` in `text-zinc-400` with the "$150K+" figure highlighted in white (`text-white font-semibold`) to draw the eye to the key value proposition.

3. **Primary CTA** -- "Start for free" becomes "Take the Free Funding Assessment" inside the existing `shiny-cta` button. The "Watch Video" secondary CTA is removed.

4. **Trust signals** -- A new line of micro-copy beneath the CTA: "Results in 2 minutes · No hard credit pull · 100% Secure" in `text-zinc-500` with a small shield/check icon. These reduce friction at the moment of decision.

5. **No other changes** -- Portrait, layout structure, glow effect, and all other sections remain untouched.

