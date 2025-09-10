# Pages Specification

## Public Pages

### Home (/)
- **File**: `/public/index.html` (static)
- **Purpose**: Landing page showcasing value proposition
- **Target Audience**: Business owners seeking websites
- **Key Content**:
  - Hero with video background
  - Benefits section (7-day delivery, £47/month, £0 upfront)
  - Process overview
  - Industry targeting
- **CTAs**:
  - Primary: "Get Your FREE Demo" → `/pricing`
  - Secondary: "See How It Works" → scroll to process

### Pricing (/pricing)
- **File**: `/public/pricing.html` (static)
- **Purpose**: Detailed pricing and plan features
- **Target Audience**: Visitors ready to purchase
- **Key Content**:
  - £47/month professional plan details
  - Feature comparison
  - FAQ section
- **CTAs**:
  - Primary: "Start Free Demo" → `/creative`
  - Secondary: "Contact Sales" → `/contact`

### Creative (/creative)
- **Purpose**: AI-powered website idea generator
- **Target Audience**: Visitors wanting immediate value
- **Key Content**:
  - Business information form
  - Industry selector
  - Creative brief generator
- **CTAs**:
  - Primary: "Generate Creative Ideas" → form submission
  - Secondary: "Get Your FREE Demo" → `/pricing`
- **Status**: 🟡 TODO - AI integration pending

### Reviews (/reviews)
- **Purpose**: Social proof and testimonials
- **Target Audience**: Visitors in consideration phase
- **Key Content**:
  - 6 customer testimonials
  - 4.9/5 rating highlight
  - 98% retention rate
- **CTAs**:
  - Primary: "Get Your FREE Demo" → `/pricing`

### Referral (/referral)
- **Purpose**: Explain and signup for referral program
- **Target Audience**: Existing customers and partners
- **Key Content**:
  - £20 per referral offer
  - 3-step process explanation
  - Benefits list
- **CTAs**:
  - Primary: "Join Referral Program" → signup form
- **Status**: 🟡 TODO - Connect to dashboard tracking

### Contact (/contact)
- **Purpose**: Direct communication channel
- **Target Audience**: High-intent visitors with questions
- **Key Content**:
  - Contact form
  - Phone: +44 20 1234 5678
  - Email: hello@websies.com
  - Live chat availability
- **CTAs**:
  - Primary: "Send Message" → form submission
  - Secondary: "Get FREE Demo Instead" → `/pricing`

## Authentication Pages

### Login (/login)
- **Purpose**: Customer and admin authentication
- **Target Audience**: Existing users
- **Key Content**:
  - Email/password form
  - Social login options (Google, Facebook)
  - Sign up toggle
- **CTAs**:
  - Primary: "Log In" → `/dashboard`
  - Secondary: "Sign up" → toggle to registration
  - Tertiary: "Forgot password?" → password reset

## Protected Pages

### Dashboard (/dashboard)
- **Purpose**: Customer account management
- **Target Audience**: Active customers
- **Access**: Requires authentication, role: customer/admin/owner
- **Tabs**:
  - Overview: Plan status, member since
  - My Website: URL, change requests
  - Upgrades: E-commerce (+£20/mo), Advanced SEO (+£15/mo)
  - Referrals: Link sharing, earnings tracking
  - Billing: Subscription management
- **CTAs**:
  - "Request Changes" → change form
  - "Copy Referral Link" → clipboard
  - "Update Payment Method" → Stripe portal

### Admin (/admin)
- **Purpose**: User and business management
- **Target Audience**: Staff members
- **Access**: Requires authentication, role: admin/owner
- **Key Content**:
  - User statistics (523 total, 498 active)
  - Monthly revenue (£23,406)
  - Recent signups list
  - Quick actions menu
- **CTAs**:
  - "View All Users" → user management
  - "Send Newsletter" → email tool
  - "Generate Reports" → analytics
- **Status**: 🟡 TODO - Full implementation pending