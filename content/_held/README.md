# content/_held/ — gated / draft posts (do NOT deploy)

This directory is the holding area for blog posts that are **not cleared for
publication**. It sits **outside** the auto-deploy build path.

## Why this exists

`next build` renders every `.mdx` physically present in `content/posts/`, and
`wrangler pages deploy out/` ships whatever the build produced — regardless of
what git has staged. So the only reliable way to keep a post *out* of
production is to keep it *out of* `content/posts/`.

`lib/posts.js` reads **only** `content/posts/`, so anything here is never built,
never routed, and never deployed.

Incident that created this convention: on 2026-06-30 a Quinn-gated post was
swept into an auto-publish batch because the pipeline published any `.mdx` in
`content/posts/` once its hero image existed. See `AUDIT.md` finding #08 and the
2026-07-03 change entries.

## The publish gate (two layers, fail-closed)

1. **Folder convention (primary):** gated/draft posts live here. Not in the
   build path, so they cannot deploy.
2. **`scripts/gate-check.js` (safety net):** every post in `content/posts/` that
   is **new or modified** vs git `HEAD` must carry front matter `gate: pass`.
   Absent / `pending` / anything else → the deploy aborts (exit 1). Runs in the
   npm `prebuild` hook and explicitly in `scripts/auto-deploy.sh` before the
   git-add step. Already-committed, unchanged posts are **grandfathered** (they
   are already live) and are never re-checked.

## Workflow

- **Drafting or awaiting Quinn:** keep the post here in `content/_held/`.
- **After Quinn PASS:** add `gate: pass` to the post's front matter, then move
  it into `content/posts/` (with its hero image under `public/images/posts/`
  and any video under `public/videos/`). The next auto-deploy publishes it.
- **Never** move an un-cleared post into `content/posts/`. If you do, the gate
  aborts the whole deploy until it is removed or cleared.
- **Never commit a draft directly into `content/posts/`** (bypassing this
  folder), even with `gate: pending` in its front matter. `gate-check.js` only
  checks posts that are new/modified vs the last commit — a `gate: pending`
  post committed once and left unchanged is grandfathered on the next run and
  will publish uncleared. (Quinn gate finding N1, 2026-07-03.)

## Naming

- `YYYY-MM-DD-slug.mdx` — a full gated post awaiting clearance.
- `YYYY-MM-DD-slug.pending.mdx` — pending *edits* to an already-published post,
  parked for Quinn review before being applied back to `content/posts/`.

Files here are tracked so the convention (and any parked work) is visible in
git. Do not delete parked drafts without owner sign-off.
