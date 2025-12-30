import { Metadata } from "next";

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
    url: "https://weddingagencysandiego.com/blog",
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Blog | Wedding Agency San Diego",
    description:
      "Expert wedding planning tips, real wedding features, and inspiration from San Diego's premier wedding planners.",
  },
  alternates: {
    canonical: "https://weddingagencysandiego.com/blog",
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
    url: "https://weddingagencysandiego.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      url: "https://weddingagencysandiego.com",
      logo: {
        "@type": "ImageObject",
        url: "https://weddingagencysandiego.com/logo.png",
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

