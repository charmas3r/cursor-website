"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Venue {
  name: string;
  location: string;
  lat: number;
  lng: number;
}

interface VenueMapClientProps {
  venues: Venue[];
}

// Custom marker icon
const customIcon = new Icon({
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
      
      {/* Venue markers */}
      {venues.map((venue) => (
        <Marker
          key={venue.name}
          position={[venue.lat, venue.lng]}
          icon={customIcon}
        >
          <Popup className="venue-popup">
            <div className="p-1">
              <h3 className="font-serif font-semibold text-charcoal-900 text-sm">
                {venue.name}
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                {venue.location}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
