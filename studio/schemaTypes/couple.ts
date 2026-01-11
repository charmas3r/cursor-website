import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'couple',
  title: 'Couple Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'names',
      title: 'Couple Names',
      type: 'string',
      description: 'e.g., "Zoe & Byron"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'names',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s*&\s*/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short romantic description, e.g., "A Romantic Garden Celebration"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{type: 'venue'}],
      description: 'Select the wedding venue',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venueName',
      title: 'Venue Name (Legacy)',
      type: 'string',
      description: 'Legacy field - use Venue reference instead',
      hidden: true,
    }),
    defineField({
      name: 'venueUrl',
      title: 'Venue URL (Legacy)',
      type: 'url',
      description: 'Legacy field - venue URL is now on the Venue document',
      hidden: true,
    }),
    defineField({
      name: 'preferredVenueVendor',
      title: 'Preferred Venue Vendor (Legacy)',
      type: 'boolean',
      description: 'Legacy field - preferred status is now on the Venue document',
      initialValue: false,
      hidden: true,
    }),
    defineField({
      name: 'location',
      title: 'Location (Legacy)',
      type: 'string',
      description: 'Legacy field - location is now on the Venue document',
      hidden: true,
    }),
    defineField({
      name: 'displayDate',
      title: 'Display Date',
      type: 'string',
      description: 'How the date should appear, e.g., "Spring 2024"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weddingDate',
      title: 'Wedding Date',
      type: 'date',
      description: 'The actual wedding date (used for sorting)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in "Recent Highlights" section',
      initialValue: false,
    }),
    defineField({
      name: 'guestCount',
      title: 'Guest Count',
      type: 'number',
      description: 'Number of guests at the wedding',
    }),
    defineField({
      name: 'style',
      title: 'Wedding Style',
      type: 'string',
      description: 'e.g., "Romantic Garden", "Coastal Elegance", "Rustic Vineyard"',
    }),
    defineField({
      name: 'colors',
      title: 'Color Palette',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Wedding colors, e.g., "Blush Pink", "Ivory", "Sage Green"',
    }),
    defineField({
      name: 'review',
      title: 'Couple Review',
      type: 'object',
      description: 'Their testimonial about working with you',
      fields: [
        {
          name: 'excerpt',
          title: 'Review Excerpt',
          type: 'text',
          rows: 2,
          description: 'Short version shown on portfolio page (1-2 sentences)',
        },
        {
          name: 'text',
          title: 'Full Review',
          type: 'text',
          rows: 4,
          description: 'Complete testimonial shown on testimonials page',
        },
        {
          name: 'rating',
          title: 'Rating (1-5)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(5),
          initialValue: 5,
        },
        {
          name: 'featured',
          title: 'Feature this Review',
          type: 'boolean',
          description: 'Show on homepage testimonials section (top 6 will be shown)',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'vendors',
      title: 'Vendors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'vendor'}],
        },
      ],
      description: 'Select vendors who worked on this wedding',
    }),
    defineField({
      name: 'legacyVendors',
      title: 'Vendors (Legacy)',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'e.g., "Photography", "Florals", "Catering"',
            },
            {
              name: 'name',
              title: 'Vendor Name',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Vendor URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Wedding Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Special moments or unique details from the wedding',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid', // Shows images in a grid for easier management
      },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Wedding Date, Newest',
      name: 'weddingDateDesc',
      by: [{field: 'weddingDate', direction: 'desc'}],
    },
    {
      title: 'Wedding Date, Oldest',
      name: 'weddingDateAsc',
      by: [{field: 'weddingDate', direction: 'asc'}],
    },
    {
      title: 'Couple Names',
      name: 'namesAsc',
      by: [{field: 'names', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'names',
      venueName: 'venue.name',
      media: 'heroImage',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, venueName, media, featured} = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: venueName || 'No venue selected',
        media,
      }
    },
  },
})

