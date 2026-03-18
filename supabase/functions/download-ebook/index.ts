import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing download token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Look up the download token
    const { data: item, error: lookupErr } = await supabase
      .from("order_items")
      .select("id, shopify_product_handle, product_title, downloaded_at")
      .eq("download_token", token)
      .single();

    if (lookupErr || !item) {
      return new Response(JSON.stringify({ error: "Invalid or expired download token" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the file from storage
    const filePath = `${item.shopify_product_handle}.pdf`;
    const { data: fileData, error: fileErr } = await supabase.storage
      .from("ebooks")
      .download(filePath);

    if (fileErr || !fileData) {
      console.error("File download error:", fileErr, "path:", filePath);
      return new Response(
        JSON.stringify({ error: "E-book file not found. Please contact support." }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Mark as downloaded
    await supabase
      .from("order_items")
      .update({ downloaded_at: new Date().toISOString() })
      .eq("id", item.id);

    // Return the PDF
    const safeTitle = item.product_title.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
    return new Response(fileData, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Download error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
