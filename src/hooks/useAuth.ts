import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { SignUpInput, SignInInput } from '@/lib/auth-schemas';

// Modo de desenvolvimento local
const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;
const isDevelopmentMode = !envUrl || !envKey || envUrl === 'https://placeholder.supabase.co' || envKey === 'placeholder-key';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDevelopmentMode) {
      // Modo local: verifica localStorage
      const localUser = localStorage.getItem('dev_user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        setUser(userData as unknown as User);
        setSession({ user: userData } as unknown as Session);
      }
      setLoading(false);
      return;
    }

    // Modo produção com Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password, name }: SignUpInput) => {
    if (isDevelopmentMode) {
      // Modo local: simula cadastro
      const mockUser = {
        id: crypto.randomUUID(),
        email,
        user_metadata: { name: name || email.split('@')[0] },
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('dev_user', JSON.stringify(mockUser));
      setUser(mockUser as unknown as User);
      setSession({ user: mockUser } as unknown as Session);
      return { data: { user: mockUser as unknown as User, session: { user: mockUser } as unknown as Session }, error: null };
    }

    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name || email.split('@')[0],
        },
      },
    });
    
    return { data, error };
  };

  const signIn = async ({ email, password }: SignInInput) => {
    if (isDevelopmentMode) {
      // Modo local: simula login
      const mockUser = {
        id: crypto.randomUUID(),
        email,
        user_metadata: { name: email.split('@')[0] },
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('dev_user', JSON.stringify(mockUser));
      setUser(mockUser as unknown as User);
      setSession({ user: mockUser } as unknown as Session);
      return { data: { user: mockUser as unknown as User, session: { user: mockUser } as unknown as Session }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  };

  const signOut = async () => {
    if (isDevelopmentMode) {
      // Modo local: limpa localStorage
      localStorage.removeItem('dev_user');
      setUser(null);
      setSession(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const checkIsAdmin = async (userId: string): Promise<boolean> => {
    if (isDevelopmentMode) {
      // Modo local: usuário admin@sistema.com é admin
      const localUser = localStorage.getItem('dev_user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        return userData.email === 'admin@sistema.com';
      }
      return false;
    }

    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();
    
    return !!data;
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    checkIsAdmin,
  };
}
