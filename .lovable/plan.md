

# Bundle Download Delivery Plan

## The Problem

When a customer buys a bundle (e.g., "Ultimate Credit Business Vault"), Shopify sends **one line item** with the bundle's product handle. The current webhook creates a single `order_item` row and tries to find `ultimate-credit-business-vault.pdf` in storage — which doesn't exist. The customer gets nothing.

This affects all 5 bundles, not just the vault.

## The Solution

Create a **bundle-to-ebooks mapping** in the webhook so that when a bundle handle is detected, the webhook expands it into individual `order_item` rows — one per included ebook, each with its own download token.

## Implementation

### 1. Add bundle map to the webhook (`supabase/functions/shopify-order-webhook/index.ts`)

Add a `BUNDLE_MAP` constant that maps each bundle handle to its array of constituent ebook handles and titles. This data already exists in `src/data/productContent.ts` under `bundleIncludes` — we'll replicate it in the edge function since edge functions can't import from `src/`.

### 2. Modify the line item processing loop

In the existing `for (const item of lineItems)` loop, after resolving the product handle:
- Check if the handle exists in `BUNDLE_MAP`
- If yes: loop through each included ebook, inserting a separate `order_item` row with the individual ebook's handle and title
- If no: proceed as-is (single ebook)

### 3. No database or frontend changes needed

- The `order_items` table already supports multiple items per order
- The ThankYou page and MyOrders page already render all `order_items` as a list with individual download buttons
- The `download-ebook` function already works per-token, looking up the handle and fetching the matching PDF from storage

## Bundle Handles to Map

Five bundles from `productContent.ts`:
1. `entrepreneur-quickstart-bundle` — 3 ebooks
2. `business-funding-essentials-bundle` — 4 ebooks  
3. `entrepreneur-accelerator-bundle` — 6 ebooks
4. `business-authority-bundle` — 5 ebooks
5. `ultimate-credit-business-vault` — 18 ebooks

## Technical Details

The only file changed is `supabase/functions/shopify-order-webhook/index.ts`. The bundle map is approximately 40 lines of data. The loop modification is roughly 15 lines replacing the current single-insert logic with a conditional expand-or-single-insert pattern.

