import { MetadataRoute } from "next";

export default async function newsSitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch("https://vasudhev.com/api/posts/public?limit=100", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const posts = await res.json();

  return posts.map((post: any) => ({
    url: `https://vasudhev.com/${post.slug}`,
    lastModified: new Date(post.createdAt),
    news: {
      publication: {
        name: "Vasudhev Hindi News",
        language: "hi",
      },
      publicationDate: new Date(post.createdAt).toISOString(),
      title: post.title,
    },
  }));
}
