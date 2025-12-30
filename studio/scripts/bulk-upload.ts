/**
 * Bulk Upload Script for Sanity Assets
 * 
 * Usage:
 * 1. Place your images in a folder (e.g., ./assets-to-upload/)
 * 2. Run: npx ts-node scripts/bulk-upload.ts ./assets-to-upload hero
 * 
 * Arguments:
 *   - First arg: folder path containing images
 *   - Second arg: category (hero, about, services, gallery, team, testimonials, background, branding, other)
 */

import {createClient} from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const client = createClient({
  projectId: 'gx7w4bvs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to create this
  useCdn: false,
})

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function uploadAsset(filePath: string, category: string) {
  const fileName = path.basename(filePath, path.extname(filePath))
  const title = fileName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  console.log(`Uploading: ${fileName}...`)

  try {
    // Upload the image file
    const imageAsset = await client.assets.upload(
      'image',
      fs.createReadStream(filePath),
      {filename: path.basename(filePath)}
    )

    // Create the Site Asset document
    const doc = await client.create({
      _type: 'siteAsset',
      title: title,
      assetKey: {
        _type: 'slug',
        current: slugify(fileName),
      },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
        alt: title,
      },
      category: category,
    })

    console.log(`✓ Created: ${title} (${doc._id})`)
    return doc
  } catch (error) {
    console.error(`✗ Failed: ${fileName}`, error)
    throw error
  }
}

async function bulkUpload(folderPath: string, category: string) {
  if (!fs.existsSync(folderPath)) {
    console.error(`Folder not found: ${folderPath}`)
    process.exit(1)
  }

  const files = fs.readdirSync(folderPath).filter((file) => {
    const ext = path.extname(file).toLowerCase()
    return SUPPORTED_EXTENSIONS.includes(ext)
  })

  if (files.length === 0) {
    console.log('No supported image files found.')
    process.exit(0)
  }

  console.log(`Found ${files.length} images to upload...`)
  console.log(`Category: ${category}`)
  console.log('---')

  let successCount = 0
  let failCount = 0

  for (const file of files) {
    try {
      await uploadAsset(path.join(folderPath, file), category)
      successCount++
    } catch {
      failCount++
    }
  }

  console.log('---')
  console.log(`Done! ${successCount} uploaded, ${failCount} failed.`)
}

// Main execution
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: npx ts-node scripts/bulk-upload.ts <folder-path> <category>')
  console.log('Categories: hero, about, services, gallery, team, testimonials, background, branding, other')
  console.log('')
  console.log('Example: npx ts-node scripts/bulk-upload.ts ./my-images gallery')
  process.exit(1)
}

const [folderPath, category] = args
bulkUpload(folderPath, category)

