import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";

export const metadata: Metadata = {
  title: "Wedding Planning Packages & Pricing | San Diego Wedding Planner",
  description:
    "Explore our wedding planning packages from $2,500. Day-of coordination, partial planning, and full-service luxury options. Transparent pricing, exceptional value. San Diego's top-rated wedding agency.",
  keywords: [
    "wedding planning packages San Diego",
    "wedding planner pricing",
    "day-of coordination cost",
    "full service wedding planning",
    "San Diego wedding coordinator prices",
    "elopement packages",
    "destination wedding planner cost",
    "wedding planning services pricing",
    "affordable wedding planner San Diego",
  ],
  openGraph: {
    title: "Wedding Planning Packages & Pricing | Wedding Agency San Diego",
    description:
      "Wedding packages from $2,500. Day-of coordination, partial planning & full-service luxury options with transparent pricing.",
    url: `${SITE_URL}/packages`,
    images: [
      {
        url: "/og-packages.jpg",
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
      "Wedding packages from $2,500. Day-of coordination, partial planning & full-service options.",
    images: ["/og-packages.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/packages`,
  },
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
    provider: {
      "@type": "LocalBusiness",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
      telephone: "(619) 555-0123",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Diego",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    description:
      "Professional wedding planning services in San Diego. From intimate elopements to luxury full-service planning.",
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
            name: "Intimate Elopement Package",
            description:
              "Perfect for couples seeking an intimate celebration with ceremony planning, venue scouting, and day-of coordination.",
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
            name: "Day-of Coordination Package",
            description:
              "Professional execution of your planned wedding including vendor management, timeline creation, and up to 10 hours coverage.",
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
            name: "Partial Planning Package",
            description:
              "Guided wedding planning support with vendor recommendations, design development, and comprehensive day-of coordination.",
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
            name: "Full Service Luxury Package",
            description:
              "Complete wedding planning from engagement to honeymoon including vendor sourcing, design, and full coordination.",
          },
          price: "12000",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "12000",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
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
          text: "We recommend booking 12-18 months before your wedding for Full Service planning, 6-9 months for Partial Planning, and 2-3 months for Day-of Coordination. Popular dates book quickly, so earlier is always better!",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between Day-of and Full Service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Day-of Coordination focuses on executing your already-planned wedding, stepping in during the final weeks. Full Service Planning means we're with you from engagement to 'I do,' handling every detail including vendor selection, design, and complete coordination.",
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

