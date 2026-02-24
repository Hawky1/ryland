import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

  const apiKey = Deno.env.get("GHL_API_KEY");
  const locationId = Deno.env.get("GHL_LOCATION_ID");
  const calendarId = Deno.env.get("GHL_CALENDAR_ID");

  if (!apiKey || !locationId || !calendarId) {
    console.error("Missing GHL env vars");
    return json({ error: "Server configuration error" }, 500);
  }

  const ghlHeaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Version: "2021-04-15",
  };

  try {
    const body = await req.json();
    const { action } = body;

    // ── GET FREE SLOTS ──
    if (action === "get-slots") {
      const { startDate, endDate, timezone } = body;
      if (!startDate || !endDate || !timezone) {
        return json({ error: "startDate, endDate, and timezone are required" }, 400);
      }

      // Input length validation
      if (String(startDate).length > 30 || String(endDate).length > 30 || String(timezone).length > 50) {
        return json({ error: "Invalid input" }, 400);
      }

      const url = new URL(
        `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots`
      );
      url.searchParams.set("startDate", String(startDate));
      url.searchParams.set("endDate", String(endDate));
      url.searchParams.set("timezone", timezone);

      const res = await fetch(url.toString(), { headers: ghlHeaders });
      const data = await res.json();

      if (!res.ok) {
        console.error("GHL free-slots error:", JSON.stringify(data));
        return json({ error: "Unable to fetch available slots. Please try again." }, 500);
      }

      return json(data);
    }

    // ── BOOK APPOINTMENT ──
    if (action === "book") {
      const { name, email, phone, notes, startTime, endTime, timezone } = body;

      if (!name || !email || !startTime || !endTime) {
        return json({ error: "name, email, startTime, endTime are required" }, 400);
      }

      // Input length validation
      if (typeof name !== "string" || name.length > 100) {
        return json({ error: "Invalid name" }, 400);
      }
      if (typeof email !== "string" || email.length > 255) {
        return json({ error: "Invalid email" }, 400);
      }
      if (phone && (typeof phone !== "string" || phone.length > 20)) {
        return json({ error: "Invalid phone" }, 400);
      }
      if (notes && (typeof notes !== "string" || notes.length > 1000)) {
        return json({ error: "Notes too long" }, 400);
      }
      if (String(startTime).length > 30 || String(endTime).length > 30) {
        return json({ error: "Invalid time format" }, 400);
      }
      if (timezone && (typeof timezone !== "string" || timezone.length > 50)) {
        return json({ error: "Invalid timezone" }, 400);
      }

      // Step 1: Create/upsert contact
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const contactPayload: Record<string, unknown> = {
        firstName,
        lastName,
        email,
        locationId,
        source: "Consultation Booking",
        tags: ["consultation-booking", "funnel-lead"],
      };
      if (phone) contactPayload.phone = phone;

      const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: { ...ghlHeaders, Version: "2021-07-28" },
        body: JSON.stringify(contactPayload),
      });
      const contactData = await contactRes.json();

      if (!contactRes.ok) {
        console.error("GHL contact error:", JSON.stringify(contactData));
        return json({ error: "Unable to process your request. Please try again." }, 500);
      }

      const contactId = contactData.contact?.id || contactData.id;
      console.log("Contact created/upserted:", contactId);

      // Step 2: Create appointment
      const appointmentPayload = {
        calendarId,
        locationId,
        contactId,
        startTime,
        endTime,
        title: `Strategy Session — ${name}`,
        appointmentStatus: "new",
        address: timezone || "America/New_York",
        notes: notes || "",
      };

      const apptRes = await fetch(
        "https://services.leadconnectorhq.com/calendars/events/appointments",
        {
          method: "POST",
          headers: ghlHeaders,
          body: JSON.stringify(appointmentPayload),
        }
      );
      const apptData = await apptRes.json();

      if (!apptRes.ok) {
        console.error("GHL appointment error:", JSON.stringify(apptData));
        return json({ error: "Unable to book appointment. Please try again." }, 500);
      }

      console.log("Appointment booked:", apptData.id);
      return json({ success: true, appointmentId: apptData.id });
    }

    return json({ error: `Unknown action: ${action}` }, 400);
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});
