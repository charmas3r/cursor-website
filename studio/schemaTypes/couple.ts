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
      title: 'Venue Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venueUrl',
      title: 'Venue URL',
      type: 'url',
      description: 'Link to the venue website',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Rancho Santa Fe, CA"',
      validation: (Rule) => Rule.required(),
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
      fields: [
        {
          name: 'text',
          title: 'Review Text',
          type: 'text',
          rows: 4,
        },
        {
          name: 'rating',
          title: 'Rating (1-5)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(5),
          initialValue: 5,
        },
      ],
    }),
    defineField({
      name: 'vendors',
      title: 'Vendors',
      type: 'array',
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
      subtitle: 'venue',
      media: 'heroImage',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, subtitle, media, featured} = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})

