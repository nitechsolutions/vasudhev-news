import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const posts = await Post.find(
    {},
    { slug: 1, updatedAt: 1 }
  ).lean();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://vasudhev.com/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "daily" as const, // ✅ FIX
    priority: 0.8,
  }));

  return [
    {
      url: "https://vasudhev.com/",
      lastModified: new Date(),
      changeFrequency: "daily" as const, // ✅ FIX
      priority: 1,
    },
    ...postUrls,
  ];
}
