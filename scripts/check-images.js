#!/usr/bin/env node
/**
 * Pre-build validator: ensures every blog post's hero image exists.
 * Fails the build if any referenced image is missing.
 */
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const posts = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
let missing = 0;

for (const file of posts) {
  const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const match = content.match(/^image:\s*"([^"]+)"/m);
  if (!match) continue;

  const imgPath = path.join(PUBLIC_DIR, match[1]);
  if (!fs.existsSync(imgPath)) {
    console.error(`MISSING IMAGE: ${file} → ${match[1]}`);
    missing++;
  }
}

if (missing > 0) {
  console.error(`\n${missing} missing image(s). Fix before deploying.`);
  process.exit(1);
} else {
  console.log(`All ${posts.length} post images verified.`);
}
