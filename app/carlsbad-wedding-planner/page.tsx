import { getCarlsbadVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import CarlsbadWeddingPlannerClient from "./CarlsbadWeddingPlannerClient";

export const revalidate = 60;

export default async function CarlsbadWeddingPlannerPage() {
  // Fetch Carlsbad venues from Sanity
  const carlsbadVenues = await getCarlsbadVenues() as VenueDocument[];
  
  return (
    <CarlsbadWeddingPlannerClient carlsbadVenues={carlsbadVenues} />
  );
}
