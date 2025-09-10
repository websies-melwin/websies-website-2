import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Websies - Professional Websites in 7 Days | £47/month',
  description: 'Get a professional website in 7 days for just £47/month. Zero upfront fees, custom design, unlimited updates. Join 500+ happy businesses.',
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
        <SiteHeader />
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}