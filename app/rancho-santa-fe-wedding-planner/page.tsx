import { getRanchoSantaFeVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import RanchoSantaFeWeddingPlannerClient from "./RanchoSantaFeWeddingPlannerClient";

export const revalidate = 60;

export default async function RanchoSantaFeWeddingPlannerPage() {
  // Fetch Rancho Santa Fe venues from Sanity
  const ranchoSantaFeVenues = await getRanchoSantaFeVenues() as VenueDocument[];
  
  return (
    <RanchoSantaFeWeddingPlannerClient ranchoSantaFeVenues={ranchoSantaFeVenues} />
  );
}
