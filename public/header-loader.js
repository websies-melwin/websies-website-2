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
        
        <!-- CTA Button -->
        <div class="flex items-center space-x-4">
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

        </div>
    </nav>
</header>

`;
        initializeHeader();
        setActiveNavigation();
    }
}

