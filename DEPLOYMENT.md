# 🚀 Deployment Guide - RoastMyPost

## Quick Links

- **GitHub**: https://github.com/HoneyBadgerdgf/roastmypost
- **Vercel Project**: (will be created during deployment)

## Prerequisites

You'll need accounts for:
1. **Supabase** (database + auth) - https://supabase.com
2. **OpenAI** (GPT-4 API) - https://platform.openai.com
3. **Stripe** (payments) - https://stripe.com
4. **Vercel** (hosting) - https://vercel.com

## Step-by-Step Deployment

### 1. Set Up Supabase (5 minutes)

1. Go to https://supabase.com and create a new project
2. Wait for the database to spin up (~2 minutes)
3. Go to **SQL Editor** in the sidebar
4. Copy the contents of `database.sql` from the repo
5. Paste and click **Run**
6. Go to **Project Settings > API**
7. Copy these values:
   - `URL` → Save as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → Save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Set Up OpenAI (2 minutes)

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it → Save as `OPENAI_API_KEY`
4. Make sure you have billing set up and GPT-4 access

**Cost estimate**: ~$0.01-0.05 per roast

### 3. Set Up Stripe (10 minutes)

1. Go to https://stripe.com and create account
2. Complete onboarding (you can use test mode initially)
3. Go to **Developers > API Keys**
4. Copy:
   - `Publishable key` → Save as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → Save as `STRIPE_SECRET_KEY`

5. Create a Product:
   - Go to **Products > Add Product**
   - Name: "RoastMyPost Pro"
   - Description: "Unlimited LinkedIn post roasts"
   - Pricing: $9/month recurring
   - Click **Add Product**
   - Copy the **Price ID** (starts with `price_`) → You'll need this in the code

6. Set up Webhook (after Vercel deployment):
   - Go to **Developers > Webhooks**
   - Click **Add Endpoint**
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy **Signing secret** → Save as `STRIPE_WEBHOOK_SECRET`

### 4. Deploy to Vercel (5 minutes)

1. Go to https://vercel.com/new
2. Import your GitHub repo: `HoneyBadgerdgf/roastmypost`
3. Configure environment variables (paste the values you saved):

```
NEXT_PUBLIC_SUPABASE_URL=your_value_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value_here
OPENAI_API_KEY=your_value_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_value_here
STRIPE_SECRET_KEY=your_value_here
STRIPE_WEBHOOK_SECRET=your_value_here (add this after webhook setup)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

4. Click **Deploy**
5. Wait 2-3 minutes for build
6. Copy your production URL

### 5. Update Stripe Price ID in Code

The dashboard currently has a placeholder for the Stripe Price ID. Update it:

1. Open `app/dashboard/page.tsx`
2. Find line with `price_REPLACE_WITH_ACTUAL_PRICE_ID`
3. Replace with your actual Stripe Price ID
4. Commit and push:
   ```bash
   git add app/dashboard/page.tsx
   git commit -m "Add production Stripe Price ID"
   git push
   ```
5. Vercel will auto-deploy the update

### 6. Complete Stripe Webhook Setup

Now that you have your Vercel URL:

1. Go back to Stripe > Webhooks
2. Add the webhook endpoint (see step 3.6 above)
3. Add the signing secret to Vercel:
   - Go to Vercel project settings
   - Environment Variables
   - Add `STRIPE_WEBHOOK_SECRET`
   - Redeploy

### 7. Test Everything

1. Visit your live URL
2. Sign up for an account
3. Paste a LinkedIn post draft
4. Click "Roast It"
5. Check the roast result
6. Try upgrading to Pro (use Stripe test card: `4242 4242 4242 4242`)
7. Verify subscription shows in dashboard

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `OPENAI_API_KEY`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL`

## Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Update Stripe Price ID in dashboard
- [ ] Test full user flow (sign up → roast → upgrade)
- [ ] Add your email as first Pro user (test)
- [ ] Set up custom domain (optional)

### Marketing (Week 1)
- [ ] Launch on Product Hunt
- [ ] Post on LinkedIn with examples
- [ ] Share on Twitter/X
- [ ] Post in Indie Hackers
- [ ] Email 10 LinkedIn influencers for beta testing

### Growth (Month 1)
- [ ] Add analytics (Plausible/Fathom)
- [ ] Set up email capture (ConvertKit/Mailchimp)
- [ ] Create drip campaign for free users
- [ ] Monitor OpenAI costs
- [ ] Track conversion rate (free → pro)

## Costs Breakdown

**Monthly Fixed Costs:**
- Supabase: $0 (free tier supports ~50k requests)
- Vercel: $0 (free tier, upgrade to $20/mo if >100GB bandwidth)
- Stripe: $0 base fee (just transaction fees)

**Variable Costs:**
- OpenAI: ~$0.02 per roast (GPT-4)
  - 100 roasts/day = $60/month
  - 500 roasts/day = $300/month
- Stripe fees: 2.9% + $0.30 per transaction
  - $9 subscription = $0.56 fee = $8.44 net

**Break-even**: ~10 Pro subscribers covers 300 roasts/day

## Troubleshooting

### Build fails on Vercel
- Check that all env vars are set
- Make sure Node version is 18+ (check in Vercel settings)

### Authentication not working
- Verify Supabase URL and anon key
- Check Supabase project is not paused
- Verify database migration ran successfully

### Roast API returns error
- Check OpenAI API key is valid
- Verify you have GPT-4 access
- Check API usage limits not exceeded

### Payments not working
- Use Stripe test mode initially
- Test card: 4242 4242 4242 4242
- Verify webhook secret is correct
- Check webhook is receiving events in Stripe dashboard

## Success Metrics

Track these in your first week:
- Sign-ups per day
- Roasts per user
- Free → Pro conversion rate
- Average score of roasted posts
- User feedback/testimonials

## Next Steps

After successful deployment:
1. Test everything thoroughly
2. Add your first paying customer (yourself)
3. Launch marketing campaign
4. Iterate based on user feedback

---

**Need help?** Check the main README.md or open an issue on GitHub.
