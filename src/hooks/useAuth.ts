import { useEffect, useState } from 'react';
import type { AuthChangeEvent, User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribeFn: (() => void) | undefined;

    (async () => {
      try {
        const resp = await supabase.auth.getSession();
        if (!mounted) return;
        const sess = resp.data.session ?? null;
        setSession(sess);
        setUser(sess?.user ?? null);
      } catch (err) {
        console.warn('useAuth: getSession failed', err);
      } finally {
        if (mounted) setLoading(false);
      }

      try {
        const { data } = supabase.auth.onAuthStateChange((
          _event: AuthChangeEvent,
          sess: Session | null,
        ) => {
          if (!mounted) return;
          setSession(sess as Session | null);
          setUser((sess as Session | null)?.user ?? null);
        });

        unsubscribeFn = () => data?.subscription?.unsubscribe();
      } catch (err) {
        console.warn('useAuth: onAuthStateChange failed', err);
      }
    })();

    return () => {
      mounted = false;
      try {
        unsubscribeFn?.();
      } catch {
        // ignore
      }
    };
  }, []);

  const signInWithGoogle = () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
    } catch (err) {
      console.warn('useAuth: signInWithGoogle failed', err);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('useAuth: signOut failed', err);
    }
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signInWithGoogle, signOut };
}
