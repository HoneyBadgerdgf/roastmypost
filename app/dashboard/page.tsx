'use client';

import { useEffect, useState } from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { Flame, LogOut, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    setUser(user);

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    setProfile(profile);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleUpgrade = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_REPLACE_WITH_ACTUAL_PRICE_ID', // TODO: Replace with actual Stripe Price ID
          userId: user.id,
          email: user.email,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Flame className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-white">RoastMyPost</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-white hover:text-orange-500 transition"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back!
            </h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">Subscription</h3>
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-white capitalize">
                {profile?.subscription_tier || 'Free'}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">Roasts Used</h3>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-3xl font-bold text-white">
                {profile?.roasts_used || 0} / {profile?.roasts_limit || 3}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">Avg Score</h3>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-white">--</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/roast"
              className="bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-xl font-bold text-xl text-center transition transform hover:scale-105"
            >
              🔥 Roast a New Post
            </Link>

            {profile?.subscription_tier === 'free' && (
              <button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-8 rounded-xl font-bold text-xl transition transform hover:scale-105"
              >
                ⚡ Upgrade to Pro - $9/mo
              </button>
            )}
          </div>

          {/* Recent Roasts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Roasts</h2>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 text-center">
              <p className="text-gray-400">No roasts yet. Time to get roasted!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
