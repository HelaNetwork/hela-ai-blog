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
  ];
}
