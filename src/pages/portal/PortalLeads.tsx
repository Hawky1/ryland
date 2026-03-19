import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { format } from "date-fns";

const stageColors: Record<string, string> = {
  "New Lead": "bg-blue-100 text-blue-800",
  "Contacted": "bg-sky-100 text-sky-800",
  "Credit Optimization": "bg-violet-100 text-violet-800",
  "Funding": "bg-amber-100 text-amber-800",
  "Approved": "bg-emerald-100 text-emerald-800",
  "Funded": "bg-green-100 text-green-800",
  "Closed Lost": "bg-red-100 text-red-800",
};

export default function PortalLeads() {
  const { affiliate } = useAuth();

  const { data: leads, isLoading } = useQuery({
    queryKey: ["portal-leads", affiliate?.id],
    enabled: !!affiliate,
    queryFn: async () => {
      const { data } = await supabase
        .from("affiliate_leads")
        .select("*")
        .eq("affiliate_id", affiliate!.id)
        .order("referred_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Leads</h1>
        <p className="text-sm text-muted-foreground mt-1">Track the status of every business owner you've referred.</p>
      </div>

      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Referred Leads
            {leads && <Badge variant="secondary" className="ml-2 font-normal">{leads.length}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : !leads?.length ? (
            <div className="py-16 text-center">
              <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-medium">No leads yet</p>
              <p className="text-xs text-muted-foreground mt-1">Share your referral link to start tracking leads here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Lead Name</TableHead>
                    <TableHead className="text-xs">Date Submitted</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Pipeline Stage</TableHead>
                    <TableHead className="text-xs text-right">Deal Amount</TableHead>
                    <TableHead className="text-xs">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium text-sm">{lead.full_name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(lead.referred_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-normal">{lead.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${stageColors[lead.pipeline_stage] ?? "bg-muted text-muted-foreground"}`}>
                          {lead.pipeline_stage}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-right font-mono">
                        {Number(lead.deal_amount) > 0
                          ? `$${Number(lead.deal_amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                        {lead.notes ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
