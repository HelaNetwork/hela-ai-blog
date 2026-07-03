#!/usr/bin/env node
/**
 * Tests for scripts/check-images.js
 *
 * Non-git sandboxes (no baseline => strict: every post is treated as
 * new/changed, so any missing local media is FATAL):
 *   1. image + video both exist                       -> exit 0.
 *   2. missing hero image                             -> exit 1.
 *   3. valid image, missing <VideoEmbed> video        -> exit 1.
 *   4. missing image AND missing video                -> exit 1 (both surfaced).
 *   5. missing raw <video src="..."> media            -> exit 1  (addendum).
 *   6. missing raw <img src="..."> media              -> exit 1  (addendum).
 *   7. held post (gate: pending) w/ missing image     -> exit 0  (skipped).
 *
 * Git sandboxes (real baseline => grandfathered vs eligible split):
 *   8. grandfathered (committed, unchanged) post with a missing raw <video>
 *      -> exit 0, reported as STALE/pre-existing, NON-fatal (models the
 *      evm-tracer live-404: surface it without blocking the batch).
 *   9. NEW (untracked) post with a missing raw <video>
 *      -> exit 1 (eligible/new media is fatal even in a git repo).
 *
 * POSTS_DIR + PUBLIC_DIR env overrides stand up sandboxes under /tmp.
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
    env: { ...process.env, POSTS_DIR: postsDir, PUBLIC_DIR: publicDir },
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

function git(args, cwd) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (r.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${r.stderr || r.stdout}`);
  }
  return r;
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

function assertNotContains(haystack, needle, label) {
  if (haystack.includes(needle)) {
    console.error(`FAIL [${label}] expected output NOT to contain ${JSON.stringify(needle)}\n--- got ---\n${haystack}\n---`);
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
  assertContains(r.stderr, 'MISSING IMAGE', 'negative image: MISSING IMAGE line');
  assertContains(r.stderr, '2099-02-02-missing.mdx', 'negative image: names the post file');
  assertContains(r.stderr, imgRef, 'negative image: names the missing ref');
  assertContains(r.stderr, 'missing media ref(s) on new/modified', 'negative image: summary line');
}

// ============================================================
// Case 3: negative video — image present, <VideoEmbed> missing -> exit 1
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
  assertContains(r.stderr, 'missing media ref(s) on new/modified', 'negative video: summary line');
}

// ============================================================
// Case 4: mixed — missing image AND missing video -> exit 1
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
  assertContains(r.stderr, '2 missing media ref(s) on new/modified', 'mixed: combined summary line');
}

// ============================================================
// Case 5: raw <video src="..."> missing -> exit 1  (addendum)
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const imgRef = '/images/posts/raw.svg';
  fs.writeFileSync(path.join(publicDir, imgRef.slice(1)), '<svg/>');
  writePost(
    postsDir,
    '2099-06-30-raw-video.mdx',
    { title: 'Raw', date: '2099-06-30', image: imgRef },
    '<video src="/videos/raw-missing.mp4" controls />'
  );

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'raw video: exit 1');
  assertContains(r.stderr, 'MISSING VIDEO', 'raw video: MISSING VIDEO line');
  assertContains(r.stderr, '/videos/raw-missing.mp4', 'raw video: names the missing ref');
}

// ============================================================
// Case 6: raw <img src="..."> missing -> exit 1  (addendum)
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  writePost(
    postsDir,
    '2099-07-01-raw-img.mdx',
    { title: 'Img', date: '2099-07-01' },
    '<img src="/images/posts/inline-missing.png" alt="x" />'
  );

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'raw img: exit 1');
  assertContains(r.stderr, 'MISSING IMAGE', 'raw img: MISSING IMAGE line');
  assertContains(r.stderr, '/images/posts/inline-missing.png', 'raw img: names the missing ref');
}

// ============================================================
// Case 7: held post (gate != pass) with missing image -> exit 0 (skipped)
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'posts');
  const publicDir = path.join(root, 'public');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  writePost(postsDir, '2099-08-01-held.mdx', {
    title: 'Held',
    date: '2099-08-01',
    gate: 'pending',
    image: '/images/posts/held-missing.svg',
  });

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 0, 'held: exit 0');
  assertNotContains(r.stderr, 'MISSING', 'held: missing image NOT flagged (skipped)');
  assertContains(r.stdout, 'held post(s) skipped', 'held: skip note');
}

// ============================================================
// Case 8: git — grandfathered post w/ missing raw <video> -> exit 0, STALE
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'content', 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const imgRef = '/images/posts/gf.svg';
  fs.writeFileSync(path.join(publicDir, imgRef.slice(1)), '<svg/>');
  writePost(
    postsDir,
    '2099-09-01-published.mdx',
    { title: 'Published', date: '2099-09-01', image: imgRef },
    '<video src="/videos/gf-missing.mp4" controls />'
  );

  git(['init', '-q'], root);
  git(['config', 'user.email', 't@t'], root);
  git(['config', 'user.name', 't'], root);
  git(['add', '-A'], root);
  git(['-c', 'commit.gpgsign=false', 'commit', '-q', '-m', 'publish'], root);

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 0, 'grandfathered stale: exit 0 (non-fatal)');
  assertContains(r.stderr, 'STALE VIDEO', 'grandfathered stale: STALE VIDEO line');
  assertContains(r.stdout, 'pre-existing missing ref(s)', 'grandfathered stale: note');
}

// ============================================================
// Case 9: git — NEW (untracked) post w/ missing raw <video> -> exit 1 (fatal)
// ============================================================
{
  const root = tmpDir();
  const postsDir = path.join(root, 'content', 'posts');
  const publicDir = path.join(root, 'public');
  const imgDir = path.join(publicDir, 'images', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const imgRef = '/images/posts/base.svg';
  fs.writeFileSync(path.join(publicDir, imgRef.slice(1)), '<svg/>');
  writePost(postsDir, '2099-09-02-base.mdx', {
    title: 'Base',
    date: '2099-09-02',
    image: imgRef,
  });
  git(['init', '-q'], root);
  git(['config', 'user.email', 't@t'], root);
  git(['config', 'user.name', 't'], root);
  git(['add', '-A'], root);
  git(['-c', 'commit.gpgsign=false', 'commit', '-q', '-m', 'base'], root);

  // NEW untracked post referencing a missing video.
  writePost(
    postsDir,
    '2099-09-03-fresh.mdx',
    { title: 'Fresh', date: '2099-09-03', image: imgRef },
    '<video src="/videos/fresh-missing.mp4" controls />'
  );

  const r = runValidator(postsDir, publicDir);
  assertEq(r.status, 1, 'new media in git repo: exit 1 (fatal)');
  assertContains(r.stderr, 'MISSING VIDEO', 'new media in git repo: MISSING VIDEO line');
  assertContains(r.stderr, '/videos/fresh-missing.mp4', 'new media in git repo: names ref');
}

console.log('\nAll check-images tests passed.');
