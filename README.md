# Websies - Modern Web Design Agency

A modern, responsive website for Websies, a web design agency offering custom websites for £47/month with 7-day delivery guarantee.

## 🌟 Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern Dark Theme UI/UX**: Clean, professional dark design with advanced color system
- **Video Hero Section**: Engaging hero section with custom tech background video
- **Interactive Elements**: Advanced hover effects, animations, and smooth scrolling
- **Performance Optimized**: Fast loading with optimized assets and video compression
- **SEO Ready**: Structured with proper meta tags and semantic HTML
- **Authentication System**: Login/signup modal with user dashboard
- **Advanced Animations**: Floating elements, glow effects, and transitions
- **Modern Card System**: Glassmorphism effects with elevated surfaces

## 🎨 Design Elements

### Advanced Color System
- **Primary Background**: `#13171F` (Deep Dark Navy)
- **Surface**: `#1A1F2E` (Elevated Dark)  
- **Surface Elevated**: `#212738` (Card Background)
- **Primary Gradient**: `#FF416C` to `#FF4B2B` (Pink to Orange)
- **Accent Cyan**: `#00F2FE` (Bright Cyan)
- **Accent Blue**: `#0A84FF` (Electric Blue)
- **Text Primary**: `#FFFFFF` (Pure White)
- **Text Secondary**: `#B8BCC8` (Light Gray)
- **Text Muted**: `#9CA3AF` (Muted Gray)
- **Border Subtle**: `rgba(255, 255, 255, 0.1)` (Subtle White)
- **Glow Effects**: Cyan and blue glow variations

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Brand Font**: Montserrat (Bold headings and branding)
- **Responsive Sizing**: `clamp(14px, 1vw, 18px)` for scalability

### Key Sections
1. **Hero Section** - Custom tech video background with modern overlay effects
2. **Benefits** - Enhanced hexagon layout with floating animations
3. **Referral Program** - Redesigned with coin animations and glow effects
4. **Target Industries** - Horizontal scrolling with improved card styling
5. **Comparison** - Modern vs traditional approach with enhanced visuals
6. **Pricing** - Simplified structure with glassmorphism cards
7. **Testimonials** - Client reviews with enhanced avatars and backgrounds
8. **Process** - 4-step workflow with improved visual hierarchy
9. **FAQ** - Accordion-style with smooth animations
10. **Call to Action** - Enhanced final conversion with modern styling
11. **Authentication Modal** - Login/signup system with blur effects

## 🛠️ Technologies Used

- **HTML5** - Semantic markup with advanced structure
- **CSS3** - Advanced custom properties and modern animations
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **JavaScript** - Enhanced interactive functionality and modal system
- **Font Awesome** - Comprehensive icon library
- **Google Fonts** - Inter and Montserrat typography with optimized loading
- **Custom Video** - Locally hosted hero background video
- **Authentication System** - Login/signup functionality

## 📁 Project Structure

```
websies_new_website/
├── index.html                    # Main homepage with enhanced features
├── pricing.html                  # Dedicated pricing page
├── hero-background.mp4           # Custom tech hero background video
├── auth.js                       # Authentication system logic
├── config/
│   └── pricing.config.js         # Pricing page configuration
├── reorder_sections.py          # Python utility for section management
├── README.md                    # Enhanced project documentation
└── .git/                        # Git repository with commit history
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional for development)

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. For development, serve via local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

### Viewing the Website
- Open `index.html` directly in browser, or
- Navigate to `http://localhost:8000` if using local server

## 🎯 Key Value Propositions

- **7-Day Delivery**: Fast turnaround guaranteed
- **£47/Month**: Affordable subscription model
- **No Templates**: 100% custom design
- **Unlimited Updates**: Ongoing support included
- **Cancel Anytime**: No long-term contracts
- **All-Inclusive**: Hosting, SSL, and maintenance included

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Custom Animations

