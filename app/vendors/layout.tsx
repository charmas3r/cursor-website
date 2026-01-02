import { Metadata } from "next";

const OG_IMAGE = "https://res.cloudinary.com/dvdrv4i4x/image/upload/v1767238922/processed-F6C355EA-4876-41AF-A491-FC3A51C2C1AF_raelqt.webp";

export const metadata: Metadata = {
  title: "Vendor Directory | Our Trusted Wedding Partners",
  description:
    "Discover our network of talented wedding vendors in San Diego. From photographers to florists, these are the professionals we trust and recommend.",
  keywords: [
    "San Diego wedding vendors",
    "wedding photographer San Diego",
    "wedding florist",
    "wedding caterer",
    "wedding DJ",
    "wedding vendors directory",
    "recommended wedding vendors",
  ],
  openGraph: {
    title: "Vendor Directory | Wedding Agency San Diego",
    description:
      "Discover our network of talented wedding vendors in San Diego.",
    type: "website",
    url: "https://weddingagencysandiego.com/vendors",
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding Agency San Diego - Trusted Vendor Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendor Directory | Wedding Agency San Diego",
    description:
      "Discover our network of talented wedding vendors in San Diego.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://weddingagencysandiego.com/vendors",
  },
};

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wedding Agency San Diego Vendor Directory",
    description:
      "Discover our network of talented wedding vendors we trust and recommend for San Diego weddings.",
    url: "https://weddingagencysandiego.com/vendors",
    isPartOf: {
      "@type": "WebSite",
      name: "Wedding Agency San Diego",
      url: "https://weddingagencysandiego.com",
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


