"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Venue {
  name: string;
  location: string;
  lat: number;
  lng: number;
  preferred?: boolean;
  imageUrl?: string;
  weddingCount?: number;
  website?: string;
}

interface VenueMapClientProps {
  venues: Venue[];
}

// Regular venue marker (blush/pink)
const regularIcon = new Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="40">
      <path fill="#f3a8a2" stroke="#1a1a1a" stroke-width="1" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle fill="#1a1a1a" cx="12" cy="9" r="3"/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

// Preferred venue marker (gold with star)
const preferredIcon = new Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="40" height="50">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path filter="url(#shadow)" fill="#d4a574" stroke="#8b6914" stroke-width="1.5" d="M16 2C10.48 2 6 6.48 6 12c0 7 10 17 10 17s10-10 10-17c0-5.52-4.48-10-10-10z"/>
      <circle fill="#fff" cx="16" cy="12" r="7"/>
      <path fill="#d4a574" d="M16 7l1.12 3.45h3.63l-2.94 2.13 1.12 3.45L16 13.9l-2.93 2.13 1.12-3.45-2.94-2.13h3.63z"/>
    </svg>
  `),
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

export default function VenueMapClient({ venues }: VenueMapClientProps): JSX.Element {
  // Calculate bounds to fit all markers
  const bounds = new LatLngBounds(
    venues.map(v => [v.lat, v.lng] as [number, number])
  );

  // Center of San Diego area
  const center: [number, number] = [32.9, -117.1];

  return (
    <MapContainer
      center={center}
      zoom={9}
      bounds={bounds}
      scrollWheelZoom={false}
      className="w-full h-full min-h-[400px]"
      style={{ background: "#1a1a1a" }}
    >
      {/* Dark themed tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Venue markers - render regular venues first, preferred on top */}
      {venues
        .sort((a, b) => (a.preferred ? 1 : 0) - (b.preferred ? 1 : 0))
        .map((venue) => (
        <Marker
          key={venue.name}
          position={[venue.lat, venue.lng]}
          icon={venue.preferred ? preferredIcon : regularIcon}
          zIndexOffset={venue.preferred ? 1000 : 0}
        >
          <Popup className="venue-popup" maxWidth={280} minWidth={200}>
            <div className="overflow-hidden">
              {/* Venue Image for preferred venues */}
              {venue.preferred && venue.imageUrl && (
                <div className="relative w-full h-28 -mx-0 -mt-0 mb-2 overflow-hidden rounded-t">
                  <img 
                    src={venue.imageUrl} 
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    Preferred
                  </div>
                </div>
              )}
              
              {/* Preferred badge for venues without image */}
              {venue.preferred && !venue.imageUrl && (
                <div className="flex items-center gap-1 mb-2 text-amber-600 text-xs font-semibold">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Preferred Venue
                </div>
              )}
              
              {/* Venue Info */}
              <div className="px-1 pb-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {venue.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {venue.location}
                </p>
                
                {/* Wedding count for preferred venues */}
                {venue.preferred && typeof venue.weddingCount === 'number' && venue.weddingCount > 0 && (
                  <p className="text-xs text-amber-600 mt-1.5 font-medium">
                    {venue.weddingCount} wedding{venue.weddingCount !== 1 ? 's' : ''} planned here
                  </p>
                )}
                
                {/* Website link */}
                {venue.website && (
                  <a 
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium"
                  >
                    Visit Website
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
