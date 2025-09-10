'use client';

export default function ReferralPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="text-green-400 font-semibold">💰 Earn £20 Per Referral</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Turn Your Network Into Income
            </h1>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Refer businesses to Websies and earn £20 for every successful signup
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="modern-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Link</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Get your unique referral link and share it with businesses who need websites
              </p>
            </div>

            <div className="modern-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">They Sign Up</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                When they get their website and start their subscription, you get credited
              </p>
            </div>

            <div className="modern-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Paid</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Receive £20 directly to your account. No limits on how much you can earn!
              </p>
            </div>
          </div>

          <div className="modern-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Why People Love Referring Websies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                <div>
                  <h4 className="font-semibold mb-1">Easy to Recommend</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    With FREE demos and no upfront costs, businesses love trying us out
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                <div>
                  <h4 className="font-semibold mb-1">Instant Credibility</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    500+ happy clients and 7-day delivery makes it an easy sell
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                <div>
                  <h4 className="font-semibold mb-1">Recurring Potential</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Earn bonus rewards for long-term customer referrals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-400 mr-3 mt-1"></i>
                <div>
                  <h4 className="font-semibold mb-1">No Experience Needed</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    You don't need to know web design - we handle everything
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="modern-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Start Earning Today</h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Join our referral program and start earning £20 per successful referral
            </p>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-400">
                🟡 TODO: Referral signup form will connect to dashboard
              </p>
            </div>

            <form className="max-w-md mx-auto space-y-4">
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
              />
              <input 
                type="email" 
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
              />
              <input 
                type="tel" 
                placeholder="Your Phone (optional)"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none"
              />
              <button type="submit" className="btn-primary w-full">
                Join Referral Program
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}