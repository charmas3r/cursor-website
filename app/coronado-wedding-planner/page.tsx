import { getCoronadoVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import CoronadoWeddingPlannerClient from "./CoronadoWeddingPlannerClient";

export const revalidate = 60;

export default async function CoronadoWeddingPlannerPage() {
  // Fetch Coronado venues from Sanity
  const coronadoVenues = await getCoronadoVenues() as VenueDocument[];
  
  return (
    <CoronadoWeddingPlannerClient coronadoVenues={coronadoVenues} />
  );
}
