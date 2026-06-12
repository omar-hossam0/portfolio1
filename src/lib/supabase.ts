import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

const supabaseStub = {
	auth: {
		getSession: async () => ({ data: { session: null } }),
		onAuthStateChange: () => ({
			data: { subscription: { unsubscribe: () => undefined } },
		}),
		signInWithOAuth: async () => ({ error: null }),
		signOut: async () => ({ error: null }),
	},
};

if (!supabaseUrl || !supabaseAnonKey) {
	// If env vars are missing, create a lightweight stub to avoid runtime crashes during import.
	// The app should still work for local UI development without auth.
	console.warn('Supabase env vars missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

const supabase = supabaseUrl && supabaseAnonKey
	? createClient(supabaseUrl, supabaseAnonKey)
	: supabaseStub;

export { supabase };
