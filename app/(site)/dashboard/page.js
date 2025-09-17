'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        if (!currentUser) {
          router.push('/login');
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">Websies Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {user.profile?.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-user-circle text-cyan-400 text-3xl"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">
                        Account Status
                      </dt>
                      <dd className="text-lg font-medium text-white">
                        Active
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-envelope text-blue-400 text-3xl"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">
                        Email
                      </dt>
                      <dd className="text-lg font-medium text-white truncate">
                        {user.email}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-building text-green-400 text-3xl"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">
                        Business
                      </dt>
                      <dd className="text-lg font-medium text-white truncate">
                        {user.profile?.business_name || 'Not set'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="mt-8">
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Dashboard Overview
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  Welcome to your Websies dashboard. Here you can manage your website and account settings.
                </p>
              </div>
              <div className="border-t border-gray-700">
                <dl>
                  <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-400">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      {user.profile?.name || 'Not set'}
                    </dd>
                  </div>
                  <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-400">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-400">
                      Business name
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      {user.profile?.business_name || 'Not set'}
                    </dd>
                  </div>
                  <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-400">
                      Member since
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      {user.profile?.created_at ? new Date(user.profile.created_at).toLocaleDateString() : 'Unknown'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200">
                <i className="fas fa-globe text-2xl mb-2"></i>
                <div className="text-sm font-medium">View Website</div>
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                <i className="fas fa-edit text-2xl mb-2"></i>
                <div className="text-sm font-medium">Request Changes</div>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200">
                <i className="fas fa-cog text-2xl mb-2"></i>
                <div className="text-sm font-medium">Settings</div>
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                <i className="fas fa-life-ring text-2xl mb-2"></i>
                <div className="text-sm font-medium">Support</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}