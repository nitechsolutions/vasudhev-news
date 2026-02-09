import type { Metadata } from "next";
import PostClient from "./PostClient";
import { headers } from "next/headers";

/* ---------------------------------
   SERVER FETCH (SEO ONLY)
---------------------------------- */
async function getPost(slug: string) {
  const headersList = await headers(); // ✅ REQUIRED

  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "");

  if (!host) return null;

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/posts/public/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* ---------------------------------
   SEO METADATA
---------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "लेख नहीं मिला | Vasudhev Hindi News",
      description: "यह लेख उपलब्ध नहीं है।",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription = post.description
    ?.replace(/<[^>]*>/g, "")
    .slice(0, 160);

  return {
    title: `${post.title} | Vasudhev Hindi News`,
    description: cleanDescription,

    alternates: {
      canonical: `https://vasudhev.com/${post.slug}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },

    openGraph: {
      title: post.title,
      description: cleanDescription,
      url: `https://vasudhev.com/${post.slug}`,
      type: "article",
      locale: "hi_IN",
      siteName: "Vasudhev Hindi News",
      images: [
        {
          url: post.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanDescription,
      images: [post.image || "/og-image.jpg"],
    },

    keywords: [
      post.title,
      post.category,
      "Sooryavanshi 175",
      "Under 19 World Cup",
      "India U19",
      "Vasudhev Hindi News",
      "हिंदी न्यूज़",
    ],
  };
}

/* ---------------------------------
   PAGE
---------------------------------- */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostClient slug={slug} />;
}
