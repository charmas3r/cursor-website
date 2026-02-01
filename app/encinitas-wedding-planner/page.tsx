import { getEncinitasVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import EncinitasWeddingPlannerClient from "./EncinitasWeddingPlannerClient";

export const revalidate = 60;

export default async function EncinitasWeddingPlannerPage() {
  // Fetch Encinitas venues from Sanity
  const encinitasVenues = await getEncinitasVenues() as VenueDocument[];
  
  return (
    <EncinitasWeddingPlannerClient encinitasVenues={encinitasVenues} />
  );
}
