import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://weddingagencysandiego.com";
const SITE_NAME = "Wedding Agency San Diego";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wedding Agency San Diego | Your Happily Ever After Starts Here",
    template: "%s | Wedding Agency San Diego",
  },
  description:
    "San Diego's premier wedding planning agency. We specialize in full-service planning, day-of coordination, and destination weddings. 500+ weddings planned with 15+ years of experience.",
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
    title: "Wedding Agency San Diego | Your Happily Ever After Starts Here",
    description:
      "San Diego's premier wedding planning agency with 500+ weddings planned and 15+ years of experience crafting unforgettable celebrations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego - Creating Unforgettable Weddings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Agency San Diego | Your Happily Ever After Starts Here",
    description:
      "San Diego's premier wedding planning agency. Full-service planning, day-of coordination & destination weddings.",
    images: ["/og-image.jpg"],
    creator: "@weddingagencysd",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "wedding planning",
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
      "San Diego's premier wedding planning agency specializing in full-service planning, day-of coordination, and destination weddings.",
    url: SITE_URL,
    telephone: "(619) 555-0123",
    email: "hello@wding.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Wedding Lane",
      addressLocality: "San Diego",
      addressRegion: "CA",
      postalCode: "92101",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "500",
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
      "https://www.instagram.com/weddingagencysd",
      "https://www.facebook.com/weddingagencysd",
    ],
    award: [
      {
        "@type": "Award",
        name: "The Knot Best of Weddings 2025",
        description: "2× Winner - Recognized as a top wedding vendor on The Knot",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}

