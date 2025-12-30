import { notFound } from "next/navigation";
import { getCoupleById, getAllCoupleIds } from "@/data/couples";
import CoupleGallery from "@/components/CoupleGallery";

// Generate static params for all couples
export function generateStaticParams() {
  return getAllCoupleIds().map((id) => ({
    couple: id,
  }));
}

interface Props {
  params: Promise<{ couple: string }>;
}

export default async function CoupleGalleryPage({ params }: Props) {
  const { couple: coupleId } = await params;
  const couple = getCoupleById(coupleId);

  if (!couple) {
    notFound();
  }

  return <CoupleGallery couple={couple} />;
}
