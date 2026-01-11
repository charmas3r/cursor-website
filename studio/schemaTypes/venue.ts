import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Venue Name',
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
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City/area, e.g., "San Marcos, CA" or "La Jolla, CA"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'Service area region',
      options: {
        list: [
          {title: 'San Diego', value: 'san-diego'},
          {title: 'La Jolla', value: 'la-jolla'},
          {title: 'Coronado', value: 'coronado'},
          {title: 'Del Mar', value: 'del-mar'},
          {title: 'Carlsbad', value: 'carlsbad'},
          {title: 'Rancho Santa Fe', value: 'rancho-santa-fe'},
          {title: 'Temecula', value: 'temecula'},
          {title: 'Fallbrook', value: 'fallbrook'},
          {title: 'Encinitas', value: 'encinitas'},
          {title: 'Orange County', value: 'orange-county'},
        ],
      },
    }),
    defineField({
      name: 'type',
      title: 'Venue Type',
      type: 'string',
      options: {
        list: [
          {title: 'Golf Course', value: 'golf-course'},
          {title: 'Resort', value: 'resort'},
          {title: 'Winery', value: 'winery'},
          {title: 'Estate', value: 'estate'},
          {title: 'Beach', value: 'beach'},
          {title: 'Garden', value: 'garden'},
          {title: 'Hotel', value: 'hotel'},
          {title: 'Historic', value: 'historic'},
          {title: 'Private Club', value: 'private-club'},
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
      name: 'image',
      title: 'Venue Image',
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
      description: 'Brief description of the venue',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      description: 'For map display',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'preferredVendor',
      title: 'Preferred Vendor Status',
      type: 'boolean',
      description: 'Wedding Agency San Diego is a preferred vendor at this venue',
      initialValue: false,
    }),
    defineField({
      name: 'weddingCount',
      title: 'Weddings Planned',
      type: 'number',
      description: 'Number of weddings we have planned at this venue',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Venue',
      type: 'boolean',
      description: 'Show in featured venues section',
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
      title: 'Wedding Count',
      name: 'weddingCountDesc',
      by: [{field: 'weddingCount', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
      preferred: 'preferredVendor',
    },
    prepare(selection) {
      const {title, subtitle, media, preferred} = selection
      return {
        title: preferred ? `⭐ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})
