#!/usr/bin/env bash
set -uo pipefail

REPO="$HOME/hela-dev/hela-ai-blog"
LOCK="/tmp/hela-blog-deploy.lock"
LOG="$REPO/auto-deploy.log"
CREDS="$HOME/.project/credentials/cloudflare-pages.env"
DEBOUNCE_SECS=60

exec 9>"$LOCK"
if ! flock -n 9; then
  echo "$(date -Iseconds) [skip] another deploy running" >> "$LOG"
  exit 0
fi

CURRENT_BRANCH="$(git -C "$REPO" rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
ALLOWED_BRANCH="master"
if [[ "$CURRENT_BRANCH" != "$ALLOWED_BRANCH" ]]; then
  echo "$(date -Iseconds) [skip] auto-deploy not allowed on branch '$CURRENT_BRANCH' (allowed: $ALLOWED_BRANCH)" >> "$LOG"
  exit 0
fi

sleep "$DEBOUNCE_SECS"

cd "$REPO" || exit 1

WATCHED_PATHS=(content/posts public/images/posts public/videos)

if [[ -z "$(git status --porcelain "${WATCHED_PATHS[@]}" 2>/dev/null)" ]]; then
  echo "$(date -Iseconds) [skip] no post/media changes" >> "$LOG"
  exit 0
fi

{
  echo ""
  echo "=== $(date -Iseconds) auto-deploy start ==="

  if ! npm run build; then
    echo "[fail] build failed — leaving changes uncommitted for manual fix"
    exit 1
  fi

  git add "${WATCHED_PATHS[@]}"
  if ! git diff --cached --quiet; then
    git commit -m "auto: publish pending posts ($(date +%F))"
  fi

  if [[ ! -f "$CREDS" ]]; then
    echo "[fail] missing credentials: $CREDS"
    exit 1
  fi
  set -a
  # shellcheck source=/dev/null
  source "$CREDS"
  set +a

  npx --yes wrangler pages deploy out/ \
    --project-name=hela-ai-blog \
    --branch=main \
    --commit-dirty=true

  echo "=== $(date -Iseconds) done ==="
} >> "$LOG" 2>&1
