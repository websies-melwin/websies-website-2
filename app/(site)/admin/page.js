'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 523,
    activeSubscriptions: 498,
    monthlyRevenue: 23406,
    newSignups: 12
  });

  useEffect(() => {
    // 🟡 TODO: Check admin role from Supabase
    // For now, mock authorization
    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            You don't have permission to access this page.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn-primary mt-4"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage users and monitor business metrics</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--text-muted)' }}>Total Users</span>
              <i className="fas fa-users text-blue-400"></i>
            </div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-sm text-green-400">+2.5% from last month</p>
          </div>

          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--text-muted)' }}>Active Subscriptions</span>
              <i className="fas fa-credit-card text-green-400"></i>
            </div>
            <p className="text-3xl font-bold">{stats.activeSubscriptions}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>95% retention rate</p>
          </div>

          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--text-muted)' }}>Monthly Revenue</span>
              <i className="fas fa-pound-sign text-yellow-400"></i>
            </div>
            <p className="text-3xl font-bold">£{stats.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-400">+8% from last month</p>
          </div>

          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--text-muted)' }}>New Signups</span>
              <i className="fas fa-user-plus text-purple-400"></i>
            </div>
            <p className="text-3xl font-bold">{stats.newSignups}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>This week</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="modern-card p-6">
            <h2 className="text-xl font-bold mb-4">Recent Users</h2>
            <div className="space-y-3">
              {[
                { name: 'John Smith', email: 'john@example.com', plan: 'Professional', date: '2024-03-15' },
                { name: 'Emma Wilson', email: 'emma@example.com', plan: 'Professional', date: '2024-03-14' },
                { name: 'Mike Johnson', email: 'mike@example.com', plan: 'Professional', date: '2024-03-13' },
              ].map((user, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{user.plan}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full mt-4">View All Users</button>
          </div>

          <div className="modern-card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-left">
                <i className="fas fa-user-plus mr-3 text-green-400"></i>
                Add New User
              </button>
              <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-left">
                <i className="fas fa-envelope mr-3 text-blue-400"></i>
                Send Newsletter
              </button>
              <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-left">
                <i className="fas fa-chart-bar mr-3 text-purple-400"></i>
                Generate Reports
              </button>
              <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-left">
                <i className="fas fa-cog mr-3 text-yellow-400"></i>
                System Settings
              </button>
            </div>
          </div>
        </div>

        <div className="modern-card p-6">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-400">
              🟡 TODO: Admin features scaffold - connect to Supabase for user management, 
              analytics, and administrative functions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}