'use client';

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Sarah Johnson",
      business: "The Coffee House",
      rating: 5,
      text: "Websies transformed our online presence! Our website was live in just 7 days and bookings increased by 40% in the first month.",
      industry: "Restaurant"
    },
    {
      name: "Mike Chen",
      business: "TechStart Solutions",
      rating: 5,
      text: "As a startup, we needed something professional but affordable. Websies delivered beyond our expectations. The £47/month is incredible value.",
      industry: "Technology"
    },
    {
      name: "Emma Williams",
      business: "Glow Beauty Salon",
      rating: 5,
      text: "The FREE demo convinced me immediately. They showed me exactly what my site would look like before I paid anything. Amazing service!",
      industry: "Beauty"
    },
    {
      name: "David Martinez",
      business: "Urban Barbers",
      rating: 5,
      text: "Online bookings are through the roof! The website looks premium and my clients love how easy it is to book appointments.",
      industry: "Barber Shop"
    },
    {
      name: "Lisa Anderson",
      business: "Boutique Fitness",
      rating: 5,
      text: "Cancelled my £5000 agency contract and switched to Websies. Better design, faster delivery, and I'm saving thousands per year.",
      industry: "Fitness"
    },
    {
      name: "James Thompson",
      business: "Local Grocers",
      rating: 5,
      text: "Our local shop needed an online presence. Websies made it happen in a week! Now customers can see our products and deals online.",
      industry: "Retail"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            500+ Happy Businesses
          </h1>
          <p className="text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>
            See what our clients say about their 7-day transformation
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-cyan)' }}>4.9/5</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-cyan)' }}>98%</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Retention Rate</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div key={index} className="modern-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold mr-3">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{review.business}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 mr-1"></i>
                ))}
              </div>
              <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>"{review.text}"</p>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {review.industry}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Them?</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            Get your FREE demo today and see your website before paying anything
          </p>
          <a href="/pricing" className="btn-primary">
            <i className="fas fa-gift mr-2"></i>
            Get Your FREE Demo
          </a>
        </div>
      </div>
    </div>
  );
}