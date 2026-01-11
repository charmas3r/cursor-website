import { getCouplesWithReviews } from "@/lib/sanity";
import type { CoupleTestimonial } from "@/types/sanity";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import { Star, ExternalLink, Award, Heart, Users } from "lucide-react";

export const revalidate = 60;

// Fallback testimonials for when Sanity is empty
const fallbackTestimonials: CoupleTestimonial[] = [
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
  {
    _id: "6",
    names: "Lisa & Mark",
    slug: { _type: "slug", current: "lisa-mark" },
    venue: "The Prado at Balboa Park",
    weddingDate: "2024-05-10",
    review: {
      text: "We were so impressed by how organized and thoughtful the entire team was. They anticipated every need and made our day absolutely perfect. Can't recommend them enough!",
      rating: 5,
      featured: true,
    },
  },
];

export default async function TestimonialsPage() {
  let testimonials: CoupleTestimonial[] = await getCouplesWithReviews();
  
  // Use fallback if no testimonials from Sanity
  if (!testimonials || testimonials.length === 0) {
    testimonials = fallbackTestimonials;
  }

  // Filter to only include couples with reviews
  const couplesWithReviews = testimonials.filter((t) => t.review?.text);
  const featuredTestimonials = couplesWithReviews.filter((t) => t.review?.featured);
  const otherTestimonials = couplesWithReviews.filter((t) => !t.review?.featured);

  // Calculate stats
  const totalReviews = couplesWithReviews.length;
  const averageRating = totalReviews > 0 
    ? couplesWithReviews.reduce((acc, t) => acc + (t.review?.rating || 5), 0) / totalReviews 
    : 5;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-cream-50">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blush-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-4">
                <Heart className="w-4 h-4 fill-blush-500" />
                Trusted by 50+ Couples
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-charcoal-900 leading-tight">
                Love Notes from
                <br />
                <span className="text-blush-500">Our Couples</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
                Real stories from real couples. Discover why Wedding Agency San Diego 
                is the trusted choice for creating unforgettable celebrations.
              </p>
            </div>

            {/* Stats Banner */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-12">
              <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-cream-100">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-charcoal-900">{averageRating.toFixed(1)}</p>
                  <p className="text-xs text-charcoal-500 uppercase tracking-wide">Star Rating</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-cream-100">
                <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blush-500" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-charcoal-900">50+</p>
                  <p className="text-xs text-charcoal-500 uppercase tracking-wide">Happy Couples</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-cream-100">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-charcoal-900">2×</p>
                  <p className="text-xs text-charcoal-500 uppercase tracking-wide">Best of Weddings</p>
                </div>
              </div>
            </div>

            {/* Review Platform Badges */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              {/* The Knot Badge */}
              <a
                href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="link_click_external_theknot"
                data-umami-event-location="testimonials_header"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-50 to-cream-50 rounded-full border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <span className="text-sm font-medium text-charcoal-700">
                  See All Reviews on The Knot
                </span>
                <ExternalLink className="w-4 h-4 text-charcoal-500 group-hover:text-blush-500 transition-colors" />
              </a>

              {/* Google Reviews Badge */}
              <a
                href="https://share.google/Pltvlw9njBabd209x"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="link_click_external_google"
                data-umami-event-location="testimonials_header"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-charcoal-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-charcoal-900">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-sm font-medium text-charcoal-700">
                  Google Reviews
                </span>
                <ExternalLink className="w-4 h-4 text-charcoal-500 group-hover:text-blush-500 transition-colors" />
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Reviews Section */}
            {featuredTestimonials.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal-900 mb-8 text-center">
                  Featured Reviews
                </h2>
                <TestimonialsGrid testimonials={featuredTestimonials} featured />
              </div>
            )}

            {/* All Reviews Section */}
            {otherTestimonials.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal-900 mb-8 text-center">
                  More Love Stories
                </h2>
                <TestimonialsGrid testimonials={otherTestimonials} />
              </div>
            )}

            {/* Show all if no featured */}
            {featuredTestimonials.length === 0 && otherTestimonials.length === 0 && couplesWithReviews.length > 0 && (
              <TestimonialsGrid testimonials={couplesWithReviews} featured />
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-charcoal-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-6">
              Ready to Start Your Love Story?
            </h2>
            <p className="text-lg text-charcoal-300 mb-8 max-w-2xl mx-auto">
              Join the hundreds of couples who trusted us to create their perfect day. 
              Let&apos;s craft something beautiful together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                data-umami-event="cta_click_get_started"
                data-umami-event-location="testimonials_cta"
                className="inline-flex items-center justify-center px-8 py-4 bg-blush-500 text-white rounded-full font-medium hover:bg-blush-600 transition-colors"
              >
                Get Started
              </a>
              <a
                href="https://www.theknot.com/marketplace/wedding-agency-san-diego-san-diego-ca-2069439"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="link_click_external_theknot"
                data-umami-event-location="testimonials_cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Read More on The Knot
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
