"use client";

import dynamic from "next/dynamic";

// Venue data for map display
export interface MapVenue {
  name: string;
  location: string;
  lat: number;
  lng: number;
  preferred?: boolean;
  imageUrl?: string;
  weddingCount?: number;
  website?: string;
}

// We need to dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(
  () => import("./VenueMapClient"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-charcoal-800 flex items-center justify-center">
        <div className="text-white/60 text-sm">Loading map...</div>
      </div>
    )
  }
);

interface VenueMapProps {
  className?: string;
  venues: MapVenue[];
}

export default function VenueMap({ className, venues }: VenueMapProps): JSX.Element {
  // Filter out venues without valid coordinates (check for actual number, not falsiness)
  const validVenues = venues.filter(v => 
    typeof v.lat === 'number' && 
    typeof v.lng === 'number' && 
    !isNaN(v.lat) && 
    !isNaN(v.lng)
  );
  
  if (validVenues.length === 0) {
    return (
      <div className={className}>
        <div className="w-full h-full min-h-[400px] bg-charcoal-800 flex items-center justify-center">
          <div className="text-white/60 text-sm">No venues with coordinates available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MapComponent venues={validVenues} />
    </div>
  );
}

export type { VenueMapProps };
