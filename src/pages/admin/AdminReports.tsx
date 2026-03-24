import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Users,
  DollarSign,
  Calendar
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

interface MonthlyStats {
  month: string;
  leads: number;
  commissions: number;
  affiliates: number;
}

export default function AdminReports() {
  const [timeRange, setTimeRange] = useState<string>('6');
  const [monthlyData, setMonthlyData] = useState<MonthlyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [topAffiliates, setTopAffiliates] = useState<any[]>([]);

  useEffect(() => {
    fetchReportData();
  }, [timeRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const months = parseInt(timeRange);
      const startDate = startOfMonth(subMonths(new Date(), months - 1));

      // Generate monthly stats
      const stats: MonthlyStats[] = [];
      for (let i = 0; i < months; i++) {
        const monthStart = startOfMonth(subMonths(new Date(), i));
        const monthEnd = endOfMonth(monthStart);
        const monthKey = format(monthStart, 'yyyy-MM');

        // Get leads for this month
        const { count: leadsCount } = await supabase
          .from('affiliate_leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthStart.toISOString())
          .lte('created_at', monthEnd.toISOString());

        // Get commissions for this month
        const { data: commissionsData } = await supabase
          .from('commissions')
          .select('commission_amount')
          .gte('created_at', monthStart.toISOString())
          .lte('created_at', monthEnd.toISOString());

        // Get new affiliates for this month
        const { count: affiliatesCount } = await supabase
          .from('affiliates')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthStart.toISOString())
          .lte('created_at', monthEnd.toISOString());

        stats.unshift({
          month: format(monthStart, 'MMM yyyy'),
          leads: leadsCount || 0,
          commissions: commissionsData?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0,
          affiliates: affiliatesCount || 0,
        });
      }
      setMonthlyData(stats);

      // Get top affiliates
      const { data: affiliatesData } = await supabase
        .from('affiliates')
        .select('id, full_name, email');

      if (affiliatesData) {
        const topPerformers = await Promise.all(
          affiliatesData.map(async (affiliate) => {
            const { count: leadsCount } = await supabase
              .from('affiliate_leads')
              .select('*', { count: 'exact', head: true })
              .eq('affiliate_id', affiliate.id);

            const { data: commissionsData } = await supabase
              .from('commissions')
              .select('commission_amount')
              .eq('affiliate_id', affiliate.id)
              .eq('commission_status', 'paid');

            const totalEarnings = commissionsData?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0;

            return {
              ...affiliate,
              leads: leadsCount || 0,
              earnings: totalEarnings,
            };
          })
        );

        setTopAffiliates(topPerformers.sort((a, b) => b.earnings - a.earnings).slice(0, 10));
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalLeads = monthlyData.reduce((sum, m) => sum + m.leads, 0);
  const totalCommissions = monthlyData.reduce((sum, m) => sum + m.commissions, 0);
  const totalNewAffiliates = monthlyData.reduce((sum, m) => sum + m.affiliates, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">Performance insights and affiliate program metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Leads</p>
                <p className="text-3xl font-bold text-slate-900">{totalLeads}</p>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Commissions</p>
                <p className="text-3xl font-bold text-slate-900">${totalCommissions.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">New Affiliates</p>
                <p className="text-3xl font-bold text-slate-900">{totalNewAffiliates}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monthly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="space-y-4">
              {monthlyData.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900">{month.month}</span>
                    <div className="flex gap-6 text-slate-600">
                      <span>{month.leads} leads</span>
                      <span>${month.commissions.toLocaleString()} commissions</span>
                      <span>{month.affiliates} new affiliates</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${Math.min((month.leads / Math.max(...monthlyData.map(m => m.leads))) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Affiliates */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Affiliates</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {topAffiliates.map((affiliate, index) => (
                <div 
                  key={affiliate.id} 
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{affiliate.full_name}</p>
                      <p className="text-xs text-slate-500">{affiliate.leads} leads referred</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${affiliate.earnings.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">earned</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
