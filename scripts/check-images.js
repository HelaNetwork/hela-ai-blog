#!/usr/bin/env node
/**
 * Pre-build validator: ensures every blog post's hero image exists.
 * Fails the build (exit 1) if any referenced image is missing.
 *
 * Also scans for <VideoEmbed src="..."/> references and prints a
 * warning (non-fatal) for any missing video file. Promote to strict
 * once the existing gaps backfill.
 *
 * Wired into npm via the `prebuild` script so it runs automatically
 * before `next build`. Can also be invoked directly:
 *   node scripts/check-images.js
 *   POSTS_DIR=... PUBLIC_DIR=... node scripts/check-images.js
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
const missingImageList = [];
const missingVideoList = [];

for (const file of posts) {
  const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');

  // hero image (frontmatter `image:` field)
  const imgMatch = content.match(/^image:\s*"([^"]+)"/m);
  if (imgMatch && imgMatch[1].trim()) {
    const imgPath = resolvePublic(imgMatch[1]);
    if (!fs.existsSync(imgPath)) {
      console.error(`MISSING IMAGE: ${file} -> ${imgMatch[1]}`);
      missingImageList.push({ file, ref: imgMatch[1] });
      missingImages++;
    }
  }

  // <VideoEmbed src="..." /> references (non-fatal, warning only for now)
  const videoRegex = /<VideoEmbed[^>]*\ssrc=["']([^"']+)["']/g;
  let m;
  while ((m = videoRegex.exec(content)) !== null) {
    const vidPath = resolvePublic(m[1]);
    if (!fs.existsSync(vidPath)) {
      console.warn(`WARN missing video: ${file} -> ${m[1]}`);
      missingVideoList.push({ file, ref: m[1] });
      missingVideos++;
    }
  }
}

if (missingImages > 0) {
  console.error(`\n${missingImages} missing image(s). Fix before deploying.`);
  if (missingVideos > 0) {
    console.error(`(plus ${missingVideos} missing video(s) — warning only.)`);
  }
  process.exit(1);
}

console.log(`All ${posts.length} post images verified.`);
if (missingVideos > 0) {
  console.log(`Warning: ${missingVideos} missing video(s). Not blocking deploy.`);
}
