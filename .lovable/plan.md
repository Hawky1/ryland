

## Plan: Optimize Product Page Layout + Add Listing Images for Ultimate Business Credit Blueprint

### What Changes

**1. Move Product Details directly below the price/CTA card (layout optimization)**

Currently the Product Details section (Format, Length, Category) is a separate full-width section far below the fold. Moving it inline right under the price card in the right column keeps all purchase-decision info together — price, details, and CTA in one glanceable area.

The compact detail pills will sit between the CTA button trust badges and the end of the right column, inside the existing white card or just below it.

**2. Add two promotional listing images for the Ultimate Business Credit Blueprint**

The two uploaded images will be:
- Copied to `src/assets/` as `listing-ubcb-1.png` and `listing-ubcb-2.png`
- Added to the `productContentMap` via a new optional `promoImages` field on the `ProductContent` interface
- Rendered in a horizontal image gallery below the main product cover image on the product detail page (scrollable thumbnails or stacked)

### Technical Details

**Files to modify:**

1. **`src/data/productContent.ts`**
   - Add `promoImages?: string[]` to the `ProductContent` interface
   - Add the two imported image paths to the `ultimate-business-credit-blueprint` entry

2. **`src/pages/ProductDetail.tsx`**
   - Move the Product Details grid (Format/Length/Category) from its own full-width section into the right column, directly below the price/CTA card
   - Add an image gallery below the main product image that renders `content.promoImages` if present (thumbnails that can be clicked to view, or stacked images)
   - Keep the current main Shopify image as the primary, with promo images shown below or as a carousel

3. **New assets:**
   - Copy `user-uploads://3-2.png` → `src/assets/listing-ubcb-1.png`
   - Copy `user-uploads://4-2.png` → `src/assets/listing-ubcb-2.png`

### Layout Change (Before → After)

```text
BEFORE:
┌─────────────┬──────────────┐
│  Cover Img  │  Title       │
│             │  Headline    │
│             │  Description │
│             │  Price + CTA │
└─────────────┴──────────────┘
  ... scroll ...
┌────────────────────────────┐
│  What You'll Get (full w)  │
└────────────────────────────┘
  ... scroll ...
┌────────────────────────────┐
│  Product Details (full w)  │
└────────────────────────────┘

AFTER:
┌─────────────┬──────────────┐
│  Cover Img  │  Title       │
│             │  Headline    │
│  [promo 1]  │  Description │
│  [promo 2]  │  Price + CTA │
│             │  Details     │ ← moved up
└─────────────┴──────────────┘
  ... scroll ...
┌────────────────────────────┐
│  What You'll Get (full w)  │
└────────────────────────────┘
```

Product Details becomes a compact inline row of 3 pills inside the right column, removing the separate full-width section entirely. The promo images stack below the main cover on the left side.

