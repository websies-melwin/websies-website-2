'use client';

export default function CreativePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Creative Assistant
          </h1>
          <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
            Get instant website ideas and content suggestions powered by AI
          </p>
          
          <div className="modern-card p-8 mb-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-400">
                🟡 TODO: AI Creative Assistant Integration
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                This will connect to an AI service to generate creative website ideas,
                content suggestions, and design recommendations based on your industry.
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-left mb-2 text-sm">Business Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  placeholder="Enter your business name"
                />
              </div>
              
              <div>
                <label className="block text-left mb-2 text-sm">Industry</label>
                <select className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none">
                  <option value="">Select your industry</option>
                  <option value="restaurant">Restaurant & Food</option>
                  <option value="salon">Salon & Beauty</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="services">Professional Services</option>
                  <option value="health">Healthcare</option>
                  <option value="tech">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-left mb-2 text-sm">What do you need help with?</label>
                <textarea 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  rows="4"
                  placeholder="Describe what kind of creative help you need..."
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Generate Creative Ideas
              </button>
            </form>
          </div>
          
          <div className="text-center">
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
              Ready to start your website?
            </p>
            <a href="/pricing" className="btn-secondary">
              Get Your FREE Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}