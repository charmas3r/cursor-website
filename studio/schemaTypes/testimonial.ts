import { defineType, defineField } from 'sanity';
import { StarIcon } from '@sanity/icons';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  icon: StarIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g., "Sarah & Michael" or "Jennifer D."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Review',
      type: 'text',
      rows: 4,
      description: 'The testimonial/review content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 stars',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When the review was submitted',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage (top 6 featured will be shown)',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'date', direction: 'desc' },
      ],
    },
    {
      title: 'Most Recent',
      name: 'mostRecent',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      date: 'date',
      featured: 'featured',
      rating: 'rating',
    },
    prepare({ title, date, featured, rating }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${rating}/5 stars • ${dateStr}`,
      };
    },
  },
});

