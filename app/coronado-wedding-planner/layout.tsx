import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/coronado-wedding-planner`;

export const metadata: Metadata = {
  title: "Coronado Wedding Planner | Historic Beach Resort Wedding Planning",
  description:
    "Coronado's premier wedding planner. Award-winning planning services at Hotel del Coronado, Coronado Island Marriott & Loews. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Coronado wedding planner",
    "wedding planner Coronado",
    "Coronado wedding coordinator",
    "Hotel del Coronado wedding planner",
    "Coronado beach wedding",
    "historic wedding venue San Diego",
    "luxury wedding planner Coronado",
    "island wedding San Diego",
    "beach wedding Coronado",
    "best wedding planner Coronado",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Coronado Wedding Planner | Historic Beach Resort Services",
    description:
      "Coronado's #1 wedding planner. Full-service planning at Hotel del Coronado & premier island venues. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Coronado Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coronado Wedding Planner | Historic Beach Resort Services",
    description:
      "Coronado's premier wedding planner. Full-service planning at Hotel del Coronado & island venues.",
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

export default function CoronadoWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Coronado Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Coronado wedding planner offering full-service wedding planning, coordination, and design. Specializing in beach weddings at Hotel del Coronado and Coronado Island's premier venues.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Coronado",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "San Diego County",
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
      name: "Coronado Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Coronado wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Coronado weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Beach Wedding Design",
            description: "Beach and historic venue wedding styling in Coronado",
          },
        },
      ],
    },
    knowsAbout: [
      "Hotel del Coronado weddings",
      "Coronado Island Marriott weddings",
      "Loews Coronado Bay weddings",
      "Beach wedding planning",
      "Historic venue coordination",
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
