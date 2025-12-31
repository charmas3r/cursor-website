import { Metadata } from "next";
import { getCoupleBySlug, getCouples, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import type { Couple } from "@/types/sanity";

const SITE_URL = "https://weddingagencysandiego.com";

interface Props {
  params: Promise<{ couple: string }>;
  children: React.ReactNode;
}

// Helper to check if image is valid
const isValidImage = (image: Couple["heroImage"]) => {
  return image?.asset && (image.asset._ref || image.asset._id);
};

// Generate metadata dynamically for each couple
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { couple: coupleSlug } = await params;
  const couple: Couple | null = await getCoupleBySlug(coupleSlug);

  if (!couple) {
    return {
      title: "Wedding Not Found",
    };
  }

  const title = `${couple.names} Wedding at ${couple.venue} | Wedding Agency San Diego Portfolio`;
  const description = `${couple.tagline}. View the beautiful ${couple.style || "wedding"} of ${couple.names} at ${couple.venue} in ${couple.location}. ${couple.guestCount ? `A celebration with ${couple.guestCount} guests.` : ""} Professional wedding planning by San Diego's premier wedding agency.`;

  // Get OG image URL from Sanity
  const ogImageUrl = isValidImage(couple.heroImage)
    ? urlFor(couple.heroImage).width(1200).height(630).url()
    : `${SITE_URL}/og-portfolio.jpg`;

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
      url: `${SITE_URL}/portfolio/${couple.slug.current}`,
      images: [
        {
          url: ogImageUrl,
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
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/portfolio/${couple.slug.current}`,
    },
  };
}

// Generate static params for all couples (used for static generation)
export async function generateStaticParams() {
  const couples: Couple[] = await getCouples();
  return couples.map((couple) => ({
    couple: couple.slug.current,
  }));
}

export default async function CoupleLayout({ children, params }: Props) {
  const { couple: coupleSlug } = await params;
  const couple: Couple | null = await getCoupleBySlug(coupleSlug);

  if (!couple) {
    notFound();
  }

  // Get hero image URL for schema
  const heroImageUrl = isValidImage(couple.heroImage)
    ? urlFor(couple.heroImage).width(1200).height(630).url()
    : `${SITE_URL}/og-portfolio.jpg`;

  // Filter valid gallery images for schema
  const validGalleryImages = couple.galleryImages?.filter(isValidImage) || [];

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${couple.names} Wedding at ${couple.venue}`,
    description: couple.tagline,
    image: heroImageUrl,
    datePublished: couple.weddingDate,
    author: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
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
        url: SITE_URL,
      },
    },
    mainEntity: {
      "@type": "ImageGallery",
      name: `${couple.names} Wedding Gallery`,
      numberOfItems: validGalleryImages.length,
      image: validGalleryImages.slice(0, 10).map((img, index) => ({
        "@type": "ImageObject",
        url: urlFor(img).width(800).url(),
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
          url: SITE_URL,
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

