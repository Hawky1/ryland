import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UserCheck, 
  Search, 
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Lead {
  id: string;
  affiliate_id: string;
  ghl_contact_id: string | null;
  ghl_opportunity_id: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  status: string;
  pipeline_stage: string;
  deal_amount: number | null;
  notes: string | null;
  referred_at: string;
  created_at: string;
  affiliate: {
    full_name: string;
    affiliate_id: string;
  } | null;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalValue: 0,
    avgDealSize: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('affiliate_leads')
        .select(`
          id,
          affiliate_id,
          ghl_contact_id,
          ghl_opportunity_id,
          full_name,
          email,
          phone,
          status,
          pipeline_stage,
          deal_amount,
          notes,
          referred_at,
          created_at,
          affiliates(full_name, affiliate_id)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      interface RawLead {
        id: string;
        affiliate_id: string;
        ghl_contact_id: string | null;
        ghl_opportunity_id: string | null;
        full_name: string;
        email: string | null;
        phone: string | null;
        status: string;
        pipeline_stage: string;
        deal_amount: number | null;
        notes: string | null;
        referred_at: string;
        created_at: string;
        affiliates: { full_name: string; affiliate_id: string } | null;
      }

      const transformedData: Lead[] = (data || []).map((item: RawLead) => ({
        id: item.id,
        affiliate_id: item.affiliate_id,
        ghl_contact_id: item.ghl_contact_id,
        ghl_opportunity_id: item.ghl_opportunity_id,
        full_name: item.full_name,
        email: item.email,
        phone: item.phone,
        status: item.status,
        pipeline_stage: item.pipeline_stage,
        deal_amount: item.deal_amount,
        notes: item.notes,
        referred_at: item.referred_at,
        created_at: item.created_at,
        affiliate: item.affiliates,
      }));

      setLeads(transformedData);

      // Calculate stats
      const totalValue = transformedData.reduce((sum, l) => sum + (l.deal_amount || 0), 0);
      const dealsWithValue = transformedData.filter(l => l.deal_amount && l.deal_amount > 0).length;
      
      setStats({
        totalLeads: transformedData.length,
        totalValue,
        avgDealSize: dealsWithValue > 0 ? totalValue / dealsWithValue : 0,
        conversionRate: transformedData.length > 0 
          ? (transformedData.filter(l => l.status === 'Closed Won').length / transformedData.length) * 100 
          : 0,
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'New Lead': 'bg-blue-100 text-blue-700',
      'Contacted': 'bg-yellow-100 text-yellow-700',
      'Qualified': 'bg-purple-100 text-purple-700',
      'Proposal': 'bg-orange-100 text-orange-700',
      'Closed Won': 'bg-green-100 text-green-700',
      'Closed Lost': 'bg-red-100 text-red-700',
    };
    return <Badge className={statusColors[status] || 'bg-slate-100 text-slate-700'}>{status}</Badge>;
  };

  const filteredLeads = leads.filter(lead =>
    lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.affiliate?.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
          <p className="text-slate-500 mt-1">View and track all leads referred by affiliates</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Leads</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalLeads}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-slate-900">${stats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Avg Deal Size</p>
                <p className="text-2xl font-bold text-slate-900">${stats.avgDealSize.toFixed(0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">{stats.conversionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Leads</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="New Lead">New Lead</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Deal Amount</TableHead>
                    <TableHead>Referred</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        No leads found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
                              {lead.full_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{lead.full_name}</p>
                              {lead.notes && (
                                <p className="text-xs text-slate-500 truncate max-w-xs">{lead.notes}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">
                              {lead.affiliate?.full_name || 'Unknown'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {lead.affiliate?.affiliate_id}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-slate-600">{lead.pipeline_stage}</span>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {lead.deal_amount ? `$${lead.deal_amount.toLocaleString()}` : '-'}
                        </TableCell>
                        <TableCell className="text-slate-500">
                          {format(new Date(lead.referred_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {lead.email && (
                              <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-800">
                                <Mail className="h-4 w-4" />
                              </a>
                            )}
                            {lead.phone && (
                              <a href={`tel:${lead.phone}`} className="text-green-600 hover:text-green-800">
                                <Phone className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
