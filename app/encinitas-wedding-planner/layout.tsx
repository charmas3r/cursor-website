import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/encinitas-wedding-planner`;

export const metadata: Metadata = {
  title: "Encinitas Wedding Planner | Bohemian Beach Wedding Planning Services",
  description:
    "Encinitas' premier wedding planner. Award-winning planning services at San Diego Botanic Garden, Leucadia & bohemian beach venues. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Encinitas wedding planner",
    "wedding planner Encinitas",
    "Encinitas wedding coordinator",
    "San Diego Botanic Garden wedding",
    "Leucadia wedding",
    "bohemian wedding San Diego",
    "beach wedding planner Encinitas",
    "coastal wedding planner",
    "garden wedding Encinitas",
    "best wedding planner Encinitas",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Encinitas Wedding Planner | Bohemian Beach Services",
    description:
      "Encinitas' #1 wedding planner. Full-service planning at San Diego Botanic Garden & coastal venues. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Encinitas Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encinitas Wedding Planner | Bohemian Beach Services",
    description:
      "Encinitas' premier wedding planner. Full-service planning at San Diego Botanic Garden & coastal venues.",
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

export default function EncinitasWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Encinitas Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Encinitas wedding planner offering full-service wedding planning, coordination, and design. Specializing in bohemian beach weddings and garden celebrations at San Diego Botanic Garden.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Encinitas",
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
      name: "Encinitas Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Encinitas wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Encinitas weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bohemian Wedding Design",
            description: "Bohemian beach and garden wedding styling in Encinitas",
          },
        },
      ],
    },
    knowsAbout: [
      "San Diego Botanic Garden weddings",
      "Leucadia weddings",
      "Moonlight Beach ceremonies",
      "Bohemian wedding planning",
      "Garden ceremony design",
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
