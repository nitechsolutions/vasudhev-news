"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  fetchPostBySlug,
  fetchRelatedPosts,
} from "@/store/postSlice";
import Link from "next/link";
import SinglePost from "@/components/SinglePost";
import RelatedPost from "@/components/RelatedPost";

export default function PostClient({ slug }: { slug: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { single, related, loading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (slug) dispatch(fetchPostBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (single?.category)
      dispatch(fetchRelatedPosts(single.category));
  }, [single, dispatch]);

  if (loading || !single) {
    return <div className="p-10 text-center">लोड हो रहा है…</div>;
  }

  return (
    <>
      {/* ---------------- JSON-LD (NEWS) ---------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: single.title,
            image: [single.image],
            datePublished: single.createdAt,
            author: {
              "@type": "Person",
              name: single.author?.name || "Vasudhev News Desk",
            },
            publisher: {
              "@type": "Organization",
              name: "Vasudhev Hindi News",
              logo: {
                "@type": "ImageObject",
                url: "https://vasudhev.com/vasudhev_tree.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://vasudhev.com/${single.slug}`,
            },
          }),
        }}
      />

      {/* ---------------- BREADCRUMB ---------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "होम",
                item: "https://vasudhev.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: single.category,
                item: `https://vasudhev.com/category/${single.category}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: single.title,
                item: `https://vasudhev.com/${single.slug}`,
              },
            ],
          }),
        }}
      />

      {/* ---------------- CONTENT ---------------- */}
      <article className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-5">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:underline">होम</Link> /{" "}
            <Link
              href={`/category/${single.category}`}
              className="hover:underline"
            >
              {single.category}
            </Link>{" "}
            / {single.slug.slice(0, 40)}…
          </nav>

          <SinglePost post={single} />
        </div>

        <aside className="sticky top-2">
          <h2 className="text-2xl font-bold mb-4">
            संबंधित खबरें
          </h2>

          <RelatedPost
            posts={related}
            currentSlug={single.slug}
          />
        </aside>
      </article>
    </>
  );
}
