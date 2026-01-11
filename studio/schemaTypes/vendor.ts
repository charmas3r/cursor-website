import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'vendor',
  title: 'Vendor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vendor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Photography', value: 'photography'},
          {title: 'Videography', value: 'videography'},
          {title: 'Florals', value: 'florals'},
          {title: 'Catering', value: 'catering'},
          {title: 'DJ / Music', value: 'dj-music'},
          {title: 'Band', value: 'band'},
          {title: 'Hair & Makeup', value: 'hair-makeup'},
          {title: 'Officiant', value: 'officiant'},
          {title: 'Cake / Desserts', value: 'cake-desserts'},
          {title: 'Rentals', value: 'rentals'},
          {title: 'Lighting', value: 'lighting'},
          {title: 'Transportation', value: 'transportation'},
          {title: 'Invitations / Stationery', value: 'invitations-stationery'},
          {title: 'Photo Booth', value: 'photo-booth'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the vendor',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the vendor is based',
    }),
    defineField({
      name: 'preferred',
      title: 'Preferred Vendor',
      type: 'boolean',
      description: 'Is this a preferred/recommended vendor?',
      initialValue: false,
    }),
    defineField({
      name: 'weddingCount',
      title: 'Weddings Together',
      type: 'number',
      description: 'Number of weddings we have worked together',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Vendor',
      type: 'boolean',
      description: 'Show in featured vendors section',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}],
    },
    {
      title: 'Wedding Count',
      name: 'weddingCountDesc',
      by: [{field: 'weddingCount', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
      preferred: 'preferred',
    },
    prepare(selection) {
      const {title, subtitle, media, preferred} = selection
      const categoryLabels: Record<string, string> = {
        'photography': 'Photography',
        'videography': 'Videography',
        'florals': 'Florals',
        'catering': 'Catering',
        'dj-music': 'DJ / Music',
        'band': 'Band',
        'hair-makeup': 'Hair & Makeup',
        'officiant': 'Officiant',
        'cake-desserts': 'Cake / Desserts',
        'rentals': 'Rentals',
        'lighting': 'Lighting',
        'transportation': 'Transportation',
        'invitations-stationery': 'Invitations / Stationery',
        'photo-booth': 'Photo Booth',
        'other': 'Other',
      }
      return {
        title: preferred ? `⭐ ${title}` : title,
        subtitle: categoryLabels[subtitle] || subtitle,
        media,
      }
    },
  },
})
