// Supabase Authentication for Public Pages
// This file handles real authentication with Supabase

// Import Supabase client via CDN
const SUPABASE_URL = 'https://izenvkhvvypghmfvflmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZW52a2h2dnlwZ2htZnZmbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQzNDcsImV4cCI6MjA3MzE3MDM0N30.QIimxcBRYuXaByYLLKJ9qImZoAZdJY2hK1eabRPNpH0';

// Initialize Supabase client directly
let supabaseClient = null;

// Initialize Supabase when script loads
(function() {
    // Create script element for Supabase CDN if not already loaded
    if (!window.supabase) {
        console.log('Loading Supabase from CDN...');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@supabase/supabase-js@2.39.3/dist/umd/supabase.js';
        script.onload = function() {
            console.log('Supabase CDN loaded');
            initializeSupabase();
        };
        script.onerror = function() {
            console.error('Failed to load Supabase CDN');
        };
        document.head.appendChild(script);
    } else {
        initializeSupabase();
    }
})();

function initializeSupabase() {
    try {
        if (window.supabase && window.supabase.createClient) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase client initialized successfully');
            checkAuthStatus();
        } else {
            console.error('Supabase createClient not available');
        }
    } catch (error) {
        console.error('Error initializing Supabase:', error);
    }
}

// Check authentication status
async function checkAuthStatus() {
    if (!supabaseClient) {
        console.log('Supabase client not ready');
        return;
    }
    
    try {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        
        if (error) {
            console.log('Auth check error:', error);
        }
        
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const userMenu = document.getElementById('userMenu');
        
        if (user) {
            // User is logged in
            console.log('User is logged in:', user.email);
            if (loginBtn) loginBtn.style.display = 'none';
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
            if (userMenu) userMenu.classList.add('active');
            
            // Set user initial in avatar
            const userInitial = document.getElementById('userInitial');
            if (userInitial) {
                const userName = user.email.split('@')[0];
                userInitial.textContent = userName.charAt(0).toUpperCase();
            }
            
            updateContentVisibility(true);
        } else {
            // User is not logged in
            console.log('User is not logged in');
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
            if (userMenu) userMenu.classList.remove('active');
            
            updateContentVisibility(false);
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

// Handle login
async function handleLogin(event) {
    if (event) event.preventDefault();
    
    console.log('handleLogin called');
    
    if (!supabaseClient) {
        console.error('Supabase client not initialized');
        showNotification('Authentication system not ready. Please refresh the page.', 'error');
        return false;
    }
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!emailInput || !passwordInput) {
        console.error('Login form inputs not found');
        return false;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showNotification('Please enter email and password', 'error');
        return false;
    }
    
    console.log('Attempting login for:', email);
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            console.error('Login error:', error);
            showNotification(error.message || 'Login failed', 'error');
            return false;
        }
        
        if (data && data.user) {
            console.log('Login successful:', data.user.email);
            closeLoginModal();
            checkAuthStatus();
            showNotification('Welcome back!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
            return true;
        }
    } catch (error) {
        console.error('Login exception:', error);
        showNotification('Login failed: ' + (error.message || 'Unknown error'), 'error');
        return false;
    }
}

// Handle signup
async function handleSignup(event) {
    if (event) event.preventDefault();
    
    console.log('handleSignup called');
    
    if (!supabaseClient) {
        console.error('Supabase client not initialized');
        showNotification('Authentication system not ready. Please refresh the page.', 'error');
        return false;
    }
    
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const nameInput = document.getElementById('signupName');
    const businessInput = document.getElementById('signupBusiness');
    
    if (!emailInput || !passwordInput) {
        console.error('Signup form inputs not found');
        return false;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const name = nameInput ? nameInput.value.trim() : '';
    const businessName = businessInput ? businessInput.value.trim() : '';
    
    if (!email || !password) {
        showNotification('Please enter email and password', 'error');
        return false;
    }
    
    console.log('Attempting signup for:', email);
    
    try {
        // Sign up the user
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    business_name: businessName
                }
            }
        });
        
        if (error) {
            console.error('Signup error:', error);
            showNotification(error.message || 'Signup failed', 'error');
            return false;
        }
        
        if (data && data.user) {
            console.log('Signup successful:', data.user.email);
            
            // Create profile in database
            try {
                const { error: profileError } = await supabaseClient
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        email: data.user.email,
                        name: name || email.split('@')[0],
                        business_name: businessName || '',
                        referral_code: generateReferralCode()
                    });
                
                if (profileError) {
                    console.error('Profile creation error:', profileError);
                }
            } catch (profileError) {
                console.error('Profile creation exception:', profileError);
            }
            
            showNotification('Account created! Please check your email to verify.', 'success');
            closeSignupModal();
            
            // Auto-login after signup
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
            return true;
        }
    } catch (error) {
        console.error('Signup exception:', error);
        showNotification('Signup failed: ' + (error.message || 'Unknown error'), 'error');
        return false;
    }
}

// Logout function
async function logout() {
    if (!supabaseClient) {
        console.error('Supabase client not initialized');
        return;
    }
    
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        
        console.log('Logged out successfully');
        checkAuthStatus();
        showNotification('You have been logged out', 'info');
        
        // Redirect to home if on dashboard
        if (window.location.pathname.includes('dashboard')) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('Logout failed', 'error');
    }
}

// Generate referral code
function generateReferralCode() {
    return 'WEB' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Helper functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            const emailInput = document.getElementById('loginEmail');
            if (emailInput) emailInput.focus();
        }, 100);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('active');
        // Clear form
        const form = document.getElementById('loginForm');
        if (form) form.reset();
    }
}

function openSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            const nameInput = document.getElementById('signupName');
            if (nameInput) nameInput.focus();
        }, 100);
    }
}

function closeSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.classList.remove('active');
        // Clear form
        const form = document.getElementById('signupForm');
        if (form) form.reset();
    }
}

function switchToSignup() {
    closeLoginModal();
    openSignupModal();
}

function switchToLogin() {
    closeSignupModal();
    openLoginModal();
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function showNotification(message, type) {
    // Remove any existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: system-ui, -apple-system, sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function updateContentVisibility(isLoggedIn) {
    // Update any content that should be visible only when logged in
    const protectedElements = document.querySelectorAll('.auth-required');
    protectedElements.forEach(el => {
        el.style.display = isLoggedIn ? 'block' : 'none';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for Supabase client...');
    
    // Check if Supabase is already initialized
    if (supabaseClient) {
        console.log('Supabase client already initialized');
        checkAuthStatus();
    } else {
        console.log('Waiting for Supabase to initialize...');
        // Wait and check again
        setTimeout(() => {
            if (supabaseClient) {
                checkAuthStatus();
            }
        }, 2000);
    }
});

// Expose functions to window for global access
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.logout = logout;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openSignupModal = openSignupModal;
window.closeSignupModal = closeSignupModal;
window.switchToSignup = switchToSignup;
window.switchToLogin = switchToLogin;
window.toggleUserDropdown = toggleUserDropdown;

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userAvatar && userDropdown && !userAvatar.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('active');
    }
});

// Add CSS animation
if (!document.querySelector('#auth-animations')) {
    const style = document.createElement('style');
    style.id = 'auth-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}