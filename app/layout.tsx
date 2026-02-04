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
const SITE_NAME = "San Diego Wedding Planner";
const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "San Diego Wedding Planner",
    template: "%s | San Diego Wedding Planner",
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
    title: "San Diego Wedding Planner",
    description:
      "San Diego's premier wedding planning agency with 100+ weddings planned and 20+ years in hospitality & events crafting unforgettable celebrations.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "San Diego Wedding Planner - Creating Unforgettable Weddings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "San Diego Wedding Planner",
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
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico?v=2" }],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "SD Wedding Planner",
    statusBarStyle: "default",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const localBusinessJsonLd = {
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
        name: "The Knot Best of Weddings 2024",
        description: "Recognized as a top wedding vendor on The Knot",
      },
      {
        "@type": "Award",
        name: "The Knot Best of Weddings 2025",
        description: "Recognized as a top wedding vendor on The Knot",
      },
      {
        "@type": "Award",
        name: "The Knot Best of Weddings 2026",
        description: "3× Winner - Recognized as a top wedding vendor on The Knot",
      },
      {
        "@type": "Award",
        name: "WeddingWire Couples' Choice Award 2025",
        description: "Recognized for excellence in quality, service, responsiveness, and professionalism",
      },
      {
        "@type": "Award",
        name: "WeddingWire Couples' Choice Award 2026",
        description: "2× Winner - Recognized for excellence in quality, service, responsiveness, and professionalism",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a wedding planner cost in San Diego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wedding planner costs in San Diego typically range from $2,000 to $15,000+ depending on services. At Wedding Agency San Diego, Wedding Management starts at $3,500, Partial Planning at $6,500, and Full Service Planning at $11,000+. These prices reflect the high level of personalized service and expertise provided.",
        },
      },
      {
        "@type": "Question",
        name: "What does a San Diego wedding planner do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A San Diego wedding planner handles all aspects of your wedding including vendor selection and management, budget tracking, timeline creation, design and styling, venue coordination, and day-of logistics. They leverage local relationships with venues like Rancho Valencia, Hotel del Coronado, and Temecula wineries to secure preferred pricing and availability.",
        },
      },
      {
        "@type": "Question",
        name: "When should I hire a wedding planner in San Diego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For full-service planning, hire your San Diego wedding planner 12-18 months before your wedding date, especially for peak season (April-October). For partial planning, 8-10 months is ideal. Day-of coordination can be booked 3-6 months out, though earlier is better to ensure availability with top planners.",
        },
      },
      {
        "@type": "Question",
        name: "What areas does Wedding Agency San Diego serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We serve all of San Diego County including La Jolla, Coronado, Del Mar, Carlsbad, Encinitas, Rancho Santa Fe, and Fallbrook. We also plan weddings in Temecula wine country and throughout Southern California including Orange County.",
        },
      },
      {
        "@type": "Question",
        name: "Is a wedding planner worth it in San Diego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, a professional San Diego wedding planner saves you significant time and stress while often saving money through vendor relationships and avoiding costly mistakes. With 100+ weddings planned and preferred vendor status at top venues, Wedding Agency San Diego provides expertise that ensures your day runs flawlessly.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

