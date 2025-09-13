# Websies - Professional Website Platform with Supabase Authentication

A modern Next.js application for Websies, a web design agency offering custom websites for £47/month with 7-day delivery guarantee. Now fully integrated with Supabase for authentication and user management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available at [supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd websies-website-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new project at [app.supabase.com](https://app.supabase.com)
   - Go to Settings > API in your Supabase dashboard
   - Copy your project URL and anon key

4. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Update with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Authentication System

### Features
- ✅ **Email/Password Authentication**: Secure signup and login
- ✅ **Password Reset**: Email-based password recovery
- ✅ **Session Persistence**: Stay logged in across browser sessions
- ✅ **Protected Routes**: Automatic redirection for authenticated areas
- ✅ **User Profiles**: Extended user data with business information
- ✅ **Role-Based Access**: Customer, Admin, and Owner roles
- ✅ **Real-time Auth State**: Instant UI updates on auth changes

### Authentication Flow

1. **Sign Up**
   - Users register with email, password, name, and optional business name
   - Automatic profile creation with unique referral code
   - Email verification (if enabled in Supabase)

2. **Sign In**
   - Email/password authentication
   - Automatic redirect to dashboard
   - Session persistence with secure tokens

3. **Password Reset**
   - Request reset link via email
   - Secure token-based password update
   - Automatic redirect after successful reset

4. **Protected Areas**
   - Dashboard: `/dashboard` - User account management
   - Admin: `/admin` - Admin-only features (role-based)
   - All protected routes automatically redirect to login if unauthenticated

## 📊 Database Schema

The application uses the following database structure:

### Tables

#### `profiles`
- User profile information
- Linked to Supabase Auth
- Fields: name, business_name, role, subscription status, referral code

#### `subscriptions`
- Stripe subscription management
- Tracks plan, status, and billing periods

#### `referrals`
- Referral program tracking
- Links referrer and referred users
- Manages reward distribution

#### `website_requests`
- Customer website change requests
- Priority and status tracking

### Row Level Security (RLS)
All tables have RLS enabled with policies for:
- Users can view/edit their own data
- Admins have elevated permissions
- Automatic profile creation on signup

## 🎨 Features & Components

### Core Pages
- **Home** (`/`) - Landing page with pricing and features
- **Login** (`/login`) - Combined login/signup interface
- **Dashboard** (`/dashboard`) - User account management
- **Reset Password** (`/reset-password`) - Password recovery
- **Admin** (`/admin`) - Admin dashboard (role-restricted)

### Components
- **AuthContext** - Global authentication state management
- **ProtectedRoute** - Route protection wrapper
- **SiteHeader** - Navigation with auth-aware menu
- **Dashboard Tabs** - Modular dashboard sections

### Dashboard Features
- **Overview**: Account summary and quick stats
- **My Website**: Website management and change requests
- **Upgrades**: Available add-ons and features
- **Referrals**: Referral program and earnings
- **Billing**: Subscription and payment management
- **Settings**: Profile and account settings

## 🛠️ Development

### Project Structure
```
websies-website-2/
├── app/                    # Next.js app directory
│   ├── (site)/            # Public routes
│   │   ├── login/         # Authentication page
│   │   ├── dashboard/     # User dashboard
│   │   └── admin/         # Admin area
│   ├── api/               # API routes
│   └── layout.js          # Root layout with AuthProvider
├── components/            # React components
├── contexts/              # Context providers
│   └── AuthContext.js     # Authentication context
├── lib/                   # Utilities and configs
│   ├── supabaseClient.js # Supabase client setup
│   └── auth.js           # Authentication functions
├── public/               # Static assets
├── .env.local           # Environment variables (create from .env.local.example)
└── package.json         # Dependencies
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Supabase Setup

1. **Enable Email Auth**
   - Go to Authentication > Providers
   - Enable Email provider
   - Configure email templates as needed

2. **Database Setup**
   - The required tables and RLS policies are automatically created on first deployment
   - Run the migration in `lib/supabaseClient.js` if needed

3. **Email Templates** (optional)
   - Customize confirmation and reset emails in Supabase dashboard
   - Authentication > Email Templates

### Environment Variables

Required variables in `.env.local`:
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Application
NEXT_PUBLIC_URL=http://localhost:3000
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Set production environment variables
3. Start the server:
   ```bash
   npm run start
   ```

## 🔒 Security Best Practices

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Secure session management with Supabase Auth
- ✅ Environment variables for sensitive data
- ✅ HTTPS enforced in production
- ✅ Input validation on all forms
- ✅ SQL injection prevention via Supabase client
- ✅ XSS protection with React's built-in escaping

## 🐛 Troubleshooting

### Common Issues

**"Invalid API key"**
- Check that your Supabase URL and anon key are correctly set in `.env.local`
- Ensure no trailing spaces in environment variables

**"User not found" after signup**
- Check if email confirmation is required in Supabase settings
- Verify the email or check spam folder

**"Cannot read properties of null"**
- Ensure AuthProvider wraps your application in `app/layout.js`
- Check that protected routes use the ProtectedRoute component

**Database tables not found**
- Run the migration SQL from `lib/supabaseClient.js` in Supabase SQL editor
- Ensure RLS policies are properly configured

## 📚 API Reference

### Authentication Functions

```javascript
// Sign up new user
auth.signUp(email, password, metadata)

// Sign in
auth.signIn(email, password)

// Sign out
auth.signOut()

// Reset password
auth.resetPassword(email)

// Update password
auth.updatePassword(newPassword)

// Get current user
auth.getCurrentUser()

// Update profile
auth.updateProfile(profileData)

// Check admin status
auth.isAdmin()
```

### useAuth Hook

```javascript
const {
  user,          // Current user object
  profile,       // User profile data
  session,       // Active session
  loading,       // Loading state
  signIn,        // Sign in function
  signUp,        // Sign up function
  signOut,       // Sign out function
  updateProfile  // Update profile function
} = useAuth();
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for Websies web design agency.

## 🆘 Support

For technical support or questions:
- **Documentation**: Check this README and code comments
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## 🎯 Roadmap

- [ ] Social authentication (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Advanced user analytics
- [ ] Webhook integration for Stripe
- [ ] Email notifications system
- [ ] Advanced admin dashboard
- [ ] API rate limiting
- [ ] Audit logging

---

**Built with Next.js, Supabase, and ❤️ for modern businesses**