import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, code } = await req.json();

    if (!email || typeof email !== "string") {
      return json({ error: "Email is required" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const normalizedEmail = email.toLowerCase().trim();

    // If no code, send a verification code via GHL
    if (!code) {
      // Generate a 6-digit code
      const verificationCode = String(Math.floor(100000 + Math.random() * 900000));

      // Store code in orders table metadata or a simple approach: use GHL custom field
      // For simplicity, store in a temp record
      const { error: codeErr } = await supabase
        .from("email_verifications")
        .upsert(
          {
            email: normalizedEmail,
            code: verificationCode,
            expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min
          },
          { onConflict: "email" }
        );

      if (codeErr) {
        console.error("Code storage error:", codeErr);
        return json({ error: "Failed to generate verification code" }, 500);
      }

      // Send code via GHL
      const ghlApiKey = Deno.env.get("GHL_API_KEY");
      const ghlLocationId = Deno.env.get("GHL_LOCATION_ID");
      if (ghlApiKey && ghlLocationId) {
        // Create/update contact with verification code
        await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ghlApiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            email: normalizedEmail,
            locationId: ghlLocationId,
            tags: ["verification-request"],
            customFields: [
              { key: "verification_code", field_value: verificationCode },
            ],
          }),
        });
      }

      return json({ success: true, message: "Verification code sent" });
    }

    // Verify the code
    const { data: verification, error: verifyErr } = await supabase
      .from("email_verifications")
      .select("code, expires_at")
      .eq("email", normalizedEmail)
      .single();

    if (verifyErr || !verification) {
      return json({ error: "No verification code found. Please request a new one." }, 400);
    }

    if (new Date(verification.expires_at) < new Date()) {
      return json({ error: "Verification code expired. Please request a new one." }, 400);
    }

    if (verification.code !== code) {
      return json({ error: "Invalid verification code" }, 400);
    }

    // Clean up verification
    await supabase.from("email_verifications").delete().eq("email", normalizedEmail);

    // Fetch orders with items
    const { data: orders, error: ordersErr } = await supabase
      .from("orders")
      .select(`
        id,
        shopify_order_id,
        shopify_order_number,
        customer_name,
        created_at,
        order_items (
          id,
          product_title,
          shopify_product_handle,
          download_token,
          downloaded_at
        )
      `)
      .eq("email", normalizedEmail)
      .order("created_at", { ascending: false });

    if (ordersErr) {
      console.error("Orders fetch error:", ordersErr);
      return json({ error: "Failed to fetch orders" }, 500);
    }

    return json({ success: true, orders: orders || [] });
  } catch (err) {
    console.error("Lookup error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
