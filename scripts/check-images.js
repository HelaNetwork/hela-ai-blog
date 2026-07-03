#!/usr/bin/env node
/**
 * Pre-build validator: ensures every blog post's referenced local media
 * exists on disk. Covers:
 *   - front matter `image:` hero
 *   - <VideoEmbed src="..." />
 *   - raw <video src="..."> and <img src="..."> tags
 * Only site-absolute local refs (leading "/") are checked; external
 * (http(s)://, //, data:) refs are ignored.
 *
 * FAIL-CLOSED, but scoped to eligible posts so a stale live 404 can't block
 * new publishes (the incident this guard exists to prevent):
 *   - Posts marked `gate:` != pass are HELD (draft/gated) and skipped entirely.
 *   - Missing media on a NEW or MODIFIED post (or when no git baseline is
 *     available) is FATAL -> exit 1.
 *   - Missing media on a GRANDFATHERED (already-published, unchanged) post is a
 *     loud non-fatal warning: it is an existing live 404 to fix separately, not
 *     a reason to block the current batch.
 *
 * Env overrides: POSTS_DIR=... PUBLIC_DIR=... node scripts/check-images.js
 *
 * Wired into npm via the `prebuild` script (after gate-check).
 */
const fs = require('fs');
const path = require('path');
const { readGate, changedPosts, localMediaRefs } = require('./gate-lib');

const POSTS_DIR = process.env.POSTS_DIR
  ? path.resolve(process.env.POSTS_DIR)
  : path.join(__dirname, '..', 'content', 'posts');
const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(__dirname, '..', 'public');

function resolvePublic(refPath) {
  const stripped = refPath.replace(/^\/+/, '');
  return path.join(PUBLIC_DIR, stripped);
}

const posts = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));

// git baseline: which posts are new/modified. null => no git => go strict
// (treat everything as changed, so any missing media is fatal).
const changed = changedPosts(POSTS_DIR);
const strict = changed === null;

let fatalMissing = 0; // missing media on eligible (new/changed) posts
let staleMissing = 0; // missing media on grandfathered posts (warn only)
let verified = 0;
let skippedHeld = 0;

for (const file of posts) {
  const abs = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(abs, 'utf8');

  // Held/gated posts (gate present but not pass) are not deploying — skip.
  const gate = readGate(content);
  if (gate !== null && gate !== 'pass') {
    skippedHeld++;
    continue;
  }

  const isChanged = strict || changed.has(path.resolve(abs));
  let postMissing = 0;

  for (const { kind, ref } of localMediaRefs(content)) {
    if (!fs.existsSync(resolvePublic(ref))) {
      postMissing++;
      const label = isChanged
        ? `MISSING ${kind}`
        : `STALE ${kind} (live 404, pre-existing)`;
      console.error(`${label}: ${file} -> ${ref}`);
    }
  }

  if (postMissing === 0) {
    verified++;
  } else if (isChanged) {
    fatalMissing += postMissing;
  } else {
    staleMissing += postMissing;
  }
}

const noteParts = [];
if (skippedHeld > 0) noteParts.push(`${skippedHeld} held post(s) skipped`);
if (staleMissing > 0) {
  noteParts.push(
    `${staleMissing} pre-existing missing ref(s) on published post(s) ` +
      '(non-fatal — fix separately, does not block deploy)'
  );
}
const note = noteParts.length ? ` (${noteParts.join('; ')})` : '';

if (fatalMissing > 0) {
  console.error(
    `\n${fatalMissing} missing media ref(s) on new/modified post(s). ` +
      'Fix before deploying.'
  );
  process.exit(1);
}

console.log(`All ${verified} post images and videos verified.${note}`);
