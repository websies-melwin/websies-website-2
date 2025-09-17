'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    businessName: ''
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const user = await auth.getCurrentUser();
      if (user) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (!isLogin && !formData.name) {
      setError('Name is required for signup');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Handle login
        console.log('Attempting login...');
        const { data, error } = await auth.signIn(formData.email, formData.password);
        
        if (error) {
          setError(error.message || 'Login failed');
          return;
        }

        if (data?.user) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        }
      } else {
        // Handle signup
        console.log('Attempting signup...');
        const { data, error } = await auth.signUp(
          formData.email, 
          formData.password,
          {
            name: formData.name,
            business_name: formData.businessName
          }
        );
        
        if (error) {
          setError(error.message || 'Signup failed');
          return;
        }

        if (data?.user) {
          if (data.user.email_confirmed_at) {
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000);
          } else {
            setSuccess('Account created! Please check your email to confirm your account.');
            // Switch to login mode
            setTimeout(() => {
              setIsLogin(true);
              setFormData({ ...formData, name: '', businessName: '' });
            }, 3000);
          }
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearMessages();
    setFormData({
      email: '',
      password: '',
      name: '',
      businessName: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="modern-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Sign in to your account' : 'Get started with Websies'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    placeholder="Your business name"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                placeholder="Enter your password"
                minLength={6}
              />
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={switchMode}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                disabled={loading}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}