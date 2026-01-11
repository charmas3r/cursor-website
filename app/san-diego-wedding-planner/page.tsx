import { getPreferredVenues, getVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import SanDiegoWeddingPlannerClient from "./SanDiegoWeddingPlannerClient";

export const revalidate = 60;

export default async function SanDiegoWeddingPlannerPage() {
  // Fetch both preferred venues (for the venues section) and all venues (for the map)
  const [preferredVenues, allVenues] = await Promise.all([
    getPreferredVenues() as Promise<VenueDocument[]>,
    getVenues() as Promise<VenueDocument[]>,
  ]);
  
  return (
    <SanDiegoWeddingPlannerClient 
      preferredVenues={preferredVenues} 
      allVenues={allVenues}
    />
  );
}
