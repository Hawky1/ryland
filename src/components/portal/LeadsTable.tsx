import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import type { Lead } from "@/types/leads";
import { stageColors, statusColors } from "@/types/leads";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onSelectLead: (lead: Lead) => void;
}

export default function LeadsTable({ leads, isLoading, onSelectLead }: LeadsTableProps) {
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
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted/60">
          <Users className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No leads yet</p>
        <p className="text-xs text-muted-foreground mt-1.5 max-w-[260px] mx-auto">
          Share your referral link to start tracking leads and commissions here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Referred</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Deal</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Next Appt</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Next Step</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className="cursor-pointer border-border/30 transition-colors hover:bg-accent/50"
            >
              <TableCell className="font-medium text-sm text-foreground">{lead.full_name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{formatDateTime(lead.referred_at)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[lead.status ?? ""] ?? "bg-muted text-muted-foreground border-border"}`}>
                  {lead.status ?? "—"}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${stageColors[lead.pipeline_stage ?? ""] ?? "bg-muted text-muted-foreground border-border"}`}>
                  {lead.pipeline_stage ?? "—"}
                </span>
              </TableCell>
              <TableCell className="text-sm text-right font-mono text-foreground">
                {formatCurrency(lead.deal_amount)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                {formatDateTime(lead.next_appointment_at)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hidden lg:table-cell max-w-[160px] truncate">
                {lead.next_step ?? "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                {formatDateTime(lead.updated_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
