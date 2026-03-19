import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Affiliate {
  id: string;
  affiliate_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  website: string | null;
  status: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  affiliate: Affiliate | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    affiliate: null,
    loading: true,
  });

  const fetchAffiliate = useCallback(async (userId: string) => {
    console.log("Fetching affiliate for user:", userId);
    
    try {
      // Remove timeout - let Supabase handle it, but add abort controller for cleanup
      const { data, error } = await supabase
        .from("affiliates")
        .select("id, affiliate_id, full_name, email, phone, company_name, website, status")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Supabase error fetching affiliate:", error.message, error.code, error.details);
        throw error;
      }
      
      console.log("Affiliate data found:", data ? "YES" : "NO", data?.affiliate_id);
      return data as Affiliate | null;
    } catch (err) {
      const errorMessage = (err as Error)?.message || String(err);
      // Ignore abort errors from component unmounting
      if (errorMessage.includes('aborted') || errorMessage.includes('AbortError')) {
        console.log('Affiliate fetch aborted (component unmounted or refreshed)');
        return null;
      }
      console.error("Fetch affiliate exception:", errorMessage);
      // Return null instead of throwing - allows portal to work without affiliate data
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let initialSessionLoaded = false;

    // Single source of truth: onAuthStateChange handles both initial and subsequent auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled) return;
        
        console.log('Auth state changed:', event, session?.user?.id || 'no user');
        
        const user = session?.user ?? null;

        // Set loading to false and update user/session
        setState((prev) => ({ ...prev, user, session, loading: false }));
        initialSessionLoaded = true;

        // Fetch affiliate data in background (non-blocking)
        if (user) {
          fetchAffiliate(user.id).then((affiliate) => {
            if (!cancelled) {
              setState((prev) => ({ ...prev, affiliate }));
            }
          }).catch((err) => {
            console.error("Failed to fetch affiliate:", err);
          });
        } else {
          // Clear affiliate if user logs out
          setState((prev) => ({ ...prev, affiliate: null }));
        }
      }
    );

    // Fallback: If onAuthStateChange doesn't fire within 3 seconds, check manually
    const fallbackTimeout = setTimeout(async () => {
      if (!initialSessionLoaded && !cancelled) {
        console.log('Fallback: checking session manually');
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!cancelled && !initialSessionLoaded) {
            const user = session?.user ?? null;
            console.log('Fallback session check:', user ? 'User found' : 'No user');
            setState((prev) => ({ ...prev, user, session, loading: false }));
            
            if (user) {
              const affiliate = await fetchAffiliate(user.id);
              if (!cancelled) {
                setState((prev) => ({ ...prev, affiliate }));
              }
            }
          }
        } catch (err) {
          console.error('Fallback session check failed:', err);
          if (!cancelled) {
            setState((prev) => ({ ...prev, loading: false }));
          }
        }
      }
    }, 3000);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimeout);
      subscription.unsubscribe();
    };
  }, [fetchAffiliate]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ user: null, session: null, affiliate: null, loading: false });
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error };
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
