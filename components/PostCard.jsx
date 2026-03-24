export default function PostCard({ post, featured = false }) {
  return (
    <article className={`group relative rounded-2xl border border-hela-border bg-hela-card transition-all duration-200 hover:shadow-card-hover hover:border-hela-cyan/30 overflow-hidden ${featured ? 'p-8' : 'p-5'}`}>
      <a href={`/posts/${post.slug}`} className="block h-full">
        {/* Featured cover image */}
        {post.image && featured && (
          <img
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-52 object-cover rounded-xl mb-6"
          />
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className={`font-display font-semibold text-slate-100 group-hover:text-hela-cyan transition-colors duration-150 leading-snug mb-2 ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className={`text-hela-muted leading-relaxed mb-4 ${featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
            {post.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-hela-muted mt-auto pt-2">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-hela-cyan to-hela-blue flex items-center justify-center text-white font-bold text-[8px]" aria-hidden="true">
              {post.author?.[0]?.toUpperCase() || 'H'}
            </span>
            {post.author}
          </span>
          <time dateTime={post.dateRaw}>{post.date}</time>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(6,182,212,0.04) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
      </a>
    </article>
  );
}
