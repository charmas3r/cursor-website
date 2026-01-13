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
      // www to non-www redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.weddingagencysandiego.com" }],
        destination: "https://weddingagencysandiego.com/:path*",
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
    ];
  },
};

module.exports = nextConfig;


