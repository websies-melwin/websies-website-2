'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await auth.getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="dashboard-container flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent mb-4"></div>
          <p className="text-xl text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'website', label: 'My Website', icon: '🌐' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'updates', label: 'Request Updates', icon: '✏️' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'support', label: 'Support', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const stats = [
    { label: 'Website Status', value: 'Live', color: 'text-green-400', bgColor: 'bg-green-500/20', icon: '🟢' },
    { label: 'Monthly Visitors', value: '2,847', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', icon: '👥' },
    { label: 'Uptime', value: '99.9%', color: 'text-blue-400', bgColor: 'bg-blue-500/20', icon: '⚡' },
    { label: 'Last Update', value: '2 days ago', color: 'text-purple-400', bgColor: 'bg-purple-500/20', icon: '🔄' }
  ];

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <div className="dashboard-topbar">
        <div className="flex justify-between items-center h-16 px-8">
          <div className="flex items-center space-x-6">
            <h1 className="dashboard-title text-3xl">Dashboard</h1>
            <div className="h-6 w-px bg-gray-600"></div>
            <span className="dashboard-subtitle text-lg">Welcome back, {user?.profile?.name || user?.email?.split('@')[0]}</span>
          </div>
          <button
            onClick={handleLogout}
            className="dashboard-btn-secondary flex items-center space-x-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <div className="dashboard-sidebar w-80">
          <div className="p-8">
            {/* User Profile Section */}
            <div className="dashboard-card p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                  {user?.profile?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{user?.profile?.name || 'User'}</h3>
                  <p className="text-cyan-400 font-medium">Pro Plan</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Navigation</h4>
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`dashboard-nav-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main flex-1">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
                <p className="text-gray-400 text-lg">Here's what's happening with your website</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="dashboard-stat-card">
                    <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                      <span className="text-3xl">{stat.icon}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 font-medium">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions Card */}
              <div className="dashboard-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3 text-3xl">⚡</span> Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="dashboard-card p-6 hover:scale-105 transition-transform text-left">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                      <i className="fas fa-eye text-cyan-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-white text-lg mb-2">View Live Site</h4>
                    <p className="text-gray-400 text-sm">Open your website in a new tab</p>
                  </button>
                  <button className="dashboard-card p-6 hover:scale-105 transition-transform text-left">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                      <i className="fas fa-edit text-purple-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-white text-lg mb-2">Request Changes</h4>
                    <p className="text-gray-400 text-sm">Submit update requests</p>
                  </button>
                  <button className="dashboard-card p-6 hover:scale-105 transition-transform text-left">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                      <i className="fas fa-headset text-green-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-white text-lg mb-2">Get Support</h4>
                    <p className="text-gray-400 text-sm">Chat with our team</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="dashboard-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3 text-3xl">📋</span> Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'Website went live', time: '2 days ago', icon: '🚀', color: 'text-green-400' },
                    { action: 'SSL certificate installed', time: '3 days ago', icon: '🔒', color: 'text-cyan-400' },
                    { action: 'Content update completed', time: '5 days ago', icon: '✅', color: 'text-blue-400' },
                    { action: 'Account created', time: '7 days ago', icon: '🎉', color: 'text-purple-400' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{activity.icon}</span>
                        <div>
                          <p className="text-white font-medium text-lg">{activity.action}</p>
                          <p className="text-gray-500 text-sm">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`${activity.color} text-sm font-medium`}>Completed</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Website Section */}
          {activeSection === 'website' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Website Management</h2>
                <p className="text-gray-400 text-lg">Manage and monitor your website</p>
              </div>

              <div className="dashboard-card p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Website Details</h3>
                    <div className="space-y-4">
                      <div>
                        <dt className="text-gray-400 text-sm font-medium mb-1">Domain</dt>
                        <dd className="text-white font-semibold text-lg">yourbusiness.com</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm font-medium mb-1">Status</dt>
                        <dd className="text-green-400 font-semibold text-lg flex items-center">
                          <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>Live
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm font-medium mb-1">SSL Certificate</dt>
                        <dd className="text-white font-semibold text-lg">Active</dd>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <dt className="text-gray-400 text-sm font-medium mb-1">Page Speed</dt>
                        <dd className="text-white font-semibold text-lg">98/100</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm font-medium mb-1">Mobile Score</dt>
                        <dd className="text-white font-semibold text-lg">100/100</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400 text-sm font-medium mb-1">SEO Score</dt>
                        <dd className="text-white font-semibold text-lg">95/100</dd>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex space-x-4">
                  <button className="dashboard-btn-primary">
                    <i className="fas fa-external-link-alt"></i>
                    <span>View Live Site</span>
                  </button>
                  <button className="dashboard-btn-secondary">
                    <i className="fas fa-download"></i>
                    <span>Download Backup</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Analytics Overview</h2>
                <p className="text-gray-400 text-lg">Track your website's performance</p>
              </div>

              <div className="dashboard-card p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center p-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <p className="text-5xl font-bold text-cyan-400 mb-3">12,847</p>
                    <p className="text-gray-300 text-lg font-medium">Total Visitors</p>
                    <p className="text-green-400 text-sm mt-2 font-medium">↑ 23% this month</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <p className="text-5xl font-bold text-purple-400 mb-3">3.2s</p>
                    <p className="text-gray-300 text-lg font-medium">Avg. Load Time</p>
                    <p className="text-green-400 text-sm mt-2 font-medium">↓ 0.5s improvement</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-5xl font-bold text-green-400 mb-3">4.8</p>
                    <p className="text-gray-300 text-lg font-medium">User Rating</p>
                    <p className="text-yellow-400 text-sm mt-2 font-medium">★★★★★</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50">
                  <h3 className="font-semibold text-white text-xl mb-6">Traffic Sources</h3>
                  <div className="space-y-4">
                    {[
                      { source: 'Direct', percentage: 45, color: 'bg-cyan-500' },
                      { source: 'Google', percentage: 30, color: 'bg-blue-500' },
                      { source: 'Social Media', percentage: 15, color: 'bg-purple-500' },
                      { source: 'Referrals', percentage: 10, color: 'bg-pink-500' }
                    ].map((source, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300 font-medium">{source.source}</span>
                          <span className="text-white font-semibold">{source.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div className={`${source.color} h-3 rounded-full transition-all duration-500`} style={{width: `${source.percentage}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would go here with similar styling... */}
          {activeSection === 'updates' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Request Updates</h2>
                <p className="text-gray-400 text-lg">Submit changes to your website</p>
              </div>
              <div className="dashboard-card p-8">
                <p className="text-gray-300 text-lg">Update request form would be here...</p>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h2>
                <p className="text-gray-400 text-lg">Manage your subscription and billing</p>
              </div>
              <div className="dashboard-card p-8">
                <p className="text-gray-300 text-lg">Billing information would be here...</p>
              </div>
            </div>
          )}

          {activeSection === 'support' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Support Center</h2>
                <p className="text-gray-400 text-lg">Get help when you need it</p>
              </div>
              <div className="dashboard-card p-8">
                <p className="text-gray-300 text-lg">Support options would be here...</p>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
                <p className="text-gray-400 text-lg">Manage your profile and preferences</p>
              </div>
              <div className="dashboard-card p-8">
                <p className="text-gray-300 text-lg">Settings panel would be here...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}