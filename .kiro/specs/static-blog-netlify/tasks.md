# Implementation Plan

## Tasks

- [ ] 1. Establish content structure and convention
- [x] 1.1 Create canonical directories for post source files and static assets per design; document the convention (post location, file pattern, front matter schema, asset directory).
  - Use `posts/` for Markdown posts and `public/` (or `assets/`) for static assets; document any override.
  - _Requirements: 4.1, 4.3_
- [x] 1.2 (P) Add at least one sample Markdown post with front matter (e.g. title, date, slug) and body so that creating and updating posts by editing files is demonstrated.
  - _Requirements: 2.1, 2.5_

- [ ] 2. Set up static site generator and produce build output
- [x] 2.1 Add Eleventy (or design-compliant SSG) and configure input directory for posts, output directory for build, and passthrough or copy for static assets.
  - _Requirements: 1.2, 4.2_
- [x] 2.2 (P) Create index layout that lists non-draft posts and post layout that renders a single post; ensure stable, shareable URLs for each post.
  - _Requirements: 3.1, 3.2, 3.4_
- [x] 2.3 (P) Configure front matter parsing and ensure posts with draft flag are excluded from build output (no HTML emitted for drafts).
  - _Requirements: 2.2, 2.3, 2.4_
- [x] 2.4 Run the build and confirm the output directory contains index page, post pages, and assets with Markdown rendered to HTML.
  - _Requirements: 1.2, 3.3_
- [ ] 2.5* Optional: Add test that verifies draft posts are excluded from build output and front matter is applied correctly.
  - Deferrable post-MVP; references acceptance criteria for draft handling and front matter.
  - _Requirements: 2.4_

- [x] 3. Add GitHub Actions workflow and Netlify deploy
- [x] 3.1 Add workflow triggered on push to the configured branch (e.g. main): checkout, install dependencies, run SSG build; ensure job fails when build fails so deploy is not run.
  - _Requirements: 1.1, 1.4, 5.1, 5.3_
- [x] 3.2 Add deploy step that runs Netlify CLI with the build output path and production flag, using repository secrets for token and site ID.
  - _Requirements: 1.3, 1.5, 5.2_

- [x] 4. Integration and verification
- [x] 4.1 Document required GitHub secrets (NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID) and trigger branch for maintainers.
  - _Requirements: 5.1, 5.2_
- [x] 4.2 Verify end-to-end: push to branch triggers build and deploy; live site shows post listing and at least one post at a stable URL.
  - _Requirements: 1.1, 1.3, 3.1, 3.2, 3.4_
