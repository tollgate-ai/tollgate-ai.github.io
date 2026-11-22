#!/bin/sh
# Applies this folder's settings to a repository through the GitHub API:
# merge options, security features, every ruleset file, and the deployment
# rules in environments.json when that file exists.
# A ruleset is matched by its name: updated when it exists, created when not.
# Usage: docs/rulesets/apply.sh [owner/repo]
set -eu

repo=${1:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}
dir=$(dirname "$0")

gh api -X PATCH "repos/$repo" \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -f squash_merge_commit_title=PR_TITLE -f squash_merge_commit_message=PR_BODY \
  -F delete_branch_on_merge=true >/dev/null
echo "merge options: squash only, branches deleted after a merge"

gh api -X PUT "repos/$repo/private-vulnerability-reporting" >/dev/null
gh api -X PUT "repos/$repo/vulnerability-alerts" >/dev/null
gh api -X PUT "repos/$repo/automated-security-fixes" >/dev/null
printf '%s' '{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}' |
  gh api -X PATCH "repos/$repo" --input - >/dev/null
gh api -X PATCH "repos/$repo/code-scanning/default-setup" -f state=configured >/dev/null
echo "security: private reporting, Dependabot alerts and updates, secret scanning with push protection, CodeQL"

for file in "$dir"/*.json; do
  [ "$(basename "$file")" = environments.json ] && continue
  name=$(jq -r .name "$file")
  id=$(gh api "repos/$repo/rulesets?includes_parents=false" \
    --jq ".[] | select(.name == \"$name\") | .id")
  if [ -n "$id" ]; then
    gh api -X PUT "repos/$repo/rulesets/$id" --input "$file" >/dev/null
    echo "ruleset updated: $name"
  else
    gh api -X POST "repos/$repo/rulesets" --input "$file" >/dev/null
    echo "ruleset created: $name"
  fi
done

envs="$dir/environments.json"
[ -f "$envs" ] || exit 0
for env in $(jq -r 'keys[]' "$envs"); do
  printf '%s' '{"deployment_branch_policy":{"protected_branches":false,"custom_branch_policies":true}}' |
    gh api -X PUT "repos/$repo/environments/$env" --input - >/dev/null
  have=$(gh api "repos/$repo/environments/$env/deployment-branch-policies" \
    --jq '.branch_policies[] | .type + ":" + .name')
  jq -c --arg e "$env" '.[$e][]' "$envs" | while read -r policy; do
    key=$(printf '%s' "$policy" | jq -r '.type + ":" + .name')
    if printf '%s\n' "$have" | grep -qxF "$key"; then
      echo "environment $env: kept $key"
    else
      printf '%s' "$policy" |
        gh api -X POST "repos/$repo/environments/$env/deployment-branch-policies" --input - >/dev/null
      echo "environment $env: added $key"
    fi
  done
done
