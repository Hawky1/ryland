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
    const { data } = await supabase
      .from("affiliates")
      .select("id, affiliate_id, full_name, email, phone, company_name, website, status")
      .eq("user_id", userId)
      .maybeSingle();
    return data as Affiliate | null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (cancelled) return;
        const user = session?.user ?? null;

        // Set user immediately so AuthGuard can pass, fetch affiliate in background
        setState((prev) => ({ ...prev, user, session, loading: !user ? false : prev.loading }));

        if (user) {
          try {
            const affiliate = await fetchAffiliate(user.id);
            if (!cancelled) {
              setState({ user, session, affiliate, loading: false });
            }
          } catch (err) {
            console.error("Failed to fetch affiliate:", err);
            if (!cancelled) {
              setState({ user, session, affiliate: null, loading: false });
            }
          }
        } else {
          setState({ user: null, session: null, affiliate: null, loading: false });
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      const user = session?.user ?? null;

      setState((prev) => ({ ...prev, user, session, loading: !user ? false : prev.loading }));

      if (user) {
        try {
          const affiliate = await fetchAffiliate(user.id);
          if (!cancelled) {
            setState({ user, session, affiliate, loading: false });
          }
        } catch (err) {
          console.error("Failed to fetch affiliate:", err);
          if (!cancelled) {
            setState({ user: null, session: null, affiliate: null, loading: false });
          }
        }
      } else {
        setState({ user: null, session: null, affiliate: null, loading: false });
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
