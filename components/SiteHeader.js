'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    return pathname === path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserDropdown(false);
    router.push('/');
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
            {isAuthenticated ? (
              /* User Menu (for logged in users) */
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-2 group"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
                    <span className="text-white font-bold">
                      {profile?.name ? profile.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-white/70 group-hover:text-white transition-all duration-200 ${showUserDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
                      <p className="text-sm font-semibold text-white">
                        {profile?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    
                    <div className="py-2">
                      <Link 
                        href="/dashboard" 
                        className="flex items-center px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all group"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <i className="fas fa-tachometer-alt w-5 text-cyan-400/70 group-hover:text-cyan-400 mr-3"></i>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      
                      <Link 
                        href="/account" 
                        className="flex items-center px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all group"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <i className="fas fa-user-cog w-5 text-purple-400/70 group-hover:text-purple-400 mr-3"></i>
                        <span className="font-medium">My Account</span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-700/50 py-2">
                      <button 
                        onClick={handleSignOut} 
                        className="flex items-center w-full px-4 py-2.5 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all group"
                      >
                        <i className="fas fa-sign-out-alt w-5 mr-3"></i>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button (for non-logged in users) */
              <Link 
                href="/auth"
                className="hidden sm:flex items-center cursor-pointer group"
              >
                <i className="fas fa-user-circle text-[var(--accent-cyan)] text-3xl hover:opacity-80 transition-all"></i>
              </Link>
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
              <div className="pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      className="flex items-center text-gray-300 hover:text-cyan-400 py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-tachometer-alt w-5 mr-3"></i>
                      Dashboard
                    </Link>
                    <Link 
                      href="/account" 
                      className="flex items-center text-gray-300 hover:text-purple-400 py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-user-cog w-5 mr-3"></i>
                      My Account
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-red-400 hover:text-red-300 py-2 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt w-5 mr-3"></i>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth"
                    className="flex items-center justify-center py-3 cursor-pointer group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-user-circle text-[var(--accent-cyan)] text-3xl hover:opacity-80 transition-all"></i>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}