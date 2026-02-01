import { getDelMarVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import DelMarWeddingPlannerClient from "./DelMarWeddingPlannerClient";

export const revalidate = 60;

export default async function DelMarWeddingPlannerPage() {
  // Fetch Del Mar venues from Sanity
  const delMarVenues = await getDelMarVenues() as VenueDocument[];
  
  return (
    <DelMarWeddingPlannerClient delMarVenues={delMarVenues} />
  );
}
