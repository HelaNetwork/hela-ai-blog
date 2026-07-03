#!/usr/bin/env node
/**
 * Tests for scripts/gate-check.js — the fail-closed Quinn-gate guard.
 *
 * Uses a throwaway git repo per case so the real git-baseline logic is
 * exercised (grandfathered = committed+unchanged; gated = new/modified).
 *
 * Cases:
 *   1. clean repo, baseline committed, no changes           -> exit 0 (grandfathered)
 *   2. NEW post, no `gate: pass`                             -> exit 1 (blocked)
 *   3. NEW post WITH `gate: pass`                            -> exit 0 (cleared)
 *   4. MODIFIED committed post, no `gate: pass`             -> exit 1 (blocked)
 *   5. NEW post `gate: pending`                              -> exit 1 (blocked)
 *   6. POSTS_DIR outside any git work tree                   -> exit 1 (fail-closed)
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const GATE = path.join(__dirname, 'gate-check.js');

function sh(args, cwd) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (r.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${r.stderr || r.stdout}`);
  }
  return r;
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'gate-check-test-'));
}

function writePost(dir, name, { gate } = {}, body = 'hello') {
  const fm = ['---', 'title: "T"', 'date: "2099-01-01"'];
  if (gate) fm.push(`gate: ${gate}`);
  fm.push('---', '', body, '');
  fs.writeFileSync(path.join(dir, name), fm.join('\n'));
}

/** Fresh git repo with content/posts + one committed baseline post (no gate). */
function initRepo() {
  const root = tmpDir();
  const postsDir = path.join(root, 'content', 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  sh(['init', '-q'], root);
  sh(['config', 'user.email', 't@t'], root);
  sh(['config', 'user.name', 't'], root);
  writePost(postsDir, '2099-01-01-baseline.mdx');
  sh(['add', '-A'], root);
  sh(['-c', 'commit.gpgsign=false', 'commit', '-q', '-m', 'baseline'], root);
  return { root, postsDir };
}

function runGate(postsDir) {
  return spawnSync('node', [GATE], {
    env: { ...process.env, POSTS_DIR: postsDir },
    encoding: 'utf8',
  });
}

function assertEq(actual, expected, label) {
  if (actual !== expected) {
    console.error(
      `FAIL [${label}] expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`
    );
    process.exit(1);
  }
  console.log(`PASS [${label}]`);
}

function assertContains(hay, needle, label) {
  if (!hay.includes(needle)) {
    console.error(
      `FAIL [${label}] expected output to contain ${JSON.stringify(needle)}\n--- got ---\n${hay}\n---`
    );
    process.exit(1);
  }
  console.log(`PASS [${label}]`);
}

// 1: clean repo, nothing changed -> exit 0 (baseline grandfathered)
{
  const { postsDir } = initRepo();
  const r = runGate(postsDir);
  assertEq(r.status, 0, 'grandfathered: exit 0');
  assertContains(r.stdout, 'grandfathered', 'grandfathered: message');
}

// 2: NEW post without gate:pass -> exit 1
{
  const { postsDir } = initRepo();
  writePost(postsDir, '2099-06-01-new-draft.mdx');
  const r = runGate(postsDir);
  assertEq(r.status, 1, 'new-no-gate: exit 1');
  assertContains(r.stderr, '2099-06-01-new-draft.mdx', 'new-no-gate: names file');
  assertContains(r.stderr, 'BLOCKED', 'new-no-gate: BLOCKED label');
  assertContains(r.stderr, 'content/_held/', 'new-no-gate: remediation hint');
}

// 3: NEW post WITH gate: pass -> exit 0
{
  const { postsDir } = initRepo();
  writePost(postsDir, '2099-06-02-cleared.mdx', { gate: 'pass' });
  const r = runGate(postsDir);
  assertEq(r.status, 0, 'new-gate-pass: exit 0');
  assertContains(r.stdout, '1 new/modified post(s) cleared', 'new-gate-pass: count');
}

// 4: MODIFIED committed post without gate:pass -> exit 1
{
  const { postsDir } = initRepo();
  fs.appendFileSync(path.join(postsDir, '2099-01-01-baseline.mdx'), '\nedited\n');
  const r = runGate(postsDir);
  assertEq(r.status, 1, 'modified-no-gate: exit 1');
  assertContains(r.stderr, '2099-01-01-baseline.mdx', 'modified-no-gate: names file');
  assertContains(r.stderr, 'BLOCKED', 'modified-no-gate: BLOCKED label');
}

// 5: NEW post with gate: pending -> exit 1
{
  const { postsDir } = initRepo();
  writePost(postsDir, '2099-06-03-pending.mdx', { gate: 'pending' });
  const r = runGate(postsDir);
  assertEq(r.status, 1, 'gate-pending: exit 1');
  assertContains(r.stderr, 'gate: pending', 'gate-pending: shows marker');
}

// 6: POSTS_DIR outside a git work tree -> exit 1 (fail-closed)
{
  const root = tmpDir(); // plain tmp, NOT a git repo
  const postsDir = path.join(root, 'posts');
  fs.mkdirSync(postsDir, { recursive: true });
  writePost(postsDir, '2099-06-04-nogit.mdx', { gate: 'pass' });
  const r = runGate(postsDir);
  assertEq(r.status, 1, 'no-git: exit 1 (fail-closed)');
  assertContains(r.stderr, 'git work tree is required', 'no-git: reason');
}

console.log('\nAll gate-check tests passed.');
