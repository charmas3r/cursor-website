import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/del-mar-wedding-planner`;

export const metadata: Metadata = {
  title: "Del Mar Wedding Planner | Luxury Coastal Wedding Planning Services",
  description:
    "Del Mar's premier wedding planner. Award-winning planning services at L'Auberge Del Mar, Del Mar Racetrack, and exclusive blufftop venues. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Del Mar wedding planner",
    "wedding planner Del Mar",
    "Del Mar wedding coordinator",
    "L'Auberge Del Mar wedding planner",
    "Del Mar Racetrack wedding",
    "blufftop wedding Del Mar",
    "coastal wedding planner San Diego",
    "luxury wedding planner Del Mar",
    "beach wedding Del Mar",
    "best wedding planner Del Mar",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Del Mar Wedding Planner | Luxury Coastal Services",
    description:
      "Del Mar's #1 wedding planner. Full-service planning at premier venues like L'Auberge Del Mar. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Del Mar Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Del Mar Wedding Planner | Luxury Coastal Services",
    description:
      "Del Mar's premier wedding planner. Full-service planning at L'Auberge Del Mar & exclusive coastal venues.",
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

export default function DelMarWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Del Mar Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Del Mar wedding planner offering full-service wedding planning, coordination, and design. Specializing in luxury coastal venues including L'Auberge Del Mar and exclusive blufftop locations.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Del Mar",
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
      name: "Del Mar Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Del Mar wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Del Mar weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Luxury Coastal Wedding Design",
            description: "Elegant blufftop and oceanview wedding styling in Del Mar",
          },
        },
      ],
    },
    knowsAbout: [
      "L'Auberge Del Mar weddings",
      "Del Mar Racetrack weddings",
      "Blufftop wedding ceremonies",
      "Coastal wedding planning",
      "Luxury destination weddings",
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
