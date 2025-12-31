import type { Metadata } from "next";

const SITE_URL = "https://weddingagencysandiego.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&h=630&fit=crop";

export const metadata: Metadata = {
  title: "Wedding Tips & Advice",
  description:
    "Expert wedding planning tips, advice, and inspiration from San Diego's premier wedding planners. Budget guides, timeline checklists, vendor selection tips, and more.",
  keywords: [
    "wedding planning tips",
    "wedding advice",
    "wedding budget guide",
    "wedding timeline",
    "San Diego wedding tips",
    "wedding checklist",
    "wedding vendor tips",
    "wedding day tips",
    "bridal advice",
    "wedding inspiration",
  ],
  openGraph: {
    title: "Wedding Tips & Advice | Wedding Agency San Diego",
    description:
      "Expert wedding planning tips and advice from 20+ years in hospitality and events, planning 100+ weddings in Southern California.",
    url: `${SITE_URL}/wedding-tips`,
    type: "website",
    siteName: "Wedding Agency San Diego",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wedding Tips & Advice - Wedding Agency San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Tips & Advice | Wedding Agency San Diego",
    description:
      "Expert wedding planning tips and advice from San Diego's premier wedding planners.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/wedding-tips`,
  },
};

export default function WeddingTipsLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wedding Tips & Advice",
    description:
      "Expert wedding planning tips and advice from San Diego's premier wedding planners.",
    url: `${SITE_URL}/wedding-tips`,
    image: OG_IMAGE,
    isPartOf: {
      "@type": "WebSite",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Wedding Planning",
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

