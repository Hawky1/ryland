

## Digital Product Delivery — Current State & What's Needed

### What's Already Built (Code is Done)

The full system is implemented across these pieces:

1. **`shopify-order-webhook` edge function** — Receives Shopify "Order payment" webhooks, creates order + order_items records with unique download tokens, triggers a GHL contact update with download links
2. **`download-ebook` edge function** — Validates a download token, fetches the PDF from the private `ebooks` storage bucket, streams it to the buyer
3. **`lookup-orders` edge function** — Powers the `/my-orders` download library with email + verification code flow
4. **`/thank-you` page** — Instant download page shown after purchase (receives `?order=SHOPIFY_ORDER_ID`)
5. **`/download/:token` page** — Direct download link (used in emails)
6. **`/my-orders` page** — Persistent download library (email verification, no account needed)
7. **Database tables** — `orders`, `order_items` (with `download_token`), `email_verifications`
8. **Storage bucket** — Private `ebooks` bucket exists

### What Needs to Be Done (Config + Deployment)

#### Step 1: Add missing `verify_jwt = false` to `config.toml`

Three edge functions that receive external requests are missing JWT bypass config. Without this, Shopify webhooks and download links will return 401 errors:

- `shopify-order-webhook` (called by Shopify, no JWT)
- `download-ebook` (called via direct URL, no JWT)
- `lookup-orders` (called from client with anon key, but needs explicit config)

#### Step 2: Deploy all edge functions

Deploy `shopify-order-webhook`, `download-ebook`, and `lookup-orders` so the latest code is live.

#### Step 3: Upload PDF files to `ebooks` bucket

Each PDF must be named exactly matching its Shopify product handle. For example, if the product handle is `business-credit-blueprint`, the file must be `business-credit-blueprint.pdf` in the `ebooks` bucket.

#### Step 4: Configure Shopify webhook (external)

In Shopify Admin → Settings → Notifications → Webhooks:
- Event: **Order payment**
- Format: **JSON**
- URL: `https://gkowxzoadsljkpdzrlue.supabase.co/functions/v1/shopify-order-webhook`
- The `SHOPIFY_WEBHOOK_SECRET` is already stored as a secret

#### Step 5: Configure GHL email workflows (external)

Two GHL workflows are needed:
1. **Order delivery email** — Triggered by the `ebook-purchase` tag. The workflow sends an email using the custom fields `latest_download_links` and `download_library_url` that the webhook populates.
2. **Verification code email** — Triggered by the `verification-request` tag. The workflow sends an email using the custom field `verification_code`.

#### Step 6: Set Shopify checkout redirect

After checkout, Shopify needs to redirect to `https://rylandpartners.com/thank-you?order={{order.id}}` so buyers land on the instant download page. This is configured in Shopify Admin → Settings → Checkout → Order status page additional scripts, or via a post-purchase redirect.

### Summary

The only code change needed is adding the three missing `verify_jwt = false` entries to `config.toml` and deploying the functions. Everything else is external configuration (uploading PDFs, Shopify webhook, GHL workflows, checkout redirect).

