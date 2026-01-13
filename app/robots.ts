import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://weddingagencysandiego.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/studio/',
          // Block legacy URLs and query parameter variations
          '/blog/f/',
          '/*?blog=',
          '/*?blogcategory=',
          '/*?*blog=',
          '/*?*blogcategory=',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}







