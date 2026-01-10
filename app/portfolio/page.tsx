import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin, ArrowRight, Star, Sparkles } from "lucide-react";
import { getFeaturedCouples, getNonFeaturedCouples, urlFor } from "@/lib/sanity";
import type { Couple } from "@/types/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PortfolioPage() {
  let featuredCouples: Couple[] = [];
  let allCouples: Couple[] = [];
  let hasError = false;

  try {
    [featuredCouples, allCouples] = await Promise.all([
      getFeaturedCouples(),
      getNonFeaturedCouples(),
    ]);
  } catch (error) {
    console.error("Error fetching couples:", error);
    hasError = true;
  }

  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blush-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cream-300/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blush-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-6">
            <Heart className="w-4 h-4" aria-hidden="true" />
            Our Amazing Couples
            <Heart className="w-4 h-4" aria-hidden="true" />
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal-900 leading-tight mb-6">
            Love Stories
            <br />
            <span className="text-blush-500">We&apos;ve Crafted</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-charcoal-600 leading-relaxed mb-8">
            Every couple has a unique story. Here are the unforgettable celebrations
            we&apos;ve had the honor of bringing to life across San Diego and beyond.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-charcoal-600">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blush-500 fill-blush-500" aria-hidden="true" />
              <span className="font-medium">100+ Weddings</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blush-500 fill-blush-500" aria-hidden="true" />
              <span className="font-medium">100% Happy Couples</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blush-500" aria-hidden="true" />
              <span className="font-medium">20+ Years in Hospitality</span>
            </div>
          </div>
        </div>

      </section>

      {/* Error State */}
      {hasError && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-cream-50 rounded-3xl p-12 border border-cream-200">
              <Sparkles className="w-12 h-12 text-blush-400 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-medium text-charcoal-900 mb-4">
                Portfolio Coming Soon
              </h2>
              <p className="text-charcoal-600 mb-8">
                We&apos;re working on bringing you beautiful wedding stories.
                Check back soon!
              </p>
              <Link href="/#contact" data-umami-event="cta_click_get_in_touch" data-umami-event-location="portfolio_empty">
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Weddings */}
      {!hasError && featuredCouples.length > 0 && (
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                Featured Celebrations
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
                Recent Highlights
              </h2>
              <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
                Discover some of our most breathtaking weddings.
              </p>
            </div>

            {/* Featured Grid - Large Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:grid-rows-[350px_350px]">
              {featuredCouples.map((couple, index) => (
                <article
                  key={couple._id}
                  className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <Link href={`/portfolio/${couple.slug.current}`} data-umami-event="link_click_portfolio_featured" data-umami-event-wedding={couple.names} className="block h-full">
                    <div
                      className={`relative h-full ${
                        index === 0 ? "min-h-[400px]" : "min-h-[350px]"
                      }`}
                    >
                      {couple.heroImage ? (
                        <Image
                          src={urlFor(couple.heroImage)
                            .width(index === 0 ? 1200 : 800)
                            .height(index === 0 ? 800 : 600)
                            .url()}
                          alt={couple.heroImage.alt || `${couple.names} wedding at ${couple.venue}`}
                          fill
                          sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blush-200 to-cream-200" />
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                          <div className="flex items-center gap-4 text-white/80 text-sm mb-3">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" aria-hidden="true" />
                              {couple.venue}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              {couple.displayDate}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-white mb-2">
                            {couple.names}
                          </h3>
                          <p className="text-blush-300 font-medium mb-4">{couple.tagline}</p>

                          {couple.review && (
                            <blockquote className="text-white/90 text-sm italic leading-relaxed mb-4 max-w-md">
                              &ldquo;{couple.review.text.slice(0, 120)}...&rdquo;
                            </blockquote>
                          )}

                          <span className="inline-flex items-center gap-2 text-white font-medium text-sm group/link">
                            View Gallery
                            <ArrowRight
                              className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Couples Gallery */}
      {!hasError && allCouples.length > 0 && (
        <section className="py-20 lg:py-32 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                Complete Portfolio
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight">
                More Love Stories
              </h2>
              <p className="mt-6 text-lg text-charcoal-600 leading-relaxed">
                Browse through our collection of beautiful weddings, each uniquely crafted
                to reflect the couple&apos;s personality and vision.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allCouples.map((couple) => (
                <article
                  key={couple._id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <Link href={`/portfolio/${couple.slug.current}`} data-umami-event="link_click_portfolio_wedding" data-umami-event-wedding={couple.names} className="block">
                    <div className="relative h-[280px] overflow-hidden">
                      {couple.heroImage ? (
                        <Image
                          src={urlFor(couple.heroImage).width(600).height(400).url()}
                          alt={couple.heroImage.alt || `${couple.names} wedding at ${couple.venue}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blush-100 to-cream-100" />
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-all duration-500 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-charcoal-900" aria-hidden="true" />
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-charcoal-500 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          {couple.venue}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-1 group-hover:text-blush-600 transition-colors">
                        {couple.names}
                      </h3>
                      <p className="text-blush-500 text-sm font-medium">{couple.tagline}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!hasError && featuredCouples.length === 0 && allCouples.length === 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-cream-50 rounded-3xl p-12 border border-cream-200">
              <Sparkles className="w-12 h-12 text-blush-400 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-medium text-charcoal-900 mb-4">
                Love Stories Coming Soon
              </h2>
              <p className="text-charcoal-600 mb-8">
                We&apos;re working on sharing our beautiful wedding portfolios.
                Check back soon to see our amazing couples!
              </p>
              <Link href="/#contact" data-umami-event="cta_click_get_in_touch" data-umami-event-location="portfolio_coming_soon">
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
            alt="Beautiful San Diego wedding sunset"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/70" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-blush-400 mx-auto mb-6" aria-hidden="true" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
            Ready to Create Your
            <br />
            <span className="text-blush-300">Own Love Story?</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            Let&apos;s bring your wedding vision to life. Schedule a complimentary
            consultation and discover how we can make your dream celebration a reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" data-umami-event="cta_click_schedule_consultation" data-umami-event-location="portfolio_cta">
              <Button size="lg" className="w-full sm:w-auto text-base px-8">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/#packages" data-umami-event="cta_click_view_packages" data-umami-event-location="portfolio_cta">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 bg-transparent border-white text-white hover:bg-white hover:text-charcoal-900"
              >
                View Packages
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            Or call us directly: <span className="text-white font-medium">(760) 216-7427</span>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
