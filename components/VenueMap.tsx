"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Venue location data
const venueLocations = [
  { name: "Twin Oaks Golf Course", location: "San Marcos", lat: 33.1283, lng: -117.1653 },
  { name: "Rancho Valencia Resort", location: "Rancho Santa Fe", lat: 33.0089, lng: -117.2019 },
  { name: "Hotel del Coronado", location: "Coronado", lat: 32.6810, lng: -117.1780 },
  { name: "The Lodge at Torrey Pines", location: "La Jolla", lat: 32.9005, lng: -117.2467 },
  { name: "Bernardo Winery", location: "San Diego", lat: 33.0601, lng: -117.0661 },
  { name: "Estancia La Jolla", location: "La Jolla", lat: 32.8598, lng: -117.2249 },
  { name: "Mount Palomar Winery", location: "Temecula", lat: 33.3547, lng: -117.0022 },
  { name: "Fairmont Grand Del Mar", location: "San Diego", lat: 32.9419, lng: -117.2089 },
  { name: "The Prado at Balboa Park", location: "San Diego", lat: 32.7316, lng: -117.1453 },
  { name: "US Grant Hotel", location: "Downtown San Diego", lat: 32.7198, lng: -117.1628 },
  { name: "La Jolla Cove", location: "La Jolla", lat: 32.8503, lng: -117.2731 },
  { name: "Sunset Cliffs", location: "San Diego", lat: 32.7195, lng: -117.2547 },
  { name: "Anza-Borrego Desert", location: "Anza-Borrego", lat: 33.2558, lng: -116.4017 },
];

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
}

export default function VenueMap({ className }: VenueMapProps): JSX.Element {
  return (
    <div className={className}>
      <MapComponent venues={venueLocations} />
    </div>
  );
}

export { venueLocations };
export type { VenueMapProps };
