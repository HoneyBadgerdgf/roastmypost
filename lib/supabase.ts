import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};

// For backwards compatibility
export const supabase = {
  get auth() { return getSupabase().auth; },
  get from() { return getSupabase().from.bind(getSupabase()); },
};

// Database schema types
export interface User {
  id: string;
  email: string;
  subscription_tier: 'free' | 'pro';
  roasts_used: number;
  roasts_limit: number;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Roast {
  id: string;
  user_id: string;
  content: string;
  roast_result: any;
  score: number;
  created_at: string;
}
