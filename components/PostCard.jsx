const TAG_COLOR_MAP = {
  'CITIZEN ID': '',
  'AI AGENTS':  'blue',
  'DEV LOG':    'pink',
  'CHAIN':      'yellow',
  'HELASYN':    '',
  'ECONOMY':    'pink',
  'SECURITY':   'pink',
  'INFRA':      'yellow',
  'NLP':        'blue',
  'ANALYTICS':  'blue',
  'COMMS':      'yellow',
};

function getTagColor(tag) {
  return TAG_COLOR_MAP[tag?.toUpperCase()] || '';
}

export default function PostCard({ post }) {
  const primaryTag = post.tags?.[0] || '';
  const colorClass = getTagColor(primaryTag);

  return (
    <a href={`/posts/${post.slug}`} className={`dispatch-card ${colorClass}`}>
      {/* Thumbnail */}
      <div className="dispatch-thumb">
        {post.image ? (
          <img src={post.image} alt={post.title} />
        ) : (
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '20px', color: 'var(--dim2)', letterSpacing: '2px' }}>H</span>
        )}
      </div>

      {/* Tag */}
      {primaryTag && (
        <div className={`post-tag ${colorClass}`}>{primaryTag}</div>
      )}

      {/* Title */}
      <div className="dispatch-title">{post.title}</div>

      {/* Excerpt */}
      {post.summary && (
        <div className="dispatch-excerpt">{post.summary}</div>
      )}

      {/* Meta */}
      <div className="dispatch-meta">
        <span>{post.author}</span>
        <span className="dot">·</span>
        <time dateTime={post.dateRaw}>{post.date}</time>
      </div>

      {/* Read link */}
      <span className={`read-arrow ${colorClass}`}>READ →</span>
    </a>
  );
}
