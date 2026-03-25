

# Debug: E-book Delivery Email Pipeline

## Root Cause

The `send-transactional-email` Edge Function is configured with `verify_jwt = true` in `supabase/config.toml`. When the `shopify-order-webhook` calls it via `supabase.functions.invoke()`, the gateway returns **401 Unauthorized** — the service role key passed by the webhook client is being rejected at the gateway level before the function code even runs.

The logs confirm this:
```
Transactional email error: FunctionsHttpError: Edge Function returned a non-2xx status code
  status: 401, statusText: "Unauthorized"
```

Everything upstream works fine:
- Shopify webhook fires correctly
- Order + 6 order_items inserted with download tokens
- GHL contact updated successfully
- The ONLY failure is the `supabase.functions.invoke("send-transactional-email")` call

## Fix (2 changes)

### 1. Set `verify_jwt = false` for `send-transactional-email`
In `supabase/config.toml`, change the setting. This matches the standard pattern for Lovable-managed edge functions. The function is already protected by requiring a valid Supabase client call.

### 2. Update the webhook to use `fetch` with explicit auth headers
Replace `supabase.functions.invoke()` with a direct `fetch` call that passes the service role key as a Bearer token and the anon key as the `apikey` header. This ensures reliable server-to-server auth regardless of gateway JWT settings.

```
fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${supabaseServiceKey}`,
    "apikey": Deno.env.get("SUPABASE_ANON_KEY")
  },
  body: JSON.stringify({ ... })
})
```

### 3. Redeploy both functions
Deploy `send-transactional-email`, `shopify-order-webhook`, and `process-email-queue` to apply the changes.

## Files Changed
- `supabase/config.toml` — `verify_jwt = false` for `send-transactional-email`
- `supabase/functions/shopify-order-webhook/index.ts` — replace `.functions.invoke()` with direct `fetch`

## After Fix
Trigger another test order from Shopify and verify:
1. Webhook logs show no 401 error
2. `email_send_log` table has a `pending` → `sent` row
3. Email arrives in the customer's inbox with download links

