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
    
    // Add timeout to prevent infinite loading
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error("Affiliate fetch timeout")), 10000)
    );
    
    const fetchPromise = supabase
      .from("affiliates")
      .select("id, affiliate_id, full_name, email, phone, company_name, website, status")
      .eq("user_id", userId)
      .maybeSingle();
    
    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (error) {
      console.error("Supabase error fetching affiliate:", error);
      throw error;
    }
    
    console.log("Affiliate data:", data);
    return data as Affiliate | null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (cancelled) return;
        const user = session?.user ?? null;

        // Set user immediately so AuthGuard can pass, fetch affiliate in background
        setState((prev) => ({ ...prev, user, session, loading: false }));

        // Fetch affiliate data in background (non-blocking)
        if (user) {
          fetchAffiliate(user.id).then((affiliate) => {
            if (!cancelled) {
              setState((prev) => ({ ...prev, affiliate }));
            }
          }).catch((err) => {
            console.error("Failed to fetch affiliate:", err);
          });
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      const user = session?.user ?? null;

      // Set user immediately so AuthGuard can pass
      setState((prev) => ({ ...prev, user, session, loading: false }));

      // Fetch affiliate data in background (non-blocking)
      if (user) {
        fetchAffiliate(user.id).then((affiliate) => {
          if (!cancelled) {
            setState((prev) => ({ ...prev, affiliate }));
          }
        }).catch((err) => {
          console.error("Failed to fetch affiliate:", err);
        });
      }
    });

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
