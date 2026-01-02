// Couple gallery data structure
// Images are served from Cloudinary: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/couples/{couple-id}/

export interface Vendor {
  role: string;
  name: string;
  url?: string;
}

export interface CoupleData {
  id: string;
  names: string;
  tagline: string;
  venue: string;
  venueUrl?: string;
  location: string;
  date: string;
  weddingDate: string; // Full date for SEO
  heroImage: string;
  featured: boolean;
  guestCount?: number;
  style?: string;
  colors?: string[];
  review?: {
    text: string;
    rating: number;
  };
  vendors?: Vendor[];
  highlights?: string[];
  galleryImages: string[];
}

// Cloudinary base URL - replace YOUR_CLOUD_NAME with your actual cloud name
export const CLOUDINARY_BASE = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload";

// Helper to generate Cloudinary URLs with transformations
export function getCloudinaryUrl(
  path: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "avif";
  }
): string {
  const transforms: string[] = [];
  
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  if (options?.quality) transforms.push(`q_${options.quality}`);
  if (options?.format) transforms.push(`f_${options.format}`);
  
  // Default optimizations
  if (transforms.length === 0) {
    transforms.push("q_auto", "f_auto");
  }
  
  return `${CLOUDINARY_BASE}/${transforms.join(",")}/${path}`;
}

