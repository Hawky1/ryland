

# Digital E-Book Delivery System

## What We're Building

A complete post-purchase digital delivery pipeline so that when a customer buys an e-book:

1. They can **download it immediately** after checkout
2. They receive a **confirmation email from GoHighLevel** with download links
3. They have a **personal download library** to re-access purchases anytime

---

## Architecture Overview

```text
Customer buys on Shopify checkout
         │
         ▼
Shopify webhook (order paid)
         │
         ▼
Edge Function: "shopify-order-webhook"
   ├── Stores order in `orders` table
   ├── Generates secure download tokens
   ├── Triggers GHL email via API (with download links)
   └── Returns
         │
         ▼
Customer clicks link in email OR visits /my-orders
         │
         ▼
Edge Function: "download-ebook"
   ├── Validates token (or session)
   ├── Serves file from storage bucket
   └── Returns PDF
```

---

## Implementation Steps

### Step 1: File Storage

- Create a **storage bucket** called `ebooks` in the backend
- You will upload your PDF files there (one per product), named by Shopify handle (e.g., `credit-repair-planner.pdf`)
- Bucket is private — files served only through authenticated edge function

### Step 2: Database Tables

**`orders`** — tracks completed purchases
- `id`, `shopify_order_id`, `email`, `customer_name`, `created_at`

**`order_items`** — tracks which products were in each order
- `id`, `order_id` (FK), `shopify_product_handle`, `product_title`, `download_token` (unique UUID), `downloaded_at`

Both tables have RLS policies so customers can only see their own orders (matched by email).

### Step 3: Shopify Webhook Edge Function

**`shopify-order-webhook`** — receives Shopify's `orders/paid` webhook:
- Parses the order payload (email, line items, product handles)
- Inserts into `orders` + `order_items` with unique download tokens
- Calls GoHighLevel API to send a branded confirmation email with download links pointing to your site (e.g., `https://ryland.lovable.app/download/{token}`)
- The GHL email template would include the product names and individual download links

### Step 4: Download Edge Function

**`download-ebook`** — serves the actual file:
- Accepts a `token` parameter
- Looks up the token in `order_items`
- Fetches the corresponding PDF from the `ebooks` storage bucket
- Returns the file as a download
- Marks `downloaded_at` timestamp

### Step 5: Customer Download Library Page

**`/my-orders`** route — a simple page where customers:
- Enter their email address
- Receive a verification code (sent via GHL)
- See all their past purchases with download buttons
- Can re-download any time

### Step 6: Post-Purchase Redirect

- After Shopify checkout completes, the customer lands on a **thank-you page** (`/thank-you?order={id}`) showing their purchases with immediate download buttons
- This page reads from the `orders` table using the Shopify order ID

### Step 7: GoHighLevel Email Integration

- Uses the existing `GHL_API_KEY` secret (already configured)
- The webhook edge function calls GHL to create/update a contact and trigger an email with:
  - Order confirmation details
  - Individual download links for each e-book
  - Link to the `/my-orders` library for future access

---

## What You'll Need To Do

1. **Upload your PDF files** — I'll create the storage bucket; you'll upload each e-book PDF named by its Shopify product handle
2. **Register the webhook in Shopify** — Point `orders/paid` webhook to the edge function URL (I'll provide the exact URL)
3. **Create a GHL email template** — for the order confirmation email (or I can trigger a simple email via the GHL API with the download links embedded)

---

## Technical Details

- **Security**: Download tokens are single-use UUIDs with no expiration, so customers can always re-download. The storage bucket is private; files are only served through the validated edge function.
- **No user accounts needed**: The download library uses email + verification code (via GHL), keeping things simple — no signup/login required.
- **Existing secrets**: `GHL_API_KEY`, `GHL_LOCATION_ID`, `SHOPIFY_ACCESS_TOKEN` are all already configured.
- **Shopify webhook verification**: The edge function will verify the HMAC signature from Shopify to prevent spoofed requests.