- **Float Animation**: Enhanced up/down movement with easing
- **Gentle Float**: Subtle floating for benefit cards with staggered delays
- **Hover Pop**: Advanced scale and translate effects on hover
- **Glow Pulse**: Sophisticated pulsating glow effects
- **Coin Spin**: 360-degree rotation for referral program coins
- **Subtle Float**: Multi-element floating with animation delays
- **Orbit Animation**: Circular motion for decorative elements
- **Backdrop Blur**: Modern glassmorphism effects on modals
- **Scale Transforms**: Smooth scaling transitions on interactive elements

## 🔧 Customization

### Advanced Color System
The website uses CSS custom properties for consistent theming:
```css
:root {
  --bg-primary: #13171F;
  --bg-surface: #1A1F2E;
  --bg-surface-elevated: #212738;
  --text-primary: #FFFFFF;
  --text-secondary: #B8BCC8;
  --text-muted: #9CA3AF;
  --accent-cyan: #00F2FE;
  --accent-blue: #0A84FF;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-accent: rgba(0, 242, 254, 0.3);
  --glow-cyan: rgba(0, 242, 254, 0.15);
  --glow-blue: rgba(10, 132, 255, 0.15);
}
```

### Modern Card Styling
```css
.modern-card {
  background: linear-gradient(135deg, var(--bg-surface-elevated) 0%, var(--bg-surface) 100%);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
```

### Fonts
Modify the Google Fonts link or update the CSS:
```css
body {
  font-family: 'Inter', sans-serif !important;
}
```

## 🎬 Video Requirements

The hero background video (`hero-background.mp4`) specifications:
- **Format**: MP4 with H.264 codec
- **Duration**: 10-30 seconds (seamlessly looped)
- **Resolution**: 1920x1080 or higher for crisp quality
- **File size**: Optimized for web performance (< 10MB recommended)
- **Content**: Tech-themed background suitable for web design agency
- **Overlay**: Dark gradient overlay for text readability

## 📊 Performance Optimizations

- **Video Compression**: Optimized hero background video for web delivery
- **CSS Custom Properties**: Efficient color management and theming
- **Modern CSS Features**: Hardware-accelerated animations with `will-change`
- **Responsive Typography**: Fluid font sizing with `clamp()` function
- **Optimized Font Loading**: Google Fonts with display swap
- **Efficient Animations**: GPU-accelerated transforms and filters
- **Backdrop Filters**: Modern glassmorphism effects with browser optimization
- **Lazy Loading**: Deferred loading for non-critical elements
- **Local Assets**: Self-hosted video for better control and performance

## 🔍 SEO Features

- Semantic HTML structure
- Meta viewport tag for mobile
- Proper heading hierarchy (H1-H6)
- Alt text for images
- Clean URL structure

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📝 License

This project is for Websies web design agency. All rights reserved.

## 🔄 Recent Updates

### Latest Changes (Based on Git History)
- **Hero Video Enhancement**: Replaced external video with custom local tech background
- **Advanced Color System**: Implemented CSS custom properties for consistent theming
- **Modern Card Design**: Added glassmorphism effects with backdrop blur
- **Enhanced Animations**: Upgraded floating effects with staggered timing
- **Authentication System**: Added login/signup modal functionality
- **Pricing Page**: Created dedicated pricing page with configuration system
- **Performance Improvements**: Optimized video playback and loading
- **Visual Hierarchy**: Enhanced typography and spacing throughout

### Development History
1. **Initial Commit**: Basic Websies homepage structure
2. **Hero Section Update**: Enhanced layout and pricing display
3. **Video Integration**: Added tech background video with loop functionality
4. **Video Optimization**: Fixed playback issues and added proper fallbacks
5. **Local Video**: Migrated to self-hosted video for better performance
6. **Final Polish**: Replaced with optimized hero background video

## 👥 Contributing

For internal team members:
1. Create feature branch from main
2. Make changes following existing patterns
3. Test across all browser breakpoints
4. Ensure video performance is maintained
5. Submit pull request with detailed description

## 📞 Contact

For questions or support regarding this website:
- **Website**: websies.com
- **Email**: hello@websies.com
- **Phone**: Available via website contact form

---

**Built with ❤️ for modern entrepreneurs**