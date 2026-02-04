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
    knowsAbout: [
      "Wedding Planning",
      "Wedding Coordination",
      "Event Design",
      "Vendor Management",
      "Wedding Day Management",
      "Destination Weddings",
      "Luxury Weddings",
      "Beach Weddings San Diego",
      "Vineyard Weddings Temecula",
    ],
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
      "The Knot Best of Weddings 2026",
      "WeddingWire Couples' Choice Award 2025",
      "WeddingWire Couples' Choice Award 2026",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes Wedding Agency San Diego different from other wedding planners in the area?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wedding Agency San Diego stands out with 20+ years of hospitality experience, a perfect 5.0-star rating across 50+ reviews, and preferred vendor status at 15+ premier venues. Unlike larger agencies, owner Nicole personally handles every wedding, ensuring the attention to detail and personalized care that San Diego couples deserve.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a wedding planner cost in San Diego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wedding planner costs in San Diego typically range from $2,000 to $15,000+ depending on services. At Wedding Agency San Diego, Wedding Management starts at $3,500, Partial Planning at $6,500, and Full Service Planning at $11,000+.",
        },
      },
      {
        "@type": "Question",
        name: "Which San Diego venues does Wedding Agency San Diego work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're proud to be a preferred vendor at Rancho Valencia Resort, one of Southern California's most prestigious venues. Our exclusive partnership means priority booking access and seamless coordination that independent planners cannot match. We also work with many other beautiful San Diego venues.",
        },
      },
      {
        "@type": "Question",
        name: "Do you plan destination weddings outside of San Diego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! While we specialize in San Diego, La Jolla, Coronado, Del Mar, Carlsbad, and Temecula weddings, we also coordinate destination weddings throughout California and beyond.",
        },
      },
      {
        "@type": "Question",
        name: "How far in advance should I book a wedding planner in San Diego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best San Diego wedding planners book 12-18 months in advance, especially for peak wedding season (April-October). However, Wedding Agency San Diego can accommodate shorter timelines when available.",
        },
      },
      {
        "@type": "Question",
        name: "What's included in day-of wedding coordination?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Wedding Management package includes up to 12 hours of day-of coverage (compared to the industry standard of 6-8 hours), detailed timeline creation, vendor coordination, ceremony rehearsal direction, and emergency backup planning.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "San Diego Wedding Planner",
        item: PAGE_URL,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
