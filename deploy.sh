#!/usr/bin/env bash
# One-command deploy: stage everything, commit, and push to GitHub.
# Netlify (connected to this repo's main branch) then rebuilds & publishes.
#
# Usage:
#   ./deploy.sh                 # commits with a timestamp message
#   ./deploy.sh "your message"  # commits with your own message
#
# First time only, make it executable:  chmod +x deploy.sh

set -e
cd "$(dirname "$0")"

msg="${1:-Update site $(date '+%Y-%m-%d %H:%M')}"

if git diff --quiet && git diff --cached --quiet; then
  echo "Nothing to deploy — no changes since last commit."
  exit 0
fi

git add -A
git commit -m "$msg"
git push origin main

echo
echo "✅ Pushed to GitHub. Netlify will build & deploy automatically."
echo "   Watch progress: Netlify dashboard → your site → Deploys."
