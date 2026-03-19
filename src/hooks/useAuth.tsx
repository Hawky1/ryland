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

    // Try to restore session from localStorage synchronously first
    const restoreSessionFromStorage = () => {
      try {
        // Supabase stores auth in localStorage with key pattern: sb-<project-ref>-auth-token
        const storageKey = Object.keys(localStorage).find(key => 
          key.startsWith('sb-') && key.endsWith('-auth-token')
        );
        
        if (storageKey) {
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.user && parsed?.access_token) {
              console.log('Restored session from localStorage:', parsed.user.id);
              return { user: parsed.user, session: parsed };
            }
          }
        }
      } catch (e) {
        console.error('Failed to restore from localStorage:', e);
      }
      return null;
    };

    // Immediately try to restore from localStorage (synchronous - can't be aborted)
    const restored = restoreSessionFromStorage();
    if (restored) {
      setState((prev) => ({ 
        ...prev, 
        user: restored.user, 
        session: restored.session as Session, 
        loading: false 
      }));
      
      // Fetch affiliate in background
      if (restored.user) {
        fetchAffiliate(restored.user.id).then((affiliate) => {
          if (!cancelled) {
            setState((prev) => ({ ...prev, affiliate }));
          }
        }).catch(() => {});
      }
    } else {
      // No stored session - set loading to false
      console.log('No session in localStorage');
      setState((prev) => ({ ...prev, loading: false }));
    }

    // Set up auth state change listener for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled) return;
        
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
    // Clear localStorage FIRST (instant)
    try {
      const storageKey = Object.keys(localStorage).find(key => 
        key.startsWith('sb-') && key.endsWith('-auth-token')
      );
      if (storageKey) {
        localStorage.removeItem(storageKey);
      }
    } catch (e) {
      // Ignore
    }
    
    // Clear state immediately
    setState({ user: null, session: null, affiliate: null, loading: false });
    
    // Redirect immediately (don't wait for Supabase)
    window.location.href = '/portal/login';
    
    // Call Supabase signOut in background (fire and forget)
    supabase.auth.signOut().catch(() => {});
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
