'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    businessName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Sign in existing user
        const { data, error } = await auth.signIn(formData.email, formData.password);
        
        if (error) {
          setError(error.message);
          return;
        }

        if (data.user) {
          router.push('/dashboard');
        }
      } else {
        // Sign up new user
        const { data, error } = await auth.signUp(
          formData.email, 
          formData.password,
          {
            name: formData.name,
            business_name: formData.businessName
          }
        );
        
        if (error) {
          setError(error.message);
          return;
        }

        if (data.user) {
          // Check if email confirmation is required
          if (!data.session) {
            setError('Please check your email to confirm your account before logging in.');
          } else {
            router.push('/dashboard');
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="modern-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isLogin ? 'Log in to manage your website' : 'Get started with Websies'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block mb-2 text-sm">Full Name</label>
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Business Name (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                    placeholder="Your business or organization name"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block mb-2 text-sm">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm" style={{ color: 'var(--accent-cyan)' }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold" 
                style={{ color: 'var(--accent-cyan)' }}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-center text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Or continue with
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 transition">
                <i className="fab fa-google mr-2"></i>
                Google
              </button>
              <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 transition">
                <i className="fab fa-facebook mr-2"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}