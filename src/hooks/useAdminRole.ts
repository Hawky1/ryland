import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useAdminRole() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    // No user - reset state
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      checkedUserIdRef.current = null;
      return;
    }

    // Already checked for this user - skip RPC call
    if (checkedUserIdRef.current === user.id) {
      return;
    }

    // First, check user_metadata for quick local check (no RPC needed)
    const metadataRole = user.user_metadata?.role || user.app_metadata?.role;
    if (metadataRole === 'admin') {
      setIsAdmin(true);
      setIsLoading(false);
      checkedUserIdRef.current = user.id;
      return;
    }

    // Fallback to RPC check for role in user_roles table
    const checkRole = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });

        if (!error && data) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      }
      setIsLoading(false);
      checkedUserIdRef.current = user.id;
    };

    checkRole();
  }, [user?.id]); // Only re-run when user.id changes, not user object reference

  return { isAdmin, isLoading };
}
