# Architecture

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe Subscriptions
- **Hosting**: 🟡 TODO - Vercel recommended
- **CDN**: 🟡 TODO

## Application Structure
```
/public
  ├── index.html          # Static home page (preserved)
  ├── pricing.html        # Static pricing page (preserved)
  └── hero-background.mp4 # Video asset

/app
  ├── layout.js           # Root layout with global styles
  ├── globals.css         # Global CSS variables and utilities
  ├── (site)/            # Public pages group
  │   ├── creative/      # AI demo page
  │   ├── reviews/       # Social proof
  │   ├── referral/      # Referral program
  │   ├── contact/       # Contact form
  │   ├── login/         # Auth page
  │   ├── dashboard/     # Protected customer area
  │   └── admin/         # Protected admin area
  └── api/               # API routes
      ├── checkout/      # Stripe checkout session
      └── stripe/webhook/ # Stripe webhook handler

/components              # Reusable UI components
/lib                    # Utilities and clients
```

## Static Pages Strategy
- **Home & Pricing**: Served as static HTML via Next.js rewrites
- **Rationale**: Maximum performance, existing design preservation
- **Implementation**: 
  ```javascript
  // next.config.js
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
      { source: '/pricing', destination: '/pricing.html' }
    ];
  }
  ```

## Database Schema
### Tables
- `profiles`: User profiles with roles and subscription status
- `subscriptions`: Stripe subscription records
- `referrals`: Referral tracking
- `website_requests`: Customer change requests

### Security
- Row Level Security (RLS) enabled on all tables
- Role-based access policies
- User data isolation

## Authentication Flow
1. User signs up via Supabase Auth
2. Profile created with default 'customer' role
3. Unique referral code generated
4. Email verification sent (🟡 TODO - configure SMTP)

## Payment Flow
1. User clicks subscribe → Stripe Checkout session created
2. Payment completed → Webhook received
3. Subscription record created in database
4. User profile updated with active status
5. Dashboard access granted

## Environments
### Development
- URL: http://localhost:3000
- Database: Supabase local or development project
- Stripe: Test mode keys

### Staging
- URL: 🟡 TODO
- Database: Supabase staging project
- Stripe: Test mode keys

### Production
- URL: https://websies.com (🟡 TODO - confirm domain)
- Database: Supabase production project
- Stripe: Live mode keys

## Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_URL
```

## Security Considerations
- API routes protected with authentication middleware
- Stripe webhook signature verification
- CORS configuration for API endpoints
- Rate limiting (🟡 TODO - implement)
- Input validation on all forms