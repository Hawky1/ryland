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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  DollarSign,
  Calendar,
  Search,
  Download
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";

interface Payout {
  id: string;
  affiliate_id: string;
  amount: number;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  payment_method: string | null;
  payout_period: string | null;
  created_at: string;
  updated_at: string;
  affiliate: {
    full_name: string;
    email: string;
    payment_email: string | null;
  } | null;
}

interface AffiliatePayoutSummary {
  affiliate_id: string;
  affiliate_name: string;
  affiliate_email: string;
  payment_email: string | null;
  pending_amount: number;
  approved_amount: number;
  total_commissions: number;
}

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [summaries, setSummaries] = useState<AffiliatePayoutSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  useEffect(() => {
    fetchPayouts();
    fetchPayoutSummaries();
  }, []);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('payouts')
        .select(`
          id,
          affiliate_id,
          amount,
          status,
          payment_method,
          payout_period,
          created_at,
          updated_at,
          affiliates(full_name, email, payment_email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      interface RawPayout {
        id: string;
        affiliate_id: string;
        amount: number;
        status: 'pending' | 'processing' | 'paid' | 'failed';
        payment_method: string | null;
        payout_period: string | null;
        created_at: string;
        updated_at: string;
        affiliates: { full_name: string; email: string; payment_email: string | null } | null;
      }

      const transformedData: Payout[] = (data || []).map((item: RawPayout) => ({
        id: item.id,
        affiliate_id: item.affiliate_id,
        amount: item.amount,
        status: item.status,
        payment_method: item.payment_method,
        payout_period: item.payout_period,
        created_at: item.created_at,
        updated_at: item.updated_at,
        affiliate: item.affiliates,
      }));

      setPayouts(transformedData);
    } catch (error) {
      console.error('Error fetching payouts:', error);
      toast.error('Failed to load payouts');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayoutSummaries = async () => {
    try {
      // Get all affiliates with their commission totals
      const { data: affiliatesData } = await supabase
        .from('affiliates')
        .select('id, full_name, email, payment_email');

      if (!affiliatesData) return;

      const summaries: AffiliatePayoutSummary[] = await Promise.all(
        affiliatesData.map(async (affiliate) => {
          // Get pending commissions
          const { data: pendingData } = await supabase
            .from('commissions')
            .select('commission_amount')
            .eq('affiliate_id', affiliate.id)
            .eq('commission_status', 'pending');

          // Get approved commissions
          const { data: approvedData } = await supabase
            .from('commissions')
            .select('commission_amount')
            .eq('affiliate_id', affiliate.id)
            .eq('commission_status', 'approved');

          const pendingAmount = pendingData?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0;
          const approvedAmount = approvedData?.reduce((sum, c) => sum + (c.commission_amount || 0), 0) || 0;

          return {
            affiliate_id: affiliate.id,
            affiliate_name: affiliate.full_name,
            affiliate_email: affiliate.email,
            payment_email: affiliate.payment_email,
            pending_amount: pendingAmount,
            approved_amount: approvedAmount,
            total_commissions: (pendingData?.length || 0) + (approvedData?.length || 0),
          };
        })
      );

      // Filter to only show affiliates with pending/approved amounts
      setSummaries(summaries.filter(s => s.pending_amount > 0 || s.approved_amount > 0));
    } catch (error) {
      console.error('Error fetching summaries:', error);
    }
  };

  const createPayout = async (affiliateId: string, amount: number) => {
    try {
      const { error } = await supabase
        .from('payouts')
        .insert({
          affiliate_id: affiliateId,
          amount,
          status: 'pending',
          payout_period: format(new Date(), 'yyyy-MM'),
        });

      if (error) throw error;

      // Update commissions to processing
      await supabase
        .from('commissions')
        .update({ commission_status: 'paid', payout_date: new Date().toISOString() })
        .eq('affiliate_id', affiliateId)
        .in('commission_status', ['pending', 'approved']);

      toast.success('Payout created successfully');
      fetchPayouts();
      fetchPayoutSummaries();
    } catch (error) {
      console.error('Error creating payout:', error);
      toast.error('Failed to create payout');
    }
  };

  const updatePayoutStatus = async (payoutId: string, status: 'processing' | 'paid' | 'failed') => {
    try {
      const { error } = await supabase
        .from('payouts')
        .update({ status })
        .eq('id', payoutId);

      if (error) throw error;

      setPayouts(prev => prev.map(p => 
        p.id === payoutId ? { ...p, status } : p
      ));

      toast.success(`Payout marked as ${status}`);
    } catch (error) {
      console.error('Error updating payout:', error);
      toast.error('Failed to update payout');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="h-3 w-3 mr-1" /> Paid</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" /> Processing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700"><AlertCircle className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700"><AlertCircle className="h-3 w-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalPendingPayouts = summaries.reduce((sum, s) => sum + s.pending_amount + s.approved_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payout Management</h1>
          <p className="text-slate-500 mt-1">Process affiliate payouts and track payment history</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-500">Total Pending</p>
            <p className="text-xl font-bold text-slate-900">${totalPendingPayouts.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Payouts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Upcoming Payouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {summaries.length === 0 ? (
            <p className="text-center py-8 text-slate-500">No pending payouts</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affiliate</TableHead>
                    <TableHead>Payment Email</TableHead>
                    <TableHead>Pending Amount</TableHead>
                    <TableHead>Approved Amount</TableHead>
                    <TableHead>Commissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaries.map((summary) => (
                    <TableRow key={summary.affiliate_id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{summary.affiliate_name}</p>
                          <p className="text-xs text-slate-500">{summary.affiliate_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {summary.payment_email || (
                          <span className="text-yellow-600 text-sm">Not set</span>
                        )}
                      </TableCell>
                      <TableCell className="text-yellow-600 font-medium">
                        ${summary.pending_amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-blue-600 font-medium">
                        ${summary.approved_amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{summary.total_commissions}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => createPayout(
                            summary.affiliate_id, 
                            summary.pending_amount + summary.approved_amount
                          )}
                          disabled={summary.pending_amount + summary.approved_amount === 0}
                        >
                          Process Payout
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Payout History</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search payouts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
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
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        No payout history
                      </TableCell>
                    </TableRow>
                  ) : (
                    payouts
                      .filter(p => 
                        p.affiliate?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.affiliate?.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">
                              {payout.affiliate?.full_name || 'Unknown'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {payout.affiliate?.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-slate-900">
                          ${payout.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(payout.status)}</TableCell>
                        <TableCell>{payout.payout_period || '-'}</TableCell>
                        <TableCell>{payout.payment_method || 'Bank Transfer'}</TableCell>
                        <TableCell className="text-slate-500">
                          {format(new Date(payout.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          {payout.status === 'pending' && (
                            <div className="flex gap-2 justify-end">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updatePayoutStatus(payout.id, 'processing')}
                              >
                                Process
                              </Button>
                            </div>
                          )}
                          {payout.status === 'processing' && (
                            <div className="flex gap-2 justify-end">
                              <Button 
                                size="sm"
                                onClick={() => updatePayoutStatus(payout.id, 'paid')}
                              >
                                Mark Paid
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => updatePayoutStatus(payout.id, 'failed')}
                              >
                                Failed
                              </Button>
                            </div>
                          )}
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
