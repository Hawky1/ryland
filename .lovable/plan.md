

# Redesign Testimonials: 3-Column Vertical Scroll Layout

## Overview
Replace the current horizontal marquee testimonials with a 3-column vertically auto-scrolling grid. Column 1 scrolls up, column 2 scrolls down, column 3 scrolls up -- creating a dynamic "wall of love" effect. The cards use the existing Chase blue gradient styling. A star rating badge and review count anchor the header.

## Layout

```text
[Header]
  "Trusted by entrepreneurs"
  "Testimonials"                    [stars] 4.9/5 - 2,431 reviews

[3-Column Grid with vertical scroll]
  Column 1 (scrolls UP)    Column 2 (scrolls DOWN)    Column 3 (scrolls UP)
  ┌──────────────────┐     ┌──────────────────┐       ┌──────────────────┐
  │  Bradley A.      │     │  Michael G.      │       │  Carlos R.       │
  │  quote...        │     │  quote...        │       │  quote...        │
  └──────────────────┘     └──────────────────┘       └──────────────────┘
  ┌──────────────────┐     ┌──────────────────┐       ┌──────────────────┐
  │  Aisha G.        │     │  Rachel A.       │       │  Sofia M.        │
  │  quote...        │     │  quote...        │       │  quote...        │
  └──────────────────┘     └──────────────────┘       └──────────────────┘
  ┌──────────────────┐     ┌──────────────────┐       ┌──────────────────┐
  │  Ethan G.        │     │  Liam O.         │       │  Noah B.         │
  │  quote...        │     │  quote...        │       │  quote...        │
  └──────────────────┘     └──────────────────┘       └──────────────────┘
  (duplicated for loop)    (duplicated for loop)      (duplicated for loop)

[Top + bottom fade overlays to mask edges]
```

## Design Details

### Header
- Left side: "Trusted by entrepreneurs" subtitle + "Testimonials" heading (keep existing mask-image gradient style)
- Right side: 5 gold stars + "4.9/5 . 2,431 reviews" in slate text, vertically centered

### Cards
- All cards use `bg-gradient-to-br from-[#0060A9] to-[#003A70] border border-[#004E8C]` (existing brand style)
- Each card shows: avatar, name, role/title, verified badge, and quote text
- Rounded corners `rounded-2xl`, padding `p-5`

### Scroll Animation
- CSS keyframes: `scrollUp` moves `translateY(0)` to `translateY(-33.33%)`, `scrollDown` does the reverse
- Column 1 and 3: scroll up at 25s linear infinite
- Column 2: scrolls down at 25s linear infinite
- Hover pauses animation (`animation-play-state: paused`)
- Each column's content is duplicated (cards repeated) for seamless infinite loop

### Fade Overlays
- Top and bottom gradient masks using `bg-gradient-to-b from-white` and `bg-gradient-to-t from-white` to fade cards into the page background
- Container has `overflow-hidden` with a fixed height (~600px on desktop, ~400px on mobile)

### Testimonial Content (9 people, 3 per column)
- Reuse existing: Bradley A., Michael G., Ethan G.
- Add from reference (adapted to credit/funding context):
  - Aisha Green, Head of Business Intelligence
  - Priya Patel, Marketing Director  
  - Jonas Weber, Operations Lead
  - Rachel Adams, Product Manager
  - Sofia Martinez, Analytics Lead
  - Noah Bennett, Strategy Director
- Quotes will be rewritten to fit the credit/funding brand voice

### Mobile
- On small screens, show 1 column scrolling up (hide columns 2 and 3)
- On `md` breakpoint, show all 3 columns

## Technical Details

### File: `src/pages/Index.tsx`

**Replace lines 669-768** (entire Testimonials section) with:
- A `<style>` tag containing `scrollUp` and `scrollDown` keyframe animations
- Updated header with star rating badge on the right
- A 3-column grid (`grid-cols-1 md:grid-cols-3`) with `overflow-hidden` and fixed height
- Each column contains a `div` with `data-scroll-column` attribute for CSS animation targeting
- Cards duplicated once per column for seamless looping
- Top/bottom fade overlay divs with `pointer-events-none`

### Animations (CSS in JSX `<style>` tag)
```
@keyframes scrollUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes scrollDown {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
```

### No new dependencies or files needed
- Everything stays within `Index.tsx`
- Uses existing avatar images where available, Unsplash placeholders for new people

