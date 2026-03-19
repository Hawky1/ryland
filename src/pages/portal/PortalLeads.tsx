import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useAffiliateLeads } from "@/hooks/useAffiliateLeads";
import LeadsTable from "@/components/portal/LeadsTable";
import LeadDetailDrawer from "@/components/portal/LeadDetailDrawer";
import type { Lead } from "@/types/leads";

export default function PortalLeads() {
  const { leads, isLoading } = useAffiliateLeads();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
            {leads.length > 0 && (
              <Badge variant="secondary" className="ml-2 font-normal">{leads.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <LeadsTable leads={leads} isLoading={isLoading} onSelectLead={setSelectedLead} />
        </CardContent>
      </Card>

      <LeadDetailDrawer
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
