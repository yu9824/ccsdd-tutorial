# Build and Deploy (Netlify)

This document describes how the static blog is built and deployed via GitHub Actions to Netlify, and what maintainers need to configure.

## Trigger branch

The workflow runs on **push to `main`**.

- **File**: `.github/workflows/deploy.yml`
- **Event**: `push` to branch `main`
- Pushing to other branches does not trigger the workflow. To change the branch, edit the `on.push.branches` array in the workflow file.

## Required GitHub secrets

Set these in the repository: **Settings → Secrets and variables → Actions**. The deploy step uses them as environment variables; they are not logged.

| Secret | Description |
|--------|-------------|
| `NETLIFY_AUTH_TOKEN` | Netlify [personal access token](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/#obtain-a-token) (or OAuth token) for deploy API/CLI authentication. |
| `NETLIFY_SITE_ID` | Netlify site identifier (e.g. from Site settings → General → Site information, or from the Netlify dashboard URL). |

If either secret is missing or invalid, the Deploy step will fail. The build step does not require these secrets.

## Build output path

The static site generator (Eleventy) writes output to **`_site`**. The workflow runs `npm run build` and then deploys that directory with:

```bash
npx netlify-cli deploy --dir=_site --prod
```

## End-to-end verification

After configuring the secrets and pushing to `main`, maintainers can verify the pipeline as follows.

1. **Trigger**: Push a commit to `main` (or use Actions → "Build and Deploy to Netlify" → Run workflow).
2. **Workflow**: In the GitHub Actions tab, confirm the workflow runs and that the **Build** and **Deploy to Netlify** steps succeed. If the build fails, the deploy step is not run.
3. **Live site**: Open the Netlify site URL (production). Confirm:
   - The **index (listing) page** shows at least one post (e.g. "Hello World").
   - At least **one post** is reachable at a stable URL (e.g. `/posts/hello-world/`) and displays the rendered post content.

Optional: Intentionally break the build (e.g. introduce a syntax error in a template), push to `main`, and confirm the workflow fails and no new deploy occurs.
