import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata = {
  title: 'Websies - Professional Websites in 7 Days | £47/month',
  description: 'Get a professional website in 7 days for just £47/month. Zero upfront fees, custom design, unlimited updates. Join 500+ happy businesses.',
  metadataBase: new URL('https://websies.co'),
  openGraph: {
    title: 'Websies - Professional Websites in 7 Days | £47/month',
    description: 'Get a professional website in 7 days for just £47/month. Zero upfront fees, custom design, unlimited updates. Join 500+ happy businesses.',
    url: 'https://websies.co',
    siteName: 'Websies',
    images: [
      {
        url: '/images/websies-logo.png', // Update this to match your logo filename
        width: 1200,
        height: 630,
        alt: 'Websies Logo - Professional Websites in 7 Days',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Websies - Professional Websites in 7 Days | £47/month',
    description: 'Get a professional website in 7 days for just £47/month. Zero upfront fees, custom design, unlimited updates. Join 500+ happy businesses.',
    images: ['/images/websies-logo.png'], // Update this to match your logo filename
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <SiteHeader />
          <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
            {children}
          </main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}