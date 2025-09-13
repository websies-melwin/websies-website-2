'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    visitors: 0,
    pageViews: 0,
    avgDuration: '0:00',
    conversionRate: 0
  });
  const [referrals, setReferrals] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    earnings: 0
  });

  useEffect(() => {
    if (profile) {
      loadDashboardData();
    }
  }, [profile]);

  async function loadDashboardData() {
    try {
      // Load referral data
      const { data: referralData } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id);

      if (referralData) {
        const completed = referralData.filter(r => r.status === 'completed');
        const pending = referralData.filter(r => r.status === 'pending');
        
        setReferrals({
          total: referralData.length,
          pending: pending.length,
          completed: completed.length,
          earnings: completed.reduce((sum, r) => sum + (r.reward_amount || 20), 0)
        });
      }

      // Simulate analytics data (replace with real analytics when available)
      setStats({
        visitors: 1247,
        pageViews: 3892,
        avgDuration: '2:34',
        conversionRate: 3.2
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {profile?.name || 'there'}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Here's your website performance at a glance
                </p>
              </div>
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/5 transition"
                style={{ color: 'var(--text-muted)' }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Website Analytics Card */}
            <div className="lg:col-span-2">
              <div className="modern-card p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Website Analytics</h2>
                  <span className="text-sm px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }} className="text-sm">Visitors</span>
                      <i className="fas fa-users text-cyan-400"></i>
                    </div>
                    <p className="text-2xl font-bold">{stats.visitors.toLocaleString()}</p>
                    <p className="text-xs text-green-400 mt-1">↑ 12% this month</p>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }} className="text-sm">Page Views</span>
                      <i className="fas fa-eye text-blue-400"></i>
                    </div>
                    <p className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</p>
                    <p className="text-xs text-green-400 mt-1">↑ 8% this month</p>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }} className="text-sm">Avg. Duration</span>
                      <i className="fas fa-clock text-purple-400"></i>
                    </div>
                    <p className="text-2xl font-bold">{stats.avgDuration}</p>
                    <p className="text-xs text-green-400 mt-1">↑ 5% this month</p>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }} className="text-sm">Conversion</span>
                      <i className="fas fa-chart-line text-green-400"></i>
                    </div>
                    <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                    <p className="text-xs text-green-400 mt-1">↑ 2% this month</p>
                  </div>
                </div>

                {/* Analytics Chart Placeholder */}
                <div className="p-8 rounded-lg text-center" style={{ background: 'var(--bg-primary)' }}>
                  <i className="fas fa-chart-area text-4xl mb-4" style={{ color: 'var(--accent-cyan)' }}></i>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Detailed analytics coming soon
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                    Track visitor behavior, popular pages, and conversion funnels
                  </p>
                </div>
              </div>
            </div>

            {/* Referral Earnings Card */}
            <div className="lg:col-span-1">
              <div className="modern-card p-6 h-full">
                <h2 className="text-xl font-semibold mb-6">Referral Earnings</h2>
                
                <div className="text-center py-6">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Earnings</p>
                  <p className="text-4xl font-bold mt-2 mb-4">
                    £{referrals.earnings}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                      <p className="text-lg font-semibold">{referrals.total}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                      <p className="text-lg font-semibold text-yellow-400">{referrals.pending}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Pending</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                      <p className="text-lg font-semibold text-green-400">{referrals.completed}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Completed</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                    <p className="text-sm font-medium mb-1">Your Referral Code</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-1 rounded bg-black/20 text-cyan-400">
                        {profile?.referral_code || 'LOADING'}
                      </code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(profile?.referral_code || '')}
                        className="p-2 rounded hover:bg-white/5 transition"
                      >
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>

                  <button className="btn-secondary w-full">
                    Share & Earn £20
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Management */}
          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Subscription Management</h2>
              <span className="px-3 py-1 rounded-full text-sm" 
                style={{ 
                  background: profile?.subscription_status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                  color: profile?.subscription_status === 'active' ? 'rgb(34, 197, 94)' : 'rgb(234, 179, 8)'
                }}>
                {profile?.subscription_status === 'active' ? 'Active' : 'Pending Setup'}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Current Plan */}
              <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Current Plan</h3>
                  <i className="fas fa-crown text-yellow-400"></i>
                </div>
                <p className="text-2xl font-bold mb-1">Professional</p>
                <p style={{ color: 'var(--text-muted)' }}>£47/month</p>
                <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
                  Includes hosting, SSL, unlimited updates
                </p>
              </div>

              {/* Next Payment */}
              <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Next Payment</h3>
                  <i className="fas fa-calendar text-blue-400"></i>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>Monthly renewal</p>
                <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
                  Auto-renewal enabled
                </p>
              </div>

              {/* Quick Actions */}
              <div className="p-4 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition text-sm">
                    <i className="fas fa-credit-card mr-2 text-cyan-400"></i>
                    Update Payment Method
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition text-sm">
                    <i className="fas fa-file-invoice mr-2 text-cyan-400"></i>
                    Download Invoice
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 transition text-sm">
                    <i className="fas fa-rocket mr-2 text-cyan-400"></i>
                    View Upgrades
                  </button>
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div className="mt-6 p-4 rounded-lg border border-cyan-400/20" style={{ background: 'rgba(0, 242, 254, 0.05)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Your Website</p>
                  <p className="text-lg font-medium mt-1" style={{ color: 'var(--accent-cyan)' }}>
                    {profile?.business_name ? 
                      `https://${profile.business_name.toLowerCase().replace(/\s+/g, '')}.websies.com` : 
                      'https://yoursite.websies.com'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 transition">
                    <i className="fas fa-external-link-alt mr-2"></i>
                    Visit Site
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 transition">
                    <i className="fas fa-edit mr-2"></i>
                    Request Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}