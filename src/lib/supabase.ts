import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
	// If env vars are missing, create a lightweight stub to avoid runtime crashes during import.
	// The app should still work for local UI development without auth.
	// eslint-disable-next-line no-console
	console.warn('Supabase env vars missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');

	// Minimal stub implementing the auth surface used in the app.
	// Methods return safe defaults/promises so consumers don't throw.
	supabase = {
		auth: {
			getSession: async () => ({ data: { session: null } }),
			onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
			signInWithOAuth: async () => ({ error: null }),
			signOut: async () => ({ error: null }),
		},
	} as const;
} else {
	supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
