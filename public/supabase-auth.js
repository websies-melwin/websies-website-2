// Supabase Authentication for Public Pages
// This file handles real authentication with Supabase

// Import Supabase client via CDN
const SUPABASE_URL = 'https://izenvkhvvypghmfvflmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZW52a2h2dnlwZ2htZnZmbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQzNDcsImV4cCI6MjA3MzE3MDM0N30.QIimxcBRYuXaByYLLKJ9qImZoAZdJY2hK1eabRPNpH0';

// Initialize Supabase client
let supabase = null;

// Wait for Supabase library to load
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase initialized');
        checkAuthStatus();
    } else {
        console.error('Supabase library not loaded');
    }
}

// Check authentication status
async function checkAuthStatus() {
    if (!supabase) return;
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const userMenu = document.getElementById('userMenu');
        
        if (user) {
            // User is logged in
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
    event.preventDefault();
    
    if (!supabase) {
        showNotification('Authentication system not initialized', 'error');
        return;
    }
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            showNotification(error.message, 'error');
            return;
        }
        
        if (data.user) {
            closeLoginModal();
            checkAuthStatus();
            showNotification('Welcome back!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }
    } catch (error) {
        showNotification('Login failed: ' + error.message, 'error');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    
    if (!supabase) {
        showNotification('Authentication system not initialized', 'error');
        return;
    }
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const name = document.getElementById('signupName').value;
    const businessName = document.getElementById('signupBusiness').value;
    
    try {
        // Sign up the user
        const { data, error } = await supabase.auth.signUp({
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
            showNotification(error.message, 'error');
            return;
        }
        
        if (data.user) {
            // Create profile
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: data.user.email,
                    name: name,
                    business_name: businessName,
                    referral_code: generateReferralCode()
                });
            
            if (profileError) {
                console.error('Profile creation error:', profileError);
            }
            
            showNotification('Account created! Please check your email to verify.', 'success');
            closeSignupModal();
            
            // Auto-login after signup
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        }
    } catch (error) {
        showNotification('Signup failed: ' + error.message, 'error');
    }
}

// Logout function
async function logout() {
    if (!supabase) return;
    
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        checkAuthStatus();
        showNotification('You have been logged out', 'info');
        
        // Redirect to home
        if (window.location.pathname.includes('dashboard')) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Generate referral code
function generateReferralCode() {
    return 'WEB' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Helper functions (keep existing ones)
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
    }
}

function openSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.classList.remove('active');
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
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
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
    // Wait a bit for Supabase library to load
    setTimeout(initSupabase, 1000);
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userAvatar && userDropdown && !userAvatar.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('active');
    }
});