import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { getBlogPostBySlug, getBlogPosts, urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/types/sanity";
import BlogPostContent from "@/components/BlogPostContent";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPost | null = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | Wedding Agency San Diego Blog`,
    description: post.excerpt || `Read ${post.title} on the Wedding Agency San Diego blog.`,
    keywords: post.categories?.map((c) => c.title) || [],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://weddingagencysandiego.com/blog/${post.slug.current}`,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `https://weddingagencysandiego.com/blog/${post.slug.current}`,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const posts: BlogPost[] = await getBlogPosts();
    return posts.map((post) => ({
      slug: post.slug.current,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: BlogPost | null = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : {
          "@type": "Organization",
          name: "Wedding Agency San Diego",
        },
    publisher: {
      "@type": "Organization",
      name: "Wedding Agency San Diego",
      url: "https://weddingagencysandiego.com",
      logo: {
        "@type": "ImageObject",
        url: "https://weddingagencysandiego.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://weddingagencysandiego.com/blog/${post.slug.current}`,
    },
  };

  const shareUrl = `https://weddingagencysandiego.com/blog/${post.slug.current}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-cream-50 via-blush-50 to-cream-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-charcoal-600 hover:text-blush-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category */}
            {post.categories?.[0] && (
              <span className="inline-block px-3 py-1 rounded-full bg-blush-100 text-blush-600 text-xs font-medium uppercase tracking-wider mb-4">
                {post.categories[0].title}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-charcoal-600">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={urlFor(post.author.image).width(80).height(80).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.mainImage && (
          <section className="relative -mt-8 mb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(post.mainImage).width(1400).height(700).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
              </div>
              {post.mainImage.caption && (
                <p className="mt-4 text-center text-sm text-charcoal-500 italic">
                  {post.mainImage.caption}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-cream-200">
              <span className="flex items-center gap-2 text-charcoal-600 text-sm font-medium">
                <Share2 className="w-4 h-4" />
                Share
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream-100 hover:bg-blush-100 flex items-center justify-center transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4 text-charcoal-600" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream-100 hover:bg-blush-100 flex items-center justify-center transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4 text-charcoal-600" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream-100 hover:bg-blush-100 flex items-center justify-center transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-charcoal-600" />
                </a>
              </div>
            </div>

            {/* Blog Content */}
            {post.body && <BlogPostContent body={post.body} />}

            {/* Author Bio */}
            {post.author && (
              <div className="mt-16 pt-8 border-t border-cream-200">
                <div className="flex items-start gap-4">
                  {post.author.image && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(post.author.image).width(128).height(128).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-charcoal-500 uppercase tracking-wider mb-1">
                      Written by
                    </p>
                    <h3 className="text-lg font-serif font-semibold text-charcoal-900">
                      {post.author.name}
                    </h3>
                    {post.author.bio && (
                      <p className="mt-2 text-charcoal-600">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="py-16 lg:py-24 bg-cream-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-blush-500 text-sm font-medium uppercase tracking-wider">
                  Keep Reading
                </span>
                <h2 className="mt-4 text-3xl font-serif font-medium text-charcoal-900">
                  Related Articles
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {post.relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug.current}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {relatedPost.mainImage ? (
                        <Image
                          src={urlFor(relatedPost.mainImage).width(600).height(400).url()}
                          alt={relatedPost.mainImage.alt || relatedPost.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blush-100 to-cream-100" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-serif font-semibold text-charcoal-900 group-hover:text-blush-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-3 text-charcoal-500 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {relatedPost.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {relatedPost.readTime} min
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-charcoal-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-12 h-12 text-blush-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-6">
              Let&apos;s Plan Your
              <br />
              <span className="text-blush-300">Dream Wedding</span>
            </h2>
            <p className="text-lg text-charcoal-300 mb-10 max-w-2xl mx-auto">
              Ready to turn your wedding dreams into reality? Our expert team is here
              to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-blush-500 hover:bg-blush-600">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-charcoal-900"
                >
                  More Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}



