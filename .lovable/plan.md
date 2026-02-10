

## Replace Wealth Ecosystem Cards with Image Backgrounds

Redesign the six service cards in the Wealth Ecosystem section on the homepage to use the uploaded images as full-bleed backgrounds, replacing the current video backgrounds. The section title will also be removed for a cleaner look.

---

### What Changes

**1. Add 6 new images to the project**

Copy the uploaded images into `src/assets/`:
- `service-funding.png` (Get Business Funding)
- `service-credit.png` (Repair My Credit)
- `service-community.png` (Join The Community)
- `service-products.png` (Shop Digital Products)
- `service-partner.png` (Become A Partner)
- `service-consultation.png` (Schedule A Consultation)

**2. Redesign each card (in `src/pages/Index.tsx`)**

For each of the 6 cards:
- Remove the video element and its gradient overlay
- Replace with the corresponding image as a full-cover background (`object-cover`)
- Remove the badge (pulse dot + label), the icon box, the description paragraph
- Keep only a bold, centered title text (matching the style in the images -- large, white, italic/bold, with a subtle cyan text-shadow/glow)
- Keep the CTA button at the bottom
- Add a dark gradient overlay (`bg-gradient-to-t from-black/60 via-black/20 to-black/10`) for text legibility over the image
- Set a fixed aspect ratio so the cards display as squares (matching the uploaded image proportions)

**3. Remove the section title**

Delete the "A Complete Wealth Ecosystem" heading (`h2`) so the grid of image cards stands on its own.

---

### Technical Details

**File modified:** `src/pages/Index.tsx`

**New card structure (each card):**
```
<div class="group relative overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5 aspect-square">
  <img src={serviceImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
  <div class="relative z-10 flex flex-col items-center justify-center h-full p-6">
    <h3 class="text-3xl font-black italic text-white text-center uppercase tracking-tight drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
      GET BUSINESS FUNDING
    </h3>
  </div>
  <a href="#cta" class="absolute bottom-6 left-6 right-6 z-10 ...blue gradient button...">
    Get Business Funding
  </a>
</div>
```

**Card-to-image mapping:**
1. Get Business Funding -- `service-funding.png`
2. Repair My Credit -- `service-credit.png`
3. Join The Community -- `service-community.png`
4. Shop Digital Products -- `service-products.png`
5. Become A Partner -- `service-partner.png`
6. Schedule A Consultation -- `service-consultation.png`

**Styling approach:**
- Cards use `aspect-square` to maintain the 1:1 ratio from the images
- Title text uses `font-black italic uppercase` with a subtle cyan drop-shadow to match the uploaded image style
- The existing blue gradient CTA button is preserved at the bottom of each card
- Hover state: slight scale-up on the image (`group-hover:scale-105 transition-transform duration-500`)
- Grid remains `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`

No new dependencies are needed.

