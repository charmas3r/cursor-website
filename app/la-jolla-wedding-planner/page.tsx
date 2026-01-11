import { getLaJollaVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import LaJollaWeddingPlannerClient from "./LaJollaWeddingPlannerClient";

export const revalidate = 60;

export default async function LaJollaWeddingPlannerPage() {
  // Fetch La Jolla venues from Sanity
  const laJollaVenues = await getLaJollaVenues() as VenueDocument[];
  
  return (
    <LaJollaWeddingPlannerClient laJollaVenues={laJollaVenues} />
  );
}
