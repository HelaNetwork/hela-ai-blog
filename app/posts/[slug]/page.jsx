import { getPostBySlug, getAllSlugs } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import GiscusComments from '../../../components/GiscusComments';
import { YouTubeEmbed, ImageFull } from '../../../components/MediaEmbed';
import { notFound } from 'next/navigation';

const components = { YouTubeEmbed, ImageFull };

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-hela-cyan/10 text-hela-cyan border border-hela-cyan/20 px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 leading-tight mb-4">{post.title}</h1>
        {post.summary && <p className="text-lg text-slate-400 mb-4">{post.summary}</p>}
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="font-medium text-slate-300">{post.author}</span>
          <span>·</span>
          <time>{post.date}</time>
        </div>
      </div>

      {post.image && (
        <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8 shadow-sm" />
      )}

      <div className="prose prose-invert prose-lg max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>

      <GiscusComments />
    </article>
  );
}
