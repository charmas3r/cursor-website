import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Meet the Wedding Agency San Diego Team",
  description:
    "Meet the passionate team behind Wedding Agency San Diego. With 20+ years in hospitality and events and 100+ weddings planned, discover why couples trust us to create their perfect day.",
  keywords: [
    "wedding planner San Diego",
    "wedding planning team",
    "San Diego wedding coordinators",
    "about Wedding Agency San Diego",
    "wedding planner experience",
    "meet our team",
    "wedding planning experts",
  ],
  openGraph: {
    title: "About Us | Meet the Wedding Agency San Diego Team",
    description:
      "Meet the passionate team behind Wedding Agency San Diego. With 20+ years in hospitality and events and 100+ weddings planned, discover why couples trust us to create their perfect day.",
    type: "website",
    locale: "en_US",
    url: "https://weddingagencysandiego.com/about",
    siteName: "Wedding Agency San Diego",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego Team.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Meet the Wedding Agency San Diego Team",
    description:
      "Meet the passionate team behind Wedding Agency San Diego. 20+ years in hospitality, 100+ weddings planned.",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    ],
  },
  alternates: {
    canonical: "https://weddingagencysandiego.com/about",
  },
};

const SITE_URL = "https://weddingagencysandiego.com";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // Reference the main LocalBusiness by @id to avoid "multiple aggregate ratings" error
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Wedding Agency San Diego",
            url: `${SITE_URL}/about`,
            mainEntity: {
              "@id": `${SITE_URL}/#organization`,
            },
          }),
        }}
      />
      {children}
    </>
  );
}

