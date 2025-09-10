-- Websies Database Schema
-- PostgreSQL / Supabase
-- RLS disabled for initial development

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean migrations)
DROP TABLE IF EXISTS referral_clicks CASCADE;
DROP TABLE IF EXISTS referrals CASCADE;
DROP TABLE IF EXISTS site_stats CASCADE;
DROP TABLE IF EXISTS customer_sites CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ==========================================
-- PROFILES TABLE
-- ==========================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'owner')),
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_referral_code ON profiles(referral_code);

-- 🟡 TODO: Add RLS policies for profiles
-- - Users can read/update own profile
-- - Admins can read all profiles
-- - Owners can read/update all profiles

COMMENT ON TABLE profiles IS 'User profiles linked to Supabase auth.users';
COMMENT ON COLUMN profiles.role IS 'User role: customer, admin, or owner';
COMMENT ON COLUMN profiles.referral_code IS 'Unique referral code for affiliate program';

-- ==========================================
-- CONTACT MESSAGES TABLE
-- ==========================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    plan VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    replied_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_contact_messages_user_id ON contact_messages(user_id);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- 🟡 TODO: Add email validation constraint
-- 🟡 TODO: Add RLS policies
-- - Users can read own messages
-- - Admins can read/update all messages

COMMENT ON TABLE contact_messages IS 'Contact form submissions from website visitors';
COMMENT ON COLUMN contact_messages.status IS 'Message status: new, read, replied, archived';

-- ==========================================
-- SUBSCRIPTIONS TABLE
-- ==========================================
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255) UNIQUE,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_price_id VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'trialing' 
        CHECK (status IN ('trialing', 'active', 'canceled', 'incomplete', 
                         'incomplete_expired', 'past_due', 'unpaid', 'paused')),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE UNIQUE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_current_period_end ON subscriptions(current_period_end);

-- 🟡 TODO: Add constraint to ensure one active subscription per user
-- 🟡 TODO: Add RLS policies
-- - Users can read own subscription
-- - Admins can read all subscriptions

COMMENT ON TABLE subscriptions IS 'Stripe subscription records for customers';
COMMENT ON COLUMN subscriptions.status IS 'Stripe subscription status';
COMMENT ON COLUMN subscriptions.current_period_end IS 'When the current billing period ends';

-- ==========================================
-- CUSTOMER SITES TABLE
-- ==========================================
CREATE TABLE customer_sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    url VARCHAR(500),
    subdomain VARCHAR(100),
    custom_domain VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'building', 'review', 'live', 'suspended', 'archived')),
    notes TEXT,
    launched_at TIMESTAMPTZ,
    suspended_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_customer_sites_user_id ON customer_sites(user_id);
CREATE INDEX idx_customer_sites_status ON customer_sites(status);
CREATE UNIQUE INDEX idx_customer_sites_subdomain ON customer_sites(subdomain) WHERE subdomain IS NOT NULL;
CREATE UNIQUE INDEX idx_customer_sites_custom_domain ON customer_sites(custom_domain) WHERE custom_domain IS NOT NULL;

-- 🟡 TODO: Add URL validation constraints
-- 🟡 TODO: Add subdomain format validation (alphanumeric + hyphens only)
-- 🟡 TODO: Add RLS policies
-- - Users can read/update own sites
-- - Admins can read/update all sites

COMMENT ON TABLE customer_sites IS 'Customer website records';
COMMENT ON COLUMN customer_sites.subdomain IS 'Subdomain on websies.com (e.g., business.websies.com)';
COMMENT ON COLUMN customer_sites.custom_domain IS 'Customer custom domain if configured';
COMMENT ON COLUMN customer_sites.status IS 'Website status in the delivery pipeline';

-- ==========================================
-- SITE STATS TABLE
-- ==========================================
CREATE TABLE site_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES customer_sites(id) ON DELETE CASCADE,
    ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metric VARCHAR(100) NOT NULL,
    value NUMERIC NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_site_stats_site_id ON site_stats(site_id);
CREATE INDEX idx_site_stats_ts ON site_stats(ts DESC);
CREATE INDEX idx_site_stats_metric ON site_stats(metric);
CREATE INDEX idx_site_stats_site_metric_ts ON site_stats(site_id, metric, ts DESC);

