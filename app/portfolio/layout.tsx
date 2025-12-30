import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";

export const metadata: Metadata = {
  title: "Wedding Portfolio | San Diego Wedding Photography & Planning",
  description:
    "Browse our portfolio of 100+ beautiful San Diego weddings. From beachfront ceremonies to vineyard celebrations, see how Wedding Agency San Diego brings love stories to life.",
  keywords: [
    "San Diego wedding portfolio",
    "wedding photography San Diego",
    "San Diego wedding gallery",
    "beach wedding photos",
    "vineyard wedding San Diego",
    "wedding planner portfolio",
    "Southern California weddings",
    "luxury wedding photos",
  ],
  openGraph: {
    title: "Wedding Portfolio | Wedding Agency San Diego",
    description:
      "Explore 100+ stunning weddings we've planned across San Diego. Beach ceremonies, vineyard celebrations, and more.",
    url: `${SITE_URL}/portfolio`,
    images: [
      {
        url: "/og-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego Portfolio - Beautiful Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Portfolio | Wedding Agency San Diego",
    description:
      "Explore 100+ stunning weddings we've planned across San Diego.",
    images: ["/og-portfolio.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wedding Portfolio - Wedding Agency San Diego",
    description:
      "Browse our portfolio of 100+ beautiful San Diego weddings featuring beach ceremonies, vineyard celebrations, and luxury events.",
    url: `${SITE_URL}/portfolio`,
    isPartOf: {
      "@type": "WebSite",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
    },
    about: {
      "@type": "Service",
      name: "Wedding Planning Services",
      provider: {
        "@type": "LocalBusiness",
        name: "Wedding Agency San Diego",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Event",
            name: "Zoe & Byron Wedding",
            location: {
              "@type": "Place",
              name: "Rancho Valencia Resort",
              address: "San Diego, CA",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Event",
            name: "Ally & Tyler Wedding",
            location: {
              "@type": "Place",
              name: "Hotel del Coronado",
              address: "San Diego, CA",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Event",
            name: "Catherine & Mitchell Wedding",
            location: {
              "@type": "Place",
              name: "Bernardo Winery",
              address: "San Diego, CA",
            },
          },
        },
      ],
    },
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

