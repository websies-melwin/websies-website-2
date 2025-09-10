'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 🟡 TODO: Check Supabase auth status
  }, []);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      {/* Global Header Component - Matching header-loader.js exactly */}
      <header 
        id="header" 
        className="fixed w-full top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.12) 50%, rgba(0,0,0,0.1) 100%)',
          backdropFilter: 'blur(25px) saturate(200%)',
          WebkitBackdropFilter: 'blur(25px) saturate(200%)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-montserrat font-bold text-white">
            Websies
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`${isActive('/') ? 'text-accent' : 'text-white/70'} hover:text-accent font-inter text-sm transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/#process" 
              className="text-white/70 hover:text-accent font-inter text-sm transition-colors"
            >
              Process
            </Link>
            <Link 
              href="/pricing" 
              className={`${isActive('/pricing') ? 'text-accent' : 'text-white/70'} hover:text-accent font-inter text-sm transition-colors`}
            >
              Pricing
            </Link>
            <Link 
              href="/reviews" 
              className={`${isActive('/reviews') ? 'text-accent' : 'text-white/70'} hover:text-accent font-inter text-sm transition-colors`}
            >
              Reviews
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive('/contact') ? 'text-accent' : 'text-white/70'} hover:text-accent font-inter text-sm transition-colors`}
            >
              Contact
            </Link>
          </nav>
          
          {/* CTA Button and User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* User Menu (for logged in users) */
              <div className="relative">
                <div 
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center cursor-pointer"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <span className="text-white font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-lg py-2">
                    <Link href="/dashboard" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition">
                      Dashboard
                    </Link>
                    <Link href="/dashboard#profile" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition">
                      Profile
                    </Link>
                    <div className="border-t border-white/10 my-2"></div>
                    <button 
                      onClick={() => {/* logout */}} 
                      className="block w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button (for non-logged in users) */
              <div 
                className="hidden sm:flex items-center cursor-pointer group"
                onClick={() => setShowLoginModal(true)}
              >
                <i className="fas fa-user-circle text-[var(--accent-cyan)] text-3xl hover:opacity-80 transition-all"></i>
              </div>
            )}
            
            {/* Mobile Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-dark/95 backdrop-blur-md border-t border-white/5">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link 
                href="/" 
                className="block text-white/70 hover:text-accent font-inter text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#process" 
                className="block text-white/70 hover:text-accent font-inter text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Process
              </Link>
              <Link 
                href="/pricing" 
                className="block text-white/70 hover:text-accent font-inter text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/reviews" 
                className="block text-white/70 hover:text-accent font-inter text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/contact" 
                className="block text-white/70 hover:text-accent font-inter text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {!user && (
                <div className="pt-4 border-t border-white/10">
                  <div 
                    className="flex items-center justify-center py-3 cursor-pointer group"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <i className="fas fa-user-circle text-[var(--accent-cyan)] text-3xl hover:opacity-80 transition-all"></i>
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Login Modal - Matching header-loader.js exactly */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-gradient-to-br from-[var(--bg-surface-elevated)] to-[var(--bg-surface)] border border-white/10 rounded-2xl p-10 w-full max-w-md relative">
            <button 
              className="absolute top-5 right-5 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              onClick={() => setShowLoginModal(false)}
            >
              <i className="fa-solid fa-xmark text-white"></i>
            </button>
            
            <h2 className="text-2xl font-montserrat font-bold text-white mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-white/60 text-sm text-center mb-8">
              Log in to access your dashboard
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // 🟡 TODO: Handle login
            }}>
              <input 
                type="email" 
                placeholder="Email address" 
                required
                className="w-full p-3 mb-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-cyan"
              />
              <input 
                type="password" 
                placeholder="Password" 
                required
                className="w-full p-3 mb-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-cyan"
              />
              
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white/60 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-accent text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <button 
                type="submit" 
                className="w-full gradient-primary text-white py-3 rounded-full font-montserrat font-semibold hover:scale-105 transition-all duration-300"
              >
                Log In
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <Link href="/login" className="text-accent hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}