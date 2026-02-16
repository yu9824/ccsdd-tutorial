# Research & Design Decisions

---
**Purpose**: Capture discovery findings, architectural investigations, and rationale that inform the technical design.

**Usage**:
- Log research activities and outcomes during the discovery phase.
- Document design decision trade-offs that are too detailed for `design.md`.
- Provide references and evidence for future audits or reuse.
---

## Summary

- **Feature**: static-blog-netlify
- **Discovery Scope**: New Feature (greenfield)
- **Key Findings**:
  - GitHub Actions + Netlify CLI is a standard pattern: checkout → install → build → `netlify deploy --dir=<output>` with `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.
  - Eleventy (11ty) fits Jekyll-like workflow: Markdown + front matter, Node-based, outputs static HTML; no Ruby runtime required.
  - Netlify supports two modes: (1) Netlify builds on their infra, or (2) build in CI and deploy only the artifact via CLI `--dir`; requirement specifies GitHub Actions for build, so CI-built artifact + deploy is the chosen approach.

## Research Log

### GitHub Actions and Netlify deployment

- **Context**: Need to satisfy Requirement 1 (build on push, deploy to Netlify) and Requirement 5 (GitHub Actions + Netlify).
- **Sources Consulted**: Community posts on deploying static sites with GitHub Actions and Netlify; Netlify CLI reference.
- **Findings**:
  - Workflow: trigger on push to main (or configurable branch); checkout; setup Node (or build runtime); install deps; run SSG build; deploy with `netlify deploy --dir=<build-output> --prod` using secrets `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
  - Netlify CLI supports `--dir` to deploy a pre-built folder; `--prod` for production; auth via token.
  - Build failure handling: if build step fails, workflow fails and deploy step is not run; no deploy on failure.
- **Implications**: Design must define a single build-output directory contract and a workflow that runs build then deploy; no Netlify-on-Netlify build needed.

### Static site generator (Markdown, front matter)

- **Context**: Requirement 2 (Markdown posts, front matter), 3 (listing and display), 4 (content structure); Jekyll-like but not limited to Jekyll.
- **Sources Consulted**: Eleventy documentation (Markdown, front matter, data cascade).
- **Findings**:
  - Eleventy: Node-based, supports Markdown as template language, native front matter and data cascade; outputs static HTML; configurable input/output directories.
  - Alternative (Jekyll): Ruby-based, requires Ruby in CI; more moving parts for a Node-focused repo.
  - Alternative (Hugo): Go binary; no Node dependency but different ecosystem.
- **Implications**: Eleventy is a strong default for Node-based projects; design should allow swapping SSG as long as content contract (Markdown + front matter, designated dir) and output contract (static artifact in a single directory) are preserved.

### Netlify deploy contract

- **Context**: Need a clear deploy interface so the pipeline component can depend on it.
- **Sources Consulted**: Netlify CLI deploy command reference, Netlify API get-started.
- **Findings**:
  - CLI: `netlify deploy --dir <path> [--prod]`; auth via `NETLIFY_AUTH_TOKEN`; site identified by `NETLIFY_SITE_ID`.
  - API: REST API available for atomic deploys; CLI is the typical choice for CI.
  - No strict schema for directory contents: static files (HTML, CSS, JS, assets) under the given path are deployed.
- **Implications**: Deploy component contract is “directory path + env (token, site id) → deploy”; no custom API schema in design.

## Architecture Pattern Evaluation

| Option                       | Description                                    | Strengths                                            | Risks / Limitations                       | Notes                                                 |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| Pipeline (CI build + deploy) | Linear pipeline: repo → build job → deploy job | Simple, reproducible, full control in GitHub Actions | Requires maintaining workflow and secrets | Matches requirements (GA for build, Netlify for host) |
| Netlify-built                | Netlify runs build on their infra              | No CI build step                                     | Requirement asks for GitHub Actions build | Out of scope                                          |
| Monorepo with shared content | Single repo with content + theme + pipeline    | Single source of truth                               | N/A for minimal first version             | Can be assumed as default                             |

**Selected**: Pipeline (CI build + deploy). Netlify is deployment target only; build runs in GitHub Actions.

## Design Decisions

### Decision: Build in GitHub Actions, deploy artifact to Netlify

- **Context**: Requirement 1.5 and 5.1–5.3 require GitHub Actions for build and Netlify as deployment target.
- **Alternatives Considered**:
  1. Netlify build — Netlify runs the build; GitHub only holds source. Rejected: does not satisfy “GitHub Actions for build.”
  2. Build in GitHub Actions and deploy via Netlify CLI — Build and deploy as separate steps; deploy uses `netlify deploy --dir=<output>`.
- **Selected Approach**: GitHub Actions workflow runs install + SSG build; output directory is then deployed with Netlify CLI (`--dir`, `--prod`) using repository secrets.
- **Rationale**: Keeps build reproducible in CI, uses Netlify only for hosting and CDN; aligns with requirement wording.
- **Trade-offs**: Secrets and workflow maintenance in exchange for control and auditability.
- **Follow-up**: Document required secrets and branch strategy in implementation.

### Decision: Recommend Eleventy as the default SSG

- **Context**: Need an SSG that supports Markdown, front matter, and static output; Jekyll-like but not Jekyll-only.
- **Alternatives Considered**:
  1. Jekyll — Ruby; would require Ruby in CI and different toolchain.
  2. Hugo — Go; single binary but different ecosystem from Node.
  3. Eleventy — Node, Markdown + front matter, minimal config, good fit for Node/JS repo.
- **Selected Approach**: Design the content and output contracts so that Eleventy can fulfill them; allow other SSGs that meet the same contracts.
- **Rationale**: Project already uses Node (package.json, Volta); Eleventy is well-documented and supports the required content model.
- **Trade-offs**: Eleventy is the reference implementation; switching SSG requires re-implementing the same output structure.
- **Follow-up**: In tasks, implement with Eleventy first; document the directory and front-matter contract for future alternatives.

### Decision: Content directory convention

- **Context**: Requirement 4.1 — define convention for post source location.
- **Selected Approach**: Single designated directory for post source files (e.g. `src/posts` or `posts/`); file pattern (e.g. `*.md`) and optional front matter schema (title, date, slug, draft) documented in design. Static assets in a separate designated directory (e.g. `public/` or `src/assets`) copied or processed into build output.
- **Rationale**: Clear boundary for “content” vs “theme/code”; enables consistent discovery by the SSG and future tooling.
- **Follow-up**: Specify exact directory names in tasks; keep them configurable in SSG config where possible.

## Risks & Mitigations

- **Secret leakage** — Store `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` only in GitHub repository secrets; never in code or logs. Mitigation: document in implementation; use minimal-scope token.
- **Build output drift** — If SSG output directory changes, deploy step may upload wrong path. Mitigation: single output directory variable in workflow; document in design and tasks.
- **Broken builds on main** — Failed build prevents deploy but may leave last successful deploy live. Mitigation: optional status checks and branch protection; design does not mandate, but testing strategy should cover build success path.

## References

- [Netlify CLI deploy command](https://cli.netlify.com/commands/deploy/) — `--dir`, `--prod`, auth
- [Netlify CLI get started](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli) — CI authentication
- [Eleventy docs — Markdown](https://www.11ty.dev/docs/languages/markdown/)
- [Eleventy docs — Front matter](https://www.11ty.dev/docs/data-frontmatter/)
- Community: Deploying static sites with GitHub Actions and Netlify (workflow structure, secrets)
