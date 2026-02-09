import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch("https://vasudhev.com/api/posts/public");
  const posts = await res.json();

  const postUrls = posts.map((post: any) => ({
    url: `https://vasudhev.com/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: "https://vasudhev.com/",
      lastModified: new Date(),
      priority: 1,
    },
    ...postUrls,
  ];
}
