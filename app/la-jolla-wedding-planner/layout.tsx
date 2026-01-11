import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/la-jolla-wedding-planner`;

export const metadata: Metadata = {
  title: "La Jolla Wedding Planner | Award-Winning Wedding Planning Services",
  description:
    "La Jolla's premier wedding planner. Award-winning planning services at The Lodge at Torrey Pines, Estancia La Jolla, La Jolla Cove & more. 50+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "La Jolla wedding planner",
    "wedding planner La Jolla",
    "La Jolla wedding coordinator",
    "Lodge at Torrey Pines wedding planner",
    "Estancia La Jolla wedding",
    "La Jolla Cove wedding",
    "coastal wedding planner San Diego",
    "luxury wedding planner La Jolla",
    "beach wedding La Jolla",
    "best wedding planner La Jolla",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "La Jolla Wedding Planner | Award-Winning Services",
    description:
      "La Jolla's #1 wedding planner. Full-service planning at premier venues like The Lodge at Torrey Pines & Estancia. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "La Jolla Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Jolla Wedding Planner | Award-Winning Services",
    description:
      "La Jolla's premier wedding planner. Full-service planning at The Lodge at Torrey Pines, Estancia & more.",
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

export default function LaJollaWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "La Jolla Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning La Jolla wedding planner offering full-service wedding planning, coordination, and design. Trusted preferred vendor at The Lodge at Torrey Pines, Estancia La Jolla, and premier coastal venues.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "La Jolla",
      containedInPlace: {
        "@type": "City",
        name: "San Diego",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "La Jolla Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete La Jolla wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for La Jolla weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Coastal Wedding Design",
            description: "Beach and coastal wedding styling in La Jolla",
          },
        },
      ],
    },
    knowsAbout: [
      "The Lodge at Torrey Pines weddings",
      "Estancia La Jolla weddings",
      "La Jolla Cove ceremonies",
      "Coastal wedding planning",
      "Beach wedding coordination",
    ],
    sameAs: [
      "https://share.google/Pltvlw9njBabd209x",
      "https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439",
      "https://www.instagram.com/weddingagencysd",
    ],
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
