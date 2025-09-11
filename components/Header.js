'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  const getUserInitial = () => {
    if (profile?.name) {
      return profile.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Websies
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm transition-colors ${
                pathname === '/' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm transition-colors ${
                pathname === '/pricing' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Pricing
            </Link>
            {user && (
              <Link 
                href="/dashboard" 
                className={`text-sm transition-colors ${
                  pathname === '/dashboard' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getUserInitial()}
                    </span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm text-white font-semibold">
                        {profile?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <i className="fas fa-tachometer-alt mr-2 w-4"></i>
                      Dashboard
                    </Link>
                    
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <i className="fas fa-user mr-2 w-4"></i>
                      My Account
                    </Link>
                    
                    <div className="border-t border-gray-700">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt mr-2 w-4"></i>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm ${
                pathname === '/' ? 'text-cyan-400' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm ${
                pathname === '/pricing' ? 'text-cyan-400' : 'text-gray-300'
              }`}
            >
              Pricing
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm ${
                    pathname === '/dashboard' ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm ${
                    pathname === '/account' ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm text-red-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-cyan-400"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}