'use client';

import { useState } from 'react';
import { Flame, ArrowLeft, Loader2, Copy, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RoastPage() {
  const [content, setContent] = useState('');
  const [roastResult, setRoastResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRoast = async () => {
    if (!content.trim()) {
      setError('Please enter some content to roast');
      return;
    }

    setLoading(true);
    setError('');
    setRoastResult(null);

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to roast content');
      }

      setRoastResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (roastResult?.improved) {
      navigator.clipboard.writeText(roastResult.improved);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        <Link href="/login" className="text-white hover:text-orange-500 transition">
          Login
        </Link>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Roasted</span>
            </h1>
            <p className="text-xl text-gray-300">
              Paste your LinkedIn draft below and prepare for brutal honesty
            </p>
          </div>

          {!roastResult ? (
            /* Input Section */
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <label className="block text-white font-semibold mb-3">
                Your LinkedIn Post Draft
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="I'm excited to announce that I've joined..."
                className="w-full h-64 bg-white/10 text-white rounded-lg p-4 border border-white/20 focus:border-orange-500 focus:outline-none resize-none"
                disabled={loading}
              />
              
              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg p-4">
                  {error}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {content.length} characters • Free tier: 3 roasts/month
                </p>
                <button
                  onClick={handleRoast}
                  disabled={loading || !content.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Roasting...
                    </>
                  ) : (
                    <>
                      <Flame className="w-5 h-5" />
                      Roast It
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              {/* Roast Result */}
              <div className="bg-red-500/10 backdrop-blur-lg rounded-xl p-8 border border-red-500/30">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-red-500" />
                  The Roast
                </h2>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {roastResult.roast}
                </div>
              </div>

              {/* Score */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Engagement Score</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          roastResult.score >= 70 ? 'bg-green-500' :
                          roastResult.score >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${roastResult.score}%` }}
                      />
                    </div>
                    <span className="text-2xl font-bold text-white">{roastResult.score}/100</span>
                  </div>
                </div>
              </div>

              {/* Improvements */}
              {roastResult.improvements && (
                <div className="bg-blue-500/10 backdrop-blur-lg rounded-xl p-8 border border-blue-500/30">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    How to Fix It
                  </h2>
                  <ul className="space-y-3">
                    {roastResult.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-blue-400 font-bold">{index + 1}.</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improved Version (Pro feature preview) */}
              {roastResult.improved && (
                <div className="bg-green-500/10 backdrop-blur-lg rounded-xl p-8 border border-green-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      Improved Version
                      <span className="ml-3 text-sm bg-orange-500 text-white px-3 py-1 rounded-full">PRO</span>
                    </h2>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed bg-white/5 p-6 rounded-lg">
                    {roastResult.improved}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setRoastResult(null);
                    setContent('');
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Roast Another Post
                </button>
                <Link
                  href="/#pricing"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition"
                >
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
