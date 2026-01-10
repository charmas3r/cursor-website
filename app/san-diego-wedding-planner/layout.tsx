import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/san-diego-wedding-planner`;

export const metadata: Metadata = {
  title: "San Diego Wedding Planner | #1 Award-Winning Wedding Planning Services",
  description:
    "San Diego's premier award-winning wedding planner. Full-service wedding planning, coordination & design across Southern California. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "San Diego wedding planner",
    "wedding planner San Diego",
    "San Diego wedding coordinator",
    "Southern California wedding planner",
    "La Jolla wedding planner",
    "Coronado wedding planner",
    "Del Mar wedding planner",
    "Carlsbad wedding planner",
    "Temecula wedding planner",
    "best wedding planner San Diego",
    "top wedding planner San Diego",
    "luxury wedding planner San Diego",
    "full service wedding planning",
    "wedding coordination San Diego",
    "destination wedding planner California",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "San Diego Wedding Planner | Award-Winning Wedding Planning Services",
    description:
      "San Diego's #1 award-winning wedding planner. Full-service planning, coordination & design. 100+ weddings planned with 20+ years experience. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "San Diego Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "San Diego Wedding Planner | Award-Winning Services",
    description:
      "San Diego's premier wedding planner. Full-service planning, coordination & design across Southern California.",
    images: [
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    ],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function SanDiegoWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "San Diego Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning San Diego wedding planner offering full-service wedding planning, coordination, and design services across Southern California. Trusted by 100+ couples.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: [
      {
        "@type": "City",
        name: "San Diego",
        sameAs: "https://en.wikipedia.org/wiki/San_Diego",
      },
      {
        "@type": "City",
        name: "La Jolla",
      },
      {
        "@type": "City",
        name: "Coronado",
      },
      {
        "@type": "City",
        name: "Del Mar",
      },
      {
        "@type": "City",
        name: "Carlsbad",
      },
      {
        "@type": "City",
        name: "Encinitas",
      },
      {
        "@type": "City",
        name: "Rancho Santa Fe",
      },
      {
        "@type": "City",
        name: "Temecula",
      },
      {
        "@type": "City",
        name: "Fallbrook",
      },
      {
        "@type": "AdministrativeArea",
        name: "San Diego County",
      },
      {
        "@type": "AdministrativeArea",
        name: "Orange County",
      },
      {
        "@type": "AdministrativeArea",
        name: "Southern California",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Comprehensive wedding management and day-of coordination",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "3500",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Partial Planning",
            description: "Guided support with key planning milestones",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "6500",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Planning",
            description: "Complete wedding planning from engagement to honeymoon",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "11000",
            priceCurrency: "USD",
          },
        },
      ],
    },
    award: [
      "The Knot Best of Weddings 2024",
      "The Knot Best of Weddings 2025",
      "WeddingWire Couples' Choice Award 2025",
    ],
    sameAs: [
      "https://share.google/Pltvlw9njBabd209x",
      "https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439",
      "https://www.weddingwire.com/biz/wedding-agency-san-diego-san-diego/a1b2c3d4",
      "https://www.instagram.com/weddingagencysd",
      "https://www.facebook.com/weddingagencysd",
    ],
    hasMap: "https://share.google/Pltvlw9njBabd209x",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
