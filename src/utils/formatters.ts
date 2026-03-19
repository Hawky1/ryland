import { format } from "date-fns";
import { stageColors } from "@/types/leads";

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null || amount === 0) return "—";
  return `$${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDateTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  try {
    return format(new Date(dateStr), "MMM d, yyyy");
  } catch {
    return "—";
  }
}

export function formatDateTimeWithTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  try {
    return format(new Date(dateStr), "MMM d, yyyy h:mm a");
  } catch {
    return "—";
  }
}

export function getStatusBadgeClass(stage: string | null | undefined): string {
  if (!stage) return "bg-muted text-muted-foreground border-border";
  return stageColors[stage] ?? "bg-muted text-muted-foreground border-border";
}
