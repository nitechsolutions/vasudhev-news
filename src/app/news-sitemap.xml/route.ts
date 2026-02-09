import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  await connectDB();

  // ⏱ Google News: last 48 hours only
  const last48Hours = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const posts = await Post.find({
    createdAt: { $gte: last48Hours },
  })
    .select("title slug createdAt")
    .sort({ createdAt: -1 })
    .limit(1000) // ✅ REQUIRED by Google News
    .lean();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

${posts
  .map(
    (post: any) => `
  <url>
    <loc>https://vasudhev.com/${post.slug}</loc>
    <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
    <news:news>
      <news:publication>
        <news:name>Vasudhev Hindi News</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:publication_date>${new Date(
        post.createdAt
      ).toISOString()}</news:publication_date>
      <news:title><![CDATA[${escapeXml(post.title)}]]></news:title>
    </news:news>
  </url>`
  )
  .join("")}

</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store",
    },
  });
}
