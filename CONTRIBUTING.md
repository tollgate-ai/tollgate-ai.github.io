# Contributing

This repository is the Tollgate website. To change Tollgate itself, see [tollgate-ai/tollgate](https://github.com/tollgate-ai/tollgate/blob/main/CONTRIBUTING.md).

## Set up

1. `npm ci`, then `npm run dev` to see the page while you change it. The README says where Tollgate's copy must be for the pictures.
2. Install the checks: `pipx install pre-commit==4.7.0`, then `pre-commit install`.

## Propose a change

1. Check it: `npm run build` passes, and the page looks right in the browser, on a phone too.
2. Open a pull request from a branch. Its title has the form `type(scope): subject`: the change is squashed into one commit on main, and the title becomes its subject. release-please reads it to set the next version.
3. Fill in the template: what changes and why, how you checked it, and what is not tested.

The words on the page come from Tollgate's README and docs. Change them there first, so the two say the same thing.

The page goes live with the next release, not with the merge.
