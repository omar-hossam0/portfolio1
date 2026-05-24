import { useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
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
        const sess = (resp as any)?.data?.session ?? null;
        setSession(sess);
        setUser(sess?.user ?? null);
      } catch (err) {
        // Log but don't let auth errors crash the app
        // eslint-disable-next-line no-console
        console.warn('useAuth: getSession failed', err);
      } finally {
        if (mounted) setLoading(false);
      }

      try {
        const { data } = supabase.auth.onAuthStateChange((_event, sess) => {
          if (!mounted) return;
          setSession(sess as Session | null);
          setUser((sess as Session | null)?.user ?? null);
        });

        unsubscribeFn = () => data?.subscription?.unsubscribe();
      } catch (err) {
        // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.warn('useAuth: signInWithGoogle failed', err);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('useAuth: signOut failed', err);
    }
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signInWithGoogle, signOut };
}
