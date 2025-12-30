import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WeddingTipsContent from "@/components/WeddingTipsContent";
import { client, featuredPostsQuery, urlFor } from "@/lib/sanity";

// Fetch featured posts on the server
async function getFeaturedPosts() {
  try {
    const posts = await client.fetch(featuredPostsQuery);
    return posts || [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

export default async function WeddingTipsPage() {
  const featuredPosts = await getFeaturedPosts();

  // Helper to get image URL - passed to client component
  const getImageUrl = (image: { asset: { _ref: string } } | undefined) => {
    if (!image) return "";
    return urlFor(image).width(800).height(600).url();
  };

  // Serialize the image URLs for client component
  const postsWithImages = featuredPosts.map((post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: { asset: { _ref: string } };
    publishedAt?: string;
    readTime?: string;
    categories?: Array<{ _id: string; title: string }>;
  }) => ({
    ...post,
    imageUrl: post.mainImage ? urlFor(post.mainImage).width(800).height(600).url() : null,
  }));

  return (
    <main className="relative">
      <Navigation />
      <WeddingTipsContent featuredPosts={postsWithImages} />
      <Footer />
    </main>
  );
}
