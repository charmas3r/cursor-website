import { defineType, defineField } from 'sanity';
import { StarIcon } from '@sanity/icons';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  icon: StarIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'names',
      title: 'Couple Names',
      type: 'string',
      description: 'e.g., "Sarah & Michael"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'names',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Wedding Venue',
      type: 'string',
      description: 'Where the wedding was held',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weddingDate',
      title: 'Wedding Date',
      type: 'date',
      description: 'When the wedding took place',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      description: 'Rating out of 5 stars',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      description: 'The testimonial/review content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Couple Photo',
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
    }),
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show this review on the homepage (top 6 featured will be shown)',
      initialValue: false,
    }),
    defineField({
      name: 'theKnotUrl',
      title: 'The Knot Review URL',
      type: 'url',
      description: 'Link to the original review on The Knot (if applicable)',
    }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'The Knot', value: 'theknot' },
          { title: 'WeddingWire', value: 'weddingwire' },
          { title: 'Google', value: 'google' },
          { title: 'Direct', value: 'direct' },
        ],
      },
      initialValue: 'theknot',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full Service Planning', value: 'full-service' },
          { title: 'Partial Planning', value: 'partial' },
          { title: 'Wedding Management', value: 'management' },
          { title: 'Destination Wedding', value: 'destination' },
          { title: 'Design & Styling', value: 'design' },
        ],
      },
      description: 'Which service package the couple used',
    }),
    defineField({
      name: 'highlights',
      title: 'Review Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key points from the review (e.g., "Professional", "Detail-oriented")',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (for manual ordering)',
    }),
  ],
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'weddingDate', direction: 'desc' },
      ],
    },
    {
      title: 'Most Recent',
      name: 'mostRecent',
      by: [{ field: 'weddingDate', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'names',
      subtitle: 'venue',
      media: 'image',
      featured: 'featured',
      rating: 'rating',
    },
    prepare({ title, subtitle, media, featured, rating }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${subtitle} • ${rating}/5 stars`,
        media: media,
      };
    },
  },
});

