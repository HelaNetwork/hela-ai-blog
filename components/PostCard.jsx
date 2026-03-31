const ACCENT_CYCLE = ['', 'blue', 'pink', 'yellow'];
const TAG_COLORS   = ['', 'blue', 'pink', 'yellow'];

export default function PostCard({ post, colorIndex = 0 }) {
  const accent = ACCENT_CYCLE[colorIndex % ACCENT_CYCLE.length];
  const tagColor = TAG_COLORS[(colorIndex + 1) % TAG_COLORS.length];

  return (
    <a href={`/posts/${post.slug}`} className={`pixel-card ${accent}`} style={{ textDecoration: 'none' }}>
      {/* Thumbnail */}
      <div className="card-thumb">
        {post.image ? (
          <img src={post.image} alt={post.title} />
        ) : (
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '20px', color: 'var(--dim2)', letterSpacing: '2px' }}>H</span>
        )}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {post.tags.slice(0, 2).map((tag, i) => (
            <span key={tag} className={`post-tag ${i === 1 ? tagColor : ''}`}>{tag}</span>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="card-title">{post.title}</div>

      {/* Excerpt */}
      {post.summary && (
        <div className="card-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.summary}
        </div>
      )}

      {/* Meta */}
      <div className="card-meta">
        <span>{post.author}</span>
        <span style={{ color: 'var(--dim2)' }}>·</span>
        <time dateTime={post.dateRaw}>{post.date}</time>
      </div>
    </a>
  );
}
