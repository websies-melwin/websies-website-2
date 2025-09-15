# Vercel Environment Variables Setup Guide

## Step 1: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/websies-projects/websies-website-2/settings/environment-variables

2. Add the following environment variables (click "Add New" for each):

### Required Supabase Variables:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://izenvkhvvypghmfvflmn.supabase.co`
- **Environment:** Select all (Production, Preview, Development)

- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZW52a2h2dnlwZ2htZnZmbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQzNDcsImV4cCI6MjA3MzE3MDM0N30.QIimxcBRYuXaByYLLKJ9qImZoAZdJY2hK1eabRPNpH0`
- **Environment:** Select all (Production, Preview, Development)

### Optional (for full functionality):
- **Name:** `NEXT_PUBLIC_URL`
- **Value:** `https://websies-website-2.vercel.app` (or your custom domain)
- **Environment:** Production only

3. Click "Save" after adding each variable

## Step 2: Trigger a Redeployment

After adding the environment variables:
1. Go to the Deployments tab
2. Find the most recent deployment
3. Click the three dots menu (⋮)
4. Select "Redeploy"
5. Choose "Use existing Build Cache" and click "Redeploy"

## Step 3: Verify the Setup

Once deployed, test the authentication:
1. Visit your website
2. Click the login button
3. Try signing up with a test email
4. Check if you can access the dashboard

## What's Already Set Up:

✅ **Supabase Project:**
- Project ID: `izenvkhvvypghmfvflmn`
- Region: `eu-west-2`
- Status: Active and healthy

✅ **Database Tables:**
- `profiles` - User profiles with business info
- `subscriptions` - Subscription management
- `referrals` - Referral tracking system
- `website_requests` - Customer requests

✅ **Security:**
- Row Level Security (RLS) enabled on all tables
- Proper authentication policies in place
- User data isolation configured

## Troubleshooting:

If authentication doesn't work after setup:
1. Check browser console for errors
2. Verify environment variables are correctly added in Vercel
3. Make sure the deployment completed successfully
4. Clear browser cache and cookies

## Support:
If you need help, the Supabase dashboard is at: https://app.supabase.com/project/izenvkhvvypghmfvflmn