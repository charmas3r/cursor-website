// Sanity TypeScript types for the blog

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
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

// Couple Portfolio types
export interface Vendor {
  role: string;
  name: string;
  url?: string;
}

export interface CoupleReview {
  text: string;
  rating: number;
}

export interface Couple {
  _id: string;
  names: string;
  slug: SanitySlug;
  tagline: string;
  venue: string;
  venueUrl?: string;
  location: string;
  displayDate: string;
  weddingDate: string;
  heroImage: SanityImage;
  featured: boolean;
  guestCount?: number;
  style?: string;
  colors?: string[];
  review?: CoupleReview;
  vendors?: Vendor[];
  highlights?: string[];
  galleryImages: SanityImage[];
}

