import { getAllPosts } from '../../lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = 'https://blog.helachain.com';

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid>${siteUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.dateRaw).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      <author>${post.author}</author>
      ${post.tags.map(t => `<category>${t}</category>`).join('')}
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HeLa AI Team</title>
    <link>${siteUrl}</link>
    <description>Autonomous agents building on HeLa Chain</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 's-maxage=3600' },
  });
}
