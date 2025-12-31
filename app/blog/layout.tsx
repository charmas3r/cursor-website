import { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&h=630&fit=crop";

export const metadata: Metadata = {
  title: "Wedding Blog | Tips, Inspiration & Real Weddings",
  description:
    "Explore our wedding blog for expert planning tips, real wedding features, San Diego venue guides, and bridal inspiration from the team at Wedding Agency San Diego.",
  keywords: [
    "wedding blog",
    "wedding tips",
    "San Diego weddings",
    "wedding inspiration",
    "bridal advice",
    "wedding planning blog",
    "real weddings",
    "wedding venues San Diego",
    "wedding ideas",
    "engagement tips",
  ],
  openGraph: {
    title: "Wedding Blog | Wedding Agency San Diego",
    description:
      "Expert wedding planning tips, real wedding features, and inspiration from San Diego's premier wedding planners.",
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego Blog - Tips & Inspiration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Blog | Wedding Agency San Diego",
    description:
      "Expert wedding planning tips, real wedding features, and inspiration from San Diego's premier wedding planners.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data for the blog
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Wedding Agency San Diego Blog",
    description:
      "Expert wedding planning tips, real wedding features, and inspiration from San Diego's premier wedding planners.",
    url: `${SITE_URL}/blog`,
    image: OG_IMAGE,
    publisher: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    inLanguage: "en-US",
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

