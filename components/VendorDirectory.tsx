"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  Video,
  Flower2,
  UtensilsCrossed,
  Cake,
  Music,
  Sparkles,
  Shirt,
  Building2,
  Armchair,
  FileText,
  Heart,
  Car,
  Lightbulb,
  ExternalLink,
  Users,
  Award,
} from "lucide-react";
import type { AggregatedVendor } from "@/types/sanity";

interface VendorDirectoryProps {
  groupedVendors: Record<string, AggregatedVendor[]>;
  sortedCategories: string[];
  totalVendors: number;
  totalWeddings: number;
}

// Get icon for each category
function getCategoryIcon(category: string) {
  const icons: Record<string, typeof Camera> = {
    Photography: Camera,
    Videography: Video,
    Florals: Flower2,
    Catering: UtensilsCrossed,
    "Cake & Desserts": Cake,
    "Music & Entertainment": Music,
    "Hair & Makeup": Sparkles,
    "Bridal Attire": Shirt,
    "Groom Attire": Shirt,
    Venues: Building2,
    Rentals: Armchair,
    Stationery: FileText,
    Officiants: Heart,
    Transportation: Car,
    "Decor & Lighting": Lightbulb,
  };
  return icons[category] || Sparkles;
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
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function VendorDirectory({
  groupedVendors,
  sortedCategories,
  totalVendors,
  totalWeddings,
}: VendorDirectoryProps): JSX.Element {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-blush-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Our Trusted Partners
            </span>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
              Vendor Directory
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-600 leading-relaxed">
              These talented professionals have helped us create unforgettable weddings.
              We&apos;re proud to recommend each one.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 inline-flex items-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">
                {totalVendors}+
              </p>
              <p className="text-xs text-charcoal-500 uppercase tracking-wide">
                Vendors
              </p>
            </div>
            <div className="w-px h-12 bg-cream-300" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">
                {totalWeddings}+
              </p>
              <p className="text-xs text-charcoal-500 uppercase tracking-wide">
                Weddings Together
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {sortedCategories.map((category) => {
              const vendors = groupedVendors[category];
              const Icon = getCategoryIcon(category);

              return (
                <motion.div key={category} variants={itemVariants}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blush-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-medium text-charcoal-900">
                        {category}
                      </h2>
                      <p className="text-sm text-charcoal-500">
                        {vendors.length} vendor{vendors.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Vendor Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map((vendor) => (
                      <VendorCard key={vendor.name} vendor={vendor} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Empty State */}
          {sortedCategories.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-charcoal-600 mb-2">
                No vendors yet
              </h3>
              <p className="text-charcoal-500">
                Check back soon as we add our trusted vendor partners.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-12 h-12 text-blush-400 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal-900 mb-4">
            Want to Join Our Vendor Network?
          </h2>
          <p className="text-charcoal-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking to connect with talented wedding professionals
            who share our commitment to excellence.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white rounded-xl font-medium hover:bg-charcoal-800 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}

function VendorCard({ vendor }: { vendor: AggregatedVendor }): JSX.Element {
  return (
    <div className="group bg-cream-50 rounded-2xl p-6 border border-cream-200 hover:border-blush-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-serif font-semibold text-charcoal-900 group-hover:text-blush-600 transition-colors">
            {vendor.name}
          </h3>
          <p className="text-sm text-charcoal-500">{vendor.role}</p>
        </div>
        {vendor.url && (
          <a
            href={vendor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-charcoal-400 hover:text-blush-500 hover:bg-blush-50 transition-colors"
            aria-label={`Visit ${vendor.name}'s website`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Weddings worked on */}
      <div className="pt-4 border-t border-cream-200">
        <p className="text-xs text-charcoal-500 uppercase tracking-wide mb-2">
          Featured in {vendor.weddings.length} wedding{vendor.weddings.length !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {vendor.weddings.slice(0, 3).map((wedding) => (
            <Link
              key={wedding.slug}
              href={`/portfolio/${wedding.slug}`}
              className="text-xs px-2 py-1 rounded-full bg-white text-charcoal-600 hover:text-blush-600 hover:bg-blush-50 transition-colors"
            >
              {wedding.names}
            </Link>
          ))}
          {vendor.weddings.length > 3 && (
            <span className="text-xs px-2 py-1 text-charcoal-400">
              +{vendor.weddings.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

