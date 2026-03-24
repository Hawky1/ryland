import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Users, UserCheck, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const commissionStatusBadge: Record<string, { className: string; label: string }> = {
  pending: { className: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
  approved: { className: "bg-blue-50 text-blue-700 border-blue-200", label: "Approved" },
  paid: { className: "bg-green-50 text-green-700 border-green-200", label: "Paid" },
};

const affiliateStatusBadge: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  suspended: "bg-red-50 text-red-700 border-red-200",
};

const chartConfig: ChartConfig = {
  leads: { label: "Leads", color: "hsl(221, 83%, 53%)" },
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard-overview"],
    queryFn: async () => {
      const [affiliatesRes, leadsRes, commissionsRes, payoutsRes] = await Promise.all([
        supabase.from("affiliates").select("id, full_name, email, company_name, status, created_at"),
        supabase.from("affiliate_leads").select("id, affiliate_id, pipeline_stage, created_at, full_name, email, status, next_step, affiliates(full_name)").order("created_at", { ascending: false }),
        supabase.from("commissions").select("id, affiliate_id, commission_amount, commission_status, commission_type, created_at, affiliate_leads(full_name)"),
        supabase.from("payouts").select("id, amount, status"),
      ]);

      const affiliates = affiliatesRes.data ?? [];
      const leads = leadsRes.data ?? [];
      const commissions = commissionsRes.data ?? [];
      const payouts = payoutsRes.data ?? [];

      const totalRevenue = commissions
        .filter((c) => c.commission_status === "paid")
        .reduce((s, c) => s + Number(c.commission_amount), 0);

      const totalOwed = commissions
        .filter((c) => c.commission_status !== "paid")
        .reduce((s, c) => s + Number(c.commission_amount), 0);

      const pendingCommissions = commissions.filter((c) => c.commission_status === "pending").length;
      const pendingPayouts = payouts.filter((p) => p.status === "pending" || p.status === "processing").length;

      const fundedLeads = leads.filter((l) => l.pipeline_stage === "Funded").length;
      const totalLeads = leads.length;
      const conversionRate = totalLeads > 0 ? Math.round((fundedLeads / totalLeads) * 100) : 0;

      // Build weekly lead chart data (last 8 weeks)
      const now = new Date();
      const chartData: { week: string; leads: number }[] = [];
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - i * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        const count = leads.filter((l) => {
          const d = new Date(l.created_at);
          return d >= weekStart && d < weekEnd;
        }).length;
        chartData.push({
          week: format(weekStart, "MMM d"),
          leads: count,
        });
      }

      // Top affiliates by lead count
      const affiliateLeadCounts: Record<string, number> = {};
      leads.forEach((l) => {
        affiliateLeadCounts[l.affiliate_id] = (affiliateLeadCounts[l.affiliate_id] || 0) + 1;
      });
      const topAffiliates = affiliates
        .map((a) => ({ ...a, leadCount: affiliateLeadCounts[a.id] || 0 }))
        .sort((a, b) => b.leadCount - a.leadCount)
        .slice(0, 5);

      // Latest commissions (most recent 10)
      const latestCommissions = commissions
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      // Latest affiliates (most recent 10)
      const latestAffiliates = affiliates
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      return {
        totalRevenue,
        totalOwed,
        conversionRate,
        totalAffiliates: affiliates.length,
        totalLeads,
        pendingCommissions,
        pendingPayouts,
        chartData,
        topAffiliates,
        latestCommissions,
        latestAffiliates,
      };
    },
  });

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const kpiCards = [
    { label: "Total Revenue Generated", value: isLoading ? null : fmt(data?.totalRevenue ?? 0), icon: DollarSign, gradient: "from-emerald-500 to-green-600" },
    { label: "Conversion Rate", value: isLoading ? null : `${data?.conversionRate ?? 0}%`, icon: TrendingUp, gradient: "from-blue-500 to-indigo-600" },
    { label: "Total Affiliates", value: isLoading ? null : String(data?.totalAffiliates ?? 0), icon: UserCheck, gradient: "from-violet-500 to-purple-600" },
  ];

  const secondaryStats = [
    { label: "Total Leads", value: data?.totalLeads ?? 0 },
    { label: "Owed", value: fmt(data?.totalOwed ?? 0) },
    { label: "Pending Commissions", value: data?.pendingCommissions ?? 0 },
    { label: "Pending Payouts", value: data?.pendingPayouts ?? 0 },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Get an overview of your campaign revenue and affiliate commissions.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-5 pb-5 px-5">
              {kpi.value === null ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                    <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${kpi.gradient} flex items-center justify-center`}>
                      <kpi.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold tracking-tight text-slate-900">{kpi.value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {secondaryStats.map((s) => (
          <Card key={s.label} className="border-slate-200 bg-white shadow-sm">
            <CardContent className="py-4 px-5">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{s.value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Top Affiliates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview chart */}
        <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">Leads Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[240px] w-full" />
            ) : (
              <ChartContainer config={chartConfig} className="h-[240px] w-full">
                <AreaChart data={data?.chartData ?? []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="hsl(221, 83%, 53%)"
                    strokeWidth={2}
                    fill="url(#leadsGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Top Affiliates */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">Top Affiliates</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : !data?.topAffiliates?.length ? (
              <div className="py-10 text-center text-sm text-slate-500">No affiliates yet</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {data.topAffiliates.map((a, idx) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/portal/admin/affiliate/${a.id}`)}
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900 truncate">{a.full_name}</p>
                      <p className="text-xs text-slate-500">{a.leadCount} leads</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Latest Commissions / Latest Affiliates */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <Tabs defaultValue="commissions">
          <CardHeader className="pb-0">
            <TabsList className="bg-transparent border-b border-slate-100 rounded-none p-0 h-auto gap-6">
              <TabsTrigger
                value="commissions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium"
              >
                Latest Commissions
              </TabsTrigger>
              <TabsTrigger
                value="affiliates"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium"
              >
                Latest Affiliates
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <TabsContent value="commissions" className="mt-0">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : !data?.latestCommissions?.length ? (
                <div className="py-12 text-center text-sm text-slate-500">No commissions yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Amount</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Created At</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.latestCommissions.map((c) => {
                        const badge = commissionStatusBadge[c.commission_status] ?? commissionStatusBadge.pending;
                        const leadName = (c as any).affiliate_leads?.full_name ?? "—";
                        return (
                          <TableRow key={c.id} className="border-slate-100 hover:bg-slate-50">
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${badge.className}`}>
                                {badge.label}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-right font-mono text-slate-900">
                              {fmt(Number(c.commission_amount))}
                            </TableCell>
                            <TableCell className="text-sm text-slate-500">
                              {format(new Date(c.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="text-sm text-slate-700 font-medium">{leadName}</TableCell>
                            <TableCell className="text-sm text-slate-500 capitalize">{c.commission_type}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="affiliates" className="mt-0">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : !data?.latestAffiliates?.length ? (
                <div className="py-12 text-center text-sm text-slate-500">No affiliates yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.latestAffiliates.map((a) => (
                        <TableRow
                          key={a.id}
                          className="border-slate-100 hover:bg-slate-50 cursor-pointer"
                          onClick={() => navigate(`/portal/admin/affiliate/${a.id}`)}
                        >
                          <TableCell className="font-medium text-sm text-slate-900">{a.full_name}</TableCell>
                          <TableCell className="text-sm text-slate-500">{a.email}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${affiliateStatusBadge[a.status] ?? affiliateStatusBadge.pending}`}>
                              {a.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-500">
                            {format(new Date(a.created_at), "MMM d, yyyy")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
