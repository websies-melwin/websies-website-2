'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🟡 TODO: Check Supabase auth
    // For now, mock user
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
      business: 'The Coffee House',
      plan: 'Professional',
      joined: '2024-01-15'
    });
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fa-home' },
    { id: 'website', label: 'My Website', icon: 'fa-globe' },
    { id: 'upgrades', label: 'Upgrades', icon: 'fa-rocket' },
    { id: 'referrals', label: 'Referrals', icon: 'fa-users' },
    { id: 'billing', label: 'Billing', icon: 'fa-credit-card' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab user={user} />;
      case 'website':
        return <WebsiteTab />;
      case 'upgrades':
        return <UpgradesTab />;
      case 'referrals':
        return <ReferralsTab />;
      case 'billing':
        return <BillingTab />;
      default:
        return <OverviewTab user={user} />;
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
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
  );
}

function OverviewTab({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Current Plan</span>
            <i className="fas fa-crown text-yellow-400"></i>
          </div>
          <p className="text-2xl font-bold">{user.plan}</p>
          <p className="text-sm" style={{ color: 'var(--accent-cyan)' }}>£47/month</p>
        </div>

        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Website Status</span>
            <i className="fas fa-check-circle text-green-400"></i>
          </div>
          <p className="text-2xl font-bold">Live</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>All systems operational</p>
        </div>

        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Member Since</span>
            <i className="fas fa-calendar text-blue-400"></i>
          </div>
          <p className="text-2xl font-bold">Jan 2024</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>3 months active</p>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <p className="text-yellow-400">
          🟡 TODO: Connect to real user data and analytics
        </p>
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

function ReferralsTab() {
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
            value="https://websies.com/ref/JOHN123" 
            readOnly
            className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <button className="btn-primary">Copy</button>
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