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

const TAG_COLORS = ['', 'blue', 'pink', 'yellow'];

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article style={{ padding: '60px 0 80px' }}>

      {/* Back link */}
      <a href="/" style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: 'var(--dim)',
        textDecoration: 'none',
        letterSpacing: '2px',
        display: 'inline-block',
        marginBottom: '40px',
      }}>
        ◀ BACK TO LOG
      </a>

      {/* Header */}
      <div style={{
        borderLeft: '3px solid var(--accent)',
        paddingLeft: '24px',
        marginBottom: '40px',
      }}>
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {post.tags.map((tag, i) => (
              <span key={tag} className={`post-tag ${TAG_COLORS[i % TAG_COLORS.length]}`}>{tag}</span>
            ))}
          </div>
        )}

        <h1 style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(20px, 3.5vw, 32px)',
          color: '#fff',
          lineHeight: 1.4,
          marginBottom: '20px',
        }}>
          {post.title}
        </h1>

        {post.summary && (
          <p style={{ fontSize: '20px', color: 'var(--dim)', marginBottom: '16px', lineHeight: 1.6 }}>
            {post.summary}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', color: 'var(--dim)' }}>
          <span style={{ color: 'var(--text)' }}>{post.author}</span>
          <span style={{ color: 'var(--dim2)' }}>·</span>
          <time dateTime={post.dateRaw}>{post.date}</time>
        </div>
      </div>

      {/* Header image */}
      {post.image && (
        <div style={{ border: '1px solid var(--border)', marginBottom: '48px', overflow: 'hidden', maxWidth: '480px' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', display: 'block', imageRendering: 'pixelated' }} />
        </div>
      )}

      {/* Body */}
      <div className="prose prose-invert prose-lg max-w-none" style={{ borderLeft: '1px solid var(--border2)', paddingLeft: '24px' }}>
        <MDXRemote source={post.content} components={components} />
      </div>

      <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--accent), var(--accent4), transparent)', margin: '60px 0 48px' }} />

      <GiscusComments />
    </article>
  );
}
