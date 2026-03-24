import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, DollarSign, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { formatDateTime } from "@/utils/formatters";
import type { Lead } from "@/types/leads";

const stageBadge: Record<string, string> = {
  "New Lead": "bg-blue-50 text-blue-700 border-blue-200",
  "Contacted": "bg-sky-50 text-sky-700 border-sky-200",
  "Credit Optimization": "bg-violet-50 text-violet-700 border-violet-200",
  "Funding": "bg-amber-50 text-amber-700 border-amber-200",
  "Approved": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Funded": "bg-green-50 text-green-700 border-green-200",
  "Closed Lost": "bg-red-50 text-red-700 border-red-200",
};

const commissionStatusBadge: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-blue-50 text-blue-700 border-blue-200",
  paid: "bg-green-50 text-green-700 border-green-200",
};

const pipelineStages = ["New Lead", "Contacted", "Credit Optimization", "Funding", "Approved", "Funded", "Closed Lost"];
const commissionStatuses = ["pending", "approved", "paid"];

export default function AdminAffiliateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [addCommissionOpen, setAddCommissionOpen] = useState(false);
  const [newCommission, setNewCommission] = useState({ lead_id: "", amount: "", type: "referral" });

  // Fetch affiliate
  const { data: affiliate, isLoading: affLoading } = useQuery({
    queryKey: ["admin-affiliate", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  // Fetch leads for this affiliate
  const { data: leads = [], isLoading: leadsLoading, refetch: refetchLeads } = useQuery<Lead[]>({
    queryKey: ["admin-affiliate-leads", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliate_leads")
        .select("*")
        .eq("affiliate_id", id!)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  // Fetch commissions for this affiliate
  const { data: commissions = [], isLoading: commissionsLoading, refetch: refetchCommissions } = useQuery({
    queryKey: ["admin-affiliate-commissions", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("commissions")
        .select("*, affiliate_leads(full_name)")
        .eq("affiliate_id", id!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Update lead stage
  const updateLeadMutation = useMutation({
    mutationFn: async ({ leadId, updates }: { leadId: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("affiliate_leads").update(updates).eq("id", leadId);
      if (error) throw error;
    },
    onSuccess: () => {
      refetchLeads();
      toast({ title: "Lead updated" });
    },
    onError: (e) => toast({ title: "Error", description: (e as Error).message, variant: "destructive" }),
  });

  // Update commission status
  const updateCommissionMutation = useMutation({
    mutationFn: async ({ commissionId, status }: { commissionId: string; status: string }) => {
      const { error } = await supabase.from("commissions").update({ commission_status: status as any }).eq("id", commissionId);
      if (error) throw error;
    },
    onSuccess: () => {
      refetchCommissions();
      toast({ title: "Commission updated" });
    },
    onError: (e) => toast({ title: "Error", description: (e as Error).message, variant: "destructive" }),
  });

  // Add commission
  const addCommissionMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("commissions").insert({
        affiliate_id: id!,
        lead_id: newCommission.lead_id || null,
        commission_amount: parseFloat(newCommission.amount) || 0,
        commission_type: newCommission.type,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      refetchCommissions();
      setAddCommissionOpen(false);
      setNewCommission({ lead_id: "", amount: "", type: "referral" });
      toast({ title: "Commission added" });
    },
    onError: (e) => toast({ title: "Error", description: (e as Error).message, variant: "destructive" }),
  });

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  const isLoading = affLoading || leadsLoading || commissionsLoading;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("/portal/admin")} className="gap-1.5 text-slate-500">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>

      {affLoading ? (
        <Skeleton className="h-20 w-full" />
      ) : affiliate ? (
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-5 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{affiliate.full_name}</h1>
              <p className="text-sm text-slate-500">{affiliate.email} · <span className="font-mono">{affiliate.affiliate_id}</span></p>
              {affiliate.company_name && <p className="text-sm text-slate-500 mt-0.5">{affiliate.company_name}</p>}
            </div>
            <Badge className={`capitalize ${affiliate.status === "approved" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
              {affiliate.status}
            </Badge>
          </CardContent>
        </Card>
      ) : null}

      {/* Leads Section */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-400" />
            Leads
            <Badge variant="secondary" className="ml-2 font-normal bg-slate-100 text-slate-600">{leads.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leadsLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : !leads.length ? (
            <div className="py-12 text-center text-sm text-slate-500">No leads submitted yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Stage</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Commission</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Referred</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="border-slate-100">
                      <TableCell className="font-medium text-sm text-slate-900">{lead.full_name}</TableCell>
                      <TableCell className="text-sm text-slate-500">{lead.email ?? "—"}</TableCell>
                      <TableCell>
                        <Select
                          value={lead.pipeline_stage}
                          onValueChange={(val) => updateLeadMutation.mutate({ leadId: lead.id, updates: { pipeline_stage: val, status: val } })}
                        >
                          <SelectTrigger className="h-8 w-[160px] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {pipelineStages.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        <Select
                          value={lead.commission_status ?? "Pending"}
                          onValueChange={(val) => updateLeadMutation.mutate({ leadId: lead.id, updates: { commission_status: val } })}
                        >
                          <SelectTrigger className="h-8 w-[120px] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Sent">Sent</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{formatDateTime(lead.referred_at)}</TableCell>
                      <TableCell>
                        <Input
                          placeholder="Next step…"
                          defaultValue={lead.next_step ?? ""}
                          className="h-8 text-xs w-[140px]"
                          onBlur={(e) => {
                            if (e.target.value !== (lead.next_step ?? "")) {
                              updateLeadMutation.mutate({ leadId: lead.id, updates: { next_step: e.target.value } });
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Commissions Section */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-slate-400" />
            Commissions
          </CardTitle>
          <Button size="sm" onClick={() => setAddCommissionOpen(true)} className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <Plus className="h-3.5 w-3.5" /> Add Commission
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {commissionsLoading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : !commissions.length ? (
            <div className="py-12 text-center text-sm text-slate-500">No commissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Type</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Amount</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((c) => {
                    const leadName = (c as any).affiliate_leads?.full_name ?? "—";
                    return (
                      <TableRow key={c.id} className="border-slate-100">
                        <TableCell className="font-medium text-sm text-slate-900">{leadName}</TableCell>
                        <TableCell className="text-sm text-slate-500 capitalize">{c.commission_type}</TableCell>
                        <TableCell className="text-sm text-right font-mono text-slate-900">{fmt(Number(c.commission_amount))}</TableCell>
                        <TableCell>
                          <Select
                            value={c.commission_status}
                            onValueChange={(val) => updateCommissionMutation.mutate({ commissionId: c.id, status: val })}
                          >
                            <SelectTrigger className="h-8 w-[120px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {commissionStatuses.map((s) => (
                                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
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

      {/* Add Commission Dialog */}
      <Dialog open={addCommissionOpen} onOpenChange={setAddCommissionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Commission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Lead (optional)</Label>
              <Select value={newCommission.lead_id} onValueChange={(v) => setNewCommission((p) => ({ ...p, lead_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Select a lead…" /></SelectTrigger>
                <SelectContent>
                  {leads.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.full_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount ($)</Label>
              <Input
                type="number"
                placeholder="500.00"
                value={newCommission.amount}
                onChange={(e) => setNewCommission((p) => ({ ...p, amount: e.target.value }))}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={newCommission.type} onValueChange={(v) => setNewCommission((p) => ({ ...p, type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="bonus">Bonus</SelectItem>
                  <SelectItem value="override">Override</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCommissionOpen(false)}>Cancel</Button>
            <Button
              onClick={() => addCommissionMutation.mutate()}
              disabled={!newCommission.amount || addCommissionMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              {addCommissionMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Add Commission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
