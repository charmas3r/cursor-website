import { getFallbrookVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import FallbrookWeddingPlannerClient from "./FallbrookWeddingPlannerClient";

export const revalidate = 60;

export default async function FallbrookWeddingPlannerPage() {
  // Fetch Fallbrook venues from Sanity
  const fallbrookVenues = await getFallbrookVenues() as VenueDocument[];
  
  return (
    <FallbrookWeddingPlannerClient fallbrookVenues={fallbrookVenues} />
  );
}
