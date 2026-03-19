import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, CheckCircle } from "lucide-react";
import type { Lead } from "@/types/leads";
import { formatDateTime } from "@/utils/formatters";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onSelectLead: (lead: Lead) => void;
  adminMode?: boolean;
}

const stageBadge: Record<string, string> = {
  "New Lead": "bg-blue-50 text-blue-700 border-blue-200",
  "Contacted": "bg-sky-50 text-sky-700 border-sky-200",
  "Credit Optimization": "bg-violet-50 text-violet-700 border-violet-200",
  "Funding": "bg-amber-50 text-amber-700 border-amber-200",
  "Approved": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Funded": "bg-green-50 text-green-700 border-green-200",
  "Closed Lost": "bg-red-50 text-red-700 border-red-200",
};

const invoiceStatusBadge: Record<string, string> = {
  "Paid": "bg-green-50 text-green-700 border-green-200",
  "Sent": "bg-amber-50 text-amber-700 border-amber-200",
  "Pending": "bg-slate-50 text-slate-600 border-slate-200",
};

export default function LeadsTable({ leads, isLoading, onSelectLead, adminMode }: LeadsTableProps) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Users className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900">No leads yet</p>
        <p className="text-xs text-slate-500 mt-1.5 max-w-[260px] mx-auto">
          Submit your first lead or share your referral link to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</TableHead>
            <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</TableHead>
            <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</TableHead>
            <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Invoice</TableHead>
            <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Referred</TableHead>
            <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Next Step</TableHead>
            {adminMode && <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const stageClass = stageBadge[lead.pipeline_stage ?? ""] ?? "bg-slate-50 text-slate-600 border-slate-200";
            const invoiceStatus = lead.commission_status ?? "Pending";
            const invoiceClass = invoiceStatusBadge[invoiceStatus] ?? invoiceStatusBadge.Pending;

            return (
              <TableRow
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="cursor-pointer border-slate-100 transition-colors hover:bg-slate-50"
              >
                <TableCell className="font-medium text-sm text-slate-900">{lead.full_name}</TableCell>
                <TableCell className="text-sm text-slate-500">{lead.email ?? "—"}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${stageClass}`}>
                    {lead.pipeline_stage ?? "—"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${invoiceClass}`}>
                    {invoiceStatus}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-slate-500">{formatDateTime(lead.referred_at)}</TableCell>
                <TableCell className="text-sm text-slate-500 hidden lg:table-cell max-w-[160px] truncate">
                  {lead.next_step ?? "—"}
                </TableCell>
                {adminMode && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {invoiceStatus === "Paid" ? (
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
