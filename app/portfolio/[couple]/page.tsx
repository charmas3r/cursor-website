import { notFound } from "next/navigation";
import { getCoupleBySlug, getCouples } from "@/lib/sanity";
import CoupleGallery from "@/components/CoupleGallery";
import type { Couple } from "@/types/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

// Generate static params for all couples
export async function generateStaticParams() {
  const couples: Couple[] = await getCouples();
  return couples.map((couple) => ({
    couple: couple.slug.current,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { couple: coupleSlug } = await params;
  const couple: Couple | null = await getCoupleBySlug(coupleSlug);
  
  if (!couple) {
    return {
      title: "Couple Not Found",
    };
  }

  return {
    title: `${couple.names} Wedding | ${couple.venue} | San Diego Wedding Planner`,
    description: `${couple.tagline}. View the beautiful wedding gallery of ${couple.names} at ${couple.venue}, ${couple.location}.`,
  };
}

interface Props {
  params: Promise<{ couple: string }>;
}

export default async function CoupleGalleryPage({ params }: Props) {
  const { couple: coupleSlug } = await params;
  const couple: Couple | null = await getCoupleBySlug(coupleSlug);

  if (!couple) {
    notFound();
  }

  return <CoupleGallery couple={couple} />;
}
