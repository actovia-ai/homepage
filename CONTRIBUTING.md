# Contributing to the Actovia homepage

Hi! We are really excited that you are interested in contributing to Actovia. Before submitting your contribution, please take a moment to read through the following guide.

## Repo Setup

The homepage ([actovia-ai/homepage](https://github.com/actovia-ai/homepage), [actovia.yancey.app](https://actovia.yancey.app)) is a Next.js site deployed on Vercel.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
```

## Pull Request Guidelines

- Checkout a topic branch from `main` and merge back against it.

- If adding a new feature:
  - Add accompanying tests.
  - Provide a convincing reason to add this feature. Ideally, open a suggestion issue first and have it approved before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: keep the paired computer after a restart (fix #12)`.
  - Provide a detailed description of the bug in the PR.
  - Add appropriate test coverage if applicable.

- It's OK to have multiple small commits as you work on the PR — GitHub can squash them before merging.

- Make sure the checks above pass.

- Commit messages follow the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit): releases and the changelog are generated from them.

- Copy is English; keep pages fast and accessible at phone width.

## Reporting Security Issues

Please do not open an issue for a security problem; see [SECURITY.md](SECURITY.md).
