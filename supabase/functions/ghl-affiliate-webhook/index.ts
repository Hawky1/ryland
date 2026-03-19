import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function generateAffiliateId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `AFF${num}`;
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  let pw = "";
  for (let i = 0; i < 14; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pw;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ghlApiKey = Deno.env.get("GHL_API_KEY");
    const ghlLocationId = Deno.env.get("GHL_LOCATION_ID");

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const body = await req.json();
    const { type } = body;

    // ─── AFFILIATE APPROVAL (deprecated — partners are created via /partners signup form) ───
    if (type === "ContactTagAdded" || type === "affiliate_approve") {
      const email = body.email?.trim()?.toLowerCase();
      if (!email) {
        return json({ error: "Email is required" }, 400);
      }

      // Just check if affiliate already exists and return — no creation
      const { data: existing } = await supabase
        .from("affiliates")
        .select("id, affiliate_id")
        .eq("email", email)
        .maybeSingle();

      if (existing) {
        console.log("Affiliate already exists:", existing.affiliate_id);
        return json({ success: true, affiliate_id: existing.affiliate_id, message: "Already exists" });
      }

      // Partner not found — they should sign up via /partners
      console.log("No affiliate found for", email, "— ignoring webhook, partner should use signup form");
      return json({ success: true, message: "No affiliate found. Partner should sign up via the form." });
    }

    // ─── OPPORTUNITY STAGE CHANGED ───
    if (type === "OpportunityStageChanged" || type === "opportunity_update") {
      const ghlContactId = body.contact_id;
      const ghlOpportunityId = body.opportunity_id;
      const pipelineStage = body.pipeline_stage || body.stage_name;
      const status = body.status || pipelineStage;
      const dealAmount = body.monetary_value || body.deal_amount || 0;

      if (!ghlContactId && !ghlOpportunityId) {
        return json({ error: "contact_id or opportunity_id required" }, 400);
      }

      // Find the affiliate lead
      let query = supabase.from("affiliate_leads").select("id, affiliate_id");
      if (ghlOpportunityId) {
        query = query.eq("ghl_opportunity_id", ghlOpportunityId);
      } else {
        query = query.eq("ghl_contact_id", ghlContactId);
      }

      const { data: lead } = await query.maybeSingle();

      if (!lead) {
        console.log("No affiliate lead found for this contact/opportunity");
        return json({ success: true, message: "No matching affiliate lead" });
      }

      // Update lead
      const updateData: Record<string, unknown> = {};
      if (pipelineStage) updateData.pipeline_stage = pipelineStage;
      if (status) updateData.status = status;
      if (dealAmount) updateData.deal_amount = dealAmount;

      await supabase
        .from("affiliate_leads")
        .update(updateData)
        .eq("id", lead.id);

      // If deal is funded/won, create commission
      if (pipelineStage === "Funded" || status === "won") {
        const commissionRate = 0.05; // 5% default
        const commissionAmount = Number(dealAmount) * commissionRate;

        if (commissionAmount > 0) {
          await supabase.from("commissions").insert({
            affiliate_id: lead.affiliate_id,
            lead_id: lead.id,
            commission_type: "referral",
            commission_amount: commissionAmount,
            commission_status: "pending",
          });
          console.log(`Commission created: $${commissionAmount} for affiliate ${lead.affiliate_id}`);
        }
      }

      return json({ success: true, message: "Lead updated" });
    }

    // ─── NEW LEAD REFERRED ───
    if (type === "lead_referred") {
      const affiliateId = body.affiliate_id; // text like "AFF12345"
      const ghlContactId = body.ghl_contact_id || body.contact_id;
      const fullName = body.full_name || body.name;
      const email = body.email;
      const phone = body.phone;

      if (!affiliateId || !fullName) {
        return json({ error: "affiliate_id and full_name required" }, 400);
      }

      // Look up affiliate by affiliate_id text
      const { data: aff } = await supabase
        .from("affiliates")
        .select("id")
        .eq("affiliate_id", affiliateId)
        .maybeSingle();

      if (!aff) {
        console.log("Affiliate not found:", affiliateId);
        return json({ error: "Affiliate not found" }, 404);
      }

      // Insert lead
      await supabase.from("affiliate_leads").insert({
        affiliate_id: aff.id,
        ghl_contact_id: ghlContactId || null,
        full_name: fullName,
        email: email || null,
        phone: phone || null,
        status: "New Lead",
        pipeline_stage: "New Lead",
      });

      return json({ success: true, message: "Lead recorded" });
    }

    return json({ error: "Unknown webhook type" }, 400);
  } catch (err) {
    console.error("Webhook error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
