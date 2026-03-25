

# Send Download Links Email Directly from Webhook

## Summary

When a customer purchases an ebook or bundle, the webhook will send a branded email with all download links directly — no GHL workflow needed. We'll use Lovable's built-in email infrastructure.

## Steps

### 1. Set up email infrastructure
Run the email infrastructure setup tool to create the database tables (pgmq queues, email_send_log, etc.) and the `process-email-queue` cron job.

### 2. Scaffold transactional email system
Scaffold the transactional email Edge Functions (`send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`) and create the registry/template structure.

### 3. Create "order-download-links" email template
A branded React Email template in `_shared/transactional-email-templates/` that accepts:
- `customerName` — greeting
- `orderNumber` — order reference
- `downloadLinks` — array of `{ title, url }` rendered as individual download buttons
- `libraryUrl` — link to the My Downloads page

Styled to match the Ryland brand (dark primary `hsl(222, 47%, 11%)`, clean white background).

### 4. Update the webhook to invoke `send-transactional-email`
In `shopify-order-webhook/index.ts`, after generating download links, call `send-transactional-email` via `supabase.functions.invoke()` instead of (or in addition to) the GHL email. This sends the download links email directly to the customer.

### 5. Create unsubscribe page
A simple `/unsubscribe` page in the app (required by the transactional email system for compliance).

### 6. Deploy all Edge Functions
Deploy `send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`, `process-email-queue`, and the updated `shopify-order-webhook`.

## Technical Details

- Email sent from: `noreply@rylandpartners.com` (via verified `notify.rylandpartners.com`)
- The GHL contact update logic stays in place (for CRM tracking), but email delivery no longer depends on a GHL workflow
- Idempotency key: `order-downloads-${shopify_order_id}` to prevent duplicate emails on webhook retries
- The template renders each ebook as a styled download button with the direct token URL

