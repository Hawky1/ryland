import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GHL_API_KEY");
    const locationId = Deno.env.get("GHL_LOCATION_ID");

    if (!apiKey || !locationId) {
      console.error("Missing GHL_API_KEY or GHL_LOCATION_ID");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, phone, businessName, tags, source, customFields } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Build contact payload for GHL v2 API
    const contactPayload: Record<string, unknown> = {
      firstName,
      lastName,
      email,
      locationId,
      source: source || "Funnel Lead Magnet",
      tags: tags || ["funnel-lead", "blueprint-download"],
    };

    if (phone) contactPayload.phone = phone;
    if (businessName) contactPayload.companyName = businessName;
    if (customFields) contactPayload.customFields = Object.entries(customFields).map(
      ([key, value]) => ({ key, field_value: value })
    );

    // Create contact using GHL v2 API
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

    if (!ghlRes.ok) {
      console.error("GHL API error:", JSON.stringify(ghlData));
      return new Response(
        JSON.stringify({ error: "Failed to create GHL contact", details: ghlData }),
        { status: ghlRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("GHL contact created:", ghlData.contact?.id || ghlData.id);

    return new Response(
      JSON.stringify({ success: true, contactId: ghlData.contact?.id || ghlData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
