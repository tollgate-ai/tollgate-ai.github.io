# Repository settings

This folder holds the GitHub settings for this repository. The JSON files are the source. Change a file here first, then apply it.

## What each file enforces

- `main.json`: the `main` branch.
  - A change reaches `main` only through a pull request, merged as one squashed commit.
  - The `build`, `title` and `review` checks from GitHub Actions must pass.
  - History stays linear. Nobody deletes `main` or force-pushes to it.
- `tags.json`: release tags (`v*`). Nobody moves or deletes them. A deploy runs from a release tag, so the tag must stay fixed.

## Apply the settings

A maintainer runs this from the repository folder:

```sh
docs/rulesets/apply.sh
```

The script needs `gh`, signed in with admin rights, and `jq`. It does two things:

1. It sets the merge options: squash only, the pull request title and description as the commit message, and branches deleted after a merge.
2. It applies each JSON file. It finds a ruleset by its name, updates it when it exists, and creates it when not.

To check the result:

```sh
gh api repos/tollgate-ai/tollgate-ai.github.io/rulesets --jq '.[].name'
```

## Settings with no file

Set these by hand:

- In Settings → Environments → `github-pages`, add the deployment tag rule `v*`.
- In Settings → Advanced Security, turn on:
  - Private vulnerability reporting
  - Dependabot alerts and Dependabot security updates
  - Secret scanning with push protection
  - CodeQL, default setup
