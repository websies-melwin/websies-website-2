// Header Loader - Dynamically loads the global header component
document.addEventListener('DOMContentLoaded', function() {
    // For now, directly load the header to ensure it works
    loadHeaderDirectly();
});

function initializeHeader() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Re-initialize auth functions if auth.js is loaded
    if (typeof initAuth === 'function') {
        initAuth();
    }
}

function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('[data-nav]');
    
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('text-accent');
        link.classList.add('text-white/70');
        
        // Check if this is the active page
        if (currentPage === 'pricing.html' && link.getAttribute('data-nav') === 'pricing') {
            link.classList.remove('text-white/70');
            link.classList.add('text-accent');
        } else if ((currentPage === 'index.html' || currentPage === '') && link.getAttribute('data-nav') === 'home') {
            link.classList.remove('text-white/70');
            link.classList.add('text-accent');
        }
    });
}

// Fallback function to load header directly
function loadHeaderDirectly() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
<!-- Global Header Component -->
<header id="header" class="fixed w-full top-0 z-50 border-b border-white/5">
    <div class="container mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">
        <!-- Logo -->
        <a href="index.html" class="text-2xl font-inter font-bold text-white">
            Websies
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
            <a href="index.html" data-nav="home" class="text-white/70 hover:text-accent font-inter text-sm transition-colors">Home</a>
            <a href="index.html#process" data-nav="process" class="text-white/70 hover:text-accent font-inter text-sm transition-colors">Process</a>
            <a href="pricing.html" data-nav="pricing" class="text-white/70 hover:text-accent font-inter text-sm transition-colors">Pricing</a>
            <a href="index.html#testimonials" data-nav="testimonials" class="text-white/70 hover:text-accent font-inter text-sm transition-colors">Reviews</a>
            <a href="index.html#contact" data-nav="contact" class="text-white/70 hover:text-accent font-inter text-sm transition-colors">Contact</a>
        </nav>
        
        <!-- CTA Button and User Menu -->
        <div class="flex items-center space-x-4">
            <!-- User Menu (for logged in users) -->
            <div class="user-menu hidden" id="userMenu">
                <button class="flex items-center space-x-2 group" onclick="toggleUserDropdown()">
                    <div class="user-avatar" id="userAvatar">
                        <span id="userInitial">U</span>
                    </div>
                    <svg id="dropdownArrow" class="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <div class="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
                        <p class="text-sm font-semibold text-white" id="userName">User</p>
                        <p class="text-xs text-gray-400 truncate" id="userEmail">user@example.com</p>
                    </div>
                    <div class="py-2">
                        <a href="/dashboard" class="dropdown-item flex items-center">
                            <i class="fas fa-tachometer-alt w-5 text-cyan-400/70 mr-3"></i>
                            <span>Dashboard</span>
                        </a>
                        <a href="/account" class="dropdown-item flex items-center">
                            <i class="fas fa-user-cog w-5 text-purple-400/70 mr-3"></i>
                            <span>My Account</span>
                        </a>
                    </div>
                    <div class="border-t border-gray-700/50 py-2">
                        <a href="#" class="dropdown-item flex items-center text-red-400/80 hover:text-red-400" onclick="logout()">
                            <i class="fas fa-sign-out-alt w-5 mr-3"></i>
                            <span>Sign Out</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Login Button (for non-logged in users) -->
            <div id="loginBtn" class="hidden sm:flex items-center cursor-pointer group" onclick="openLoginModal()">
                <i class="fas fa-user-circle text-[var(--accent-cyan)] text-3xl hover:opacity-80 transition-all"></i>
            </div>
            
            <!-- Mobile Menu -->
            <button id="mobile-menu-btn" class="lg:hidden text-white/70 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </div>
    
    <!-- Mobile Menu -->
    <nav id="mobile-menu" class="lg:hidden hidden bg-dark/95 backdrop-blur-md border-t border-white/5">
        <div class="container mx-auto px-4 py-4 space-y-3">
            <a href="index.html" class="block text-white/70 hover:text-accent font-inter text-sm py-2">Home</a>
            <a href="index.html#process" class="block text-white/70 hover:text-accent font-inter text-sm py-2">Process</a>
            <a href="pricing.html" class="block text-white/70 hover:text-accent font-inter text-sm py-2">Pricing</a>
            <a href="index.html#testimonials" class="block text-white/70 hover:text-accent font-inter text-sm py-2">Reviews</a>
            <a href="index.html#contact" class="block text-white/70 hover:text-accent font-inter text-sm py-2">Contact</a>
            <div class="pt-4 border-t border-white/10">
                <div id="mobileLoginBtn" class="flex items-center justify-center py-3 cursor-pointer group" onclick="openLoginModal()">
                    <i class="fas fa-user-circle text-[var(--accent-cyan)] text-3xl hover:opacity-80 transition-all"></i>
                </div>
            </div>
        </div>
    </nav>
</header>

<!-- Login Modal -->
<div class="modal-overlay" id="loginModal">
    <div class="login-modal">
        <button class="close-modal" onclick="closeLoginModal()">
            <i class="fa-solid fa-xmark"></i>
        </button>
        
        <h2 class="text-2xl font-montserrat font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p class="text-white/60 text-sm text-center mb-8">Log in to access your dashboard</p>
        
        <form class="login-form" onsubmit="handleLogin(event)">
            <input type="email" id="loginEmail" placeholder="Email address" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            
            <div class="flex items-center justify-between mb-6">
                <label class="flex items-center">
                    <input type="checkbox" class="mr-2" id="rememberMe">
                    <span class="text-white/60 text-sm">Remember me</span>
                </label>
                <a href="#" class="text-accent text-sm hover:underline">Forgot password?</a>
            </div>
            
            <button type="submit" class="w-full gradient-primary text-white py-3 rounded-full font-montserrat font-semibold hover:scale-105 transition-all duration-300">
                Log In
            </button>
        </form>
        
        <div class="mt-6 pt-6 border-t border-white/10 text-center">
            <p class="text-white/60 text-sm">
                Don't have an account? 
                <a href="#" class="text-accent hover:underline" onclick="switchToSignup()">Sign up</a>
            </p>
        </div>
    </div>
</div>`;
        initializeHeader();
        setActiveNavigation();
    }
}

// Export functions for use in other scripts
window.toggleUserDropdown = function() {
    const dropdown = document.getElementById('userDropdown');
    const arrow = document.getElementById('dropdownArrow');
    if (dropdown) {
        dropdown.classList.toggle('active');
        if (arrow) {
            arrow.classList.toggle('rotate-180');
        }
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('#userMenu')) {
            dropdown.classList.remove('active');
            if (arrow) {
                arrow.classList.remove('rotate-180');
            }
            document.removeEventListener('click', closeDropdown);
        }
    });
}

window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
    }
}

window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

window.handleLogin = function(event) {
    event.preventDefault();
    // This will be handled by auth.js
    if (typeof handleLoginSubmit === 'function') {
        handleLoginSubmit(event);
    }
}

window.switchToSignup = function() {
    // Implement signup modal switch
    console.log('Switch to signup');
}