"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Star,
} from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  imageUrl?: string | null;
  publishedAt?: string;
  readTime?: string;
  categories?: Array<{ _id: string; title: string }>;
}

interface WeddingTipsContentProps {
  featuredPosts: BlogPost[];
}

// Wedding tip categories
const tipCategories = [
  {
    id: "budget",
    icon: DollarSign,
    title: "Budget & Finance",
    description: "Smart strategies for managing your wedding budget",
    color: "bg-emerald-50 text-emerald-600",
    tips: [
      {
        title: "Set Your Priorities First",
        content:
          "Before setting a budget, decide what matters most to you both. Photography? Venue? Food? Allocate 40-50% to your top priority.",
      },
      {
        title: "The 50/30/20 Rule",
        content:
          "Allocate 50% to venue and catering, 30% to vendors (photo, music, flowers), and 20% to attire, decor, and extras.",
      },
      {
        title: "Build in a Buffer",
        content:
          "Always keep 10-15% of your budget as a contingency fund. Unexpected costs always arise, from last-minute additions to vendor gratuities.",
      },
      {
        title: "Track Every Expense",
        content:
          "Use a spreadsheet or app to track deposits, payments, and due dates. This prevents overspending and missed payments.",
      },
    ],
  },
  {
    id: "timeline",
    icon: Calendar,
    title: "Planning Timeline",
    description: "Month-by-month guide to stress-free planning",
    color: "bg-blush-50 text-blush-600",
    tips: [
      {
        title: "12+ Months Out",
        content:
          "Set your budget, create a guest list estimate, book your venue, and hire a planner. These book up fastest!",
      },
      {
        title: "9-11 Months Out",
        content:
          "Book photographer, videographer, caterer, and entertainment. Start dress shopping and choose your wedding party.",
      },
      {
        title: "6-8 Months Out",
        content:
          "Send save-the-dates, book florist, order invitations, plan honeymoon, and schedule tastings.",
      },
      {
        title: "3-5 Months Out",
        content:
          "Finalize guest list, send invitations, book hair/makeup, arrange transportation, and finalize ceremony details.",
      },
    ],
  },
  {
    id: "vendors",
    icon: Users,
    title: "Vendor Selection",
    description: "How to find and book the perfect team",
    color: "bg-purple-50 text-purple-600",
    tips: [
      {
        title: "Read Real Reviews",
        content:
          "Look for detailed reviews on The Knot, WeddingWire, and Google. Pay attention to how vendors handle problems.",
      },
      {
        title: "Always Meet in Person",
        content:
          "Chemistry matters! Meet potential vendors face-to-face to ensure your personalities and visions align.",
      },
      {
        title: "Get Everything in Writing",
        content:
          "Every promise, every detail should be in your contract. This protects both you and your vendors.",
      },
      {
        title: "Ask for References",
        content:
          "Request contacts from recent clients. Ask about communication, professionalism, and how they handled the day.",
      },
    ],
  },
  {
    id: "day-of",
    icon: Sparkles,
    title: "Day-Of Tips",
    description: "Secrets for a smooth and magical wedding day",
    color: "bg-amber-50 text-amber-600",
    tips: [
      {
        title: "Eat Breakfast",
        content:
          "You'll be too excited to feel hungry, but you need energy! Have a protein-rich breakfast and stay hydrated.",
      },
      {
        title: "Build in Buffer Time",
        content:
          "Add 30 minutes of buffer to your timeline. Things always take longer than expected, especially photos.",
      },
      {
        title: "Designate a Point Person",
        content:
          "Have someone (ideally your planner) handle all questions and issues so you can stay present and enjoy.",
      },
      {
        title: "Take a Moment Together",
        content:
          "Sneak away with your partner for 10 minutes during the reception. Take it all in. You'll treasure this memory.",
      },
    ],
  },
];

// Quick tips carousel
const quickTips = [
  "Book your venue at least 12 months in advance for popular dates",
  "Your wedding planner can often get vendor discounts",
  "Schedule your hair & makeup trial 2 months before the wedding",
  "Break in your wedding shoes before the big day",
  "Create a backup rain plan even for summer weddings",
  "Send invitations 8-10 weeks before your wedding date",
  "Schedule couples' portraits during golden hour for magical photos",
  "Have a day-of emergency kit with safety pins, stain remover, and bandaids",
];

