import { getTemeculaVenues } from "@/lib/sanity";
import type { VenueDocument } from "@/types/sanity";
import TemeculaWeddingPlannerClient from "./TemeculaWeddingPlannerClient";

export const revalidate = 60;

export default async function TemeculaWeddingPlannerPage() {
  // Fetch Temecula venues from Sanity
  const temeculaVenues = await getTemeculaVenues() as VenueDocument[];
  
  return (
    <TemeculaWeddingPlannerClient temeculaVenues={temeculaVenues} />
  );
}
