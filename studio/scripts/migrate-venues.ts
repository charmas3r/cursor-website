/**
 * Venue Migration Script
 * 
 * Migrates inline venue strings on couples to the new venue document schema.
 * 
 * Usage:
 * 1. Make sure you have SANITY_WRITE_TOKEN set in your environment
 * 2. Run: cd studio && npx tsx scripts/migrate-venues.ts
 * 
 * Options:
 *   --dry-run     Preview changes without writing to Sanity
 *   --verbose     Show detailed output for each venue
 * 
 * Example:
 *   npx tsx scripts/migrate-venues.ts --dry-run --verbose
 *   npx tsx scripts/migrate-venues.ts --verbose
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

// Map location strings to regions
const LOCATION_TO_REGION: Record<string, string> = {
  'la jolla': 'la-jolla',
  'san diego': 'san-diego',
  'coronado': 'coronado',
  'del mar': 'del-mar',
  'carlsbad': 'carlsbad',
  'rancho santa fe': 'rancho-santa-fe',
  'temecula': 'temecula',
  'fallbrook': 'fallbrook',
  'encinitas': 'encinitas',
  'escondido': 'san-diego',
  'san marcos': 'san-diego',
  'poway': 'san-diego',
  'oceanside': 'carlsbad',
  'vista': 'san-diego',
  'alpine': 'san-diego',
  'ramona': 'san-diego',
  'julian': 'san-diego',
  'borrego': 'san-diego',
  'orange county': 'orange-county',
  'irvine': 'orange-county',
  'newport': 'orange-county',
  'laguna': 'orange-county',
}

// Guess venue type from name
const VENUE_TYPE_KEYWORDS: Record<string, string> = {
  'golf': 'golf-course',
  'country club': 'golf-course',
  'resort': 'resort',
  'hotel': 'hotel',
  'inn': 'hotel',
  'lodge': 'hotel',
  'winery': 'winery',
  'vineyard': 'winery',
  'estate': 'estate',
  'manor': 'estate',
  'villa': 'estate',
  'ranch': 'estate',
  'beach': 'beach',
  'garden': 'garden',
  'botanical': 'garden',
  'historic': 'historic',
  'museum': 'historic',
  'club': 'private-club',
  'safari': 'other',
  'zoo': 'other',
}

interface CoupleWithVenue {
  _id: string
  names: string
  venue: string | { _ref: string; _type: string } // Could be string or reference
  venueUrl?: string
  location?: string
  preferredVenueVendor?: boolean
  heroImage?: unknown
}

interface VenueDocument {
  _id?: string
  _type: 'venue'
  name: string
  slug: {_type: 'slug'; current: string}
  location?: string
  region?: string
  type?: string
  website?: string
  preferredVendor: boolean
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

function generateVenueKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function guessRegion(location?: string): string | undefined {
  if (!location) return undefined
  const locationLower = location.toLowerCase()
  
  for (const [keyword, region] of Object.entries(LOCATION_TO_REGION)) {
    if (locationLower.includes(keyword)) {
      return region
    }
  }
  return undefined
}

function guessVenueType(venueName: string): string | undefined {
  const nameLower = venueName.toLowerCase()
  
  for (const [keyword, type] of Object.entries(VENUE_TYPE_KEYWORDS)) {
    if (nameLower.includes(keyword)) {
      return type
    }
  }
  return undefined
}

// Check if venue field is a string (legacy) vs a reference
function isStringVenue(venue: string | { _ref: string; _type: string }): venue is string {
  return typeof venue === 'string'
}

async function getExistingVenues(): Promise<Map<string, string>> {
  const venues = await client.fetch<Array<{_id: string; name: string}>>(
    `*[_type == "venue"] { _id, name }`
  )
  
  const venueMap = new Map<string, string>()
  for (const venue of venues) {
    venueMap.set(generateVenueKey(venue.name), venue._id)
  }
  
  return venueMap
}

async function getCouplesWithStringVenues(): Promise<CoupleWithVenue[]> {
  const couples = await client.fetch<CoupleWithVenue[]>(
    `*[_type == "couple" && defined(venue)] {
      _id,
      names,
      venue,
      venueUrl,
      location,
      preferredVenueVendor,
      heroImage
    }`
  )
  
  // Filter to only couples where venue is a string (not a reference)
  return couples.filter(couple => isStringVenue(couple.venue))
}

async function createVenueDocument(
  couple: CoupleWithVenue,
  existingVenueIds: Map<string, string>
): Promise<string> {
  const venueName = couple.venue as string
  const venueKey = generateVenueKey(venueName)
  
  // Check if venue already exists
  if (existingVenueIds.has(venueKey)) {
    const existingId = existingVenueIds.get(venueKey)!
    if (VERBOSE) {
      console.log(`  → Using existing venue: ${venueName} (${existingId})`)
    }
    return existingId
  }
  
  // Create new venue document
  const region = guessRegion(couple.location)
  const venueType = guessVenueType(venueName)
  
  const venueDoc: VenueDocument = {
    _type: 'venue',
    name: venueName,
    slug: {
      _type: 'slug',
      current: slugify(venueName),
    },
    location: couple.location || undefined,
    region,
    type: venueType,
    website: couple.venueUrl || undefined,
    preferredVendor: couple.preferredVenueVendor || false,
    weddingCount: 1,
    featured: false,
  }
  
  if (DRY_RUN) {
    const fakeId = `draft.venue-${venueKey}`
    existingVenueIds.set(venueKey, fakeId)
    if (VERBOSE) {
      console.log(`  → [DRY RUN] Would create venue: ${venueName}`)
      console.log(`    Location: ${couple.location || 'N/A'}`)
      console.log(`    Region: ${region || 'N/A'}`)
      console.log(`    Type: ${venueType || 'N/A'}`)
      if (couple.venueUrl) console.log(`    Website: ${couple.venueUrl}`)
      if (couple.preferredVenueVendor) console.log(`    ⭐ Preferred Vendor`)
    }
    return fakeId
  }
  
  const created = await client.create(venueDoc)
  existingVenueIds.set(venueKey, created._id)
  
  if (VERBOSE) {
    console.log(`  ✓ Created venue: ${venueName} (${created._id})`)
    console.log(`    Location: ${couple.location || 'N/A'}`)
    console.log(`    Region: ${region || 'N/A'}`)
  }
  
  return created._id
}

async function updateCoupleVenueReference(
  couple: CoupleWithVenue,
  venueId: string
): Promise<void> {
  if (DRY_RUN) {
    if (VERBOSE) {
      console.log(`  → [DRY RUN] Would update ${couple.names} to reference venue`)
    }
    return
  }
  
  // Update couple to reference the venue document
  // Also move legacy fields to the hidden legacy fields
  await client
    .patch(couple._id)
    .set({
      venue: {
        _type: 'reference',
        _ref: venueId,
      },
      // Move legacy data to legacy fields
      venueName: couple.venue as string,
      // venueUrl, location, preferredVenueVendor are already in place as legacy fields
    })
    .commit()
  
  if (VERBOSE) {
    console.log(`  ✓ Updated ${couple.names} to reference venue`)
  }
}

async function incrementVenueWeddingCount(venueId: string): Promise<void> {
  if (DRY_RUN) return
  
  await client
    .patch(venueId)
    .inc({weddingCount: 1})
    .commit()
}

async function migrate(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  Venue Migration Script')
  console.log('═══════════════════════════════════════════════════════════════')
  
  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN MODE - No changes will be made\n')
  }
  
  // Step 1: Get existing venues
  console.log('\n📋 Step 1: Fetching existing venues...')
  const existingVenueIds = await getExistingVenues()
  console.log(`   Found ${existingVenueIds.size} existing venue documents`)
  if (VERBOSE && existingVenueIds.size > 0) {
    console.log('   Existing venues:')
    for (const [key, id] of Array.from(existingVenueIds.entries())) {
      console.log(`     - ${key} (${id})`)
    }
  }
  
  // Step 2: Get couples with string venues
  console.log('\n📋 Step 2: Fetching couples with string venues...')
  const couples = await getCouplesWithStringVenues()
  console.log(`   Found ${couples.length} couples with string venues to migrate`)
  
  if (couples.length === 0) {
    console.log('\n✅ No string venues to migrate! All venues are already references.')
    return
  }
  
  // Step 3: Process each couple
  console.log('\n📋 Step 3: Processing venues...\n')
  
  let totalVenuesCreated = 0
  let totalVenuesReused = 0
  let totalCouplesUpdated = 0
  const venueWeddingCounts = new Map<string, number>()
  
  for (const couple of couples) {
    const venueName = couple.venue as string
    console.log(`\n👫 ${couple.names}`)
    console.log(`   Venue: ${venueName}`)
    
    const venueKey = generateVenueKey(venueName)
    const wasExisting = existingVenueIds.has(venueKey)
    
    const venueId = await createVenueDocument(couple, existingVenueIds)
    
    if (wasExisting) {
      totalVenuesReused++
    } else {
      totalVenuesCreated++
    }
    
    // Track wedding counts
    const currentCount = venueWeddingCounts.get(venueId) || 0
    venueWeddingCounts.set(venueId, currentCount + 1)
    
    // Update couple to reference venue
    await updateCoupleVenueReference(couple, venueId)
    totalCouplesUpdated++
  }
  
  // Step 4: Update wedding counts for venues used in multiple weddings
  console.log('\n📋 Step 4: Updating venue wedding counts...')
  
  const venueEntries = Array.from(venueWeddingCounts.entries())
  for (const entry of venueEntries) {
    const venueId = entry[0]
    const count = entry[1]
    if (count > 1) {
      // The first wedding is already counted when created, so we increment by (count - 1)
      for (let i = 1; i < count; i++) {
        await incrementVenueWeddingCount(venueId)
      }
      if (VERBOSE) {
        console.log(`   Updated ${venueId} wedding count to ${count}`)
      }
    }
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  Migration Summary')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`\n  Couples processed:     ${totalCouplesUpdated}`)
  console.log(`  New venues created:    ${totalVenuesCreated}`)
  console.log(`  Existing venues used:  ${totalVenuesReused}`)
  console.log(`  Total venue refs:      ${totalVenuesCreated + totalVenuesReused}`)
  
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
