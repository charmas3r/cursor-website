import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

// Self-hosted fonts via next/font - eliminates render-blocking requests
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://weddingagencysandiego.com";
const SITE_NAME = "Wedding Agency San Diego";
const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wedding Agency San Diego",
    template: "%s | Wedding Agency San Diego",
  },
  description:
    "San Diego's premier wedding planning agency. We specialize in full-service planning, wedding management, and destination weddings. 100+ weddings planned with 20+ years in hospitality & events.",
  keywords: [
    "wedding planner San Diego",
    "wedding coordinator San Diego",
    "Southern California weddings",
    "beachfront wedding ceremony",
    "desert wedding planner",
    "San Diego wedding agency",
    "full service wedding planning",
    "destination wedding planner",
    "wedding day coordination",
    "luxury wedding planner",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Wedding Agency San Diego",
    description:
      "San Diego's premier wedding planning agency with 100+ weddings planned and 20+ years in hospitality & events crafting unforgettable celebrations.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego - Creating Unforgettable Weddings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Agency San Diego",
    description:
      "San Diego's premier wedding planning agency. Full-service planning, wedding management & destination weddings.",
    images: [OG_IMAGE],
    creator: "@weddingagencysd",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "wedding planning",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Wedding Agency SD",
    statusBarStyle: "default",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description:
      "San Diego's premier wedding planning agency specializing in full-service planning, wedding management, and destination weddings.",
    url: SITE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    image: OG_IMAGE,
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "100",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7157,
        longitude: -117.1611,
      },
      geoRadius: "100 mi",
    },
    sameAs: [
      "https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439",
      "https://www.weddingwire.com/biz/wedding-agency-san-diego-san-diego/a1b2c3d4",
      "https://www.instagram.com/weddingagencysd",
      "https://www.facebook.com/weddingagencysd",
    ],
    award: [
      {
        "@type": "Award",
        name: "The Knot Best of Weddings 2025",
        description: "2× Winner - Recognized as a top wedding vendor on The Knot",
      },
      {
        "@type": "Award",
        name: "WeddingWire Couples' Choice Award 2025",
        description: "Recognized for excellence in quality, service, responsiveness, and professionalism",
      },
    ],
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Umami Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="af27b8e4-ea30-4d46-b060-1f195a3ffe71"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}

