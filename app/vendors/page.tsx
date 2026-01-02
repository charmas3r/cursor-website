import { getCouplesWithVendors, getPreferredVenues } from "@/lib/sanity";
import type { CoupleWithVendors, AggregatedVendor } from "@/types/sanity";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VendorDirectory from "@/components/VendorDirectory";
import PreferredVenues from "@/components/PreferredVenues";

export const revalidate = 60;

// Clean up role names for display
function cleanRoleName(role: string): string {
  // Remove "Ceremony" from florist roles
  let cleaned = role.replace(/ceremony\s*/i, "").trim();
  // Capitalize first letter if needed
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned || role;
}

// Helper function to aggregate vendors from all couples
function aggregateVendors(couples: CoupleWithVendors[]): AggregatedVendor[] {
  const vendorMap = new Map<string, AggregatedVendor>();

  couples.forEach((couple) => {
    if (!couple.vendors) return;

    couple.vendors.forEach((vendor) => {
      // Create a unique key based on vendor name (normalized)
      const key = vendor.name.toLowerCase().trim();

      if (vendorMap.has(key)) {
        // Add this wedding to existing vendor
        const existing = vendorMap.get(key)!;
        existing.weddings.push({
          names: couple.names,
          slug: couple.slug.current,
          venue: couple.venue,
        });
        // Update URL if not set
        if (!existing.url && vendor.url) {
          existing.url = vendor.url;
        }
      } else {
        // Create new vendor entry
        vendorMap.set(key, {
          name: vendor.name,
          role: cleanRoleName(vendor.role),
          url: vendor.url,
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
    const role = normalizeRole(vendor.role);
    if (!groups[role]) {
      groups[role] = [];
    }
    groups[role].push(vendor);
  });

  return groups;
}

// Normalize vendor roles to consistent categories
function normalizeRole(role: string): string {
  const roleLower = role.toLowerCase();

  // Photo booth must be checked before photography to catch "photo booth"
  if (roleLower.includes("booth")) return "Photo Booth Rentals";
  if (roleLower.includes("photo")) return "Photography";
  if (roleLower.includes("video") || roleLower.includes("film")) return "Videography";
  if (roleLower.includes("flor") || roleLower.includes("flower")) return "Florals";
  if (roleLower.includes("cater") || roleLower.includes("food")) return "Catering";
  if (roleLower.includes("cake") || roleLower.includes("dessert") || roleLower.includes("bakery")) return "Cake & Desserts";
  if (roleLower.includes("dj") || roleLower.includes("music") || roleLower.includes("band")) return "Music & Entertainment";
  if (roleLower.includes("hair") || roleLower.includes("makeup") || roleLower.includes("beauty") || roleLower.includes("glam")) return "Beauty Team";
  if (roleLower.includes("dress") || roleLower.includes("bridal") || roleLower.includes("gown")) return "Bridal Attire";
  if (roleLower.includes("suit") || roleLower.includes("tux") || roleLower.includes("groom")) return "Groom Attire";
  if (roleLower.includes("venue")) return "Venues";
  if (roleLower.includes("rental") || roleLower.includes("furniture")) return "Rentals";
  if (roleLower.includes("station") || roleLower.includes("invit") || roleLower.includes("paper")) return "Stationery";
  if (roleLower.includes("officiant") || roleLower.includes("minister")) return "Officiants";
  if (roleLower.includes("transport") || roleLower.includes("limo") || roleLower.includes("car")) return "Transportation";
  if (roleLower.includes("light") || roleLower.includes("decor") || roleLower.includes("design")) return "Decor & Lighting";

  // Return original role with first letter capitalized
  return role.charAt(0).toUpperCase() + role.slice(1);
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
  const [couples, preferredVenuesData] = await Promise.all([
    getCouplesWithVendors(),
    getPreferredVenues(),
  ]);
  
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
      <PreferredVenues venues={preferredVenuesData as Parameters<typeof PreferredVenues>[0]["venues"]} />
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


