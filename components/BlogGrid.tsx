"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/types/sanity";

interface Props {
  posts: BlogPost[];
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
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function BlogGrid({ posts }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.article key={post._id} variants={itemVariants} className="h-full">
          <Link
            href={`/blog/${post.slug.current}`}
            className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blush-100 to-cream-100" />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-charcoal-900" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              {post.categories?.[0] && (
                <span className="text-blush-500 text-xs font-medium uppercase tracking-wider">
                  {post.categories[0].title}
                </span>
              )}
              <h3 className="mt-2 text-lg font-serif font-semibold text-charcoal-900 group-hover:text-blush-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-2 text-charcoal-600 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-auto pt-4 flex items-center gap-4 text-charcoal-500 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime} min read
                  </span>
                )}
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}