// Fallback articles if no blog posts
const fallbackArticles = [
  {
    title: "The Ultimate San Diego Venue Guide",
    excerpt:
      "From beachfront ceremonies to vineyard receptions, discover the best wedding venues in Southern California.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098",
    category: "Venues",
    readTime: "8 min read",
    slug: "/blog",
  },
  {
    title: "How to Create a Wedding Timeline",
    excerpt:
      "A comprehensive guide to planning your wedding day minute-by-minute for a stress-free celebration.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070",
    category: "Planning",
    readTime: "6 min read",
    slug: "/blog",
  },
  {
    title: "Choosing Your Wedding Party",
    excerpt:
      "Tips for selecting bridesmaids, groomsmen, and other VIPs who'll stand by your side on the big day.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    category: "Relationships",
    readTime: "5 min read",
    slug: "/blog",
  },
];

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
    transition: { duration: 0.5 },
  },
};

export default function WeddingTipsContent({
  featuredPosts,
}: WeddingTipsContentProps): JSX.Element {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const articlesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const categoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });
  const articlesInView = useInView(articlesRef, {
    once: true,
    margin: "-100px",
  });

  const [activeCategory, setActiveCategory] = useState(tipCategories[0].id);
  const activeCategoryData = tipCategories.find((c) => c.id === activeCategory);

  // Use featured posts from Sanity or fallback
  const hasPosts = featuredPosts && featuredPosts.length > 0;

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-white"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blush-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cream-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-blush-500 text-sm font-medium uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              Expert Advice
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal-900 leading-tight">
              Wedding Tips &
              <br />
              <span className="text-blush-500">Planning Advice</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-charcoal-600 leading-relaxed">
              From budgeting to the big day—expert insights from 20+ years in
              hospitality and 100+ weddings to help you plan your perfect celebration.
            </p>
          </motion.div>

          {/* Quick Tips Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream-50 to-transparent z-10" />
            <div className="flex gap-6 animate-marquee">
              {[...quickTips, ...quickTips].map((tip, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-cream-200"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-charcoal-600 whitespace-nowrap">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tip Categories Section */}
      <section ref={categoriesRef} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
              Planning Essentials
            </h2>
            <p className="mt-4 text-charcoal-600 max-w-2xl mx-auto">
              Everything you need to know, organized by category
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {tipCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  variants={itemVariants}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-charcoal-900 text-white shadow-lg"
                      : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active Category Content */}
          {activeCategoryData && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {activeCategoryData.tips.map((tip, index) => (
                <div
                  key={tip.title}
                  className="bg-cream-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full ${activeCategoryData.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-charcoal-900">
                        {tip.title}
                      </h3>
                      <p className="mt-2 text-charcoal-600 leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section
        ref={articlesRef}
        className="py-16 sm:py-24 bg-gradient-to-b from-white to-cream-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
                Featured Guides
              </h2>
              <p className="mt-2 text-charcoal-600">
                In-depth articles to help you plan every detail
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="group">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={articlesInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {hasPosts
              ? featuredPosts.slice(0, 3).map((post) => (
                  <motion.article
                    key={post._id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blush-200 to-cream-200" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          {post.categories && post.categories[0] && (
                            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-charcoal-700">
                              {post.categories[0].title}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-500 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 text-charcoal-600 text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-2 text-xs text-charcoal-500">
                        <Clock className="w-3 h-3" />
                        {post.readTime || "5 min read"}
                      </div>
                    </Link>
                  </motion.article>
                ))
              : fallbackArticles.map((article) => (
                  <motion.article
                    key={article.title}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={article.slug}>
                      <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-charcoal-700">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-charcoal-900 group-hover:text-blush-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-charcoal-600 text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-charcoal-500">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </Link>
                  </motion.article>
                ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-cream-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900">
                  Want Personalized
                  <br />
                  <span className="text-blush-500">Planning Help?</span>
                </h2>
                <p className="mt-4 text-lg text-charcoal-600">
                  Our expert planners are here to guide you through every step.
                  From initial consultation to your magical day, we make wedding
                  planning stress-free.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/#contact">
                    <Button size="lg">
                      Schedule Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/packages">
                    <Button variant="outline" size="lg">
                      View Our Packages
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
                  alt="Happy couple on their wedding day"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}

