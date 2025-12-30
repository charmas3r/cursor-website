import { Metadata } from "next";
import { getCoupleById, getAllCoupleIds } from "@/data/couples";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ couple: string }>;
  children: React.ReactNode;
}

// Generate metadata dynamically for each couple
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { couple: coupleId } = await params;
  const couple = getCoupleById(coupleId);

  if (!couple) {
    return {
      title: "Wedding Not Found",
    };
  }

  const title = `${couple.names} Wedding at ${couple.venue} | Wedding Agency San Diego Portfolio`;
  const description = `${couple.tagline}. View the beautiful ${couple.style || "wedding"} of ${couple.names} at ${couple.venue} in ${couple.location}. ${couple.guestCount ? `A celebration with ${couple.guestCount} guests.` : ""} Professional wedding planning by San Diego's premier wedding agency.`;

  return {
    title,
    description,
    keywords: [
      `${couple.names} wedding`,
      `${couple.venue} wedding`,
      `${couple.location} wedding`,
      couple.style || "wedding",
      "San Diego wedding photography",
      "wedding gallery",
      "wedding inspiration",
      "wedding planning San Diego",
      ...(couple.colors || []),
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://weddingagencysandiego.com/portfolio/${couple.id}`,
      images: [
        {
          url: couple.heroImage,
          width: 1200,
          height: 630,
          alt: `${couple.names} wedding at ${couple.venue}`,
        },
      ],
      siteName: "Wedding Agency San Diego",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [couple.heroImage],
    },
    alternates: {
      canonical: `https://weddingagencysandiego.com/portfolio/${couple.id}`,
    },
  };
}

// Generate static params for all couples (used for static generation)
export async function generateStaticParams() {
  return getAllCoupleIds().map((id) => ({
    couple: id,
  }));
}

export default async function CoupleLayout({ children, params }: Props) {
  const { couple: coupleId } = await params;
  const couple = getCoupleById(coupleId);

  if (!couple) {
    notFound();
  }

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${couple.names} Wedding at ${couple.venue}`,
    description: couple.tagline,
    image: couple.heroImage,
    datePublished: couple.weddingDate,
    author: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      url: "https://weddingagencysandiego.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      logo: {
        "@type": "ImageObject",
        url: "https://weddingagencysandiego.com/logo.png",
      },
    },
    about: {
      "@type": "Event",
      name: `${couple.names} Wedding`,
      startDate: couple.weddingDate,
      location: {
        "@type": "Place",
        name: couple.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: couple.location.split(",")[0]?.trim(),
          addressRegion: couple.location.split(",")[1]?.trim() || "CA",
          addressCountry: "US",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Wedding Agency San Diego",
        url: "https://weddingagencysandiego.com",
      },
    },
    mainEntity: {
      "@type": "ImageGallery",
      name: `${couple.names} Wedding Gallery`,
      numberOfItems: couple.galleryImages.length,
      image: couple.galleryImages.map((img, index) => ({
        "@type": "ImageObject",
        url: img,
        name: `${couple.names} wedding photo ${index + 1}`,
        description: `Wedding photo from ${couple.names}'s celebration at ${couple.venue}`,
      })),
    },
  };

  // Add review schema if available
  const reviewJsonLd = couple.review
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: couple.review.rating,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: couple.names,
        },
        reviewBody: couple.review.text,
        itemReviewed: {
          "@type": "LocalBusiness",
          name: "Wedding Agency San Diego",
          url: "https://weddingagencysandiego.com",
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {reviewJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
        />
      )}
      {children}
    </>
  );
}

