#!/usr/bin/env node
/**
 * Pre-build validator: ensures every blog post's hero image AND every
 * referenced <VideoEmbed src="..." /> exists on disk.
 *
 * Exits 1 if any image OR any video is missing. Both counts contribute
 * to the same fatal summary. Env overrides:
 *   POSTS_DIR=... PUBLIC_DIR=... node scripts/check-images.js
 *
 * Wired into npm via the `prebuild` script so it runs automatically
 * before `next build`.
 */
const fs = require('fs');
const path = require('path');

const POSTS_DIR = process.env.POSTS_DIR
  ? path.resolve(process.env.POSTS_DIR)
  : path.join(__dirname, '..', 'content', 'posts');
const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(__dirname, '..', 'public');

function resolvePublic(refPath) {
  // refPath looks like "/images/posts/foo.svg" — strip leading slash
  const stripped = refPath.replace(/^\/+/, '');
  return path.join(PUBLIC_DIR, stripped);
}

const posts = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
let missingImages = 0;
let missingVideos = 0;

for (const file of posts) {
  const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');

  // hero image (frontmatter `image:` field)
  const imgMatch = content.match(/^image:\s*"([^"]+)"/m);
  if (imgMatch && imgMatch[1].trim()) {
    const imgPath = resolvePublic(imgMatch[1]);
    if (!fs.existsSync(imgPath)) {
      console.error(`MISSING IMAGE: ${file} -> ${imgMatch[1]}`);
      missingImages++;
    }
  }

  // <VideoEmbed src="..." /> references (FATAL on miss, parity with image)
  const videoRegex = /<VideoEmbed[^>]*\ssrc=["']([^"']+)["']/g;
  let m;
  while ((m = videoRegex.exec(content)) !== null) {
    const vidPath = resolvePublic(m[1]);
    if (!fs.existsSync(vidPath)) {
      console.error(`MISSING VIDEO: ${file} -> ${m[1]}`);
      missingVideos++;
    }
  }
}

if (missingImages > 0 || missingVideos > 0) {
  console.error(`\n${missingImages} missing image(s), ${missingVideos} missing video(s). Fix before deploying.`);
  process.exit(1);
}

console.log(`All ${posts.length} post images and videos verified.`);
