'use client';

import { useState } from 'react';

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
      // 🟡 TODO: Default form submission handler
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm">Your Name *</label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Your Email *</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Business Name</label>
          <input 
            type="text" 
            name="business"
            value={formData.business}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm">Your Message *</label>
        <textarea 
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Send Message
      </button>
    </form>
  );
}