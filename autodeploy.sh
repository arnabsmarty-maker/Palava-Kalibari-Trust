#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# Hands-off auto-deploy (Option C).
# Watches this folder; whenever files change AND stop changing for a
# few seconds, it commits everything and pushes to GitHub → Netlify
# rebuilds and publishes automatically. No extra tools required.
#
#   ./autodeploy.sh                 # run in the foreground; Ctrl-C to stop
#   DRY_RUN=1 ./autodeploy.sh       # show what it WOULD do, without pushing
#   nohup ./autodeploy.sh &         # run in the background (survives closing terminal)
#
# Tunables (optional):
#   POLL=5      seconds between change checks
#   SETTLE=8    quiet period (no new edits) required before it pushes
#   BRANCH=main branch to push
#
# Note: only git-tracked/untracked files trigger it — node_modules/, dist/,
# .DS_Store etc. are ignored via .gitignore, so builds won't cause commits.
# ─────────────────────────────────────────────────────────────
set -u
cd "$(dirname "$0")"

POLL="${POLL:-5}"
SETTLE="${SETTLE:-8}"
BRANCH="${BRANCH:-main}"
DRY_RUN="${DRY_RUN:-0}"

echo "👀 Auto-deploy watching: $(pwd)"
echo "   poll ${POLL}s · settle ${SETTLE}s · branch ${BRANCH}${DRY_RUN:+ · DRY_RUN=$DRY_RUN}"
echo "   Leave this running. Press Ctrl-C to stop."
echo

trap 'echo; echo "🛑 Auto-deploy stopped."; exit 0' INT TERM

changes() { git status --porcelain; }

while true; do
  cur="$(changes)"
  if [ -n "$cur" ]; then
    # Wait for edits to settle so we don't commit a half-saved change.
    prev="$cur"
    sleep "$SETTLE"
    cur="$(changes)"
    if [ "$cur" = "$prev" ] && [ -n "$cur" ]; then
      ts="$(date '+%Y-%m-%d %H:%M:%S')"
      n="$(printf '%s\n' "$cur" | grep -c .)"
      echo "→ [$ts] ${n} change(s) detected — deploying…"
      if [ "$DRY_RUN" = "1" ]; then
        printf '%s\n' "$cur" | sed 's/^/     would commit: /'
        echo "  (DRY_RUN: skipped commit & push)"
      else
        git add -A
        if git commit -q -m "Auto update $ts"; then
          if git push -q origin "$BRANCH"; then
            echo "  ✅ Pushed to $BRANCH — Netlify will redeploy."
          else
            echo "  ⚠️  Commit made but push failed (network/auth?). Will retry on next change."
          fi
        else
          echo "  (nothing to commit)"
        fi
      fi
    fi
  fi
  sleep "$POLL"
done
