import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Your San Diego Wedding Planner | Wedding Agency San Diego",
  description:
    "Meet Nicole, your San Diego wedding planner with 20+ years in hospitality and 50+ weddings planned. Discover why couples across Southern California trust Wedding Agency San Diego.",
  keywords: [
    "San Diego wedding planner",
    "wedding planner San Diego",
    "San Diego wedding coordinator",
    "wedding planning team San Diego",
    "best wedding planner San Diego",
    "about Wedding Agency San Diego",
    "Nicole Shadoan wedding planner",
    "Southern California wedding planner",
  ],
  openGraph: {
    title: "About Your San Diego Wedding Planner | Wedding Agency San Diego",
    description:
      "Meet Nicole, your San Diego wedding planner with 20+ years in hospitality and 50+ weddings planned. Discover why couples across Southern California trust us.",
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
    title: "About Your San Diego Wedding Planner | Wedding Agency San Diego",
    description:
      "Meet Nicole, your San Diego wedding planner. 20+ years in hospitality, 50+ weddings planned across Southern California.",
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

