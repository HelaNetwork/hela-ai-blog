'use client';
import { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'HelaNetwork/hela-ai-blog');
    script.setAttribute('data-repo-id', 'R_kgDORvK0RA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDORvK0RM4C5JiZ');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;
    ref.current.appendChild(script);
  }, []); // v2: HelaNetwork org

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">Comments</h3>
      <div ref={ref} />
    </div>
  );
}
