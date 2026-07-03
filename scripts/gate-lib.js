#!/usr/bin/env node
/**
 * gate-lib.js — shared helpers for the deploy gate + asset checks.
 *
 * Two concerns live here so scripts/gate-check.js and scripts/check-images.js
 * agree on the same definitions:
 *
 *   1. FRONT-MATTER GATE MARKER
 *      A post is cleared for auto-deploy only if its front matter carries
 *      `gate: pass` (case-insensitive). Absent, `pending`, `hold`, or any
 *      other value => NOT cleared (fail-closed).
 *
 *   2. PUBLISHED BASELINE (grandfathering)
 *      A post that is committed to git AND unchanged in the working tree is
 *      "grandfathered": it is already live, so it keeps deploying without a
 *      marker. Only NEW (untracked) or MODIFIED posts are gated. This is why
 *      the 59 already-published posts need no edits.
 *
 * No third-party deps — plain Node + git, so it runs inside the cron with
 * nothing installed.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

/**
 * Extract the raw front-matter block (text between the first pair of `---`
 * fences). Returns '' if there is no front matter.
 */
function frontMatterBlock(raw) {
  const m = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

/**
 * Read the `gate:` marker from a post's front matter.
 * Returns a lower-cased string (e.g. "pass", "pending") or null if absent.
 */
function readGate(raw) {
  const fm = frontMatterBlock(raw);
  const m = fm.match(/^\s*gate:\s*["']?([A-Za-z0-9_-]+)["']?\s*$/m);
  return m ? m[1].toLowerCase() : null;
}

/** A post is cleared for deploy iff gate === "pass". */
function isGatePass(raw) {
  return readGate(raw) === 'pass';
}

/**
 * Resolve the git top-level for a directory. Returns the absolute repo root,
 * or null if `dir` is not inside a git work tree (e.g. a /tmp test sandbox).
 */
function gitRoot(dir) {
  const r = spawnSync('git', ['-C', dir, 'rev-parse', '--show-toplevel'], {
    encoding: 'utf8',
  });
  if (r.status !== 0 || !r.stdout) return null;
  return r.stdout.trim();
}

/**
 * Set of absolute .mdx paths under `postsDir` that are NEW or MODIFIED versus
 * git HEAD (i.e. would be introduced/changed by this deploy). Pure deletions
 * are ignored. Returns null when `postsDir` is not in a git work tree — callers
 * MUST treat null as "no baseline available" and fail closed / go strict.
 */
function changedPosts(postsDir) {
  const root = gitRoot(postsDir);
  if (!root) return null;
  const r = spawnSync(
    'git',
    ['-C', root, 'status', '--porcelain', '--', postsDir],
    { encoding: 'utf8' }
  );
  if (r.status !== 0) return null;
  const out = new Set();
  for (const line of r.stdout.split('\n')) {
    if (!line) continue;
    const status = line.slice(0, 2);
    let p = line.slice(3);
    // Renames/copies show "old -> new"; take the destination.
    const arrow = p.indexOf(' -> ');
    if (arrow !== -1) p = p.slice(arrow + 4);
    // Git may quote paths containing special chars; our slugs never do.
    p = p.replace(/^"|"$/g, '');
    if (!p.endsWith('.mdx')) continue;
    // Skip pure deletions (nothing to gate on a removed file).
    if (status === ' D' || status === 'D ') continue;
    out.add(path.resolve(root, p));
  }
  return out;
}

/**
 * Collect local (site-absolute, leading-slash) media refs from a post:
 *   - front matter `image:`
 *   - <VideoEmbed src="...">, raw <video src="...">, raw <img src="...">
 * External refs (http(s)://, protocol-relative //, data:) are ignored — the
 * validator only owns assets we ship from public/.
 */
function localMediaRefs(raw) {
  const refs = [];
  const img = raw.match(/^image:\s*"([^"]+)"/m);
  if (img && img[1].trim()) refs.push({ kind: 'IMAGE', ref: img[1].trim() });

  const tagRe = /<(VideoEmbed|video|img)\b[^>]*\ssrc=["']([^"']+)["']/gi;
  let m;
  while ((m = tagRe.exec(raw)) !== null) {
    const tag = m[1].toLowerCase();
    const kind = tag === 'img' ? 'IMAGE' : 'VIDEO';
    refs.push({ kind, ref: m[2].trim() });
  }

  // Keep only site-absolute local refs; drop external/data/protocol-relative.
  return refs.filter(
    (r) => r.ref.startsWith('/') && !r.ref.startsWith('//')
  );
}

module.exports = {
  frontMatterBlock,
  readGate,
  isGatePass,
  gitRoot,
  changedPosts,
  localMediaRefs,
};
