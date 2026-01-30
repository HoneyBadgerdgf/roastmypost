import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
