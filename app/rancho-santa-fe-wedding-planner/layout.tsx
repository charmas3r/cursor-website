import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const PAGE_URL = `${SITE_URL}/rancho-santa-fe-wedding-planner`;

export const metadata: Metadata = {
  title: "Rancho Santa Fe Wedding Planner | Estate & Golf Course Wedding Planning",
  description:
    "Rancho Santa Fe's premier wedding planner. Award-winning planning services at Rancho Valencia Resort, The Inn at Rancho Santa Fe, and exclusive estate venues. 100+ weddings, 20+ years experience. Free consultation.",
  keywords: [
    "Rancho Santa Fe wedding planner",
    "wedding planner Rancho Santa Fe",
    "Rancho Santa Fe wedding coordinator",
    "Rancho Valencia wedding planner",
    "The Inn at Rancho Santa Fe wedding",
    "estate wedding Rancho Santa Fe",
    "luxury wedding planner San Diego",
    "golf course wedding planner",
    "private estate wedding San Diego",
    "best wedding planner Rancho Santa Fe",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Wedding Agency San Diego",
    title: "Rancho Santa Fe Wedding Planner | Estate & Luxury Services",
    description:
      "Rancho Santa Fe's #1 wedding planner. Full-service planning at premier venues like Rancho Valencia Resort. Book your free consultation.",
    images: [
      {
        url: "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
        width: 1200,
        height: 630,
        alt: "Rancho Santa Fe Wedding Planner - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rancho Santa Fe Wedding Planner | Estate & Luxury Services",
    description:
      "Rancho Santa Fe's premier wedding planner. Full-service planning at Rancho Valencia Resort & exclusive estate venues.",
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

export default function RanchoSantaFeWeddingPlannerLayout({
  children,
}: LayoutProps): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PAGE_URL}#service`,
    name: "Rancho Santa Fe Wedding Planner - Wedding Agency San Diego",
    description:
      "Award-winning Rancho Santa Fe wedding planner offering full-service wedding planning, coordination, and design. Preferred vendor at Rancho Valencia Resort and experienced with private estate weddings throughout the Covenant.",
    url: PAGE_URL,
    telephone: "+1 (760) 216-7427",
    email: "nicole@weddingagencysandiego.com",
    image:
      "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767246459/2025.11.21_-_Jessica_Ian_-_Twin_Oaks_Golf_Course-847_websize_rqud58.jpg",
    priceRange: "$$$$",
    serviceType: "Wedding Planning",
    areaServed: {
      "@type": "City",
      name: "Rancho Santa Fe",
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
      name: "Rancho Santa Fe Wedding Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Service Wedding Planning",
            description: "Complete Rancho Santa Fe wedding planning from engagement to honeymoon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Management",
            description: "Day-of coordination for Rancho Santa Fe weddings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Estate Wedding Design",
            description: "Private estate and golf course wedding styling in Rancho Santa Fe",
          },
        },
      ],
    },
    knowsAbout: [
      "Rancho Valencia Resort weddings",
      "The Inn at Rancho Santa Fe weddings",
      "Private estate weddings",
      "Golf course wedding planning",
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
