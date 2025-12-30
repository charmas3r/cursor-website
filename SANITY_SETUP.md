# Sanity Studio Setup Guide

## Quick Start

### 1. Login to Sanity
```bash
npx sanity login
```
Choose Google or GitHub to authenticate.

### 2. Create a New Project
Option A - Via CLI:
```bash
npx sanity init --template clean --create-project "Wedding Agency Blog" --dataset production --output-path studio
```

Option B - Via Web:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create new project"
3. Name it "Wedding Agency Blog"
4. Note your **Project ID**

### 3. After Studio is Created

Navigate to the studio folder and install dependencies:
```bash
cd studio
npm install
```

### 4. Replace the Schema Files

Replace the contents of `studio/schemaTypes/index.ts` with:

```typescript
import post from './post'
import author from './author'
import category from './category'
import blockContent from './blockContent'

export const schemaTypes = [post, author, category, blockContent]
```

### 5. Create Schema Files

Create these files in `studio/schemaTypes/`:

#### `post.ts`
```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
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
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A brief summary for previews and SEO',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
```

#### `author.ts`
```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
```

#### `category.ts`
```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
```

#### `blockContent.ts`
```typescript
import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
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
    }),
  ],
})
```

### 6. Start the Studio
```bash
npm run dev
```
The studio will be available at http://localhost:3333

### 7. Update Your Next.js Environment Variables

After getting your Project ID from the studio or [sanity.io/manage](https://www.sanity.io/manage), update `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 8. Configure CORS

In Sanity dashboard ([sanity.io/manage](https://www.sanity.io/manage)):
1. Select your project
2. Go to **Settings** → **API** → **CORS origins**
3. Add:
   - `http://localhost:3000`
   - `https://weddingagencysandiego.com`
   - Your Vercel preview URL

### 9. Create Initial Content

In your Sanity Studio:

1. **Create Categories:**
   - Planning Tips
   - Real Weddings
   - Venues
   - Inspiration
   - Budget

2. **Create an Author:**
   - Add your name, bio, and photo

3. **Create Your First Post:**
   - Add title, slug, image, category, body content
   - Set "Featured" to true for it to appear in the hero section

### 10. Deploy Your Studio (Optional)

```bash
npx sanity deploy
```
This gives you a hosted studio at `your-project.sanity.studio`

---

## Troubleshooting

**Images not loading?**
- Check CORS settings in Sanity dashboard
- Verify `cdn.sanity.io` is in your `next.config.js`

**Posts not showing?**
- Make sure posts have `publishedAt` set
- Check your Project ID is correct in `.env.local`
- Restart your Next.js dev server after env changes

**Need help?**
- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity Slack Community](https://slack.sanity.io/)

