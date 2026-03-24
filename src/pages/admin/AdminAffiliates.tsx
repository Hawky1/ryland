import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Percent,
  UserCheck,
  Mail,
  Phone
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Affiliate {
  id: string;
  user_id: string;
  affiliate_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  status: 'pending' | 'approved' | 'suspended';
  commission_rate: number;
  created_at: string;
  total_leads: number;
  total_earnings: number;
}

export default function AdminAffiliates() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [commissionRate, setCommissionRate] = useState(10);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      setLoading(true);
      
      // Get affiliates with aggregated data
      const { data: affiliatesData, error } = await supabase
        .from('affiliates')
        .select(`
          id,
          user_id,
          affiliate_id,
          full_name,
          email,
          phone,
          company_name,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get leads count and earnings for each affiliate
      const affiliatesWithStats = await Promise.all(
        (affiliatesData || []).map(async (affiliate) => {
          const { count: leadsCount } = await supabase
            .from('affiliate_leads')
            .select('*', { count: 'exact', head: true })
            .eq('affiliate_id', affiliate.id);

          const { data: commissions } = await supabase
            .from('commissions')
            .select('commission_amount')
            .eq('affiliate_id', affiliate.id)
            .eq('commission_status', 'paid');

          const totalEarnings = commissions?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0;

          // Get commission rate from user metadata or default to 10%
          const { data: userData } = await supabase.auth.admin.getUserById(affiliate.user_id);
          const rate = userData?.user?.user_metadata?.commission_rate || 10;

          return {
            ...affiliate,
            total_leads: leadsCount || 0,
            total_earnings: totalEarnings,
            commission_rate: rate,
          };
        })
      );

      setAffiliates(affiliatesWithStats);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      toast.error('Failed to load affiliates');
    } finally {
      setLoading(false);
    }
  };

  const updateAffiliateStatus = async (affiliateId: string, newStatus: 'approved' | 'suspended') => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ status: newStatus })
        .eq('id', affiliateId);

      if (error) throw error;

      setAffiliates(prev => prev.map(a => 
        a.id === affiliateId ? { ...a, status: newStatus } : a
      ));

      toast.success(`Affiliate ${newStatus === 'approved' ? 'approved' : 'suspended'} successfully`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const updateCommissionRate = async (affiliate: Affiliate, rate: number) => {
    try {
      // Update user metadata with commission rate
      const { error } = await supabase.auth.admin.updateUserById(
        affiliate.user_id,
        { user_metadata: { commission_rate: rate } }
      );

      if (error) throw error;

      setAffiliates(prev => prev.map(a => 
        a.id === affiliate.id ? { ...a, commission_rate: rate } : a
      ));

      toast.success(`Commission rate updated to ${rate}%`);
      setSelectedAffiliate(null);
    } catch (error) {
      console.error('Error updating commission rate:', error);
      toast.error('Failed to update commission rate');
    }
  };

  const filteredAffiliates = affiliates.filter(affiliate =>
    affiliate.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    affiliate.affiliate_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" /> Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Affiliate Management</h1>
          <p className="text-slate-500 mt-1">Manage affiliates, approve applications, and set commission rates</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="h-4 w-4" />
          <span>{affiliates.length} total affiliates</span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Affiliates</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search affiliates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
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
                    <TableHead>Affiliate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAffiliates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        No affiliates found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAffiliates.map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
                              {affiliate.full_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{affiliate.full_name}</p>
                              <p className="text-xs text-slate-500">{affiliate.affiliate_id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Percent className="h-3 w-3 text-slate-400" />
                            <span className="font-medium">{affiliate.commission_rate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{affiliate.total_leads}</TableCell>
                        <TableCell className="font-medium text-slate-900">
                          ${affiliate.total_earnings.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-slate-500">
                          {new Date(affiliate.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedAffiliate(affiliate);
                                  setCommissionRate(affiliate.commission_rate);
                                }}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Affiliate Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3 pb-4 border-b">
                                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-semibold text-white">
                                    {affiliate.full_name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-900">{affiliate.full_name}</p>
                                    <p className="text-sm text-slate-500">{affiliate.email}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-slate-500">Phone</p>
                                    <p className="font-medium flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {affiliate.phone || 'N/A'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Company</p>
                                    <p className="font-medium">{affiliate.company_name || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Referral ID</p>
                                    <p className="font-medium">{affiliate.affiliate_id}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Status</p>
                                    <p className="font-medium">{getStatusBadge(affiliate.status)}</p>
                                  </div>
                                </div>

                                <div className="pt-4 border-t">
                                  <label className="text-sm font-medium text-slate-700">
                                    Commission Rate (%)
                                  </label>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Input
                                      type="number"
                                      min={1}
                                      max={100}
                                      value={commissionRate}
                                      onChange={(e) => setCommissionRate(Number(e.target.value))}
                                      className="w-24"
                                    />
                                    <Button 
                                      onClick={() => updateCommissionRate(affiliate, commissionRate)}
                                      size="sm"
                                    >
                                      Update Rate
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                  {affiliate.status === 'pending' && (
                                    <Button 
                                      className="flex-1 bg-green-600 hover:bg-green-700"
                                      onClick={() => updateAffiliateStatus(affiliate.id, 'approved')}
                                    >
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                  )}
                                  {affiliate.status === 'approved' && (
                                    <Button 
                                      variant="destructive"
                                      className="flex-1"
                                      onClick={() => updateAffiliateStatus(affiliate.id, 'suspended')}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Suspend
                                    </Button>
                                  )}
                                  {affiliate.status === 'suspended' && (
                                    <Button 
                                      className="flex-1"
                                      onClick={() => updateAffiliateStatus(affiliate.id, 'approved')}
                                    >
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Reactivate
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
