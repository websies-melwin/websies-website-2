// Authentication System for Websies

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (isLoggedIn && userEmail) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
        if (userMenu) userMenu.classList.add('active');
        
        // Set user initial in avatar
        const userInitial = document.getElementById('userInitial');
        if (userInitial && userName) {
            userInitial.textContent = userName.charAt(0).toUpperCase();
        }
        
        // Show/hide content based on login status
        updateContentVisibility(true);
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
        if (userMenu) userMenu.classList.remove('active');
        
        // Show/hide content based on login status
        updateContentVisibility(false);
    }
}

// Open login modal
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
        // Focus on email input
        setTimeout(() => {
            const emailInput = document.getElementById('loginEmail');
            if (emailInput) emailInput.focus();
        }, 100);
    }
}

// Close login modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simple validation (in a real app, this would be server-side)
    if (email && password) {
        // Simulate successful login
        // In a real app, you would validate credentials with a server
        
        // Extract username from email
        const userName = email.split('@')[0];
        
        // Store login status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', userName);
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // Close modal
        closeLoginModal();
        
        // Update UI
        checkAuthStatus();
        
        // Show success message
        showNotification('Welcome back, ' + userName + '!', 'success');
    } else {
        showNotification('Please enter valid credentials', 'error');
    }
}

// Logout function
function logout() {
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Update UI
    checkAuthStatus();
    
    // Show logout message
    showNotification('You have been logged out', 'info');
    
    // Redirect to home if on a protected page
    if (window.location.hash === '#dashboard' || window.location.hash === '#profile') {
        window.location.hash = '';
    }
}

// Toggle user dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userAvatar && userDropdown && !userAvatar.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('active');
    }
});

// Update content visibility based on login status
function updateContentVisibility(isLoggedIn) {
    // Elements to show only when logged in
    const loggedInElements = document.querySelectorAll('.logged-in-only');
    loggedInElements.forEach(element => {
        element.style.display = isLoggedIn ? 'block' : 'none';
    });
    
    // Elements to hide when logged in
    const loggedOutElements = document.querySelectorAll('.logged-out-only');
    loggedOutElements.forEach(element => {
        element.style.display = isLoggedIn ? 'none' : 'block';
    });
    
    // Update CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        if (isLoggedIn) {
            button.textContent = 'Go to Dashboard';
            button.onclick = function() {
                window.location.hash = '#dashboard';
            };
        }
    });
}

// Switch to signup (placeholder - would need signup modal implementation)
function switchToSignup() {
    closeLoginModal();
    showNotification('Signup feature coming soon!', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'var(--accent-cyan)' : type === 'error' ? '#FF416C' : '#0A84FF'};
        color: ${type === 'success' ? 'var(--bg-primary)' : 'white'};
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
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
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('loginModal');
    const modalContent = document.querySelector('.login-modal');
    
    if (modal && modal.classList.contains('active') && !modalContent.contains(event.target)) {
        closeLoginModal();
    }
});

