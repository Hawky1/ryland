

# End-to-End Digital Delivery Test Plan

## What Was Verified

- **download-ebook function**: Deployed, responds correctly (404 for invalid tokens)
- **shopify-order-webhook function**: Deployed, HMAC verification active
- **Database schema**: orders + order_items tables exist and are ready
- **Storage**: 42 PDFs uploaded to private `ebooks` bucket

## What Cannot Be Tested From Here

The webhook requires a valid Shopify HMAC signature, and the database is read-only from my tools. A true end-to-end test requires a real Shopify order event.

## Two Options to Complete Testing

### Option A: Make a Real Test Purchase (Recommended)
1. In Shopify Admin, set a product price to $0.00 (or use a 100% discount code)
2. Place a test order through your Shopify storefront
3. Shopify fires the webhook automatically
4. Check the database for the new order and download tokens
5. Click the download link from the confirmation email or `/my-orders` page
6. Verify the PDF downloads

### Option B: Temporarily Bypass HMAC for a Manual Test
1. I modify the webhook to skip HMAC when a special test header is present (e.g., `x-test-bypass: true`)
2. I fire a simulated order payload
3. Verify order + order_items rows are created with download tokens
4. Test the download-ebook function with the real token
5. Revert the bypass code immediately after

Option A is safer for production. Option B is faster but requires a temporary code change.

