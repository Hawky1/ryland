

## Use New Video as Hero Background

### Overview
Replace the current local hero background video (`/videos/hero-bg.mp4`) with the new external video URL, keeping the right-side showcase video as-is.

### Changes (single file: `src/pages/Index.tsx`)

**1. Swap background video source (line 474)**
- Change the `<source>` from `/videos/hero-bg.mp4` to the new URL: `https://storage.googleapis.com/msgsndr/FuOewPgnMEW1CaeIftBR/media/698a6cea7f6dcf137c9c099c.mp4`
- Slightly increase opacity from `opacity-50` to `opacity-40` so the new video adds atmosphere without overpowering the text -- can be fine-tuned after preview

**2. Add a darker gradient overlay on the background (new element after the video div, line ~476)**
- Add a `div` with `absolute inset-0` and a gradient (`bg-gradient-to-r from-black/70 via-black/40 to-transparent`) layered on top of the background video
- This ensures the left-side text remains crisp and readable while the right side lets the background video show through more, creating depth

### Technical Details

- **File:** `src/pages/Index.tsx`, lines 466-476
- The background video element keeps `autoPlay loop muted playsInline` and `object-cover` for full bleed
- The gradient overlay sits between the background video (z-0) and the content (z-10)
- No new dependencies or files needed

