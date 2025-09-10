'use client';

import { useState } from 'react';

export default function Tabs({ tabs, defaultTab = 0, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 font-medium transition ${
              activeTab === index 
                ? 'border-b-2 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ 
              borderColor: activeTab === index ? 'var(--accent-cyan)' : 'transparent' 
            }}
          >
            {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}