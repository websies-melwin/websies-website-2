import Link from 'next/link';

export default function SiteFooter() {
  return (
    /* Global Footer Component - Matching footer-loader.js exactly */
    <footer id="footer" className="relative bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6 py-16">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <h3 className="text-3xl font-montserrat font-bold text-white mr-4">Websies</h3>
                <div className="text-[var(--accent-cyan)] animate-pulse">✨</div>
              </div>
              <p className="text-[var(--text-muted)] font-inter text-base mb-8 max-w-lg leading-relaxed">
                Revolutionary web design for modern entrepreneurs. Beautiful websites, delivered in 7 days, for just £47/month.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group"
                >
                  <i className="fa-brands fa-twitter text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group"
                >
                  <i className="fa-brands fa-instagram text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group"
                >
                  <i className="fa-brands fa-linkedin text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 cursor-pointer group"
                >
                  <i className="fa-brands fa-youtube text-[var(--text-muted)] group-hover:text-[var(--bg-primary)]"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[var(--text-primary)] font-montserrat font-bold mb-6 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/pricing" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/reviews" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/referral" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Referral Program
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#about" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/login" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Client Portal
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[var(--text-primary)] font-montserrat font-bold mb-6 text-sm uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Live Chat
                  </a>
                </li>
                <li>
                  <Link 
                    href="/dashboard" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Request Updates
                  </Link>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors font-inter text-sm cursor-pointer flex items-center group"
                  >
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        
          <div className="border-t border-white/10 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[var(--text-muted)] font-inter text-xs">
                © 2024 Websies. All rights reserved. Built with passion for modern entrepreneurs.
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--text-muted)] font-inter text-xs">500+ Happy Clients</span>
                </div>
                <Link 
                  href="/pricing" 
                  className="text-[var(--accent-cyan)] px-5 py-2 border border-[var(--accent-cyan)] rounded-lg font-inter font-medium text-sm hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 inline-flex items-center gap-2"
                >
                  <i className="fas fa-rocket text-xs"></i>
                  Start Free Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}