import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Meet the Wedding Agency San Diego Team",
  description:
    "Meet the passionate team behind Wedding Agency San Diego. With 15+ years of experience and 500+ weddings planned, discover why couples trust us to create their perfect day.",
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
      "Meet the passionate team behind Wedding Agency San Diego. With 15+ years of experience and 500+ weddings planned, discover why couples trust us to create their perfect day.",
    type: "website",
    locale: "en_US",
    url: "https://weddingagencysandiego.com/about",
    siteName: "Wedding Agency San Diego",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Meet the Wedding Agency San Diego Team",
    description:
      "Meet the passionate team behind Wedding Agency San Diego. 15+ years of experience, 500+ weddings planned.",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    ],
  },
  alternates: {
    canonical: "https://weddingagencysandiego.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Wedding Agency San Diego",
              description:
                "Premier wedding planning and coordination services in San Diego, California. Full-service planning, wedding management, and custom wedding experiences.",
              foundingDate: "2009",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: 8,
              },
              award: [
                "Best of Weddings 2025 - The Knot",
                "Best of Weddings 2024 - The Knot",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}

