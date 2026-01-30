'use client';

import { useState } from 'react';
import { Flame, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-orange-500 transition">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Flame className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-white">RoastMyPost</span>
        </div>
        <div className="w-20" /> {/* Spacer for centering */}
      </nav>

      {/* Login Form */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400 mb-8">
              {isSignUp 
                ? 'Sign up to start roasting your LinkedIn posts' 
                : 'Sign in to access your roasts'}
            </p>

            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/10 text-white rounded-lg p-3 border border-white/20 focus:border-orange-500 focus:outline-none"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 text-white rounded-lg p-3 border border-white/20 focus:border-orange-500 focus:outline-none"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg p-4">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg p-4">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>{isSignUp ? 'Create Account' : 'Sign In'}</>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-400 hover:text-white transition"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"}
              </button>
            </div>

            {!isSignUp && (
              <div className="mt-4 text-center">
                <Link href="/reset-password" className="text-gray-400 hover:text-white transition text-sm">
                  Forgot password?
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
