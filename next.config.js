/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // NOTE: www to non-www redirect is handled in Vercel domain settings
      // Legacy page redirects (from GoDaddy migration)
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      // Legacy portfolio URL (URL-encoded & symbol)
      {
        source: "/wendy-%26-justin",
        destination: "/portfolio/wendy-justin",
        permanent: true,
      },
      // Legacy blog URL redirects (from previous website)
      {
        source: "/blog/f/how-to-build-the-perfect-wedding-website",
        destination: "/blog/how-to-build-the-perfect-wedding-website",
        permanent: true,
      },
      {
        source: "/blog/f/looking-for-a-san-diego-wedding-planner",
        destination: "/blog/looking-for-a-san-diego-wedding-planner",
        permanent: true,
      },
      {
        source: "/blog/f/rehearsal-dinner-planning-tips-a-wedding-planner-s-guide",
        destination: "/blog/rehearsal-dinner-planning-tips-a-wedding-planners-guide",
        permanent: true,
      },
      {
        source: "/blog/f/how-to-create-the-perfect-wedding-guest-list",
        destination: "/blog/how-to-create-the-perfect-wedding-guest-list",
        permanent: true,
      },
      {
        source: "/blog/f/the-ultimate-brides-wedding-checklist-your-month-by-month-guide",
        destination: "/blog/the-ultimate-brides-wedding-checklist-your-month-by-month-guide",
        permanent: true,
      },
      {
        source: "/blog/f/top-san-diego-wedding-venues-for-every-wedding-style",
        destination: "/blog/top-san-diego-wedding-venues-for-every-wedding-style",
        permanent: true,
      },
      // Catch-all for any other legacy /blog/f/ URLs
      {
        source: "/blog/f/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Strip query parameters from blog URLs
      {
        source: "/blog",
        has: [{ type: "query", key: "blog" }],
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog",
        has: [{ type: "query", key: "blogcategory" }],
        destination: "/blog",
        permanent: true,
      },
      // Strip query parameters from homepage
      {
        source: "/",
        has: [{ type: "query", key: "blog" }],
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;


