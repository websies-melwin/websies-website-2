'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 🟡 TODO: Connect to email service or database
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Talk About Your Website
            </h1>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Get in touch and we'll show you how we can transform your business in 7 days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="modern-card p-6 text-center">
              <i className="fas fa-phone text-3xl mb-4" style={{ color: 'var(--accent-cyan)' }}></i>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p style={{ color: 'var(--text-muted)' }}>Mon-Fri 9am-6pm</p>
              <p className="font-semibold">+44 20 1234 5678</p>
            </div>

            <div className="modern-card p-6 text-center">
              <i className="fas fa-envelope text-3xl mb-4" style={{ color: 'var(--accent-cyan)' }}></i>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p style={{ color: 'var(--text-muted)' }}>We reply within 24h</p>
              <p className="font-semibold">hello@websies.com</p>
            </div>

            <div className="modern-card p-6 text-center">
              <i className="fas fa-comments text-3xl mb-4" style={{ color: 'var(--accent-cyan)' }}></i>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p style={{ color: 'var(--text-muted)' }}>Instant support</p>
              <p className="font-semibold">Available now</p>
            </div>
          </div>

          <div className="modern-card p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-400">
                🟡 TODO: Connect form to email service
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Your Email *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Business Name</label>
                  <input 
                    type="text" 
                    value={formData.business}
                    onChange={(e) => setFormData({...formData, business: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Your Message *</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button type="submit" className="btn-primary flex-1">
                  Send Message
                </button>
                <a href="/pricing" className="btn-secondary flex-1 text-center">
                  Get FREE Demo Instead
                </a>
              </div>
            </form>
          </div>

          <div className="text-center mt-12">
            <p style={{ color: 'var(--text-muted)' }}>
              Prefer to see your website first?
            </p>
            <p className="text-lg mt-2">
              <a href="/pricing" className="text-gradient font-semibold">
                Get your FREE demo → 
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}