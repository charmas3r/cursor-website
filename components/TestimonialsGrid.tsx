"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
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

// Generate initials from name
function getInitials(name: string): string {
  const parts = name.split(/[&,]/);
  if (parts.length >= 2) {
    return parts.map(p => p.trim().charAt(0).toUpperCase()).join("");
  }
  const words = name.trim().split(" ");
  if (words.length >= 2) {
    return words.slice(0, 2).map(w => w.charAt(0).toUpperCase()).join("");
  }
  return name.slice(0, 2).toUpperCase();
}

// Generate consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    "from-blush-400 to-blush-500",
    "from-sage-400 to-sage-500",
    "from-amber-400 to-amber-500",
    "from-rose-400 to-rose-500",
    "from-violet-400 to-violet-500",
    "from-teal-400 to-teal-500",
  ];
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", { 
    month: "long", 
    year: "numeric" 
  });
}

export default function TestimonialsGrid({
  testimonials,
  featured = false,
}: TestimonialsGridProps): JSX.Element {
  if (featured && testimonials.length > 0) {
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
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-serif font-semibold bg-gradient-to-br",
                    getAvatarColor(firstTestimonial.name)
                  )}>
                    {getInitials(firstTestimonial.name)}
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-white text-lg">
                      {firstTestimonial.name}
                    </p>
                    <p className="text-sm text-charcoal-400">
                      {formatDate(firstTestimonial.date)}
                    </p>
                  </div>
                </div>
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
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-serif font-semibold bg-gradient-to-br",
              getAvatarColor(testimonial.name)
            )}>
              {getInitials(testimonial.name)}
            </div>
            <div>
              <p className="font-serif font-semibold text-charcoal-900">
                {testimonial.name}
              </p>
              <p className="text-xs text-charcoal-500">
                {formatDate(testimonial.date)}
              </p>
            </div>
          </div>
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote */}
        <blockquote className="text-charcoal-600 text-sm leading-relaxed flex-1">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
      </div>
    </motion.article>
  );
}
