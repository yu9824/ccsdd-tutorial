# Content Convention

This document defines the canonical structure for blog content and static assets. The static site generator (SSG) and build pipeline rely on these paths and patterns. Overrides, if any, must be documented here or in the SSG configuration.

## Post source files

| Item | Convention |
|------|------------|
| **Location** | `posts/` (repository root) |
| **File pattern** | `*.md` — any Markdown file in this directory is treated as a post source |
| **Override** | If the SSG is configured to use a different input directory (e.g. `src/posts/`), that path must be set in the SSG config and noted in this document |

### Front matter schema

Posts may include optional YAML front matter at the top of the file (between `---` delimiters). The following keys are supported and used by the build:

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `title` | string | No | Display title for the post |
| `date` | string (ISO 8601 or parseable) | No | Publication or sort date; used for ordering and display |
| `slug` | string | No | URL-friendly identifier for the post; if omitted, may be derived from the filename |
| `draft` | boolean | No | If `true`, the post is excluded from build output (no HTML emitted); default is false |
| (other) | — | — | Additional keys are allowed for extensibility (e.g. tags, description) |

- Encoding: UTF-8.
- The body is the Markdown content below the front matter; standard Markdown syntax is supported.

## Static assets

| Item | Convention |
|------|------------|
| **Location** | `public/` (repository root) |
| **Role** | Images, CSS, JavaScript, and other static files placed here are copied or processed into the build output so they are available on the deployed site (e.g. at `/` or a designated path such as `/assets/`) |
| **Override** | If the project uses a different asset directory (e.g. `assets/`), it must be configured in the SSG (e.g. passthrough copy) and documented here. The canonical default is `public/`. |

- No schema beyond “files under this path”; the SSG includes them in the output as configured (copy/passthrough or processing).

## Summary

- **Posts**: `posts/*.md` — front matter optional (title, date, slug, draft; extensible).
- **Assets**: `public/` — static files included in build output; override to another directory must be documented.
