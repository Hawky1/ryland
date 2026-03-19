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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { name, email, phone, business_name, referral_source, message } = await req.json();

    // Validation
    if (!name || !email) {
      return json({ error: "Name and email are required" }, 400);
    }
    if (typeof name !== "string" || name.length > 100) {
      return json({ error: "Invalid name" }, 400);
    }
    if (typeof email !== "string" || email.length > 255) {
      return json({ error: "Invalid email" }, 400);
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Check if email already exists in affiliates
    const { data: existingAffiliate } = await supabase
      .from("affiliates")
      .select("id")
      .eq("email", trimmedEmail)
      .maybeSingle();

    if (existingAffiliate) {
      return json({ error: "An account with this email already exists. Please log in at the partner portal." }, 409);
    }

    // Generate affiliate ID: FirstInitialLastName1, increment if duplicate
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join("") || firstName;
    const baseId = (firstName.charAt(0) + lastName).replace(/[^a-zA-Z]/g, "");

    let affiliateId = `${baseId}1`;
    let counter = 1;

    // Check for duplicates
    const { data: existingIds } = await supabase
      .from("affiliates")
      .select("affiliate_id")
      .ilike("affiliate_id", `${baseId}%`);

    if (existingIds && existingIds.length > 0) {
      const usedNumbers = existingIds
        .map((r) => {
          const match = r.affiliate_id.match(new RegExp(`^${baseId}(\\d+)$`, "i"));
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter((n) => n > 0);

      if (usedNumbers.length > 0) {
        counter = Math.max(...usedNumbers) + 1;
      }
      affiliateId = `${baseId}${counter}`;
    }

    // Create auth user with no password, email confirmed
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: trimmedEmail,
      email_confirm: true,
      user_metadata: { full_name: trimmedName },
    });

    if (authError) {
      console.error("Auth user creation error:", authError);
      if (authError.message?.includes("already been registered")) {
        return json({ error: "An account with this email already exists. Please log in at the partner portal." }, 409);
      }
      return json({ error: "Failed to create account. Please try again." }, 500);
    }

    const userId = authData.user.id;

    // Insert affiliates record
    const { error: affiliateError } = await supabase.from("affiliates").insert({
      user_id: userId,
      affiliate_id: affiliateId,
      full_name: trimmedName,
      email: trimmedEmail,
      phone: phone || null,
      company_name: business_name || null,
      status: "approved",
    });

    if (affiliateError) {
      console.error("Affiliate insert error:", affiliateError);
      // Clean up auth user on failure
      await supabase.auth.admin.deleteUser(userId);
      return json({ error: "Failed to create partner record. Please try again." }, 500);
    }

    // Insert partner_submissions record
    let ghlContactId: string | null = null;

    // GHL sync (non-critical)
    try {
      const ghlApiKey = Deno.env.get("GHL_API_KEY");
      const ghlLocationId = Deno.env.get("GHL_LOCATION_ID");

      if (ghlApiKey && ghlLocationId) {
        const ghlNameParts = trimmedName.split(/\s+/);
        const ghlFirstName = ghlNameParts[0] || "";
        const ghlLastName = ghlNameParts.slice(1).join(" ") || "";

        const ghlPayload: Record<string, unknown> = {
          firstName: ghlFirstName,
          lastName: ghlLastName,
          email: trimmedEmail,
          locationId: ghlLocationId,
          source: "Partner Signup Form",
          tags: ["partner-signup", "referral-partner"],
        };

        if (phone) ghlPayload.phone = phone;
        if (business_name) ghlPayload.companyName = business_name;

        const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ghlApiKey}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify(ghlPayload),
        });

        const ghlData = await ghlRes.json();

        if (!ghlRes.ok && ghlRes.status === 400 && ghlData?.meta?.contactId) {
          ghlContactId = ghlData.meta.contactId;
        } else if (ghlRes.ok) {
          ghlContactId = ghlData.contact?.id || ghlData.id;
        }
      }
    } catch (ghlErr) {
      console.error("GHL sync error (non-critical):", ghlErr);
    }

    // Insert partner_submissions
    await supabase.from("partner_submissions").insert({
      name: trimmedName,
      email: trimmedEmail,
      phone: phone || null,
      business_name: business_name || null,
      referral_source: referral_source || null,
      message: message || null,
      ghl_contact_id: ghlContactId,
    });

    // Send password recovery email (acts as "Set Your Password")
    const { error: linkError } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email: trimmedEmail,
      options: {
        redirectTo: "https://rylandpartners.com/reset-password",
      },
    });

    if (linkError) {
      console.error("Recovery link error:", linkError);
      // Account is created, but email failed — not fatal
    }

    return json({ success: true, affiliateId });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
