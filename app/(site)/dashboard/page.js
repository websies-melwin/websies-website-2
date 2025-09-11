'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fa-home' },
    { id: 'website', label: 'My Website', icon: 'fa-globe' },
    { id: 'upgrades', label: 'Upgrades', icon: 'fa-rocket' },
    { id: 'referrals', label: 'Referrals', icon: 'fa-users' },
    { id: 'billing', label: 'Billing', icon: 'fa-credit-card' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab user={user} profile={profile} />;
      case 'website':
        return <WebsiteTab />;
      case 'upgrades':
        return <UpgradesTab />;
      case 'referrals':
        return <ReferralsTab profile={profile} />;
      case 'billing':
        return <BillingTab />;
      case 'settings':
        return <SettingsTab user={user} profile={profile} signOut={signOut} />;
      default:
        return <OverviewTab user={user} profile={profile} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {profile?.name || user.email}!
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your website and account</p>
          </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition ${
                activeTab === tab.id 
                  ? 'border-b-2 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{ 
                borderColor: activeTab === tab.id ? 'var(--accent-cyan)' : 'transparent' 
              }}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="modern-card p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Website Status</span>
            <i className={`fas ${profile?.subscription_status === 'active' ? 'fa-check-circle text-green-400' : 'fa-clock text-yellow-400'}`}></i>
          </div>
          <p className="text-2xl font-bold">{profile?.subscription_status === 'active' ? 'Live' : 'Pending'}</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {profile?.subscription_status === 'active' ? 'All systems operational' : 'Setup in progress'}
          </p>
        </div>

        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Member Since</span>
            <i className="fas fa-calendar text-blue-400"></i>
          </div>
          <p className="text-2xl font-bold">{joinedDate}</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Welcome to Websies!</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold mb-2">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Name</p>
              <p>{profile?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Business Name</p>
              <p>{profile?.business_name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Role</p>
              <p className="capitalize">{profile?.role || 'Customer'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Website</h2>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-2">Website URL</h3>
          <p style={{ color: 'var(--accent-cyan)' }}>https://thecoffeehouse.websies.com</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-2">Request Changes</h3>
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Need updates to your website? Submit a change request.
          </p>
          <button className="btn-primary">Request Changes</button>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-400">
            🟡 TODO: Website management features
          </p>
        </div>
      </div>
    </div>
  );
}

function UpgradesTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Upgrades</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-2">E-commerce Integration</h3>
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Add online store functionality to your website
          </p>
          <p className="text-2xl font-bold mb-4">+£20/month</p>
          <button className="btn-secondary">Learn More</button>
        </div>
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-2">Advanced SEO</h3>
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Boost your search rankings with advanced SEO
          </p>
          <p className="text-2xl font-bold mb-4">+£15/month</p>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
}

function ReferralsTab({ profile }) {
  const referralCode = profile?.referral_code || 'LOADING...';
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Referrals</h2>
      <div className="mb-6 p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
        <h3 className="font-semibold mb-2">Your Referral Link</h3>
        <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
          Share this link to earn £20 per successful referral
        </p>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={`https://websies.com/ref/${referralCode}`} 
            readOnly
            className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <button 
            className="btn-primary"
            onClick={() => navigator.clipboard.writeText(`https://websies.com/ref/${referralCode}`)}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Referrals</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-2xl font-bold">£0</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Earned</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pending</p>
        </div>
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
      <div className="space-y-4">
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-4">Current Subscription</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Plan</p>
              <p className="font-semibold">Professional Website</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Price</p>
              <p className="font-semibold">£47/month</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Next Payment</p>
              <p className="font-semibold">April 15, 2024</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Status</p>
              <p className="font-semibold text-green-400">Active</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-4">Payment Method</h3>
          <p className="mb-4">
            <i className="fas fa-credit-card mr-2"></i>
            Visa ending in 4242
          </p>
          <button className="btn-secondary">Update Payment Method</button>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-400">
            🟡 TODO: Connect to Stripe for real billing management
          </p>
        </div>

        <div className="flex gap-4">
          <button className="btn-secondary">Download Invoice</button>
          <button className="btn-secondary">Cancel Subscription</button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ user, profile, signOut }) {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    business_name: profile?.business_name || ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Profile updated successfully!');
      }
    } catch (err) {
      setMessage('An unexpected error occurred.');
    } finally {
      setSaving(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-4">Profile Information</h3>
          
          {message && (
            <div className={`p-4 rounded-lg mb-4 ${
              message.includes('Error') 
                ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                : 'bg-green-500/10 border border-green-500/20 text-green-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Email Address</label>
              <input 
                type="email" 
                value={user.email}
                disabled
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Email cannot be changed. Contact support if needed.
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Business Name</label>
              <input 
                type="text" 
                value={formData.business_name}
                onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                placeholder="Your business or organization name"
              />
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-4">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Account ID</p>
              <p className="font-mono text-sm">{user.id}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Member Since</p>
              <p>{new Date(user.created_at).toLocaleDateString('en-GB')}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Referral Code</p>
              <p className="font-mono">{profile?.referral_code || 'Loading...'}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Account Role</p>
              <p className="capitalize">{profile?.role || 'Customer'}</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20">
          <h3 className="font-semibold mb-4 text-red-400">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Sign Out</h4>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Sign out of your account on this device
                </p>
              </div>
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}