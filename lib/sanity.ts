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
  useCdn: false, // Disabled for fresh data - set to true for production
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

export const featuredPostsQuery = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...4] {
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

// Couple Portfolio queries
export const couplesQuery = `*[_type == "couple"] | order(weddingDate desc) {
  _id,
  names,
  slug,
  tagline,
  "venue": venue->name,
  "venueUrl": venue->website,
  "location": venue->location,
  displayDate,
  weddingDate,
  heroImage,
  featured,
  guestCount,
  style,
  colors,
  review,
  vendors[]->{
    _id,
    name,
    slug,
    category,
    website,
    instagram,
    email,
    phone,
    logo,
    description,
    location,
    preferred,
    weddingCount,
    featured
  },
  legacyVendors,
  highlights,
  galleryImages
}`;

export const featuredCouplesQuery = `*[_type == "couple" && featured == true] | order(weddingDate desc) {
  _id,
  names,
  slug,
  tagline,
  "venue": venue->name,
  "venueUrl": venue->website,
  "location": venue->location,
  displayDate,
  weddingDate,
  heroImage,
  featured,
  guestCount,
  style,
  colors,
  review,
  vendors[]->{
    _id,
    name,
    slug,
    category,
    website,
    instagram,
    preferred,
    weddingCount
  },
  legacyVendors,
  highlights,
  galleryImages
}`;

export const nonFeaturedCouplesQuery = `*[_type == "couple" && (featured == false || !defined(featured))] | order(weddingDate desc) {
  _id,
  names,
  slug,
  tagline,
  "venue": venue->name,
  "venueUrl": venue->website,
  "location": venue->location,
  displayDate,
  weddingDate,
  heroImage,
  featured,
  guestCount,
  style,
  colors,
  review
}`;

export const coupleBySlugQuery = `*[_type == "couple" && slug.current == $slug][0] {
  _id,
  names,
  slug,
  tagline,
  "venue": venue->name,
  "venueUrl": venue->website,
  "location": venue->location,
  displayDate,
  weddingDate,
  heroImage,
  featured,
  guestCount,
  style,
  colors,
  review,
  vendors[]->{
    _id,
    name,
    slug,
    category,
    website,
    instagram,
    email,
    phone,
    logo,
    description,
    location,
    preferred,
    weddingCount,
    featured
  },
  legacyVendors,
  highlights,
  galleryImages
}`;

// Couple Portfolio functions
export async function getCouples() {
  return client.fetch(couplesQuery);
}

export async function getFeaturedCouples() {
  return client.fetch(featuredCouplesQuery);
}

export async function getNonFeaturedCouples() {
  return client.fetch(nonFeaturedCouplesQuery);
}

export async function getCoupleBySlug(slug: string) {
  return client.fetch(coupleBySlugQuery, { slug });
}

// Testimonial queries (from couples with reviews)
export const couplesWithReviewsQuery = `*[_type == "couple" && (defined(review.text) || defined(review.excerpt))] | order(review.featured desc, weddingDate desc) {
  _id,
  names,
  slug,
  "venue": venue->name,
  weddingDate,
  review
}`;

export const featuredReviewsQuery = `*[_type == "couple" && (defined(review.text) || defined(review.excerpt)) && review.featured == true] | order(weddingDate desc) [0...6] {
  _id,
  names,
  slug,
  "venue": venue->name,
  weddingDate,
  review
}`;

// Testimonial fetch functions (from couples)
export async function getCouplesWithReviews() {
  return client.fetch(couplesWithReviewsQuery);
}

export async function getFeaturedReviews() {
  return client.fetch(featuredReviewsQuery);
}

// Vendor directory query - get all couples with their vendors
export const couplesWithVendorsQuery = `*[_type == "couple" && defined(vendors) && length(vendors) > 0] | order(weddingDate desc) {
  _id,
  names,
  slug,
  "venue": venue->name,
  weddingDate,
  vendors[]->{
    _id,
    name,
    slug,
    category,
    website,
    instagram,
    preferred,
    weddingCount,
    featured
  }
}`;

// Get all vendor documents directly
export const vendorsQuery = `*[_type == "vendor"] | order(name asc) {
  _id,
  name,
  slug,
  category,
  website,
  instagram,
  email,
  phone,
  logo,
  description,
  location,
  preferred,
  weddingCount,
  featured
}`;

export const preferredVendorsQuery = `*[_type == "vendor" && preferred == true] | order(weddingCount desc) {
  _id,
  name,
  slug,
  category,
  website,
  instagram,
  logo,
  description,
  location,
  weddingCount,
  featured
}`;

export const featuredVendorsQuery = `*[_type == "vendor" && featured == true] | order(weddingCount desc) {
  _id,
  name,
  slug,
  category,
  website,
  instagram,
  logo,
  description,
  location,
  weddingCount
}`;

export async function getCouplesWithVendors() {
  return client.fetch(couplesWithVendorsQuery);
}

// Vendor fetch functions
export async function getVendors() {
  return client.fetch(vendorsQuery);
}

export async function getPreferredVendors() {
  return client.fetch(preferredVendorsQuery);
}

export async function getFeaturedVendors() {
  return client.fetch(featuredVendorsQuery);
}

// Preferred venues query (legacy) - get couples where we are a preferred vendor at the venue
export const legacyPreferredVenuesQuery = `*[_type == "couple" && preferredVenueVendor == true] | order(weddingDate desc) {
  _id,
  "venue": venue->name,
  "venueUrl": venue->website,
  "location": venue->location,
  heroImage
}`;

// Preferred venues query - get venue documents where we are preferred vendor
// Using coalesce to handle undefined/null values for ordering
export const preferredVenuesQuery = `*[_type == "venue" && preferredVendor == true] | order(coalesce(weddingCount, 0) desc, name asc) {
  _id,
  name,
  slug,
  location,
  region,
  type,
  website,
  image {
    ...,
    asset->
  },
  description,
  coordinates,
  preferredVendor,
  "weddingCount": coalesce(weddingCount, 0),
  featured
}`;

// All venues query
export const venuesQuery = `*[_type == "venue"] | order(name asc) {
  _id,
  name,
  slug,
  location,
  region,
  type,
  website,
  image {
    ...,
    asset->
  },
  description,
  coordinates,
  preferredVendor,
  "weddingCount": coalesce(weddingCount, 0),
  featured
}`;

export async function getPreferredVenues() {
  return client.fetch(preferredVenuesQuery);
}

export async function getVenues() {
  return client.fetch(venuesQuery);
}

// La Jolla venues query - get venues in La Jolla region
export const laJollaVenuesQuery = `*[_type == "venue" && region == "la-jolla"] | order(preferredVendor desc, coalesce(weddingCount, 0) desc) {
  _id,
  name,
  slug,
  location,
  region,
  type,
  website,
  image {
    ...,
    asset->
  },
  description,
  coordinates,
  preferredVendor,
  "weddingCount": coalesce(weddingCount, 0),
  featured
}`;

export async function getLaJollaVenues() {
  return client.fetch(laJollaVenuesQuery);
}

