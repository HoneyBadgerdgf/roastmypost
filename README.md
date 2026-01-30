# 🔥 RoastMyPost - LinkedIn Content Roast Tool

The brutally honest LinkedIn editor. Paste your draft, get roasted by AI, and turn boring posts into engagement magnets.

## 🎯 Problem

LinkedIn creators struggle with engagement. Posts flop because they lack compelling hooks, clear value, and authentic voice. Most people don't realize their content is boring until it's too late.

## 💡 Solution

**RoastMyPost** uses GPT-4 to provide brutally honest, actionable feedback on LinkedIn drafts BEFORE you post them. Get roasted, fix the issues, and post content that actually gets engagement.

## ✨ Features

- **Brutal AI Roasting** - No sugar-coating, just honest feedback
- **Engagement Scoring** - 0-100 score predicting post performance  
- **Specific Improvements** - Actionable tips on hook, value, structure, CTA
- **Rewrite Suggestions** - Pro users get improved versions
- **Free Tier** - 3 roasts/month to try it out
- **Pro Tier** - Unlimited roasts for $9/month

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: OpenAI GPT-4
- **Payments**: Stripe
- **Deployment**: Vercel

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd linkedin-roast
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the database migration:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `database.sql`
   - Execute the SQL

### 3. Set Up OpenAI

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Make sure you have access to GPT-4

### 4. Set Up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard
3. Create a subscription product:
   - Go to Products > Add Product
   - Name: "RoastMyPost Pro"
   - Price: $9/month recurring
   - Copy the Price ID

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Get this after setting up webhooks

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

### 7. Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Update `NEXT_PUBLIC_APP_URL` to your production URL
5. Deploy

### 8. Set Up Stripe Webhooks (Production)

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## 📊 Database Schema

```sql
profiles {
  id: UUID (references auth.users)
  email: TEXT
  subscription_tier: 'free' | 'pro'
  roasts_used: INTEGER
  roasts_limit: INTEGER
  stripe_customer_id: TEXT
  stripe_subscription_id: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

roasts {
  id: UUID
  user_id: UUID (references auth.users)
  content: TEXT
  roast_result: JSONB
  score: INTEGER
  created_at: TIMESTAMP
}
```

## 🚀 Go-to-Market Strategy

### Phase 1: Free Viral Loop (Week 1)
1. Launch on Product Hunt
2. Post on LinkedIn with roasted examples
3. Offer free roasts to influencers
4. Share results (with permission) for social proof

### Phase 2: Convert Free → Paid (Week 2-4)
1. Add "Pro" features (rewrites, unlimited)
2. Email free users with upgrade offer
3. Retarget users who hit free limit
4. Share success stories from Pro users

### Phase 3: Scale (Month 2+)
1. LinkedIn ads targeting creators
2. Affiliate program for content coaches
3. API access for tools (Taplio, Shield, etc.)
4. White-label for LinkedIn consultants

## 💰 Revenue Model

- **Free Tier**: 3 roasts/month (acquisition)
- **Pro Tier**: $9/month unlimited (monetization)
- **Target**: 1,000 Pro users = $9k MRR in 3 months

## 🎨 Branding

- **Name**: RoastMyPost
- **Tagline**: "Stop posting flops. Get roasted first."
- **Tone**: Brutally honest, funny, helpful
- **Colors**: Orange (fire), dark purple/slate background
- **Emoji**: 🔥

## 📈 Success Metrics

- Sign-ups per day
- Roasts per user
- Free → Pro conversion rate
- Churn rate
- MRR growth

## 🔐 Security Notes

- Row-Level Security enabled on all tables
- Auth handled by Supabase
- Stripe webhooks for subscription management
- Environment variables for all secrets

## 📝 License

MIT

## 🤝 Contributing

This is an MVP. Contributions welcome after initial launch.

## 📧 Contact

Built by [Your Name]  
Questions? [your@email.com]

---

**Status**: MVP - Ready for launch testing  
**Build Time**: ~6 hours  
**Next Steps**: 
1. Add actual Stripe product IDs
2. Test payment flow end-to-end
3. Polish roasting prompt
4. Launch on Product Hunt
