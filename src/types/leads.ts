export interface Lead {
  id: string;
  affiliate_id: string;
  ghl_contact_id?: string | null;
  ghl_opportunity_id?: string | null;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  company_name?: string | null;
  status?: string | null;
  pipeline_stage?: string | null;
  deal_amount?: number | null;
  commission_amount?: number | null;
  commission_status?: string | null;
  assigned_rep?: string | null;
  next_appointment_at?: string | null;
  next_step?: string | null;
  latest_update?: string | null;
  notes?: string | null;
  referred_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const stageColors: Record<string, string> = {
  "New Lead": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Contacted": "bg-sky-500/15 text-sky-400 border-sky-500/20",
  "Credit Optimization": "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "Funding": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Approved": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Funded": "bg-green-500/15 text-green-400 border-green-500/20",
  "Closed Lost": "bg-red-500/15 text-red-400 border-red-500/20",
};

export const statusColors: Record<string, string> = {
  "New Lead": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Active": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "On Hold": "bg-orange-500/15 text-orange-400 border-orange-500/20",
  "Closed Won": "bg-green-500/15 text-green-400 border-green-500/20",
  "Closed Lost": "bg-red-500/15 text-red-400 border-red-500/20",
};
