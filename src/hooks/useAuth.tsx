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

    // Initialize auth state
    const initAuth = async () => {
      try {
        // Get initial session FIRST
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (cancelled) return;
        
        if (error) {
          console.error('getSession error:', error);
        }
        
        const user = session?.user ?? null;
        console.log('Initial session:', user ? `User ${user.id}` : 'No user');
        
        // Set user and loading state
        setState((prev) => ({ ...prev, user, session, loading: false }));
        
        // Fetch affiliate in background
        if (user) {
          fetchAffiliate(user.id).then((affiliate) => {
            if (!cancelled) {
              setState((prev) => ({ ...prev, affiliate }));
            }
          }).catch(() => {});
        }
      } catch (err) {
        console.error('Init auth failed:', err);
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    // Set up auth state change listener for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled) return;
        
        // Skip INITIAL_SESSION since we handle it above
        if (event === 'INITIAL_SESSION') {
          console.log('INITIAL_SESSION event (handled by getSession)');
          return;
        }
        
        console.log('Auth state changed:', event, session?.user?.id || 'no user');
        
        const user = session?.user ?? null;
        setState((prev) => ({ ...prev, user, session, loading: false }));

        if (user) {
          fetchAffiliate(user.id).then((affiliate) => {
            if (!cancelled) {
              setState((prev) => ({ ...prev, affiliate }));
            }
          }).catch(() => {});
        } else {
          setState((prev) => ({ ...prev, affiliate: null }));
        }
      }
    );

    // Run init
    initAuth();

    return () => {
      cancelled = true;
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
