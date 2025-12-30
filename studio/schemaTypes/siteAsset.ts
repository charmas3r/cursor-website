import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteAsset',
  title: 'Site Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive name for this asset',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'assetKey',
      title: 'Asset Key',
      type: 'slug',
      description: 'Unique identifier to reference this asset in code (e.g., "hero-background", "about-team-photo")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Hero Section', value: 'hero'},
          {title: 'About Page', value: 'about'},
          {title: 'Services', value: 'services'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Team', value: 'team'},
          {title: 'Testimonials', value: 'testimonials'},
          {title: 'Background', value: 'background'},
          {title: 'Logo & Branding', value: 'branding'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Internal notes about this asset',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})

