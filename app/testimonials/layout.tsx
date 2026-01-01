import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp";

export const metadata: Metadata = {
  title: "Testimonials | What Our Couples Say",
  description:
    "Read heartfelt reviews from over 100 happy couples. See why Wedding Agency San Diego is rated 5 stars on The Knot and trusted by couples across Southern California.",
  keywords: [
    "wedding planner reviews",
    "San Diego wedding planner testimonials",
    "wedding coordinator reviews",
    "The Knot reviews",
    "wedding planning testimonials",
    "best wedding planner San Diego",
    "5 star wedding planner",
    "wedding agency reviews",
  ],
  openGraph: {
    title: "Testimonials | Wedding Agency San Diego",
    description:
      "Read heartfelt reviews from over 100 happy couples. 5-star rated on The Knot.",
    url: `${SITE_URL}/testimonials`,
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego - Happy Couples Testimonials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Wedding Agency San Diego",
    description:
      "Read heartfelt reviews from over 100 happy couples. 5-star rated on The Knot.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wedding Agency San Diego Testimonials",
    description:
      "Read heartfelt reviews from over 100 happy couples who trusted Wedding Agency San Diego for their special day.",
    url: `${SITE_URL}/testimonials`,
    image: OG_IMAGE,
    isPartOf: {
      "@type": "WebSite",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
    },
    about: {
      "@type": "LocalBusiness",
      name: "Wedding Agency San Diego",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
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

