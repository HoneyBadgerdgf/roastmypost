import Link from 'next/link';
import { Flame, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Flame className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-white">RoastMyPost</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-white hover:text-orange-500 transition">
            Login
          </Link>
          <Link 
            href="/roast" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Try Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
              🔥 Get brutally honest feedback
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Stop Posting Flops<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
              Get Roasted First
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            The brutally honest LinkedIn editor. Paste your draft, get roasted by AI, 
            and turn boring posts into engagement magnets. No more crickets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/roast"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg"
            >
              Roast My Post →
            </Link>
            <Link 
              href="#pricing"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition border border-white/20"
            >
              View Pricing
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>3 free roasts</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Instant feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>10x engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Brutal Honesty</h3>
            <p className="text-gray-400">
              No sugar-coating. AI tells you exactly why your post will flop before you embarrass yourself.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Feedback</h3>
            <p className="text-gray-400">
              Get specific, actionable suggestions in seconds. Hook, value, CTA - we check everything.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">More Engagement</h3>
            <p className="text-gray-400">
              Turn boring corporate-speak into scroll-stopping content that people actually read.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Try free, upgrade when you need more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-gray-400">/forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                3 roasts per month
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Basic feedback
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Hook analysis
              </li>
            </ul>
            <Link 
              href="/roast"
              className="block w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-center transition border border-white/20"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-8 border border-orange-500/30 relative">
            <div className="absolute -top-4 right-8 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$9</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Unlimited roasts
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Advanced feedback
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Rewrite suggestions
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Engagement predictions
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-500 mr-3">✓</span>
                Priority support
              </li>
            </ul>
            <Link 
              href="/roast"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition transform hover:scale-105"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="text-center text-gray-400">
          <p>© 2026 RoastMyPost. Built to end boring LinkedIn posts.</p>
        </div>
      </footer>
    </main>
  );
}
