#!/usr/bin/env node
/**
 * Tests for scripts/check-images.js
 *
 * Positive: synthetic post pointing at an existing SVG -> exit 0.
 * Negative: synthetic post pointing at a missing SVG -> exit 1
 *           with the offending path in stderr.
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
// Case 1: positive — image exists -> exit 0
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const imgRef = '/images/posts/sample.svg';
  fs.writeFileSync(path.join(publicDir, imgRef.slice(1)), '<svg/>');
  writePost(postsDir, '2099-01-01-sample.mdx', {
    title: 'Sample',
    date: '2099-01-01',
    image: imgRef,
  });

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 0, 'positive: exit 0');
  assertContains(r.stdout, 'All 1 post images verified.', 'positive: ok message');
}

// ============================================================
// Case 2: negative — image missing -> exit 1, names the file + ref
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
  assertEq(r.status, 1, 'negative: exit 1');
  assertContains(r.stderr, '2099-02-02-missing.mdx', 'negative: names the post file');
  assertContains(r.stderr, imgRef, 'negative: names the missing ref');
  assertContains(r.stderr, '1 missing image(s)', 'negative: summary line');
}

// ============================================================
// Case 3: mixed — one good, one bad -> exit 1, reports the bad one only
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const goodRef = '/images/posts/good.svg';
  const badRef = '/images/posts/bad.svg';
  fs.writeFileSync(path.join(publicDir, goodRef.slice(1)), '<svg/>');
  writePost(postsDir, '2099-03-01-good.mdx', { title: 'G', date: '2099-03-01', image: goodRef });
  writePost(postsDir, '2099-03-02-bad.mdx', { title: 'B', date: '2099-03-02', image: badRef });

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'mixed: exit 1');
  assertContains(r.stderr, '2099-03-02-bad.mdx', 'mixed: names bad post');
  if (r.stderr.includes('2099-03-01-good.mdx')) {
    console.error('FAIL [mixed: does not flag good post]');
    process.exit(1);
  }
  console.log('PASS [mixed: does not flag good post]');
}

// ============================================================
// Case 4: VideoEmbed missing -> WARN, does NOT fail
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
  assertEq(r.status, 0, 'video missing: exit 0 (warn only)');
  assertContains(r.stderr, '/videos/no-such-video.mp4', 'video missing: prints WARN with path');
}

console.log('\nAll check-images tests passed.');
