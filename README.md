# Tollgate website

This repository is the source of [tollgate-ai.github.io](https://tollgate-ai.github.io/), the home page of Tollgate.

**Looking for Tollgate itself?** It lives in [tollgate-ai/tollgate](https://github.com/tollgate-ai/tollgate): the plugin for Claude Code, how to install it, and how it works. Nothing here is needed to use it.

## Why it is a separate repository

GitHub publishes the address tollgate-ai.github.io only from a repository with that name. The page's pictures are not copied here: the build reads them from Tollgate's own diagrams, so the website and Tollgate's README always show the same thing.

## Where to change the page

| To change | Edit |
| --- | --- |
| The install lines, what you need, the commands, the rules, and the links | `src/content.ts` |
| A section's words or layout | its file in `src/sections/` |
| The order of the sections | `src/App.vue` |
| The colours and the fonts | `src/style.css` |
| The logo | `src/components/TollgateLogo.vue`, `public/favicon.svg`, and `public/favicon.png` |
| A picture | its spec in tollgate-ai/tollgate, under `docs/diagrams/src/` |

Every fact on the page comes from Tollgate's README, principles, and plan. Change a fact there first.

## Start

You need Node.js 22 and a copy of tollgate-ai/tollgate next to this repository, because the build reads the pictures from `../tollgate`.

```sh
git clone https://github.com/tollgate-ai/tollgate
git clone https://github.com/tollgate-ai/tollgate-ai.github.io
cd tollgate-ai.github.io
npm ci
npm run dev       # a live preview at http://localhost:5173/
npm run build     # checks the types, then writes the site to dist/
```

To keep Tollgate's copy somewhere else, set `TOLLGATE_DIR` to its folder.

## When a change goes live

- **A push to main** builds the site and publishes it.
- **A pull request** gets the same build, without the publish.
- **Once a day,** at 03:17 UTC, the site is built again, so a picture redrawn in tollgate-ai/tollgate shows up by the next day.
- **At once:** press "Run workflow" in this repository's Actions tab.

## Licence

Apache License 2.0, the same as Tollgate. See `LICENSE` and `NOTICE`.
