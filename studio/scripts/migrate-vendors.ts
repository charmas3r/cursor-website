/**
 * Vendor Migration Script
 * 
 * Migrates legacy inline vendors to the new vendor document schema.
 * 
 * Usage:
 * 1. Make sure you have SANITY_WRITE_TOKEN set in your environment
 * 2. Run: cd studio && npx ts-node scripts/migrate-vendors.ts
 * 
 * Options:
 *   --dry-run     Preview changes without writing to Sanity
 *   --verbose     Show detailed output for each vendor
 * 
 * Example:
 *   npx ts-node scripts/migrate-vendors.ts --dry-run
 *   npx ts-node scripts/migrate-vendors.ts
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'gx7w4bvs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Parse command line arguments
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const VERBOSE = args.includes('--verbose')

// Map legacy vendor roles to new categories
const ROLE_TO_CATEGORY: Record<string, string> = {
  // Photography
  'photography': 'photography',
  'photographer': 'photography',
  'photo': 'photography',
  'photos': 'photography',
  
  // Videography
  'videography': 'videography',
  'videographer': 'videography',
  'video': 'videography',
  'film': 'videography',
  'cinema': 'videography',
  'cinematography': 'videography',
  
  // Florals
  'florals': 'florals',
  'florist': 'florals',
  'flowers': 'florals',
  'floral design': 'florals',
  'floral designer': 'florals',
  
  // Catering
  'catering': 'catering',
  'caterer': 'catering',
  'food': 'catering',
  'chef': 'catering',
  
  // DJ / Music
  'dj': 'dj-music',
  'music': 'dj-music',
  'dj / music': 'dj-music',
  'dj/music': 'dj-music',
  'entertainment': 'dj-music',
  
  // Band
  'band': 'band',
  'live music': 'band',
  'live band': 'band',
  
  // Hair & Makeup
  'hair & makeup': 'hair-makeup',
  'hair and makeup': 'hair-makeup',
  'makeup': 'hair-makeup',
  'hair': 'hair-makeup',
  'beauty': 'hair-makeup',
  'hmua': 'hair-makeup',
  'mua': 'hair-makeup',
  'beauty team': 'hair-makeup',
  
  // Officiant
  'officiant': 'officiant',
  'ceremony': 'officiant',
  'minister': 'officiant',
  'celebrant': 'officiant',
  
  // Cake / Desserts
  'cake': 'cake-desserts',
  'desserts': 'cake-desserts',
  'cake & desserts': 'cake-desserts',
  'bakery': 'cake-desserts',
  'dessert': 'cake-desserts',
  'pastry': 'cake-desserts',
  
  // Rentals
  'rentals': 'rentals',
  'rental': 'rentals',
  'furniture': 'rentals',
  'tabletop': 'rentals',
  'linens': 'rentals',
  
  // Lighting
  'lighting': 'lighting',
  'lights': 'lighting',
  'decor & lighting': 'lighting',
  
  // Transportation
  'transportation': 'transportation',
  'transport': 'transportation',
  'limo': 'transportation',
  'car service': 'transportation',
  
  // Invitations / Stationery
  'invitations': 'invitations-stationery',
  'stationery': 'invitations-stationery',
  'invitations / stationery': 'invitations-stationery',
  'paper goods': 'invitations-stationery',
  'calligraphy': 'invitations-stationery',
  
  // Photo Booth
  'photo booth': 'photo-booth',
  'photobooth': 'photo-booth',
  'booth': 'photo-booth',
}

interface InlineVendor {
  _key?: string
  role: string
  name: string
  url?: string
}

interface VendorReference {
  _ref: string
  _type: string
  _key?: string
}

interface CoupleWithVendors {
  _id: string
  names: string
  vendors?: Array<InlineVendor | VendorReference>
}

interface VendorDocument {
  _id?: string
  _type: 'vendor'
  name: string
  slug: {_type: 'slug'; current: string}
  category: string
  website?: string
  preferred: boolean
  weddingCount: number
  featured: boolean
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 96)
}

function normalizeRole(role: string): string {
  const normalized = role.toLowerCase().trim()
  return ROLE_TO_CATEGORY[normalized] || 'other'
}

function generateVendorKey(name: string): string {
  // Create a consistent key for deduplication
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

async function getExistingVendors(): Promise<Map<string, string>> {
  const vendors = await client.fetch<Array<{_id: string; name: string}>>(
    `*[_type == "vendor"] { _id, name }`
  )
  
  const vendorMap = new Map<string, string>()
  for (const vendor of vendors) {
    vendorMap.set(generateVendorKey(vendor.name), vendor._id)
  }
  
  return vendorMap
}

// Check if a vendor entry is an inline object (has role/name) vs a reference (has _ref)
function isInlineVendor(vendor: InlineVendor | VendorReference): vendor is InlineVendor {
  return 'role' in vendor && 'name' in vendor && !('_ref' in vendor)
}

async function getCouplesWithInlineVendors(): Promise<CoupleWithVendors[]> {
  // Get all couples that have vendors array
  const couples = await client.fetch<CoupleWithVendors[]>(
    `*[_type == "couple" && defined(vendors) && length(vendors) > 0] {
      _id,
      names,
      vendors
    }`
  )
  
  // Filter to only couples that have inline vendor objects (not references)
  return couples.filter(couple => {
    if (!couple.vendors || couple.vendors.length === 0) return false
    // Check if any vendor is an inline object (has role/name, not _ref)
    return couple.vendors.some(v => isInlineVendor(v))
  })
}

async function createVendorDocument(
  inlineVendor: InlineVendor,
  existingVendorIds: Map<string, string>
): Promise<string> {
  const vendorKey = generateVendorKey(inlineVendor.name)
  
  // Check if vendor already exists
  if (existingVendorIds.has(vendorKey)) {
    const existingId = existingVendorIds.get(vendorKey)!
    if (VERBOSE) {
      console.log(`  → Using existing vendor: ${inlineVendor.name} (${existingId})`)
    }
    return existingId
  }
  
  // Create new vendor document
  const category = normalizeRole(inlineVendor.role)
  const vendorDoc: VendorDocument = {
    _type: 'vendor',
    name: inlineVendor.name,
    slug: {
      _type: 'slug',
      current: slugify(inlineVendor.name),
    },
    category,
    website: inlineVendor.url || undefined,
    preferred: false,
    weddingCount: 1,
    featured: false,
  }
  
  if (DRY_RUN) {
    // Generate a fake ID for dry run
    const fakeId = `draft.vendor-${vendorKey}`
    existingVendorIds.set(vendorKey, fakeId)
    if (VERBOSE) {
      console.log(`  → [DRY RUN] Would create vendor: ${inlineVendor.name}`)
      console.log(`    Category: ${category} (from role: ${inlineVendor.role})`)
      if (inlineVendor.url) console.log(`    Website: ${inlineVendor.url}`)
    }
    return fakeId
  }
  
  const created = await client.create(vendorDoc)
  existingVendorIds.set(vendorKey, created._id)
  
  if (VERBOSE) {
    console.log(`  ✓ Created vendor: ${inlineVendor.name} (${created._id})`)
    console.log(`    Category: ${category} (from role: ${inlineVendor.role})`)
  }
  
  return created._id
}

async function updateCoupleVendorReferences(
  couple: CoupleWithVendors,
  vendorRefs: Array<{_ref: string; _type: string; _key: string}>
): Promise<void> {
  if (DRY_RUN) {
    if (VERBOSE) {
      console.log(`  → [DRY RUN] Would update ${couple.names} with ${vendorRefs.length} vendor references`)
    }
    return
  }
  
  // Replace the vendors array entirely with references
  await client
    .patch(couple._id)
    .set({vendors: vendorRefs})
    .commit()
  
  if (VERBOSE) {
    console.log(`  ✓ Updated ${couple.names} with ${vendorRefs.length} vendor references`)
  }
}

async function incrementVendorWeddingCount(vendorId: string): Promise<void> {
  if (DRY_RUN) return
  
  await client
    .patch(vendorId)
    .inc({weddingCount: 1})
    .commit()
}

async function migrate(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  Vendor Migration Script')
  console.log('═══════════════════════════════════════════════════════════════')
  
  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN MODE - No changes will be made\n')
  }
  
  // Step 1: Get existing vendors
  console.log('\n📋 Step 1: Fetching existing vendors...')
  const existingVendorIds = await getExistingVendors()
  console.log(`   Found ${existingVendorIds.size} existing vendor documents`)
  
  // Step 2: Get couples with inline vendors (not references)
  console.log('\n📋 Step 2: Fetching couples with inline vendors...')
  const couples = await getCouplesWithInlineVendors()
  console.log(`   Found ${couples.length} couples with inline vendors to migrate`)
  
  if (couples.length === 0) {
    console.log('\n✅ No inline vendors to migrate! All vendors are already references.')
    return
  }
  
  // Step 3: Process each couple
  console.log('\n📋 Step 3: Processing vendors...\n')
  
  let totalVendorsCreated = 0
  let totalVendorsReused = 0
  let totalCouplesUpdated = 0
  const vendorWeddingCounts = new Map<string, number>()
  
  for (const couple of couples) {
    console.log(`\n👫 ${couple.names}`)
    
    if (!couple.vendors || couple.vendors.length === 0) {
      console.log('   No vendors to migrate')
      continue
    }
    
    // Filter to only inline vendors (not already references)
    const inlineVendors = couple.vendors.filter(isInlineVendor)
    
    if (inlineVendors.length === 0) {
      console.log('   All vendors are already references')
      continue
    }
    
    console.log(`   Processing ${inlineVendors.length} inline vendor(s)...`)
    
    const vendorRefs: Array<{_ref: string; _type: string; _key: string}> = []
    
    for (const inlineVendor of inlineVendors) {
      const vendorKey = generateVendorKey(inlineVendor.name)
      const wasExisting = existingVendorIds.has(vendorKey)
      
      const vendorId = await createVendorDocument(inlineVendor, existingVendorIds)
      
      if (wasExisting) {
        totalVendorsReused++
      } else {
        totalVendorsCreated++
      }
      
      // Track wedding counts
      const currentCount = vendorWeddingCounts.get(vendorId) || 0
      vendorWeddingCounts.set(vendorId, currentCount + 1)
      
      vendorRefs.push({
        _ref: vendorId,
        _type: 'reference',
        _key: inlineVendor._key || `vendor-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      })
    }
    
    // Update couple with vendor references
    await updateCoupleVendorReferences(couple, vendorRefs)
    totalCouplesUpdated++
  }
  
  // Step 4: Update wedding counts for vendors used in multiple weddings
  console.log('\n📋 Step 4: Updating vendor wedding counts...')
  
  const vendorEntries = Array.from(vendorWeddingCounts.entries())
  for (const entry of vendorEntries) {
    const vendorId = entry[0]
    const count = entry[1]
    if (count > 1) {
      // The first wedding is already counted when created, so we increment by (count - 1)
      for (let i = 1; i < count; i++) {
        await incrementVendorWeddingCount(vendorId)
      }
    }
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  Migration Summary')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`\n  Couples processed:     ${totalCouplesUpdated}`)
  console.log(`  New vendors created:   ${totalVendorsCreated}`)
  console.log(`  Existing vendors used: ${totalVendorsReused}`)
  console.log(`  Total vendor refs:     ${totalVendorsCreated + totalVendorsReused}`)
  
  if (DRY_RUN) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.')
  } else {
    console.log('\n✅ Migration complete!')
  }
  
  console.log('\n═══════════════════════════════════════════════════════════════')
}

// Run migration
migrate().catch((error) => {
  console.error('\n❌ Migration failed:', error)
  process.exit(1)
})
