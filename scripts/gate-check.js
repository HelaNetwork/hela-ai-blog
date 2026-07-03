#!/usr/bin/env node
/**
 * gate-check.js — fail-closed Quinn-gate guard for the auto-deploy pipeline.
 *
 * WHY: `next build` renders every .mdx physically present in content/posts and
 * wrangler deploys the built output, so a draft/gated post left in content/posts
 * WILL publish regardless of what git has staged. This guard refuses to build
 * when any NEW or MODIFIED post in content/posts is not explicitly cleared.
 *
 * RULE (fail-closed): every post in content/posts that is new/modified versus
 * git HEAD MUST carry front matter `gate: pass`. Absent / `pending` / anything
 * else => the deploy aborts with exit 1. Already-committed, unchanged posts are
 * grandfathered (they are already live) and are never re-checked — this is why
 * the 59 published posts need no edits.
 *
 * Gated/draft posts live in content/_held/ (outside the build path). This guard
 * catches the mistake of leaving one in content/posts.
 *
 * Runs (a) as the first step of the `prebuild` npm hook and (b) explicitly in
 * scripts/auto-deploy.sh before the build/git-add step.
 *
 * Env override for tests: POSTS_DIR=... node scripts/gate-check.js
 */
const fs = require('fs');
const path = require('path');
const { readGate, changedPosts } = require('./gate-lib');

const POSTS_DIR = process.env.POSTS_DIR
  ? path.resolve(process.env.POSTS_DIR)
  : path.join(__dirname, '..', 'content', 'posts');

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`gate-check: posts dir not found: ${POSTS_DIR}`);
    process.exit(1);
  }

  const changed = changedPosts(POSTS_DIR);
  if (changed === null) {
    // No git baseline => cannot tell published from draft. Fail closed.
    console.error(
      'gate-check: could not determine the git baseline for ' +
        `${POSTS_DIR}. A git work tree is required to distinguish published ` +
        'posts from new/gated ones. Refusing to deploy (fail-closed).'
    );
    process.exit(1);
  }

  const changedInDir = [...changed].filter(
    (p) => path.dirname(p) === POSTS_DIR && p.endsWith('.mdx')
  );

  const violations = [];
  for (const abs of changedInDir) {
    // A file staged-for-delete can still surface here; skip if gone.
    if (!fs.existsSync(abs)) continue;
    const raw = fs.readFileSync(abs, 'utf8');
    const gate = readGate(raw);
    if (gate !== 'pass') {
      violations.push({ file: path.basename(abs), gate: gate || '(none)' });
    }
  }

  if (violations.length > 0) {
    console.error(
      '\ngate-check FAILED — new/modified post(s) in content/posts are not ' +
        'cleared for deploy:\n'
    );
    for (const v of violations) {
      console.error(`  BLOCKED: ${v.file}  (gate: ${v.gate}, required: pass)`);
    }
    console.error(
      '\nEach post above is new or edited but lacks front matter `gate: pass`.\n' +
        'Fix by ONE of:\n' +
        '  - Move the post to content/_held/ until Quinn clears it (draft/gated), or\n' +
        '  - After Quinn PASS, add `gate: pass` to its front matter.\n' +
        'Nothing was deployed.\n'
    );
    process.exit(1);
  }

  const cleared = changedInDir.length;
  console.log(
    `gate-check OK — ${cleared} new/modified post(s) cleared (gate: pass); ` +
      'all other posts grandfathered (unchanged, already published).'
  );
}

main();
