'use client';

import { useState } from 'react';

export default function FreeChangeRequestForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    requestType: '',
    description: '',
    priority: 'normal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Change request submitted:', formData);
      // 🟡 TODO: Default submission handler
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
      <div>
        <label className="block mb-2 text-sm">Website URL</label>
        <input 
          type="url" 
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          placeholder="https://yourbusiness.websies.com"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm">Request Type</label>
        <select 
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
        >
          <option value="">Select type...</option>
          <option value="content">Content Update</option>
          <option value="design">Design Change</option>
          <option value="feature">New Feature</option>
          <option value="bug">Bug Fix</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm">Priority</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input 
              type="radio" 
              name="priority"
              value="low"
              checked={formData.priority === 'low'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Low</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="priority"
              value="normal"
              checked={formData.priority === 'normal'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Normal</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              name="priority"
              value="high"
              checked={formData.priority === 'high'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>High</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm">Description *</label>
        <textarea 
          name="description"
          required
          rows="5"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
          placeholder="Describe the changes you need..."
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Submit Request
      </button>
    </form>
  );
}