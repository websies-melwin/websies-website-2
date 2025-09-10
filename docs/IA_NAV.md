# Information Architecture & Navigation

## Site Map
```
/
├── Home (/)
├── Pricing (/pricing)
├── Creative (/creative)
├── Reviews (/reviews)
├── Referral (/referral)
├── Contact (/contact)
├── Login (/login)
├── Dashboard (/dashboard) [Protected]
│   ├── Overview (default tab)
│   ├── My Website
│   ├── Upgrades
│   ├── Referrals
│   └── Billing
└── Admin (/admin) [Protected - admin/owner only]
```

## Header Navigation
### Desktop
- **Logo**: "Websies" (links to /)
- **Main Nav** (center):
  - Home
  - Pricing
  - Reviews
  - Referrals
  - Contact
- **Actions** (right):
  - Logged out: "Login" + "Free Demo" (CTA button)
  - Logged in: "My Dashboard" (CTA button)

### Mobile
- **Logo**: "Websies"
- **Hamburger Menu**: Toggles mobile nav
- **Mobile Nav** (full width dropdown):
  - All main nav items
  - Login (if not authenticated)
  - CTA button at bottom

## Footer Structure
### Column 1 - Brand
- Logo
- Tagline: "Professional websites in 7 days. £47/month. Zero upfront fees."

### Column 2 - Quick Links
- Home
- Pricing
- Reviews
- Free Demo

### Column 3 - Resources
- Referral Program
- Contact Us
- Login
- Dashboard

### Column 4 - Connect
- Social icons (Facebook, Twitter, Instagram, LinkedIn)
- Phone: +44 20 1234 5678
- Email: hello@websies.com

### Bottom Bar
- © 2024 Websies. All rights reserved.
- Privacy Policy
- Terms of Service

## Route Map
### Public Routes
```
/                   → Home (static HTML)
/pricing           → Pricing (static HTML)
/creative          → Creative Ideas Generator
/reviews           → Customer Reviews
/referral          → Referral Program
/contact           → Contact Form
/login             → Authentication
```

### Protected Routes
```
/dashboard         → Customer Dashboard (requires auth)
/dashboard#overview → Overview Tab
/dashboard#website → My Website Tab
/dashboard#upgrades → Upgrades Tab
/dashboard#referrals → Referrals Tab
/dashboard#billing → Billing Tab
/admin             → Admin Panel (requires admin role)
```

### API Routes
```
/api/checkout      → Stripe checkout session
/api/stripe/webhook → Stripe webhook handler
```

## User Flows

### Visitor → Customer
1. Land on Home (/)
2. Click "Get Your FREE Demo"
3. Navigate to Pricing (/pricing)
4. Click "Start Free Demo"
5. Fill Creative form (/creative)
6. Sign up (/login)
7. Complete checkout
8. Access Dashboard (/dashboard)

### Customer → Referrer
1. Login (/login)
2. Dashboard (/dashboard)
3. Referrals tab
4. Copy referral link
5. Share externally

### Admin Flow
1. Login (/login)
2. Admin panel (/admin)
3. Manage users/view metrics

## Navigation Hierarchy
1. **Primary**: Home, Pricing (highest visibility)
2. **Secondary**: Reviews, Contact, Referral
3. **Utility**: Login, Dashboard
4. **Hidden**: Admin (no public links)