import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/carlsbad-wedding-planner`;

export const metadata: Metadata = {
  title: "Carlsbad Wedding Planner | Coastal Resort Wedding Planning Services",
  description:
    "Carlsbad's premier wedding planner. Award-winning planning services at Park Hyatt Aviara, Omni La Costa, The Flower Fields & more. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Carlsbad wedding planner",
    "wedding planner Carlsbad",
    "Carlsbad wedding coordinator",
    "Park Hyatt Aviara wedding planner",
    "Omni La Costa wedding",
    "Flower Fields wedding Carlsbad",
    "coastal wedding planner San Diego",
    "luxury wedding planner Carlsbad",
    "resort wedding Carlsbad",
    "best wedding planner Carlsbad",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Carlsbad Wedding Planner | Coastal Resort Services",
    description:
      "Carlsbad's #1 wedding planner. Full-service planning at premier resorts like Park Hyatt Aviara & Omni La Costa. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Carlsbad Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlsbad Wedding Planner | Coastal Resort Services",
    description:
      "Carlsbad's premier wedding planner. Full-service planning at Park Hyatt Aviara, Omni La Costa & coastal resorts.",
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

export default function CarlsbadWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Carlsbad Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Carlsbad wedding planner offering full-service wedding planning, coordination, and design. Specializing in resort weddings at Park Hyatt Aviara, Omni La Costa, and coastal venues.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Carlsbad",
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
      name: "Carlsbad Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Carlsbad wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Carlsbad weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Resort Wedding Design",
            description: "Luxury resort and coastal wedding styling in Carlsbad",
          },
        },
      ],
    },
    knowsAbout: [
      "Park Hyatt Aviara weddings",
      "Omni La Costa weddings",
      "The Flower Fields weddings",
      "Resort wedding planning",
      "Coastal ceremony design",
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
