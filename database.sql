-- Create users table extension
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  roasts_used INTEGER DEFAULT 0,
  roasts_limit INTEGER DEFAULT 3,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roasts table
CREATE TABLE IF NOT EXISTS public.roasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  roast_result JSONB NOT NULL,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roasts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Roasts policies
CREATE POLICY "Users can view own roasts"
  ON public.roasts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roasts"
  ON public.roasts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS roasts_user_id_idx ON public.roasts(user_id);
CREATE INDEX IF NOT EXISTS roasts_created_at_idx ON public.roasts(created_at DESC);
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_id_idx ON public.profiles(stripe_customer_id);
