import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp";

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
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
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
    images: [OG_IMAGE],
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
    image: OG_IMAGE,
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
            "@type": "Article",
            name: "Zoe & Byron Wedding at Rancho Valencia Resort",
            url: `${SITE_URL}/portfolio/zoe-byron`,
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Article",
            name: "Ally & Tyler Wedding at Hotel del Coronado",
            url: `${SITE_URL}/portfolio/ally-tyler`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Article",
            name: "Catherine & Mitchell Wedding at Bernardo Winery",
            url: `${SITE_URL}/portfolio/catherine-mitchell`,
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

