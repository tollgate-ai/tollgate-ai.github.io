#!/bin/sh
# Applies the merge settings and every ruleset in this folder to a repository.
# A ruleset is matched by its name: updated when it exists, created when not.
# Usage: docs/rulesets/apply.sh [owner/repo]
set -eu

repo=${1:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}
dir=$(dirname "$0")

gh api -X PATCH "repos/$repo" \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -f squash_merge_commit_title=PR_TITLE -f squash_merge_commit_message=PR_BODY \
  -F delete_branch_on_merge=true >/dev/null
echo "merge settings: squash only, branches deleted after a merge"

for file in "$dir"/*.json; do
  name=$(jq -r .name "$file")
  id=$(gh api "repos/$repo/rulesets?includes_parents=false" \
    --jq ".[] | select(.name == \"$name\") | .id")
  if [ -n "$id" ]; then
    gh api -X PUT "repos/$repo/rulesets/$id" --input "$file" >/dev/null
    echo "updated: $name"
  else
    gh api -X POST "repos/$repo/rulesets" --input "$file" >/dev/null
    echo "created: $name"
  fi
done
