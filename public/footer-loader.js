// Footer Loader - Dynamically loads the global footer component
document.addEventListener('DOMContentLoaded', function() {
    loadFooterDirectly();
});

function loadFooterDirectly() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
<!-- Global Footer Component -->
<footer id="footer" class="relative bg-[var(--bg-primary)]">
    <div class="container mx-auto px-6 py-16">
        <div class="">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
                <div class="lg:col-span-2">
                    <div class="flex items-center mb-6">
                        <h3 class="text-3xl font-inter font-bold text-white mr-4">Websies</h3>
                        <div class="text-[var(--accent-cyan)] animate-pulse">✨</div>
                    </div>
                    <p class="text-[var(--text-muted)] font-inter text-base mb-8 max-w-lg leading-relaxed">
                        Revolutionary web design for modern entrepreneurs. Beautiful websites, delivered in 7 days, for just £47/month.
                    </p>
                    <div class="flex space-x-3">
                        <span class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group">
                            <i class="fa-brands fa-twitter text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                        </span>
                        <span class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group">
                            <i class="fa-brands fa-instagram text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                        </span>
                        <span class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group">
                            <i class="fa-brands fa-linkedin text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                        </span>
                        <span class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group">
                            <i class="fa-brands fa-youtube text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                        </span>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-[var(--text-primary)] font-montserrat font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
                    <ul class="space-y-3">
                        <li><a href="pricing.html" class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Pricing
                        </a></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Portfolio
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Referral Program
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            About Us
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Contact
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Client Portal
                        </span></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-[var(--text-primary)] font-montserrat font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
                    <ul class="space-y-3">
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Help Center
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Live Chat
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Request Updates
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Terms of Service
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Privacy Policy
                        </span></li>
                        <li><span class="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group">
                            <span class="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            Cookie Policy
                        </span></li>
                    </ul>
                </div>
            </div>
        
        <div class="border-t border-white/10 pt-8 mt-12">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="text-[var(--text-muted)] font-inter text-xs">
                    © 2024 Websies. All rights reserved. Built with passion for modern entrepreneurs.
                </div>
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
                        <span class="text-[var(--text-muted)] font-inter text-xs">500+ Happy Clients</span>
                    </div>
                    <a href="pricing.html" class="text-[var(--accent-cyan)] px-5 py-2 border border-[var(--accent-cyan)] rounded-lg font-inter font-medium text-sm hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 inline-flex items-center gap-2">
                        <i class="fas fa-rocket text-xs"></i>
                        Start Free Demo
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>`;
    }
}