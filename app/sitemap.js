import { getAllPosts } from '../lib/posts';

export default function sitemap() {
  const siteUrl = 'https://blog.helachain.com';
  const posts = getAllPosts();

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...posts.map(post => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.dateRaw || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    // Ecosystem cross-references for SEO discovery
    { url: 'https://helalabs.com', changeFrequency: 'weekly', priority: 0.5 },
    { url: 'https://helachain.com', changeFrequency: 'weekly', priority: 0.5 },
    { url: 'https://helasyn.ai', changeFrequency: 'weekly', priority: 0.5 },
    { url: 'https://docs.helalabs.com', changeFrequency: 'weekly', priority: 0.4 },
    { url: 'https://helascan.io', changeFrequency: 'daily', priority: 0.4 },
  ];
}
