import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const statusBadge: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  suspended: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminAffiliates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: affiliates = [], isLoading } = useQuery({
    queryKey: ["admin-affiliates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = affiliates.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.full_name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.affiliate_id.toLowerCase().includes(q) ||
      (a.company_name ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Affiliates</h1>
        <p className="text-sm text-slate-500 mt-1">Manage all partners from one place.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by name, email, or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-400" />
            Partners
            <Badge variant="secondary" className="ml-2 font-normal bg-slate-100 text-slate-600">
              {filtered.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : !filtered.length ? (
            <div className="py-16 text-center">
              <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-900 font-medium">No affiliates found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Affiliate ID</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Company</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => (
                    <TableRow
                      key={a.id}
                      onClick={() => navigate(`/portal/admin/affiliate/${a.id}`)}
                      className="cursor-pointer border-slate-100 transition-colors hover:bg-slate-50"
                    >
                      <TableCell className="font-medium text-sm text-slate-900">{a.full_name}</TableCell>
                      <TableCell className="text-sm font-mono text-slate-500">{a.affiliate_id}</TableCell>
                      <TableCell className="text-sm text-slate-500">{a.email}</TableCell>
                      <TableCell className="text-sm text-slate-500">{a.company_name ?? "—"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge[a.status] ?? statusBadge.pending}`}>
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
      </Card>
    </div>
  );
}
