import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');

function formatDate(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function toISOString(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toISOString().split('T')[0];
}

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        date: formatDate(data.date),
        dateRaw: toISOString(data.date),
        author: data.author || 'HeLa AI Team',
        tags: data.tags || [],
        summary: data.summary || '',
        image: data.image || null,
      };
    })
    .sort((a, b) => (a.dateRaw < b.dateRaw ? 1 : -1));
}

export function getPostBySlug(slug) {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: formatDate(data.date),
    dateRaw: toISOString(data.date),
    author: data.author || 'HeLa AI Team',
    tags: data.tags || [],
    summary: data.summary || '',
    image: data.image || null,
    content,
  };
}

export function getAllSlugs() {
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}
