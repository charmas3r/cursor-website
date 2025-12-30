"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Star, Quote, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// Reviews based on Wedding Agency San Diego testimonials
const reviews = [
  {
    id: 1,
    names: "Sarah & Michael",
    venue: "Hotel del Coronado",
    rating: 5,
    text: "Wedding Agency San Diego made our dream wedding a reality! From the first consultation to our magical day at the Del, every detail was handled with such care and professionalism. We couldn't have asked for a better team.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    featured: true,
  },
  {
    id: 2,
    names: "Jennifer & David",
    venue: "Rancho Valencia Resort",
    rating: 5,
    text: "Absolutely incredible experience! The attention to detail was beyond anything we expected. Our guests are still talking about how beautiful and seamless everything was.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    featured: false,
  },
  {
    id: 3,
    names: "Amanda & Chris",
    venue: "The Lodge at Torrey Pines",
    rating: 5,
    text: "From vendor coordination to day-of execution, everything was flawless. They turned our vision into something even more beautiful than we imagined. Worth every penny!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    featured: false,
  },
  {
    id: 4,
    names: "Emily & James",
    venue: "Sunset Cliffs",
    rating: 5,
    text: "Our intimate beach ceremony was pure magic. The team handled everything so we could just be present and enjoy our special moment. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    featured: false,
  },
  {
    id: 5,
    names: "Rachel & Tom",
    venue: "Bernardo Winery",
    rating: 5,
    text: "Professional, creative, and genuinely caring. They made the planning process enjoyable and stress-free. Our vineyard wedding exceeded all expectations!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    featured: false,
  },
];

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

export default function Testimonials(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredReview = reviews.find((r) => r.featured);
  const otherReviews = reviews.filter((r) => !r.featured);

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
            Trusted by 150+ Couples
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
          {featuredReview && (
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
                  <StarRating rating={featuredReview.rating} />

                  <blockquote className="mt-6 text-xl sm:text-2xl font-serif text-white leading-relaxed">
                    &ldquo;{featuredReview.text}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blush-400">
                      <Image
                        src={featuredReview.image}
                        alt={featuredReview.names}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-white">
                        {featuredReview.names}
                      </p>
                      <p className="text-sm text-charcoal-400">
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
            {otherReviews.map((review, index) => (
              <motion.article
                key={review.id}
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
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-cream-200">
                        <Image
                          src={review.image}
                          alt={review.names}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-charcoal-900 text-sm">
                          {review.names}
                        </p>
                        <p className="text-xs text-charcoal-500">{review.venue}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  <blockquote className="text-charcoal-600 text-sm leading-relaxed">
                    &ldquo;{review.text}&rdquo;
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
                <p className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">150+</p>
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

            {/* CTA */}
            <a
              href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 text-white rounded-xl font-medium hover:bg-charcoal-800 transition-colors group"
            >
              Read All Reviews on The Knot
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

