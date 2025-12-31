"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Star, Quote, ExternalLink, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CoupleTestimonial } from "@/types/sanity";

// Fallback reviews for when Sanity is empty
const fallbackReviews: CoupleTestimonial[] = [
  {
    _id: "1",
    names: "Sarah & Michael",
    slug: { _type: "slug", current: "sarah-michael" },
    venue: "Hotel del Coronado",
    weddingDate: "2024-10-15",
    review: {
      text: "Wedding Agency San Diego made our dream wedding a reality! From the first consultation to our magical day at the Del, every detail was handled with such care and professionalism. We couldn't have asked for a better team.",
      rating: 5,
      featured: true,
    },
  },
  {
    _id: "2",
    names: "Jennifer & David",
    slug: { _type: "slug", current: "jennifer-david" },
    venue: "Rancho Valencia Resort",
    weddingDate: "2024-09-20",
    review: {
      text: "Absolutely incredible experience! The attention to detail was beyond anything we expected. Our guests are still talking about how beautiful and seamless everything was.",
      rating: 5,
      featured: true,
    },
  },
  {
    _id: "3",
    names: "Amanda & Chris",
    slug: { _type: "slug", current: "amanda-chris" },
    venue: "The Lodge at Torrey Pines",
    weddingDate: "2024-08-12",
    review: {
      text: "From vendor coordination to day-of execution, everything was flawless. They turned our vision into something even more beautiful than we imagined. Worth every penny!",
      rating: 5,
      featured: true,
    },
  },
  {
    _id: "4",
    names: "Emily & James",
    slug: { _type: "slug", current: "emily-james" },
    venue: "Sunset Cliffs",
    weddingDate: "2024-07-28",
    review: {
      text: "Our intimate beach ceremony was pure magic. The team handled everything so we could just be present and enjoy our special moment. Highly recommend!",
      rating: 5,
      featured: true,
    },
  },
  {
    _id: "5",
    names: "Rachel & Tom",
    slug: { _type: "slug", current: "rachel-tom" },
    venue: "Bernardo Winery",
    weddingDate: "2024-06-15",
    review: {
      text: "Professional, creative, and genuinely caring. They made the planning process enjoyable and stress-free. Our vineyard wedding exceeded all expectations!",
      rating: 5,
      featured: true,
    },
  },
];

interface TestimonialsProps {
  initialTestimonials?: CoupleTestimonial[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
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

export default function Testimonials({ initialTestimonials }: TestimonialsProps): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState<CoupleTestimonial[]>(initialTestimonials || fallbackReviews);

  // If no initial testimonials provided, use fallback
  useEffect(() => {
    if (!initialTestimonials || initialTestimonials.length === 0) {
      setReviews(fallbackReviews);
    }
  }, [initialTestimonials]);

  // Get first featured review and other reviews
  const featuredReview = reviews.find((r) => r.review?.featured) || reviews[0];
  const otherReviews = reviews.filter((r) => r._id !== featuredReview?._id).slice(0, 4);

  return (
    <section
      id="reviews"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-cream-50 to-white overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-blush-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
            Trusted by 100+ Couples
          </span>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
            Love Notes from
            <br />
            <span className="text-blush-500">Our Couples</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-charcoal-600 leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our couples have to say
            about their experience with Wedding Agency San Diego.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Review - Large Card */}
          {featuredReview && featuredReview.review && (
            <motion.article
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-full bg-charcoal-900 rounded-3xl p-8 sm:p-10 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blush-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cream-500/10 rounded-full blur-3xl" />

                {/* Quote icon */}
                <Quote className="w-12 h-12 text-blush-400/30 mb-6" aria-hidden="true" />

                {/* Content */}
                <div className="relative">
                  <StarRating rating={featuredReview.review.rating} />

                  <blockquote className="mt-6 text-xl sm:text-2xl font-serif text-white leading-relaxed">
                    &ldquo;{featuredReview.review.text}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-serif font-semibold bg-gradient-to-br",
                      getAvatarColor(featuredReview.names)
                    )}>
                      {getInitials(featuredReview.names)}
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-white">
                        {featuredReview.names}
                      </p>
                      <p className="text-sm text-charcoal-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {featuredReview.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Other Reviews - Stacked Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {otherReviews.map((couple, index) => couple.review && (
              <motion.article
                key={couple._id}
                variants={itemVariants}
                className={cn(
                  "group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500",
                  index === 0 && "sm:col-span-2"
                )}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blush-50 to-cream-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-serif font-semibold bg-gradient-to-br",
                        getAvatarColor(couple.names)
                      )}>
                        {getInitials(couple.names)}
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-charcoal-900 text-sm">
                          {couple.names}
                        </p>
                        <p className="text-xs text-charcoal-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {couple.venue}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={couple.review.rating} />
                  </div>

                  <blockquote className="text-charcoal-600 text-sm leading-relaxed">
                    &ldquo;{couple.review.text}&rdquo;
                  </blockquote>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA - The Knot Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-6 sm:p-8 bg-gradient-to-r from-amber-50 via-cream-50 to-amber-50 rounded-2xl border border-amber-100">
            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">100+</p>
                <p className="text-xs text-charcoal-500 uppercase tracking-wide">Weddings</p>
              </div>
              <div className="w-px h-10 bg-amber-200" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">5.0</p>
                <p className="text-xs text-charcoal-500 uppercase tracking-wide">Star Rating</p>
              </div>
              <div className="w-px h-10 bg-amber-200" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">100%</p>
                <p className="text-xs text-charcoal-500 uppercase tracking-wide">Recommend</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-amber-200" />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 text-white rounded-xl font-medium hover:bg-charcoal-800 transition-colors group"
              >
                Read Reviews on The Knot
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-cream-50 transition-colors border border-charcoal-200 group"
              >
                View All Reviews
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
