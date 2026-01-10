import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp";

export const metadata: Metadata = {
  title: "San Diego Wedding Planner Reviews | 5-Star Testimonials",
  description:
    "Read 100+ 5-star reviews from happy couples. See why Wedding Agency San Diego is the top-rated wedding planner in San Diego. Award-winning service, trusted across Southern California.",
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
    title: "San Diego Wedding Planner Reviews | 5-Star Testimonials",
    description:
      "Read 100+ 5-star reviews from happy San Diego couples. Top-rated wedding planner.",
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
    title: "San Diego Wedding Planner Reviews | 5-Star Testimonials",
    description:
      "Read 100+ 5-star reviews from happy San Diego couples. Top-rated wedding planner.",
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
  // Reference the main LocalBusiness by @id to avoid "multiple aggregate ratings" error
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
      "@id": `${SITE_URL}/#organization`,
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

