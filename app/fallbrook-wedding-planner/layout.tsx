import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/fallbrook-wedding-planner`;

export const metadata: Metadata = {
  title: "Fallbrook Wedding Planner | Vineyard & Ranch Wedding Planning Services",
  description:
    "Fallbrook's premier wedding planner. Award-winning planning services at Grand Tradition Estate, vineyard estates & rustic ranches. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Fallbrook wedding planner",
    "wedding planner Fallbrook",
    "Fallbrook wedding coordinator",
    "Grand Tradition Estate wedding",
    "vineyard wedding Fallbrook",
    "ranch wedding San Diego",
    "rustic wedding planner",
    "estate wedding Fallbrook",
    "avocado capital wedding",
    "best wedding planner Fallbrook",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Fallbrook Wedding Planner | Vineyard & Ranch Services",
    description:
      "Fallbrook's #1 wedding planner. Full-service planning at Grand Tradition Estate & vineyard venues. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Fallbrook Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fallbrook Wedding Planner | Vineyard & Ranch Services",
    description:
      "Fallbrook's premier wedding planner. Full-service planning at Grand Tradition Estate & vineyard venues.",
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

export default function FallbrookWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Fallbrook Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Fallbrook wedding planner offering full-service wedding planning, coordination, and design. Specializing in vineyard weddings at Grand Tradition Estate and rustic ranch celebrations.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Fallbrook",
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
      name: "Fallbrook Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Fallbrook wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Fallbrook weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vineyard Wedding Design",
            description: "Rustic vineyard and ranch wedding styling in Fallbrook",
          },
        },
      ],
    },
    knowsAbout: [
      "Grand Tradition Estate weddings",
      "Vineyard wedding planning",
      "Ranch wedding coordination",
      "Rustic wedding design",
      "Estate ceremony planning",
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
