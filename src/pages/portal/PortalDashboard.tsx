import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, CheckCircle2, DollarSign, Clock, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SITE_DOMAIN = "rylandpartners.com";

export default function PortalDashboard() {
  const { affiliate } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = affiliate
    ? `https://${SITE_DOMAIN}/assessment?ref=${affiliate.affiliate_id}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // KPI queries
  const { data: stats, isLoading } = useQuery({
    queryKey: ["portal-stats", affiliate?.id],
    enabled: !!affiliate,
    queryFn: async () => {
      const [leadsRes, commissionsRes, payoutsRes] = await Promise.all([
        supabase.from("affiliate_leads").select("id, status, pipeline_stage, deal_amount").eq("affiliate_id", affiliate!.id),
        supabase.from("commissions").select("commission_amount, commission_status").eq("affiliate_id", affiliate!.id),
        supabase.from("payouts").select("amount, status").eq("affiliate_id", affiliate!.id),
      ]);

      const leads = leadsRes.data ?? [];
      const commissions = commissionsRes.data ?? [];

      const totalLeads = leads.length;
      const activeOpps = leads.filter((l) => !["Closed Lost", "Funded"].includes(l.pipeline_stage)).length;
      const fundedDeals = leads.filter((l) => l.pipeline_stage === "Funded").length;
      const totalCommission = commissions.reduce((s, c) => s + Number(c.commission_amount), 0);
      const pendingPayouts = commissions
        .filter((c) => c.commission_status === "pending" || c.commission_status === "approved")
        .reduce((s, c) => s + Number(c.commission_amount), 0);

      return { totalLeads, activeOpps, fundedDeals, totalCommission, pendingPayouts };
    },
  });

  const kpiCards = [
    { label: "Total Leads Referred", value: stats?.totalLeads ?? 0, icon: Users, color: "text-blue-600" },
    { label: "Active Opportunities", value: stats?.activeOpps ?? 0, icon: Target, color: "text-amber-600" },
    { label: "Deals Funded", value: stats?.fundedDeals ?? 0, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Total Commission", value: `$${(stats?.totalCommission ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: DollarSign, color: "text-green-600" },
    { label: "Pending Payouts", value: `$${(stats?.pendingPayouts ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: Clock, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Your affiliate performance at a glance.</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} className="border-border/60">
            <CardContent className="pt-5 pb-4 px-5">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-16" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{kpi.value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral link section */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Your Referral Link</CardTitle>
          <p className="text-sm text-muted-foreground">
            Share this link with business owners. When they apply through your link, the referral is automatically attributed to you.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center rounded-lg border border-border bg-muted/30 px-4 py-2.5 font-mono text-sm text-foreground overflow-x-auto">
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground mr-3" />
              <span className="truncate">{referralLink}</span>
            </div>
            <Button onClick={copyLink} variant="outline" className="shrink-0 gap-2">
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>

          <div className="mt-4 rounded-lg bg-muted/40 border border-border/40 p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">How It Works</h4>
            <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
              <li>Share your unique referral link with business owners in your network</li>
              <li>They complete our short funding assessment through your link</li>
              <li>Our team works with them to secure funding</li>
              <li>You earn a commission when the lead qualifies — even if they don't fund</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
