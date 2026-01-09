"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, Award, MapPin } from "lucide-react";
import type { SanityImage } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface PreferredVenueData {
  _id: string;
  venue: string;
  venueUrl?: string;
  location: string;
  heroImage?: SanityImage;
}

interface AggregatedVenue {
  venue: string;
  venueUrl?: string;
  location: string;
  weddingCount: number;
  heroImage?: SanityImage;
}

interface PreferredVenuesProps {
  venues: PreferredVenueData[];
}

// Aggregate venues to avoid duplicates and count weddings
function aggregateVenues(venues: PreferredVenueData[]): AggregatedVenue[] {
  const venueMap = new Map<string, AggregatedVenue>();

  venues.forEach((v) => {
    const key = v.venue.toLowerCase().trim();

    if (venueMap.has(key)) {
      const existing = venueMap.get(key)!;
      existing.weddingCount++;
      // Keep the first image found
      if (!existing.heroImage && v.heroImage) {
        existing.heroImage = v.heroImage;
      }
      // Keep URL if we find one
      if (!existing.venueUrl && v.venueUrl) {
        existing.venueUrl = v.venueUrl;
      }
    } else {
      venueMap.set(key, {
        venue: v.venue,
        venueUrl: v.venueUrl,
        location: v.location,
        weddingCount: 1,
        heroImage: v.heroImage,
      });
    }
  });

  return Array.from(venueMap.values()).sort((a, b) => b.weddingCount - a.weddingCount);
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function PreferredVenues({ venues }: PreferredVenuesProps): JSX.Element | null {
  const aggregatedVenues = aggregateVenues(venues);

  // Don't render if no preferred venues
  if (aggregatedVenues.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-cream-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blush-500" />
            <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
              Trusted Partner
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
            Preferred Vendor at
            <br />
            <span className="text-blush-500">Premier Venues</span>
          </h2>
          <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
            We&apos;re honored to be a preferred vendor at these exceptional San Diego venues,
            a testament to our commitment to excellence and collaborative relationships.
          </p>
        </motion.div>

        {/* Venues Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {aggregatedVenues.map((venue) => (
            <motion.div
              key={venue.venue}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Venue Image */}
              <div className="relative h-48 overflow-hidden">
                {venue.heroImage ? (
                  <Image
                    src={urlFor(venue.heroImage).width(600).height(400).url()}
                    alt={`Wedding at ${venue.venue}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blush-100 to-cream-100 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-blush-300" />
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                
                {/* Preferred Badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                    <Award className="w-3.5 h-3.5 text-blush-500" />
                    <span className="text-xs font-semibold text-charcoal-800">Preferred Vendor</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-600 transition-colors">
                      {venue.venue}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-charcoal-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-sm">{venue.location}</span>
                    </div>
                  </div>
                  {venue.venueUrl && (
                    <a
                      href={venue.venueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-charcoal-400 hover:text-blush-500 hover:bg-blush-50 transition-colors"
                      aria-label={`Visit ${venue.venue} website`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Wedding count */}
                <div className="mt-4 pt-4 border-t border-cream-200">
                  <p className="text-sm text-charcoal-600">
                    <span className="font-semibold text-blush-500">{venue.weddingCount}</span>
                    {" "}wedding{venue.weddingCount !== 1 ? "s" : ""} planned at this venue
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-charcoal-600 mb-6">
            Planning your wedding at one of these venues? Let&apos;s create something beautiful together.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white rounded-xl font-medium hover:bg-charcoal-800 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}






