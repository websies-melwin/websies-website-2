// Pricing page configuration
const pricingConfig = {
  hero: {
    headline: "Simple, Transparent Pricing",
    subheadline: "£47/month. No contracts. Cancel anytime.",
    reassurance: "Preview concepts first. Subscribe only if you like one.",
    ctaText: "Get Your Free Demo",
    ctaLink: "/demo"
  },
  
  plans: [
    {
      id: "standard",
      name: "Standard",
      price: "£47",
      period: "/mo",
      description: "Perfect for most businesses",
      popular: true,
      features: [
        "Custom code (no WordPress)",
        "Vercel hosting + SSL/CDN",
        "Fully responsive design",
        "Basic SEO optimization",
        "Analytics baseline setup",
        "Maintenance & updates included",
        "Bug fixes & backups",
        "Typical delivery ~7 days"
      ],
      ctaText: "Get Your Free Demo",
      ctaLink: "/demo"
    },
    {
      id: "custom",
      name: "Custom",
      price: "Price on request",
      period: "",
      description: "For complex requirements",
      popular: false,
      features: [
        "Everything in Standard",
        "E-commerce functionality",
        "Booking systems",
        "CRM/Zapier/GA/Pixel integrations", 
        "Multilingual support",
        "AI chatbot integration",
        "Advanced SEO optimization",
        "Performance optimization"
      ],
      note: "Consultation happens AFTER the demo, not here.",
      ctaText: "Get Your Free Demo",
      ctaLink: "/demo"
    }
  ],
  
  included: {
    title: "What's Always Included",
    note: "Domain and paid third-party tools are not included; we help connect them.",
    features: [
      {
        icon: "fa-solid fa-server",
        title: "Vercel Hosting",
        description: "Lightning-fast hosting with global CDN"
      },
      {
        icon: "fa-solid fa-shield-alt",
        title: "SSL Certificate", 
        description: "Secure HTTPS encryption included"
      },
      {
        icon: "fa-solid fa-mobile-alt",
        title: "Responsive Design",
        description: "Perfect on all devices and screens"
      },
      {
        icon: "fa-solid fa-search",
        title: "Basic SEO",
        description: "Search engine optimization baseline"
      },
      {
        icon: "fa-solid fa-chart-line",
        title: "Analytics Setup",
        description: "Google Analytics integration"
      },
      {
        icon: "fa-solid fa-tools",
        title: "Maintenance",
        description: "Regular updates and monitoring"
      },
      {
        icon: "fa-solid fa-bug",
        title: "Bug Fixes",
        description: "Quick resolution of any issues"
      },
      {
        icon: "fa-solid fa-backup",
        title: "Security & Backups",
        description: "Data protection and recovery"
      }
    ]
  },
  
  howItWorks: {
    title: "How It Works",
    subtitle: "No obligation. No card needed for the demo.",
    steps: [
      {
        number: 1,
        title: "Click Get Your Free Demo",
        description: "Start with our simple demo request"
      },
      {
        number: 2, 
        title: "AI Captures Your Needs",
        description: "Our AI understands your vision on the /demo page"
      },
      {
        number: 3,
        title: "Review Demo Concepts",
        description: "We send several demo concepts for review"
      },
      {
        number: 4,
        title: "Choose & Subscribe",
        description: "Pick one → subscribe (Standard or agree Custom)"
      },
      {
        number: 5,
        title: "We Build & Launch",
        description: "Your website goes live within 7 days"
      }
    ]
  },
  
  faq: [
    {
      question: "Is the demo really free?",
      answer: "Yes! Completely free with no obligation. You'll see exactly how your website will look before making any payment decision."
    },
    {
      question: "How long does delivery take after subscribing?",
      answer: "We deliver your complete website within 7 days of subscription. If we miss this deadline, your first month is free."
    },
    {
      question: "What exactly is included in £47/month?",
      answer: "Everything: custom design, hosting, SSL, unlimited updates, mobile optimization, basic SEO, analytics setup, maintenance, and 24/7 support. No hidden fees."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! No contracts or cancellation fees. Give us 30 days notice and we'll even help you export your website if needed."
    },
    {
      question: "Do I own the code and website?",
      answer: "Yes, you own all the code and content. If you cancel, you can take everything with you. We build with modern, portable technologies."
    },
    {
      question: "How do you handle domain and email setup?",
      answer: "We help you connect your domain and set up email, but you purchase these separately. This keeps costs transparent and gives you full control."
    },
    {
      question: "What's your revision policy?",
      answer: "Unlimited revisions are included in your monthly plan. Small changes are typically completed within 24-48 hours."
    },
    {
      question: "Do you provide training?",
      answer: "Yes! We provide documentation and training so you can make basic updates yourself, plus our support team is always available."
    }
  ],
  
  trust: {
    stats: [
      { number: "500+", label: "Websites Delivered" },
      { number: "4.9/5", label: "Client Rating" },  
      { number: "99.9%", label: "Uptime" }
    ],
    testimonials: [
      {
        text: "Websies delivered exactly what they promised. Our café website was live in 6 days and bookings increased by 40% in the first month!",
        author: "Sarah Chen",
        title: "Café Owner"
      },
      {
        text: "As a startup, budget was tight. Websies gave us a premium website for the cost of a fancy dinner. Absolute game-changer!",
        author: "Marcus Johnson", 
        title: "Startup Founder"
      }
    ]
  },
  
  finalCta: {
    title: "Ready to See Your Website?",
    subtitle: "Preview your website before subscribing.",
    ctaText: "Get Your Free Demo",
    ctaLink: "/demo"
  }
};

// Export for use in pricing page
if (typeof module !== 'undefined' && module.exports) {
  module.exports = pricingConfig;
}