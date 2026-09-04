import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastProvider } from "@/components/ui/Toaster";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Import modern Google fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Forum Ecole Centrale Casablanca",
    template: "%s | Forum ECC"
  },
  description: "La 11ème édition du Forum Entreprise de l'École Centrale Casablanca se tiendra le 14 octobre 2026 à Bouskoura. Un salon de recrutement annuel qui rassemble étudiants, diplômés et entreprises partenaires dans un cadre professionnel d'échange et de networking.",
  keywords: [
    "Forum ECC", "Ecole Centrale Casablanca", "Recrutement Maroc", "Emploi ingénieur", 
    "Entreprises partenaires", "Étudiants Centrale", "Networking professionnel", "Carrière Maroc",
    "Salon recrutement", "Stage ingénieur", "CV thèque", "Forum entreprise"
  ],
  authors: [{ name: "Forum ECC Team" }],
  creator: "École Centrale Casablanca",
  publisher: "Forum ECC",
  category: "Education & Career",
  classification: "Career Fair & Networking Event",
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "Forum Ecole Centrale Casablanca - Salon de Recrutement",
    description: "Rejoignez le salon de recrutement de l'École Centrale Casablanca. Connectez étudiants, diplômés et entreprises leaders au Maroc.",
    url: "https://www.forum-ecc.ma",
    siteName: "Forum École Centrale Casablanca Entreprise",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://www.forum-ecc.ma/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Forum ECC - Salon de Recrutement École Centrale Casablanca",
        type: "image/jpeg",
      },
      {
        url: "https://www.forum-ecc.ma/images/logo_forum.png",
        width: 1200,
        height: 630,
        alt: "Forum ECC - École Centrale Casablanca",
        type: "image/png",
      },
      {
        url: "https://www.forum-ecc.ma/images/hero-2.jpg",
        width: 1200,
        height: 630,
        alt: "Forum ECC - Événement de networking",
        type: "image/jpeg",
      }
    ],
  },
  
  // Icons configuration
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Forum ECC - Salon de Recrutement",
    description: "Le plus grand salon de recrutement de l'École Centrale Casablanca. Opportunités d'emploi et networking professionnel.",
    site: "@ForumECC",
    creator: "@EcoleCentraleCasa",
    images: ["https://www.forum-ecc.ma/images/hero-1.jpg"],
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification and other meta tags
  verification: {
    // Add when available: google: "your-google-verification-code"
  },
  
  // Alternative languages
  alternates: {
    canonical: "https://www.forum-ecc.ma",
    languages: {
      "fr-FR": "https://www.forum-ecc.ma",
      "ar-MA": "https://www.forum-ecc.ma/ar",
    },
  },
  
  // App metadata
  applicationName: "Forum ECC",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  
  // Apple specific
  appleWebApp: {
    capable: true,
    title: "Forum ECC",
    statusBarStyle: "default",
  },
  
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // PWA manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for the organization and event
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Forum ECC - École Centrale Casablanca",
    "url": "https://www.forum-ecc.ma",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.forum-ecc.ma/images/logo_forum.png",
      "width": 512,
      "height": 512
    },
    "image": "https://www.forum-ecc.ma/images/hero-1.jpg",
    "description": "Le Forum Entreprise de l'École Centrale Casablanca est un salon de recrutement annuel qui rassemble étudiants, diplômés et entreprises partenaires.",
    "sameAs": [
      "https://www.linkedin.com/company/forumecc-entreprises",
      "https://www.instagram.com/forum_ecc/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressLocality": "Casablanca",
      "addressRegion": "Casablanca-Settat"
    },
    "foundingDate": "2010",
    "numberOfEmployees": "100-500",
    "industry": "Education"
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Forum ECC - Salon de Recrutement",
    "description": "Le plus grand salon de recrutement de l'École Centrale Casablanca. Événement annuel de networking entre étudiants, diplômés et entreprises.",
    "image": [
      "https://www.forum-ecc.ma/images/hero-1.jpg",
      "https://www.forum-ecc.ma/images/hero-2.jpg",
      "https://www.forum-ecc.ma/images/logo_forum.png"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "École Centrale Casablanca",
      "url": "https://www.forum-ecc.ma"
    },
    "location": {
      "@type": "Place",
      "name": "École Centrale Casablanca",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MA",
        "addressLocality": "Casablanca"
      }
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "url": "https://www.forum-ecc.ma",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MAD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.forum-ecc.ma/auth/register"
    }
  };

  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventSchema),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Providers>
          <ToastProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ToastProvider>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
