# SEO Checklist

## Meta Tags
### Required on All Pages
- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Viewport meta tag
- [ ] Charset declaration (UTF-8)
- [ ] Language attribute on HTML tag

### Current Implementation
- **Home**: "Websies - Professional Websites in 7 Days | £47/month"
- **Pricing**: 🟡 TODO - Add unique title
- **Other pages**: Using layout.js default

### Open Graph Tags
- [ ] og:title
- [ ] og:description
- [ ] og:image (1200x630px recommended)
- [ ] og:url
- [ ] og:type
- [ ] og:site_name
- **Status**: 🟡 TODO - Not implemented

### Twitter Cards
- [ ] twitter:card
- [ ] twitter:title
- [ ] twitter:description
- [ ] twitter:image
- [ ] twitter:site
- **Status**: 🟡 TODO - Not implemented

## Technical SEO

### Performance
- [ ] Core Web Vitals optimized
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- [ ] Image optimization (WebP format, lazy loading)
- [ ] Video optimization (hero-background.mp4 - check size)
- [ ] Minified CSS/JS in production
- [ ] Gzip/Brotli compression enabled

### Crawlability
- [ ] robots.txt file
- [ ] XML sitemap
- [ ] Canonical URLs on all pages
- [ ] Clean URL structure (no parameters for content pages)
- **Status**: 🟡 TODO - Create robots.txt and sitemap.xml

### Mobile
- [x] Mobile responsive design
- [x] Viewport meta tag present
- [ ] Touch-friendly tap targets (48x48px minimum)
- [ ] No horizontal scroll on mobile

### Security
- [ ] HTTPS enabled
- [ ] SSL certificate valid
- [ ] Mixed content issues resolved
- **Status**: 🟡 TODO - Depends on hosting

## Content SEO

### Headings
- [ ] One H1 per page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] Keywords in headings where natural

### Current H1s
- **Home**: "Your Website. Done in 7 Days. £47/month."
- **Reviews**: "500+ Happy Businesses"
- **Contact**: "Let's Talk About Your Website"
- **Others**: 🟡 TODO - Review and optimize

### Keywords
#### Primary Keywords
- "website in 7 days"
- "£47 per month website"
- "professional website builder"
- "zero upfront cost website"

#### Secondary Keywords
- "custom website design"
- "small business website"
- "website subscription service"
- "no contract website"

### Internal Linking
- [x] Header navigation to all main pages
- [x] Footer links to key pages
- [ ] Contextual links in content
- [ ] Breadcrumbs on deep pages

### Images
- [ ] Alt text on all images
- [ ] Descriptive file names
- [ ] Compressed file sizes
- [ ] Next.js Image component usage
- **Status**: 🟡 TODO - Implement Next Image component

## Schema Markup

### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Websies",
  "url": "https://websies.com",
  "logo": "🟡 TODO",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-20-1234-5678",
    "contactType": "sales"
  }
}
```

### Product Schema (for pricing page)
```json
{
  "@type": "Product",
  "name": "Professional Website",
  "offers": {
    "@type": "Offer",
    "price": "47",
    "priceCurrency": "GBP",
    "availability": "InStock"
  }
}
```
**Status**: 🟡 TODO - Not implemented

## Local SEO
- [ ] Google My Business listing
- [ ] NAP consistency (Name, Address, Phone)
- [ ] Local keywords in content
- [ ] Customer reviews/testimonials
- **Status**: Partially complete (reviews page exists)

## Monitoring & Tools

### Setup Required
- [ ] Google Search Console verification
- [ ] Google Analytics 4 implementation
- [ ] Bing Webmaster Tools
- [ ] Page speed monitoring
- **Status**: 🟡 TODO - All pending

### Regular Audits
- [ ] Monthly Lighthouse audits
- [ ] Broken link checks
- [ ] 404 error monitoring
- [ ] Search Console coverage reports

## Priority Actions
1. **High Priority**
   - Add unique meta titles/descriptions to all pages
   - Create robots.txt and sitemap.xml
   - Implement Open Graph tags
   - Set up Google Search Console

2. **Medium Priority**
   - Add schema markup
   - Optimize images with Next Image
   - Implement breadcrumbs
   - Add alt text to all images

3. **Low Priority**
   - Twitter card implementation
   - Advanced schema types
   - International SEO (if expanding)