

# Replace Hero Portrait with Video on Right Side

## Overview
Replace the static portrait image on the right side of the hero section with the uploaded MP4 video, styled professionally with visual effects to match the site's premium aesthetic.

## What Changes

### 1. Save the uploaded video
Copy the uploaded video file to `public/videos/hero-showcase.mp4` so it can be referenced as a public asset.

### 2. Replace the portrait with a styled video player
In the hero section's right column (lines 498-511 of `Index.tsx`), replace the `<img>` element with a `<video>` element that:
- Auto-plays, loops, and is muted (same pattern as the background video)
- Has rounded corners (`rounded-2xl`) with a subtle border (`border border-white/10 ring-1 ring-white/5`) matching the site's card style
- Keeps the existing blue back-glow effect (`bg-blue-500/20 blur-[80px]`) for depth
- Adds a slight box shadow for a floating/elevated feel
- Uses `object-cover` to fill the container cleanly
- Maintains the bottom fade mask for a smooth blend into the section

### 3. No other files change
The background video, grid, navbar, and all other sections remain untouched.

## Technical Details

### File modified
- `src/pages/Index.tsx` -- hero right column: swap `<img>` for `<video>` with card-style borders and glow

### File created
- `public/videos/hero-showcase.mp4` -- the uploaded video asset

### Key code change (lines 498-511)
The current portrait block:
```
<div className="relative lg:flex-1 flex justify-center">
  <div className="relative">
    <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
    <img src={heroPortrait} ... />
  </div>
</div>
```
Becomes a polished video block:
```
<div className="relative lg:flex-1 flex justify-center">
  <div className="relative">
    <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
    <video
      autoPlay loop muted playsInline
      className="relative z-10 w-full max-w-md rounded-2xl
                 border border-white/10 ring-1 ring-white/5
                 shadow-2xl shadow-blue-500/10 object-cover"
      style={{ maskImage: '...', WebkitMaskImage: '...' }}
    >
      <source src="/videos/hero-showcase.mp4" type="video/mp4" />
    </video>
  </div>
</div>
```

