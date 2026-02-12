

# Replace Store Hero Image with Gene Ryland Portrait

## Changes

### 1. Copy uploaded image to project
- Copy `user-uploads://gene-ryland-about_1-3.png` to `src/assets/gene-ryland-store-hero.png`

### 2. Update StoreHero.tsx
- Replace the `bundleUltimate` import with the new Gene Ryland portrait image
- Update the `alt` text to reflect the new image (e.g., "Gene Ryland - Financial Expert")
- Remove the gradient blur background effect behind the image since the portrait has a transparent/white background that will blend naturally with the dark hero
- The "Browse Collections" button already matches the home page hero button styling (`!py-3 !px-6 sm:!py-5 sm:!px-10 !text-sm sm:!text-lg`), so no button changes are needed

### Files Modified
- `src/components/store/StoreHero.tsx` -- swap image import and update alt text

### Files Copied
- `user-uploads://gene-ryland-about_1-3.png` to `src/assets/gene-ryland-store-hero.png`

