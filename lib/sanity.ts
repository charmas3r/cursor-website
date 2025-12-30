import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity configuration
// Replace these with your actual Sanity project details
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gx7w4bvs";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Create the Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for faster reads in production
  // Set to false if you want to ensure fresh data
  // useCdn: process.env.NODE_ENV === "production",
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  categories[]->{
    _id,
    title,
    slug
  },
  author->{
    _id,
    name,
    image,
    bio
  }
}`;

export const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  body,
  publishedAt,
  readTime,
  categories[]->{
    _id,
    title,
    slug
  },
  author->{
    _id,
    name,
    image,
    bio
  },
  "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime
  }
}`;

export const blogCategoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`;

export const featuredPostsQuery = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  categories[]->{
    _id,
    title,
    slug
  }
}`;

// Site Assets queries
export const siteAssetByKeyQuery = `*[_type == "siteAsset" && assetKey.current == $key][0] {
  _id,
  title,
  assetKey,
  image,
  category,
  description
}`;

export const siteAssetsByCategoryQuery = `*[_type == "siteAsset" && category == $category] {
  _id,
  title,
  assetKey,
  image,
  category,
  description
}`;

// Fetch functions
export async function getBlogPosts() {
  return client.fetch(blogPostsQuery);
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(blogPostBySlugQuery, { slug });
}

export async function getCategories() {
  return client.fetch(blogCategoriesQuery);
}

export async function getFeaturedPosts() {
  return client.fetch(featuredPostsQuery);
}

// Site Asset functions
export async function getSiteAsset(key: string) {
  return client.fetch(siteAssetByKeyQuery, { key });
}

export async function getSiteAssetsByCategory(category: string) {
  return client.fetch(siteAssetsByCategoryQuery, { category });
}

