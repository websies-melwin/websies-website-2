'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Redirect to the static HTML for now
    window.location.href = '/index.html';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Redirecting to homepage...</div>
    </div>
  );
}