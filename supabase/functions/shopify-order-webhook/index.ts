import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { encode as hexEncode } from "https://deno.land/std@0.168.0/encoding/hex.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-topic, x-shopify-shop-domain",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function verifyShopifyHmac(body: string, hmacHeader: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const computedHmac = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return computedHmac === hmacHeader;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const webhookSecret = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    const ghlApiKey = Deno.env.get("GHL_API_KEY");
    const ghlLocationId = Deno.env.get("GHL_LOCATION_ID");
    const siteUrl = "https://rylandpartners.com";

    const body = await req.text();

    // Verify HMAC if secret is configured
    if (webhookSecret) {
      const hmac = req.headers.get("x-shopify-hmac-sha256");
      if (!hmac) return json({ error: "Missing HMAC header" }, 401);
      const valid = await verifyShopifyHmac(body, hmac, webhookSecret);
      if (!valid) return json({ error: "Invalid HMAC" }, 401);
    }

    const order = JSON.parse(body);
    console.log("Shopify order received:", order.id, order.email);

    const email = order.email || order.contact_email;
    if (!email) return json({ error: "No email in order" }, 400);

    const customerName = [order.customer?.first_name, order.customer?.last_name]
      .filter(Boolean).join(" ") || "Customer";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert order
    const { data: orderRow, error: orderErr } = await supabase
      .from("orders")
      .upsert(
        {
          shopify_order_id: String(order.id),
          shopify_order_number: order.name || String(order.order_number),
          email: email.toLowerCase(),
          customer_name: customerName,
        },
        { onConflict: "shopify_order_id" }
      )
      .select("id")
      .single();

    if (orderErr) {
      console.error("Order insert error:", orderErr);
      return json({ error: "Failed to store order" }, 500);
    }

    // Extract line items and create order_items with download tokens
    const lineItems = order.line_items || [];
    const downloadLinks: Array<{ title: string; url: string; token: string }> = [];

    for (const item of lineItems) {
      // Use product handle from line item properties or construct from title
      const handle = item.product_id
        ? await getProductHandle(item.product_id)
        : slugify(item.title);

      const { data: itemRow, error: itemErr } = await supabase
        .from("order_items")
        .insert({
          order_id: orderRow.id,
          shopify_product_handle: handle,
          product_title: item.title,
        })
        .select("download_token")
        .single();

      if (itemErr) {
        console.error("Order item insert error:", itemErr);
        continue;
      }

      downloadLinks.push({
        title: item.title,
        url: `${siteUrl}/download/${itemRow.download_token}`,
        token: itemRow.download_token,
      });
    }

    console.log("Download links generated:", downloadLinks.length);

    // Send GHL email with download links
    if (ghlApiKey && ghlLocationId && downloadLinks.length > 0) {
      try {
        await sendGhlOrderEmail({
          apiKey: ghlApiKey,
          locationId: ghlLocationId,
          email: email.toLowerCase(),
          customerName,
          orderNumber: order.name || String(order.order_number),
          downloadLinks,
          libraryUrl: `${siteUrl}/my-orders`,
        });
        console.log("GHL email triggered for:", email);
      } catch (ghlErr) {
        console.error("GHL email error:", ghlErr);
        // Don't fail the webhook for GHL errors
      }
    }

    return json({
      success: true,
      orderId: orderRow.id,
      downloads: downloadLinks.length,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function getProductHandle(productId: number | string): Promise<string> {
  // Try to get handle from Shopify Admin API
  try {
    const shopifyToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    const storeDomain = "ryland-zer87.myshopify.com";
    const res = await fetch(
      `https://${storeDomain}/admin/api/2025-07/products/${productId}.json?fields=handle`,
      {
        headers: { "X-Shopify-Access-Token": shopifyToken! },
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data.product.handle;
    }
  } catch (e) {
    console.error("Failed to fetch product handle:", e);
  }
  return String(productId);
}

interface GhlEmailParams {
  apiKey: string;
  locationId: string;
  email: string;
  customerName: string;
  orderNumber: string;
  downloadLinks: Array<{ title: string; url: string }>;
  libraryUrl: string;
}

async function sendGhlOrderEmail(params: GhlEmailParams) {
  const { apiKey, locationId, email, customerName, orderNumber, downloadLinks, libraryUrl } = params;

  const nameParts = customerName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Build download links text for custom fields
  const linksText = downloadLinks
    .map((l, i) => `${i + 1}. ${l.title}: ${l.url}`)
    .join("\n");

  // Create/update GHL contact with order info
  const contactPayload: Record<string, unknown> = {
    firstName,
    lastName,
    email,
    locationId,
    source: "Shopify Order",
    tags: ["customer", "ebook-purchase", `order-${orderNumber}`],
    customFields: [
      { key: "latest_order_number", field_value: orderNumber },
      { key: "latest_download_links", field_value: linksText },
      { key: "download_library_url", field_value: libraryUrl },
    ],
  };

  const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(contactPayload),
  });

  const ghlData = await ghlRes.json();

  let contactId: string | null = null;
  if (!ghlRes.ok && ghlRes.status === 400 && ghlData?.meta?.contactId) {
    contactId = ghlData.meta.contactId;
    // Update existing contact with new order tags/fields
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        tags: ["customer", "ebook-purchase", `order-${orderNumber}`],
        customFields: contactPayload.customFields,
      }),
    });
  } else if (ghlRes.ok) {
    contactId = ghlData.contact?.id || ghlData.id;
  }

  console.log("GHL contact processed:", contactId);
  return contactId;
}
