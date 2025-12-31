"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, ExternalLink, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import type { Testimonial } from "@/types/sanity";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  featured?: boolean;
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

function StarRating({ rating }: { rating: number }): JSX.Element {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "text-amber-400 fill-amber-400" : "text-charcoal-200"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function getSourceLabel(source?: string): string {
  switch (source) {
    case "theknot":
      return "The Knot";
    case "weddingwire":
      return "WeddingWire";
    case "google":
      return "Google";
    default:
      return "";
  }
}

function getServiceLabel(serviceType?: string): string {
  switch (serviceType) {
    case "full-service":
      return "Full Service Planning";
    case "partial":
      return "Partial Planning";
    case "management":
      return "Wedding Management";
    case "destination":
      return "Destination Wedding";
    case "design":
      return "Design & Styling";
    default:
      return "";
  }
}

// Helper to check if image is valid
const isValidImage = (image?: Testimonial["image"]) => {
  return image?.asset && (image.asset._ref || image.asset._id);
};

export default function TestimonialsGrid({
  testimonials,
  featured = false,
}: TestimonialsGridProps): JSX.Element {
  if (featured && testimonials.length > 0) {
    // Featured layout: First one large, rest in grid
    const [firstTestimonial, ...restTestimonials] = testimonials;

    return (
      <div className="space-y-8">
        {/* Featured Large Card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-charcoal-900 rounded-3xl p-8 sm:p-12 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blush-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cream-500/10 rounded-full blur-3xl" />

          {/* Quote icon */}
          <Quote className="w-12 h-12 text-blush-400/30 mb-6" aria-hidden="true" />

          <div className="relative lg:flex lg:gap-12 lg:items-center">
            <div className="lg:flex-1">
              <StarRating rating={firstTestimonial.rating} />

              <blockquote className="mt-6 text-xl sm:text-2xl lg:text-3xl font-serif text-white leading-relaxed">
                &ldquo;{firstTestimonial.text}&rdquo;
              </blockquote>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-4">
                  {isValidImage(firstTestimonial.image) ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blush-400">
                      <Image
                        src={urlFor(firstTestimonial.image!).width(128).height(128).url()}
                        alt={firstTestimonial.names}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush-400 to-blush-500 flex items-center justify-center text-white text-xl font-serif">
                      {firstTestimonial.names.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-serif font-semibold text-white text-lg">
                      {firstTestimonial.names}
                    </p>
                    <p className="text-sm text-charcoal-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {firstTestimonial.venue}
                    </p>
                  </div>
                </div>

                {firstTestimonial.theKnotUrl && (
                  <a
                    href={firstTestimonial.theKnotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blush-400 hover:text-blush-300 transition-colors"
                  >
                    View on The Knot
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Rest of featured testimonials */}
        {restTestimonials.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {restTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  // Regular grid layout
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial._id} testimonial={testimonial} />
      ))}
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }): JSX.Element {
  const sourceLabel = getSourceLabel(testimonial.source);
  const serviceLabel = getServiceLabel(testimonial.serviceType);

  return (
    <motion.article
      variants={itemVariants}
      className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-cream-100 flex flex-col h-full"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blush-50 to-cream-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {isValidImage(testimonial.image) ? (
              <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-200">
                <Image
                  src={urlFor(testimonial.image!).width(96).height(96).url()}
                  alt={testimonial.names}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-300 to-blush-400 flex items-center justify-center text-white font-serif">
                {testimonial.names.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-serif font-semibold text-charcoal-900">
                {testimonial.names}
              </p>
              <p className="text-xs text-charcoal-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {testimonial.venue}
              </p>
            </div>
          </div>
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote */}
        <blockquote className="text-charcoal-600 text-sm leading-relaxed flex-1">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-cream-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            {serviceLabel && (
              <span className="inline-flex px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full">
                {serviceLabel}
              </span>
            )}
            {sourceLabel && (
              <span className="text-xs text-charcoal-400">
                via {sourceLabel}
              </span>
            )}
          </div>
          
          {testimonial.theKnotUrl && (
            <a
              href={testimonial.theKnotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blush-500 hover:text-blush-600 transition-colors"
            >
              Read full review
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Highlights */}
        {testimonial.highlights && testimonial.highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {testimonial.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="inline-flex px-2 py-0.5 bg-cream-100 text-charcoal-600 text-xs rounded"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

