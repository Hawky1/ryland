import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Clock, CheckCircle2, Banknote } from "lucide-react";
import { format } from "date-fns";

const statusBadge: Record<string, { className: string; label: string }> = {
  pending: { className: "bg-amber-100 text-amber-800", label: "Pending" },
  approved: { className: "bg-blue-100 text-blue-800", label: "Approved" },
  paid: { className: "bg-green-100 text-green-800", label: "Paid" },
};

export default function PortalCommissions() {
  const { affiliate } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["portal-commissions", affiliate?.id],
    enabled: !!affiliate,
    queryFn: async () => {
      const [commissionsRes, payoutsRes] = await Promise.all([
        supabase
          .from("commissions")
          .select("*, affiliate_leads(full_name)")
          .eq("affiliate_id", affiliate!.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("payouts")
          .select("*")
          .eq("affiliate_id", affiliate!.id)
          .order("created_at", { ascending: false }),
      ]);
      return {
        commissions: commissionsRes.data ?? [],
        payouts: payoutsRes.data ?? [],
      };
    },
  });

  const commissions = data?.commissions ?? [];
  const payouts = data?.payouts ?? [];

  const totalEarned = commissions.reduce((s, c) => s + Number(c.commission_amount), 0);
  const totalPending = commissions.filter((c) => c.commission_status !== "paid").reduce((s, c) => s + Number(c.commission_amount), 0);
  const totalPaid = commissions.filter((c) => c.commission_status === "paid").reduce((s, c) => s + Number(c.commission_amount), 0);

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const summaryCards = [
    { label: "Total Earned", value: fmt(totalEarned), icon: DollarSign, color: "text-green-600" },
    { label: "Pending", value: fmt(totalPending), icon: Clock, color: "text-amber-600" },
    { label: "Paid Out", value: fmt(totalPaid), icon: CheckCircle2, color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Commissions</h1>
        <p className="text-sm text-muted-foreground mt-1">View your earnings and payout history.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((c) => (
          <Card key={c.label} className="border-border/60">
            <CardContent className="pt-5 pb-4 px-5">
              {isLoading ? (
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-7 w-20" /></div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{c.label}</p>
                    <c.icon className={`h-4 w-4 ${c.color}`} />
                  </div>
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{c.value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commission detail */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Banknote className="h-4 w-4 text-muted-foreground" />
            Commission Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : !commissions.length ? (
            <div className="py-16 text-center">
              <DollarSign className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-medium">No commissions yet</p>
              <p className="text-xs text-muted-foreground mt-1">Commissions appear here as your referred leads progress through the pipeline.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Lead</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Payout Date</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((c) => {
                    const badge = statusBadge[c.commission_status] ?? statusBadge.pending;
                    const leadName = (c as any).affiliate_leads?.full_name ?? "—";
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium text-sm">{leadName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground capitalize">{c.commission_type}</TableCell>
                        <TableCell className="text-sm text-right font-mono">{fmt(Number(c.commission_amount))}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                            {badge.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {c.payout_date ? format(new Date(c.payout_date), "MMM d, yyyy") : "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(c.created_at), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payout note */}
      {!isLoading && commissions.some((c) => c.commission_status !== "paid") && (
        <div className="rounded-lg bg-muted/40 border border-border/40 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">About Pending Commissions:</strong> Commissions move from "Pending" to "Approved" once the referred lead's funding is confirmed, and to "Paid" once your payout is processed. Payouts are issued on a regular schedule.
          </p>
        </div>
      )}
    </div>
  );
}
