import { getCouplesWithVendors } from "@/lib/sanity";
import type { CoupleWithVendors, AggregatedVendor, VendorDocument, VendorCategory } from "@/types/sanity";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VendorDirectory from "@/components/VendorDirectory";
import Link from "next/link";

export const revalidate = 60;

// Map category values to display names
const CATEGORY_DISPLAY_NAMES: Record<VendorCategory, string> = {
  "photography": "Photography",
  "videography": "Videography",
  "florals": "Florals",
  "catering": "Catering",
  "dj-music": "Music & Entertainment",
  "band": "Music & Entertainment",
  "hair-makeup": "Beauty Team",
  "officiant": "Officiants",
  "cake-desserts": "Cake & Desserts",
  "rentals": "Rentals",
  "lighting": "Decor & Lighting",
  "transportation": "Transportation",
  "invitations-stationery": "Stationery",
  "photo-booth": "Photo Booth Rentals",
  "other": "Other",
};

// Get display name for a vendor category
function getCategoryDisplayName(category?: VendorCategory): string {
  if (!category) return "Other";
  return CATEGORY_DISPLAY_NAMES[category] || "Other";
}

// Normalize vendor name for deduplication
function normalizeVendorName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')  // Normalize multiple spaces to single space
    .replace(/['']/g, "'") // Normalize smart quotes
    .replace(/[""]/g, '"') // Normalize smart double quotes
    .replace(/[^\w\s'-]/g, '') // Remove special characters except common ones
    .trim();
}

// Helper function to aggregate vendors from all couples
function aggregateVendors(couples: CoupleWithVendors[]): AggregatedVendor[] {
  const vendorMap = new Map<string, AggregatedVendor>();

  couples.forEach((couple) => {
    if (!couple.vendors) return;

    couple.vendors.forEach((vendor: VendorDocument) => {
      if (!vendor || !vendor.name) return;
      
      // Create a unique key based on vendor ID or normalized name
      const key = vendor._id || normalizeVendorName(vendor.name);

      if (vendorMap.has(key)) {
        // Add this wedding to existing vendor
        const existing = vendorMap.get(key)!;
        existing.weddings.push({
          names: couple.names,
          slug: couple.slug.current,
          venue: couple.venue,
        });
      } else {
        // Create new vendor entry from VendorDocument
        vendorMap.set(key, {
          _id: vendor._id,
          name: vendor.name,
          role: getCategoryDisplayName(vendor.category),
          category: vendor.category,
          url: vendor.website,
          website: vendor.website,
          instagram: vendor.instagram,
          logo: vendor.logo,
          description: vendor.description,
          location: vendor.location,
          preferred: vendor.preferred,
          weddingCount: vendor.weddingCount,
          weddings: [
            {
              names: couple.names,
              slug: couple.slug.current,
              venue: couple.venue,
            },
          ],
        });
      }
    });
  });

  // Convert to array and sort by number of weddings (most first), then by name
  return Array.from(vendorMap.values()).sort((a, b) => {
    if (b.weddings.length !== a.weddings.length) {
      return b.weddings.length - a.weddings.length;
    }
    return a.name.localeCompare(b.name);
  });
}

// Group vendors by category/role
function groupVendorsByRole(vendors: AggregatedVendor[]): Record<string, AggregatedVendor[]> {
  const groups: Record<string, AggregatedVendor[]> = {};

  vendors.forEach((vendor) => {
    // Use the role field directly (it's already the display name from getCategoryDisplayName)
    const role = vendor.role || "Other";
    if (!groups[role]) {
      groups[role] = [];
    }
    groups[role].push(vendor);
  });

  return groups;
}

// Define the order of categories
const categoryOrder = [
  "Photography",
  "Videography",
  "Photo Booth Rentals",
  "Florals",
  "Catering",
  "Cake & Desserts",
  "Music & Entertainment",
  "Beauty Team",
  "Bridal Attire",
  "Groom Attire",
  "Venues",
  "Rentals",
  "Stationery",
  "Officiants",
  "Transportation",
  "Decor & Lighting",
];

export default async function VendorsPage() {
  const couples = await getCouplesWithVendors();
  
  const typedCouples = couples as CoupleWithVendors[];
  const aggregatedVendors = aggregateVendors(typedCouples);
  const groupedVendors = groupVendorsByRole(aggregatedVendors);

  // Sort categories
  const sortedCategories = Object.keys(groupedVendors).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const totalVendors = aggregatedVendors.length;
  const totalWeddings = typedCouples.length;

  return (
    <main className="relative">
      <Navigation />
      
      {/* Preferred Venues Banner - Links to Services Page */}
      <section className="bg-gradient-to-r from-blush-50 to-cream-50 py-8 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-semibold text-charcoal-900">
                Looking for Preferred Venues?
              </h2>
              <p className="text-sm text-charcoal-600">
                See the premier San Diego venues where we&apos;re trusted partners.
              </p>
            </div>
            <Link
              href="/san-diego-wedding-planner#venues"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 text-white rounded-xl font-medium hover:bg-charcoal-800 transition-colors text-sm"
            >
              View Preferred Venues
            </Link>
          </div>
        </div>
      </section>
      
      <VendorDirectory
        groupedVendors={groupedVendors}
        sortedCategories={sortedCategories}
        totalVendors={totalVendors}
        totalWeddings={totalWeddings}
      />
      <Footer />
    </main>
  );
}