-- 🟡 TODO: Add metric validation (pageviews, visitors, bounce_rate, etc.)
-- 🟡 TODO: Consider partitioning by month for large datasets
-- 🟡 TODO: Add RLS policies
-- - Users can read stats for own sites
-- - Admins can read all stats

COMMENT ON TABLE site_stats IS 'Analytics and metrics for customer websites';
COMMENT ON COLUMN site_stats.ts IS 'Timestamp of the metric measurement';
COMMENT ON COLUMN site_stats.metric IS 'Metric name (pageviews, visitors, etc.)';
COMMENT ON COLUMN site_stats.value IS 'Numeric value of the metric';
COMMENT ON COLUMN site_stats.metadata IS 'Additional metric metadata in JSON format';

-- ==========================================
-- REFERRALS TABLE
-- ==========================================
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    referred_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    referred_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending' 
        CHECK (status IN ('pending', 'converted', 'paid', 'expired', 'rejected')),
    reward_amount NUMERIC(10,2) DEFAULT 47.00,
    converted_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    payment_reference VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_referrals_referrer_user_id ON referrals(referrer_user_id);
CREATE INDEX idx_referrals_referred_user_id ON referrals(referred_user_id);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_created_at ON referrals(created_at DESC);

-- 🟡 TODO: Add email validation constraint
-- 🟡 TODO: Add constraint to prevent self-referrals
-- 🟡 TODO: Add constraint to prevent duplicate referrals
-- 🟡 TODO: Add RLS policies
-- - Users can read own referrals (as referrer)
-- - Admins can read/update all referrals

COMMENT ON TABLE referrals IS 'Referral program tracking';
COMMENT ON COLUMN referrals.status IS 'Referral status: pending, converted, paid, expired, rejected';
COMMENT ON COLUMN referrals.reward_amount IS 'Reward amount in GBP (default £47)';
COMMENT ON COLUMN referrals.payment_reference IS 'External payment system reference (Stripe, PayPal, etc.)';

-- ==========================================
-- REFERRAL CLICKS TABLE
-- ==========================================
CREATE TABLE referral_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_code VARCHAR(20) NOT NULL,
    ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    landing_path VARCHAR(500),
    user_agent TEXT,
    ip_address INET,
    country_code VARCHAR(2),
    city VARCHAR(255),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_referral_clicks_referrer_code ON referral_clicks(referrer_code);
CREATE INDEX idx_referral_clicks_ts ON referral_clicks(ts DESC);
CREATE INDEX idx_referral_clicks_landing_path ON referral_clicks(landing_path);

-- 🟡 TODO: Add IP address anonymization for GDPR compliance
-- 🟡 TODO: Add user agent parsing to extract device_type and browser
-- 🟡 TODO: Add RLS policies
-- - Users can read clicks for own referral code
-- - Admins can read all clicks

COMMENT ON TABLE referral_clicks IS 'Track clicks on referral links';
COMMENT ON COLUMN referral_clicks.referrer_code IS 'The referral code from the URL';
COMMENT ON COLUMN referral_clicks.ts IS 'Timestamp of the click';
COMMENT ON COLUMN referral_clicks.landing_path IS 'The path the user landed on';
COMMENT ON COLUMN referral_clicks.user_agent IS 'Browser user agent string';
COMMENT ON COLUMN referral_clicks.ip_address IS 'IP address of the visitor';

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- TRIGGERS
-- ==========================================

-- Auto-update updated_at timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_sites_updated_at BEFORE UPDATE ON customer_sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- INITIAL DATA (Optional)
-- ==========================================

-- 🟡 TODO: Add seed data for development/testing

-- ==========================================
-- FUTURE CONSIDERATIONS
-- ==========================================
-- 🟡 TODO: Add table for website_changes (track all site update requests)
-- 🟡 TODO: Add table for invoices (billing history)
-- 🟡 TODO: Add table for support_tickets
-- 🟡 TODO: Add table for email_logs (track all system emails)
-- 🟡 TODO: Add table for audit_logs (track all admin actions)
-- 🟡 TODO: Consider implementing soft deletes with deleted_at columns
-- 🟡 TODO: Add data retention policies for GDPR compliance