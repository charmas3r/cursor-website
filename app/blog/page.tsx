import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, Sparkles } from "lucide-react";
import { getBlogPosts, getFeaturedPosts, urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/types/sanity";
import BlogGrid from "@/components/BlogGrid";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let featuredPosts: BlogPost[] = [];
  let hasError = false;

  try {
    [posts, featuredPosts] = await Promise.all([
      getBlogPosts(),
      getFeaturedPosts(),
    ]);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    hasError = true;
  }

  // If no featured posts, use the first 4 posts
  if (featuredPosts.length === 0 && posts.length > 0) {
    featuredPosts = posts.slice(0, 4);
  }

  const remainingPosts = posts.filter(
    (post) => !featuredPosts.some((fp) => fp._id === post._id)
  );

  return (
    <main className="relative">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blush-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cream-300/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider mb-6">
            <Heart className="w-4 h-4" aria-hidden="true" />
            Wedding Inspiration
            <Heart className="w-4 h-4" aria-hidden="true" />
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal-900 leading-tight mb-6">
            The Wedding
            <br />
            <span className="text-blush-500">Journal</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-charcoal-600 leading-relaxed">
            Expert tips, real wedding features, and inspiration to help you plan
            your perfect San Diego celebration.
          </p>
        </div>
      </section>

      {/* Error State */}
      {hasError && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-cream-50 rounded-3xl p-12 border border-cream-200">
              <Sparkles className="w-12 h-12 text-blush-400 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-medium text-charcoal-900 mb-4">
                Blog Coming Soon
              </h2>
              <p className="text-charcoal-600 mb-8">
                We&apos;re working on bringing you beautiful wedding inspiration and
                expert planning tips. Check back soon!
              </p>
              <Link href="/#contact" data-umami-event="cta_click_get_in_touch" data-umami-event-location="blog_empty">
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {!hasError && featuredPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                Featured Stories
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
                Must-Read Articles
              </h2>
            </div>

            {/* Featured Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* Main Featured Post */}
              {featuredPosts[0] && (
                <Link
                  href={`/blog/${featuredPosts[0].slug.current}`}
                  data-umami-event="link_click_blog_featured"
                  data-umami-event-post={featuredPosts[0].title}
                  className="group relative block rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
                >
                  <div className="relative h-[400px] lg:h-full min-h-[500px]">
                    {featuredPosts[0].mainImage ? (
                      <Image
                        src={urlFor(featuredPosts[0].mainImage)
                          .width(1200)
                          .height(800)
                          .url()}
                        alt={featuredPosts[0].mainImage.alt || featuredPosts[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blush-200 to-cream-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      {featuredPosts[0].categories?.[0] && (
                        <span className="inline-block px-3 py-1 rounded-full bg-blush-500 text-white text-xs font-medium mb-4 w-fit">
                          {featuredPosts[0].categories[0].title}
                        </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-white mb-3 group-hover:text-blush-200 transition-colors">
                        {featuredPosts[0].title}
                      </h3>
                      {featuredPosts[0].excerpt && (
                        <p className="text-white/80 mb-4 line-clamp-2">
                          {featuredPosts[0].excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPosts[0].publishedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </span>
                        {featuredPosts[0].readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredPosts[0].readTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Secondary Featured Posts */}
              <div className="flex flex-col justify-between h-full gap-4">
                {featuredPosts.slice(1, 4).map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    data-umami-event="link_click_blog_post"
                    data-umami-event-post={post.title}
                    className="group relative flex-1 block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row h-full">
                      <div className="relative h-40 sm:h-auto sm:w-2/5 flex-shrink-0">
                        {post.mainImage ? (
                          <Image
                            src={urlFor(post.mainImage).width(400).height(300).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 40vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blush-100 to-cream-100" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        {post.categories?.[0] && (
                          <span className="text-blush-500 text-xs font-medium uppercase tracking-wider mb-2">
                            {post.categories[0].title}
                          </span>
                        )}
                        <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-2 group-hover:text-blush-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-charcoal-500 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      {!hasError && remainingPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                Latest Articles
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
                More Inspiration
              </h2>
            </div>

            <BlogGrid posts={remainingPosts} />
          </div>
        </section>
      )}

      {/* Empty State */}
      {!hasError && posts.length === 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-cream-50 rounded-3xl p-12 border border-cream-200">
              <Sparkles className="w-12 h-12 text-blush-400 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-medium text-charcoal-900 mb-4">
                Stories Coming Soon
              </h2>
              <p className="text-charcoal-600 mb-8">
                We&apos;re crafting beautiful wedding stories and expert tips just for
                you. Subscribe to be the first to know when we publish!
              </p>
              <Link href="/#contact" data-umami-event="cta_click_get_notified" data-umami-event-location="blog_coming_soon">
                <Button>Get Notified</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-blush-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-6">
            Ready to Start
            <br />
            <span className="text-blush-300">Planning?</span>
          </h2>
          <p className="text-lg text-charcoal-300 mb-10 max-w-2xl mx-auto">
            Let our expert team help you create the wedding of your dreams.
            Schedule a complimentary consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" data-umami-event="cta_click_schedule_consultation" data-umami-event-location="blog_cta">
              <Button size="lg" className="bg-blush-500 hover:bg-blush-600">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/packages" data-umami-event="cta_click_view_packages" data-umami-event-location="blog_cta">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-charcoal-900"
              >
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

