# Repository settings

This folder holds the GitHub settings for this repository. A script applies all of them through the GitHub API. The JSON files are the source. Change a file here first, then apply it.

## What each file enforces

- `main.json`: the `main` branch.
  - A change reaches `main` only through a pull request, merged as one squashed commit.
  - The `build`, `title` and `review` checks from GitHub Actions must pass.
  - History stays linear. Nobody deletes `main` or force-pushes to it.
- `tags.json`: release tags (`v*`). Nobody moves or deletes them. A deploy runs from a release tag, so the tag must stay fixed.
- `environments.json`: the refs that may deploy to `github-pages`.
  - `main`: a release deploy runs on `main`, because `release.yml` runs on a push to `main` and calls `deploy.yml`.
  - `v*`: a manual deploy runs from the release tag picked under "Use workflow from".

## Apply the settings

An owner runs this from the repository folder:

```sh
docs/rulesets/apply.sh
```

The script needs `gh`, signed in as an owner of the repository, and `jq`. It does these things, in order:

1. It sets the merge options: squash only, the pull request title and description as the commit message, and branches deleted after a merge.
2. It turns on private vulnerability reporting, Dependabot alerts and security updates, secret scanning with push protection, and CodeQL's default setup.
3. It applies each ruleset file. It finds a ruleset by its name, updates it when it exists, and creates it when not.
4. It applies `environments.json`. It adds each missing ref and keeps the refs already there.

To check the result:

```sh
gh api repos/tollgate-ai/tollgate-ai.github.io/rulesets --jq '.[].name'
```
