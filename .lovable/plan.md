

# Fix White-Washed Hero Video Background

## The Problem
Two things are making the dark video appear white:

1. **Gradient overlay uses light-mode CSS variable** -- `from-[hsl(var(--background))]/60` resolves to white at 60% opacity, painting a white wash over the video.
2. **Video opacity is too low** -- `opacity-30` dims the video to 30%, letting the page background dominate.

## The Fix (in `src/pages/Index.tsx`, lines 459-470)

**Remove** the gradient overlay div entirely, and **increase** the video opacity from `opacity-30` to `opacity-50` so the dark video is clearly visible.

Replace the current video block:

```tsx
<div className="absolute inset-0 z-0">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover opacity-50"
  >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
  </video>
</div>
```

### What changes
- Video opacity: `opacity-30` changed to `opacity-50` (more visible, still doesn't overpower text)
- Gradient overlay div: removed completely (no more white wash)
- Everything else stays the same -- text, portrait, layout, z-indexing

