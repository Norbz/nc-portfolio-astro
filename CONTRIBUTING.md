# Contributing

Repository: [`Norbz/nc-portfolio-astro`](https://github.com/Norbz/nc-portfolio-astro).
Trunk-based workflow: `main` is the only long-lived branch.

## Setup

```bash
npm install
npm run dev
```

The commands and the architecture are described in [`CLAUDE.md`](CLAUDE.md).

## Workflow

1. Branch off `main` (e.g. `feat/team-block`, `fix/email-button`).
2. Commit freely inside the branch. Branch commits never reach `main`.
3. Open a pull request.
4. On merge, the PR is squashed into one commit on `main`. Its message is the
   PR title and description, and it is what release-please reads to build the
   changelog.

The repository allows squash merges only and deletes the branch on merge. No CI
runs on pull requests, so the rules below are checked by the reviewer.

Everything technical is written in English: branch names, code, comments,
commits and PRs.

## PR title = the changelog entry

The PR title follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>
```

```
feat(reports): add team members to the build footprint
fix: keep the email button working after client-side navigation
content(reports): rewrite the eco report copy
```

Types map to changelog sections (source of truth: `release-please-config.json`):

| Type                               | Changelog section           |
| ---------------------------------- | --------------------------- |
| `feat`                             | 🚀 New Features             |
| `enhance`                          | 💅 Enhancements             |
| `fix`                              | 🔥 Bug Fixes                |
| `perf`                             | 🏃 Performance Improvements |
| `content`                          | 📝 Content                  |
| `docs`                             | 📚 Documentation            |
| `style`                            | 🎨 Polish                   |
| `chore`                            | ⚙️ Chores                   |
| `refactor`                         | ⌨️ Code Refactoring         |
| `ci` · `build` · `revert` · `test` | (hidden from changelog)     |

The subject starts with a lowercase letter. The scope is optional; `reports`
covers the eco reports.

### The description is a commit message

The description is the body of the squash commit. It opens with a short body
for the title, two lines at most. Every further notable change is one
Conventional Commit line, followed by a short body when the line is not enough,
each block separated by a blank line.

```
short body of the title, what this PR does

fix(reports): correct the LOTR services list

short body of the fix, only when it needs one

feat(reports): base Claude Code footprint on measured token usage
```

release-please turns each Conventional Commit line into its own changelog
entry. A body is for the reader of the commit and does not reach the changelog.

- Do not repeat the title in the description, or the change appears twice in
  the release notes.
- An entry describes a change a visitor of the site would notice. A change for
  developers only (this file, a README, a comment) earns no line.
- A fix to something never released belongs to the line that introduced it.
- No AI agent signature (`Co-Authored-By`, "Generated with…") in titles,
  descriptions or commits.

## Releases

release-please keeps a release PR open with the merged changes. Merging it
updates `CHANGELOG.md`, tags the version and publishes the GitHub release.

The published release notes come from the release PR description. To trim them,
edit `CHANGELOG.md` on the release branch and the PR description. Any push to
`main` rebuilds both and discards the edits, so trim them right before merging.

Publishing a release deploys the site to GitHub Pages
([`deploy.yml`](.github/workflows/deploy.yml)). The workflow can also be run by
hand from the Actions tab.
