export function YouTubeEmbed({ id, title }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden my-6">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

export function ImageFull({ src, alt, caption }) {
  return (
    <figure className="my-6">
      <img src={src} alt={alt || ''} className="w-full rounded-xl shadow-sm" />
      {caption && <figcaption className="text-center text-sm text-gray-400 mt-2">{caption}</figcaption>}
    </figure>
  );
}
