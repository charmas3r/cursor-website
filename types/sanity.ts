// Sanity TypeScript types for the blog

export interface SanityImage {
  _type: "image";
  _key?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  categories?: Category[];
  author?: Author;
  relatedPosts?: BlogPost[];
}

// Portable Text types
export interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: PortableTextChild[];
  markDefs?: PortableTextMarkDef[];
  level?: number;
  listItem?: string;
}

export interface PortableTextChild {
  _type: string;
  _key: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _type: string;
  _key: string;
  href?: string;
}

// Site Asset type
export interface SiteAsset {
  _id: string;
  title: string;
  assetKey: SanitySlug;
  image: SanityImage;
  category?: string;
  description?: string;
}

// Vendor document type (standalone document)
export interface VendorDocument {
  _id: string;
  name: string;
  slug: SanitySlug;
  category: VendorCategory;
  website?: string;
  instagram?: string;
  email?: string;
  phone?: string;
  logo?: SanityImage;
  description?: string;
  location?: string;
  preferred: boolean;
  weddingCount: number;
  featured: boolean;
}

export type VendorCategory =
  | "photography"
  | "videography"
  | "florals"
  | "catering"
  | "dj-music"
  | "band"
  | "hair-makeup"
  | "officiant"
  | "cake-desserts"
  | "rentals"
  | "lighting"
  | "transportation"
  | "invitations-stationery"
  | "photo-booth"
  | "other";

// Legacy vendor type (inline object, deprecated)
export interface LegacyVendor {
  role: string;
  name: string;
  url?: string;
}

// Couple Portfolio types - keeping for backwards compatibility
export interface Vendor {
  role: string;
  name: string;
  url?: string;
}

export interface CoupleReview {
  excerpt?: string;
  text: string;
  rating: number;
  featured?: boolean;
}

export interface Couple {
  _id: string;
  names: string;
  slug: SanitySlug;
  tagline: string;
  venue: string;
  venueUrl?: string;
  preferredVenueVendor?: boolean;
  location: string;
  displayDate: string;
  weddingDate: string;
  heroImage: SanityImage;
  featured: boolean;
  guestCount?: number;
  style?: string;
  colors?: string[];
  review?: CoupleReview;
  vendors?: VendorDocument[]; // Now references vendor documents
  legacyVendors?: LegacyVendor[]; // Legacy inline vendors (deprecated)
  highlights?: string[];
  galleryImages: SanityImage[];
}

// Testimonial type - derived from couples with reviews
export interface CoupleTestimonial {
  _id: string;
  names: string;
  slug: SanitySlug;
  venue: string;
  weddingDate: string;
  review: CoupleReview;
}

// Couple with vendors - for vendor directory
export interface CoupleWithVendors {
  _id: string;
  names: string;
  slug: SanitySlug;
  venue: string;
  weddingDate: string;
  vendors: VendorDocument[];
}

// Aggregated vendor for directory display (works with both old and new formats)
export interface AggregatedVendor {
  _id?: string;
  name: string;
  role: string; // Category label for display
  category?: VendorCategory; // New category field from vendor document
  url?: string;
  website?: string;
  instagram?: string;
  logo?: SanityImage;
  description?: string;
  location?: string;
  preferred?: boolean;
  weddingCount?: number;
  weddings: Array<{
    names: string;
    slug: string;
    venue: string;
  }>;
}

// Preferred venue for display
export interface PreferredVenue {
  venue: string;
  venueUrl?: string;
  location: string;
  weddingCount: number;
  heroImage?: SanityImage;
}

