import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Lead } from "@/types/leads";

export function useAffiliateLeads() {
  const { affiliate } = useAuth();

  const {
    data: leads = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Lead[]>({
    queryKey: ["affiliate-leads", affiliate?.id],
    enabled: !!affiliate,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliate_leads")
        .select("*")
        .eq("affiliate_id", affiliate!.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  return { leads, isLoading, error, refetch };
}
