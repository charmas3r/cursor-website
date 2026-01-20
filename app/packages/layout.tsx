import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp";

export const metadata: Metadata = {
  title: "Wedding Planning Packages & Pricing | San Diego Wedding Planner",
  description:
    "Explore our wedding planning packages from $3,500. Wedding management, partial planning, and full-service luxury options. Transparent pricing, exceptional value. San Diego's top-rated wedding agency.",
  keywords: [
    "wedding planning packages San Diego",
    "wedding planner pricing",
    "wedding management cost",
    "full service wedding planning",
    "San Diego wedding coordinator prices",
    "wedding coordination packages",
    "destination wedding planner cost",
    "wedding planning services pricing",
    "affordable wedding planner San Diego",
  ],
  openGraph: {
    title: "Wedding Planning Packages & Pricing | Wedding Agency San Diego",
    description:
      "Wedding packages from $3,500. Wedding management, partial planning & full-service luxury options with transparent pricing.",
    url: `${SITE_URL}/packages`,
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego - Planning Packages & Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Planning Packages & Pricing | San Diego",
    description:
      "Wedding packages from $3,500. Wedding management, partial planning & full-service options.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/packages`,
  },
  icons: {
    icon: '/favicon.ico', // Standard favicon
    shortcut: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest'
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wedding Planning Services",
    image: OG_IMAGE,
    provider: {
      "@type": "LocalBusiness",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
      telephone: "+1 (760) 216-7427",
    },
    description:
      "Professional wedding planning services in San Diego. From wedding management to luxury full-service planning.",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7157,
        longitude: -117.1611,
      },
      geoRadius: "100 mi",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Planning Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management Package",
            description:
              "Sweet Heart Package - Professional wedding management including vendor coordination, timeline creation, and up to 12 hours coverage.",
          },
          price: "3500",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "3500",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Partial Planning - Premier Package",
            description:
              "Premier Package with guided wedding planning support, personalized vendor recommendations, design development, and comprehensive wedding management.",
          },
          price: "6500",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "6500",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service - Ever After Package",
            description:
              "Complete wedding planning from engagement to honeymoon including vendor sourcing, design, rehearsal dinner management, and full coordination.",
          },
          price: "11000",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "11000",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Destination Weddings Package",
            description:
              "Complete destination wedding planning including venue scouting, local vendor management, guest travel coordination, and on-site coordination.",
          },
          price: "8000",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "8000",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design & Styling Package",
            description:
              "Professional wedding design including mood boarding, color palette development, floral coordination, and day-of styling setup.",
          },
          price: "2500",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "2500",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wellness Package with Azadi Healing",
            description:
              "16 week holistic wellness program in partnership with Azadi Healing. Includes personalized meal plans, exercise plans for every body type, reiki sessions, sound healing journeys, guided meditations, and mental health support.",
          },
          price: "3000",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "3000",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Package",
            description:
              "Bespoke wedding experiences tailored to your unique vision, cultural traditions, and personal style.",
          },
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I book my wedding planner?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend booking 12-18 months before your wedding for Full Service planning, 6-9 months for Partial Planning, and 2-3 months for Wedding Management. Popular dates book quickly, so earlier is always better!",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between Wedding Management and Full Service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wedding Management (our Sweet Heart Package) focuses on executing your already-planned wedding with comprehensive coordination. Full Service Planning means we're with you from engagement to 'I do,' handling every detail including vendor selection, design, and complete coordination.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer payment plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We offer flexible payment plans for all packages. Typically, a 25% retainer secures your date, with the remaining balance split into monthly payments leading up to your wedding.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize a package?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! Every wedding is unique, and we love creating custom packages. Schedule a consultation and we'll design a plan that perfectly fits your needs and budget.",
        },
      },
      {
        "@type": "Question",
        name: "Do you travel for destination weddings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We love destination weddings. Travel fees apply based on location, and we have partnerships with vendors across California, Mexico, Hawaii, and beyond.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}