// Couple data - extend this as you add more couples
// Replace Unsplash URLs with Cloudinary URLs once you upload images
export const couples: CoupleData[] = [
  {
    id: "zoe-byron",
    names: "Zoe & Byron",
    tagline: "A Romantic Garden Celebration",
    venue: "Rancho Valencia Resort",
    venueUrl: "https://www.ranchovalencia.com",
    location: "Rancho Santa Fe, CA",
    date: "Spring 2024",
    weddingDate: "April 15, 2024",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    featured: true,
    guestCount: 150,
    style: "Romantic Garden",
    colors: ["Blush Pink", "Ivory", "Sage Green"],
    review: {
      text: "Wedding Agency San Diego made our dream wedding a reality. From our first meeting, they understood our vision perfectly. Every detail was thoughtfully planned, and on our wedding day, everything flowed seamlessly. We couldn't have asked for a more magical celebration. They truly went above and beyond!",
      rating: 5,
    },
    vendors: [
      { role: "Photography", name: "Ashley Paige Photography", url: "https://ashleypaigephoto.com" },
      { role: "Florals", name: "Isari Flower Studio", url: "https://isariflowerstudio.com" },
      { role: "Catering", name: "Rancho Valencia Resort" },
      { role: "DJ/Entertainment", name: "Elevate Entertainment SD" },
      { role: "Hair & Makeup", name: "Blush & Veil Beauty" },
      { role: "Rentals", name: "Concepts Event Design" },
    ],
    highlights: [
      "Ceremony under a 100-year-old oak tree",
      "Custom floral arch with 500+ roses",
      "Live string quartet during cocktail hour",
      "Surprise fireworks finale",
    ],
    // Replace with actual Cloudinary paths once uploaded
    // Example: "couples/zoe-byron/ceremony-01.jpg"
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070",
    ],
  },
  {
    id: "ally-tyler",
    names: "Ally & Tyler",
    tagline: "Beachside Elegance",
    venue: "Hotel del Coronado",
    venueUrl: "https://hoteldel.com",
    location: "Coronado, CA",
    date: "Summer 2024",
    weddingDate: "July 20, 2024",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070",
    featured: true,
    guestCount: 200,
    style: "Coastal Elegance",
    colors: ["Ocean Blue", "Sandy Beige", "White"],
    review: {
      text: "From start to finish, the team was incredible. Our beach wedding at the Hotel del Coronado was absolutely magical. They handled every detail with such care and professionalism. The sunset ceremony was picture-perfect, exactly as we had envisioned it.",
      rating: 5,
    },
    vendors: [
      { role: "Photography", name: "Shewanders Photography" },
      { role: "Florals", name: "Adorations Botanical Artistry" },
      { role: "Catering", name: "Hotel del Coronado" },
      { role: "DJ/Entertainment", name: "Positive Energy Productions" },
      { role: "Hair & Makeup", name: "Beauty by Stacey" },
    ],
    highlights: [
      "Sunset beach ceremony",
      "Custom seashell place cards",
      "Live jazz band at reception",
      "Fire dancers during send-off",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070",
    ],
  },
  {
    id: "catherine-mitchell",
    names: "Catherine & Mitchell",
    tagline: "Vineyard Dreams",
    venue: "Bernardo Winery",
    venueUrl: "https://bernardowinery.com",
    location: "San Diego, CA",
    date: "Fall 2024",
    weddingDate: "October 5, 2024",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    featured: true,
    guestCount: 120,
    style: "Rustic Vineyard",
    colors: ["Burgundy", "Gold", "Eucalyptus Green"],
    review: {
      text: "The attention to detail was extraordinary. We wanted a rustic vineyard wedding with elegant touches, and the team delivered beyond our expectations. They coordinated everything perfectly, from the wine barrel décor to the farm-to-table menu. Our guests are still talking about it!",
      rating: 5,
    },
    vendors: [
      { role: "Photography", name: "Cavin Elizabeth Photography" },
      { role: "Florals", name: "Native Poppy" },
      { role: "Catering", name: "Cucina Enoteca" },
      { role: "Live Music", name: "The Mar Dels" },
      { role: "Hair & Makeup", name: "Unveiled Bridal Beauty" },
    ],
    highlights: [
      "Ceremony among the vines",
      "Custom wine blending station",
      "Farm-to-table seasonal menu",
      "Vintage car getaway",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070",
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
    ],
  },
  {
    id: "carly-jonathan",
    names: "Carly & Jonathan",
    tagline: "Modern Sophistication",
    venue: "The Lodge at Torrey Pines",
    venueUrl: "https://lodgetorreypines.com",
    location: "La Jolla, CA",
    date: "Winter 2023",
    weddingDate: "December 16, 2023",
    heroImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
    featured: false,
    guestCount: 180,
    style: "Modern Luxury",
    colors: ["Black", "White", "Gold Accents"],
    review: {
      text: "Sophisticated elegance with impeccable execution. Every moment was perfectly orchestrated.",
      rating: 5,
    },
    vendors: [
      { role: "Photography", name: "Tina Chiou Photography" },
      { role: "Florals", name: "Bloomers La Jolla" },
      { role: "Catering", name: "The Lodge at Torrey Pines" },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    ],
  },
  {
    id: "camryn-mitchell",
    names: "Camryn & Mitchell",
    tagline: "Desert Romance",
    venue: "Anza-Borrego Desert",
    location: "Anza-Borrego, CA",
    date: "Spring 2023",
    weddingDate: "March 25, 2023",
    heroImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070",
    featured: false,
    guestCount: 80,
    style: "Bohemian Desert",
    colors: ["Terracotta", "Dusty Rose", "Sand"],
    galleryImages: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070",
    ],
  },
  {
    id: "jessica-kevin",
    names: "Jessica & Kevin",
    tagline: "Classic Glamour",
    venue: "US Grant Hotel",
    venueUrl: "https://usgrant.net",
    location: "Downtown San Diego, CA",
    date: "Summer 2023",
    weddingDate: "June 10, 2023",
    heroImage: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070",
    featured: false,
    guestCount: 220,
    style: "Classic Glamour",
    colors: ["Champagne", "Ivory", "Crystal"],
    galleryImages: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070",
    ],
  },
  {
    id: "vanessa-phil",
    names: "Vanessa & Phil",
    tagline: "Rustic Charm",
    venue: "Mount Palomar Winery",
    venueUrl: "https://mountpalomar.com",
    location: "Temecula, CA",
    date: "Fall 2023",
    weddingDate: "September 30, 2023",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
    featured: false,
    guestCount: 100,
    style: "Rustic Elegance",
    colors: ["Dusty Blue", "Cream", "Natural Wood"],
    galleryImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
    ],
  },
  {
    id: "wendy-justin",
    names: "Wendy & Justin",
    tagline: "Sunset Serenade",
    venue: "Sunset Cliffs",
    location: "San Diego, CA",
    date: "Summer 2023",
    weddingDate: "August 5, 2023",
    heroImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070",
    featured: false,
    guestCount: 50,
    style: "Intimate Coastal",
    colors: ["Coral", "Peach", "White"],
    galleryImages: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070",
    ],
  },
  {
    id: "isabela-roberto",
    names: "Isabela & Roberto",
    tagline: "Cultural Fusion",
    venue: "The Prado at Balboa Park",
    venueUrl: "https://pradobalboa.com",
    location: "San Diego, CA",
    date: "Spring 2023",
    weddingDate: "May 13, 2023",
    heroImage: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071",
    featured: false,
    guestCount: 175,
    style: "Cultural Fusion",
    colors: ["Deep Red", "Gold", "Black"],
    galleryImages: [
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071",
    ],
  },
  {
    id: "mindy-errick",
    names: "Mindy & Errick",
    tagline: "Intimate Elopement",
    venue: "La Jolla Cove",
    location: "La Jolla, CA",
    date: "Winter 2022",
    weddingDate: "February 14, 2022",
    heroImage: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
    featured: false,
    guestCount: 12,
    style: "Intimate Elopement",
    colors: ["Ocean Blue", "White", "Sand"],
    galleryImages: [
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
    ],
  },
  {
    id: "katelyn-zach",
    names: "Katelyn & Zach",
    tagline: "Garden Party Perfection",
    venue: "Estancia La Jolla",
    venueUrl: "https://estancialajolla.com",
    location: "La Jolla, CA",
    date: "Fall 2022",
    weddingDate: "October 22, 2022",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098",
    featured: false,
    guestCount: 140,
    style: "Garden Party",
    colors: ["Lavender", "Soft Green", "White"],
    galleryImages: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098",
    ],
  },
  {
    id: "amanda-phillip",
    names: "Amanda & Phillip",
    tagline: "Timeless Elegance",
    venue: "Fairmont Grand Del Mar",
    venueUrl: "https://fairmont.com/san-diego",
    location: "San Diego, CA",
    date: "Summer 2022",
    weddingDate: "July 16, 2022",
    heroImage: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=2090",
    featured: false,
    guestCount: 250,
    style: "Timeless Luxury",
    colors: ["Classic White", "Ivory", "Crystal"],
    galleryImages: [
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=2090",
    ],
  },
];

// Helper functions
export function getCoupleById(id: string): CoupleData | undefined {
  return couples.find((couple) => couple.id === id);
}

export function getFeaturedCouples(): CoupleData[] {
  return couples.filter((couple) => couple.featured);
}

export function getAllCoupleIds(): string[] {
  return couples.map((couple) => couple.id);
}


