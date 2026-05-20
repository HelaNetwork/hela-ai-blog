#!/usr/bin/env node
/**
 * Tests for scripts/check-images.js
 *
 * Case 1 (positive): post with valid image AND valid video    -> exit 0.
 * Case 2 (negative image): post with missing image            -> exit 1.
 * Case 3 (negative video): post with valid image, no video    -> exit 1.
 * Case 4 (mixed):    missing image AND missing video          -> exit 1,
 *                    both surfaced in summary.
 *
 * Uses POSTS_DIR + PUBLIC_DIR env overrides so we can stand up a
 * sandbox under /tmp without touching the real content tree.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const VALIDATOR = path.join(__dirname, 'check-images.js');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'check-images-test-'));
}

function runValidator(postsDir, publicDir) {
  return spawnSync('node', [VALIDATOR], {
    env: {
      ...process.env,
      POSTS_DIR: postsDir,
      PUBLIC_DIR: publicDir,
    },
    encoding: 'utf8',
  });
}

function writePost(postsDir, name, frontmatter, body = '') {
  const lines = ['---'];
  for (const [k, v] of Object.entries(frontmatter)) {
    lines.push(`${k}: "${v}"`);
  }
  lines.push('---', '', body, '');
  fs.writeFileSync(path.join(postsDir, name), lines.join('\n'));
}

function assertEq(actual, expected, label) {
  if (actual !== expected) {
    console.error(`FAIL [${label}] expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`);
    process.exit(1);
  }
  console.log(`PASS [${label}]`);
}

function assertContains(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    console.error(`FAIL [${label}] expected output to contain ${JSON.stringify(needle)}\n--- got ---\n${haystack}\n---`);
    process.exit(1);
  }
  console.log(`PASS [${label}]`);
}

// ============================================================
// Case 1: positive — image AND video both exist -> exit 0
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  const vidDir = path.join(publicDir, 'videos');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });
  fs.mkdirSync(vidDir, { recursive: true });

  const imgRef = '/images/posts/sample.svg';
  const vidRef = '/videos/sample.mp4';
  fs.writeFileSync(path.join(publicDir, imgRef.slice(1)), '<svg/>');
  fs.writeFileSync(path.join(publicDir, vidRef.slice(1)), 'fake-mp4-bytes');
  writePost(
    postsDir,
    '2099-01-01-sample.mdx',
    { title: 'Sample', date: '2099-01-01', image: imgRef },
    `<VideoEmbed src="${vidRef}" />`
  );

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 0, 'positive: exit 0');
  assertContains(r.stdout, 'All 1 post images and videos verified.', 'positive: ok message');
}

// ============================================================
// Case 2: negative image — missing image -> exit 1
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  const imgRef = '/images/posts/does-not-exist.svg';
  writePost(postsDir, '2099-02-02-missing.mdx', {
    title: 'Missing',
    date: '2099-02-02',
    image: imgRef,
  });

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'negative image: exit 1');
  assertContains(r.stderr, '2099-02-02-missing.mdx', 'negative image: names the post file');
  assertContains(r.stderr, imgRef, 'negative image: names the missing ref');
  assertContains(r.stderr, '1 missing image(s)', 'negative image: summary line');
}

// ============================================================
// Case 3: negative video — image present, video missing -> exit 1
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const imgRef = '/images/posts/v.svg';
  fs.writeFileSync(path.join(publicDir, imgRef.slice(1)), '<svg/>');
  writePost(
    postsDir,
    '2099-04-01-video.mdx',
    { title: 'V', date: '2099-04-01', image: imgRef },
    '<VideoEmbed src="/videos/no-such-video.mp4" />'
  );

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'negative video: exit 1');
  assertContains(r.stderr, 'MISSING VIDEO', 'negative video: MISSING VIDEO line');
  assertContains(r.stderr, '/videos/no-such-video.mp4', 'negative video: names the missing ref');
  assertContains(r.stderr, '1 missing video(s)', 'negative video: summary line');
}

// ============================================================
// Case 4: mixed — missing image AND missing video in same tree -> exit 1
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  const badImgRef = '/images/posts/missing.svg';
  const badVidRef = '/videos/missing.mp4';
  writePost(
    postsDir,
    '2099-05-01-mixed.mdx',
    { title: 'Mixed', date: '2099-05-01', image: badImgRef },
    `<VideoEmbed src="${badVidRef}" />`
  );

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'mixed: exit 1');
  assertContains(r.stderr, 'MISSING IMAGE', 'mixed: image flagged');
  assertContains(r.stderr, 'MISSING VIDEO', 'mixed: video flagged');
  assertContains(r.stderr, badImgRef, 'mixed: names missing image ref');
  assertContains(r.stderr, badVidRef, 'mixed: names missing video ref');
  assertContains(r.stderr, '1 missing image(s), 1 missing video(s)', 'mixed: combined summary line');
}

console.log('\nAll check-images tests passed.');
