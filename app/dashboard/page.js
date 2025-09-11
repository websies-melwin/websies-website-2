'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';

export default function DashboardPage() {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {profile?.name || user?.email}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-globe text-cyan-400 text-xl"></i>
              </div>
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Website Status</h3>
            <p className="text-gray-400 text-sm">Your website is live and running smoothly</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-400/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-credit-card text-purple-400 text-xl"></i>
              </div>
              <span className="text-yellow-400 text-sm font-medium">
                {profile?.subscription_status || 'Inactive'}
              </span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Subscription</h3>
            <p className="text-gray-400 text-sm">
              Plan: {profile?.subscription_plan || 'No active plan'}
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-line text-blue-400 text-xl"></i>
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-400 text-sm">View your website performance metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-white text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-edit text-cyan-400 mr-3"></i>
                    <span className="text-white">Request Website Changes</span>
                  </div>
                  <i className="fas fa-arrow-right text-gray-500 group-hover:text-cyan-400 transition-colors"></i>
                </div>
              </button>
              
              <button className="w-full text-left p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-headset text-purple-400 mr-3"></i>
                    <span className="text-white">Contact Support</span>
                  </div>
                  <i className="fas fa-arrow-right text-gray-500 group-hover:text-purple-400 transition-colors"></i>
                </div>
              </button>

              <button 
                onClick={() => router.push('/account')}
                className="w-full text-left p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-user-cog text-blue-400 mr-3"></i>
                    <span className="text-white">Manage Account</span>
                  </div>
                  <i className="fas fa-arrow-right text-gray-500 group-hover:text-blue-400 transition-colors"></i>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-white text-sm">Website went live</p>
                  <p className="text-gray-500 text-xs">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-white text-sm">Account created</p>
                  <p className="text-gray-500 text-xs">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="text-white text-sm">Subscription activated</p>
                  <p className="text-gray-500 text-xs">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}