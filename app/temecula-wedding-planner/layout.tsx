import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/temecula-wedding-planner`;

export const metadata: Metadata = {
  title: "Temecula Wedding Planner | Wine Country Wedding Planning Services",
  description:
    "Temecula's premier wedding planner. Award-winning planning services at Ponte Winery, Lorimar, Fazeli Cellars & 40+ wineries. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Temecula wedding planner",
    "wedding planner Temecula",
    "Temecula wedding coordinator",
    "Temecula winery wedding",
    "Ponte Winery wedding planner",
    "wine country wedding San Diego",
    "vineyard wedding planner",
    "Temecula wine country wedding",
    "winery wedding coordinator",
    "best wedding planner Temecula",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Temecula Wedding Planner | Wine Country Services",
    description:
      "Temecula's #1 wedding planner. Full-service planning at Ponte Winery, Lorimar & 40+ wine country venues. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Temecula Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temecula Wedding Planner | Wine Country Services",
    description:
      "Temecula's premier wedding planner. Full-service planning at Ponte Winery, Lorimar & wine country venues.",
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

export default function TemeculaWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Temecula Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Temecula wedding planner offering full-service wedding planning, coordination, and design. Specializing in wine country weddings at Ponte Winery, Lorimar Vineyards, Fazeli Cellars, and 40+ Temecula Valley wineries.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Temecula",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Riverside County",
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
      name: "Temecula Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Temecula wine country wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Temecula winery weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vineyard Wedding Design",
            description: "Wine country wedding styling in Temecula Valley",
          },
        },
      ],
    },
    knowsAbout: [
      "Ponte Winery weddings",
      "Lorimar Vineyards weddings",
      "Fazeli Cellars weddings",
      "Wine country wedding planning",
      "Vineyard ceremony design",
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
